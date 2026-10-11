
const express = require("express");
const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Room = require("../models/Room");
const BookingLock = require("../models/BookingLock");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

const ACTIVE_STATUSES = ["pending", "confirmed"];
const ALLOWED_STATUSES = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

const STATUS_TRANSITIONS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const RESTAURANT_TIME_ZONE = "Asia/Kolkata";
const MAX_GUESTS = 1000;
const MAX_SPECIAL_REQUEST_LENGTH = 1000;

function canTransitionStatus(currentStatus, nextStatus) {
  return STATUS_TRANSITIONS[currentStatus]?.includes(nextStatus) ?? false;
}

// Booking dates are stored as UTC midnight.
// Read the date using UTC fields so the booking date does not shift
// to the next day when converted to Indian Standard Time.
function getDateKey(date) {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return null;
  }

  const year = value.getUTCFullYear();
  const month = String(value.getUTCMonth() + 1).padStart(2, "0");
  const day = String(value.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseBookingDate(dateKey) {
  if (!isValidDate(dateKey)) {
    return null;
  }

  return new Date(`${dateKey}T00:00:00.000Z`);
}

function isValidDate(dateKey) {
  if (typeof dateKey !== "string") {
    return false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    return false;
  }

  const date = new Date(`${dateKey}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === dateKey
  );
}

function getIndiaDateAndTime() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: RESTAURANT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const values = {};

  for (const part of parts) {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  }

  return {
    dateKey: `${values.year}-${values.month}-${values.day}`,
    timeKey: `${values.hour}:${values.minute}`,
  };
}

function isFutureBooking(dateKey, startTime) {
  const now = getIndiaDateAndTime();

  if (dateKey > now.dateKey) {
    return true;
  }

  if (dateKey < now.dateKey) {
    return false;
  }

  return startTime > now.timeKey;
}

function getUserId(req) {
  return req.user?.userId || req.user?.id || req.user?._id;
}

function getResourceBookingType(room) {
  const type = String(room?.type || "").trim().toLowerCase();

  // Supports types such as "Hall", "Banquet Hall", "Deluxe Room",
  // and "Premium Room".
  return type.includes("hall") ? "hall" : "room";
}

function sendError(res, error, fallbackMessage) {
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      message: "A conflicting booking request was detected. Please try again.",
    });
  }

  if (error.code === 112 || error.codeName === "WriteConflict") {
    return res.status(409).json({
      message: "The booking was updated at the same time by another request. Please try again.",
    });
  }

  console.error(fallbackMessage, error);

  return res.status(500).json({
    message: fallbackMessage,
  });
}

function createRouteError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

// Ensure a lock document exists for each room/date combination.
async function ensureLockExists(roomId, dateKey) {
  try {
    await BookingLock.updateOne(
      {
        room: roomId,
        dateKey,
      },
      {
        $setOnInsert: {
          room: roomId,
          dateKey,
          version: 0,
        },
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    // Another request may create the same unique lock first.
    if (error.code !== 11000) {
      throw error;
    }
  }
}

// All booking creation, cancellation and status changes that affect
// availability must use this same room/date lock.
async function withRoomDayLock(roomId, dateKey, operation) {
  await ensureLockExists(roomId, dateKey);

  const session = await mongoose.startSession();

  try {
    let result;

    await session.withTransaction(
      async () => {
        const lockResult = await BookingLock.updateOne(
          {
            room: roomId,
            dateKey,
          },
          {
            $inc: {
              version: 1,
            },
          },
          {
            session,
          }
        );

        if (lockResult.matchedCount === 0) {
          throw createRouteError(
            500,
            "Could not acquire the booking lock. Please try again."
          );
        }

        result = await operation(session);
      },
      {
        readPreference: "primary",
        readConcern: {
          level: "snapshot",
        },
        writeConcern: {
          w: "majority",
        },
      }
    );

    return result;
  } finally {
    await session.endSession();
  }
}

// Check for overlapping active bookings on the same room and date.
// Example: 10:00-12:00 conflicts with 11:00-13:00.
// Example: 10:00-12:00 does not conflict with 12:00-14:00.
async function hasBookingConflict({
  roomId,
  dateKey,
  startTime,
  endTime,
  excludeBookingId,
  session,
}) {
  const bookingDate = parseBookingDate(dateKey);

  if (!bookingDate) {
    throw createRouteError(400, "Invalid booking date.");
  }

  const query = {
    room: roomId,
    date: bookingDate,
    bookingStatus: {
      $in: ACTIVE_STATUSES,
    },
    startTime: {
      $lt: endTime,
    },
    endTime: {
      $gt: startTime,
    },
  };

  if (excludeBookingId) {
    query._id = {
      $ne: excludeBookingId,
    };
  }

  let bookingQuery = Booking.findOne(query);

  if (session) {
    bookingQuery = bookingQuery.session(session);
  }

  return Boolean(await bookingQuery);
}

// POST /api/bookings
// Create a booking after validating the room, date, time and capacity.
router.post("/", protect, async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({
        message: "Your login session is invalid. Please log in again.",
      });
    }

    const {
      room: roomId,
      bookingType,
      date,
      startTime,
      endTime,
      guests,
      specialRequest = "",
    } = req.body;

    if (
      !roomId ||
      !bookingType ||
      !date ||
      !startTime ||
      !endTime ||
      guests === undefined ||
      guests === null
    ) {
      return res.status(400).json({
        message: "Please provide all required booking details.",
      });
    }

    if (!mongoose.isValidObjectId(roomId)) {
      return res.status(400).json({
        message: "Invalid room or hall ID.",
      });
    }

    if (!["room", "hall"].includes(bookingType)) {
      return res.status(400).json({
        message: "Booking type must be room or hall.",
      });
    }

    if (!isValidDate(date)) {
      return res.status(400).json({
        message: "Please provide a valid booking date in YYYY-MM-DD format.",
      });
    }

    if (!TIME_REGEX.test(startTime) || !TIME_REGEX.test(endTime)) {
      return res.status(400).json({
        message: "Please provide valid times in HH:mm format.",
      });
    }

    if (startTime >= endTime) {
      return res.status(400).json({
        message: "End time must be later than start time.",
      });
    }

    if (
      !Number.isInteger(guests) ||
      guests < 1 ||
      guests > MAX_GUESTS
    ) {
      return res.status(400).json({
        message: `Guests must be a whole number between 1 and ${MAX_GUESTS}.`,
      });
    }

    if (
      typeof specialRequest !== "string" ||
      specialRequest.length > MAX_SPECIAL_REQUEST_LENGTH
    ) {
      return res.status(400).json({
        message: `Special request must be text with at most ${MAX_SPECIAL_REQUEST_LENGTH} characters.`,
      });
    }

    if (!isFutureBooking(date, startTime)) {
      return res.status(400).json({
        message: "Please select a future date and start time in Indian Standard Time.",
      });
    }

    const roomData = await Room.findById(roomId);

    if (!roomData) {
      return res.status(404).json({
        message: "Room or hall not found.",
      });
    }

    if (!roomData.available) {
      return res.status(400).json({
        message: "This room or hall is currently unavailable.",
      });
    }

    const expectedType = getResourceBookingType(roomData);

    if (bookingType !== expectedType) {
      return res.status(400).json({
        message: `This resource must be booked as a ${expectedType}.`,
      });
    }

    if (guests > roomData.capacity) {
      return res.status(400).json({
        message: `Guest count exceeds the capacity of ${roomData.capacity}.`,
      });
    }

    const bookingDate = parseBookingDate(date);

    const createdBooking = await withRoomDayLock(
      roomId,
      date,
      async (session) => {
        // Recheck resource details inside the transaction.
        const latestRoom = await Room.findById(roomId).session(session);

        if (!latestRoom) {
          throw createRouteError(404, "Room or hall not found.");
        }

        if (!latestRoom.available) {
          throw createRouteError(
            400,
            "This room or hall is currently unavailable."
          );
        }

        if (getResourceBookingType(latestRoom) !== bookingType) {
          throw createRouteError(
            400,
            `This resource must be booked as a ${getResourceBookingType(latestRoom)}.`
          );
        }

        if (guests > latestRoom.capacity) {
          throw createRouteError(
            400,
            `Guest count exceeds the capacity of ${latestRoom.capacity}.`
          );
        }

        if (
          await hasBookingConflict({
            roomId,
            dateKey: date,
            startTime,
            endTime,
            session,
          })
        ) {
          throw createRouteError(
            409,
            "This room or hall is already booked for the selected time."
          );
        }

        const [booking] = await Booking.create(
          [
            {
              user: userId,
              room: roomId,
              bookingType,
              date: bookingDate,
              startTime,
              endTime,
              guests,
              specialRequest: specialRequest.trim(),
              totalAmount: latestRoom.price,
              bookingStatus: "pending",
              paymentStatus: "pending",
            },
          ],
          {
            session,
          }
        );

        return booking;
      }
    );

    const populatedBooking = await Booking.findById(createdBooking._id)
      .populate("room", "name type image price capacity amenities");

    return res.status(201).json({
      message: "Booking request created successfully.",
      booking: populatedBooking,
    });
  } catch (error) {
    return sendError(res, error, "Unable to create booking.");
  }
});

// GET /api/bookings/my
router.get("/my", protect, async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({
        message: "Your login session is invalid. Please log in again.",
      });
    }

    const bookings = await Booking.find({
      user: userId,
    })
      .populate("room", "name type image price capacity amenities")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return sendError(res, error, "Unable to fetch your bookings.");
  }
});

// GET /api/bookings/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid booking ID.",
      });
    }

    const booking = await Booking.findOne({
      _id: id,
      user: userId,
    }).populate("room", "name type image price capacity amenities");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    return res.status(200).json({ booking });
  } catch (error) {
    return sendError(res, error, "Unable to fetch booking.");
  }
});

// PUT /api/bookings/:id/cancel
// Cancellation uses the same lock as booking creation so it cannot race
// with a simultaneous booking for the same room and date.
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid booking ID.",
      });
    }

    const initialBooking = await Booking.findOne({
      _id: id,
      user: userId,
    }).select("_id room date");

    if (!initialBooking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    const dateKey = getDateKey(initialBooking.date);

    const cancelledBooking = await withRoomDayLock(
      initialBooking.room,
      dateKey,
      async (session) => {
        const booking = await Booking.findOne({
          _id: id,
          user: userId,
        }).session(session);

        if (!booking) {
          throw createRouteError(404, "Booking not found.");
        }

        if (!canTransitionStatus(booking.bookingStatus, "cancelled")) {
          throw createRouteError(
            400,
            "This booking can no longer be cancelled."
          );
        }

        booking.bookingStatus = "cancelled";
        await booking.save({ session });

        return booking;
      }
    );

    const populatedBooking = await Booking.findById(cancelledBooking._id)
      .populate("room", "name type image price capacity amenities");

    return res.status(200).json({
      message: "Booking cancelled successfully.",
      booking: populatedBooking,
    });
  } catch (error) {
    return sendError(res, error, "Unable to cancel booking.");
  }
});

// GET /api/bookings
// Employees and admins can view all bookings.
router.get("/", protect, authorize("employee", "admin"), async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("room", "name type image price capacity amenities")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return sendError(res, error, "Unable to fetch bookings.");
  }
});

// PUT /api/bookings/:id/status
// Employees/admins can make only the allowed status transitions.
router.put(
  "/:id/status",
  protect,
  authorize("employee", "admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { bookingStatus } = req.body;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          message: "Invalid booking ID.",
        });
      }

      if (!ALLOWED_STATUSES.includes(bookingStatus)) {
        return res.status(400).json({
          message: "Invalid booking status.",
          allowedStatuses: ALLOWED_STATUSES,
        });
      }

      const initialBooking = await Booking.findById(id).select(
        "_id room date"
      );

      if (!initialBooking) {
        return res.status(404).json({
          message: "Booking not found.",
        });
      }

      const dateKey = getDateKey(initialBooking.date);

      const updatedBooking = await withRoomDayLock(
        initialBooking.room,
        dateKey,
        async (session) => {
          const booking = await Booking.findById(id).session(session);

          if (!booking) {
            throw createRouteError(404, "Booking not found.");
          }

          if (
            !canTransitionStatus(booking.bookingStatus, bookingStatus)
          ) {
            throw createRouteError(
              400,
              `Cannot change booking status from "${booking.bookingStatus}" to "${bookingStatus}".`
            );
          }

          if (bookingStatus === "confirmed") {
            const room = await Room.findById(booking.room).session(session);

            if (!room || !room.available) {
              throw createRouteError(
                400,
                "This room or hall is currently unavailable."
              );
            }

            if (booking.guests > room.capacity) {
              throw createRouteError(
                400,
                `Guest count exceeds the capacity of ${room.capacity}.`
              );
            }

            if (
              await hasBookingConflict({
                roomId: booking.room,
                dateKey,
                startTime: booking.startTime,
                endTime: booking.endTime,
                excludeBookingId: booking._id,
                session,
              })
            ) {
              throw createRouteError(
                409,
                "This booking overlaps with another active booking and cannot be confirmed."
              );
            }
          }

          booking.bookingStatus = bookingStatus;
          await booking.save({ session });

          return booking;
        }
      );

      const populatedBooking = await Booking.findById(updatedBooking._id)
        .populate("user", "name email")
        .populate("room", "name type image price capacity amenities");

      return res.status(200).json({
        message: "Booking status updated successfully.",
        booking: populatedBooking,
      });
    } catch (error) {
      return sendError(res, error, "Unable to update booking status.");
    }
  }
);

module.exports = router;
