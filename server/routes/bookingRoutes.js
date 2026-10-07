const express = require("express");

const Booking = require("../models/Booking");
const Room = require("../models/Room");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

/*
  CREATE BOOKING

  Logged-in customer
*/

router.post("/", protect, async (req, res) => {
  try {
    const {
      room,
      bookingType,
      date,
      startTime,
      endTime,
      guests,
      specialRequest,
      totalAmount,
    } = req.body;

    if (
      !room ||
      !bookingType ||
      !date ||
      !startTime ||
      !endTime ||
      !guests ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        message: "All booking fields are required.",
      });
    }

    const roomData = await Room.findById(room);

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

    if (guests > roomData.capacity) {
      return res.status(400).json({
        message: `Maximum capacity is ${roomData.capacity} guests.`,
      });
    }

    /*
      Check for an existing active booking
      for the same room and date.
    */

    const existingBooking =
      await Booking.findOne({
        room,
        date: new Date(date),
        bookingStatus: {
          $in: [
            "pending",
            "confirmed",
          ],
        },
      });

    if (existingBooking) {
      return res.status(400).json({
        message:
          "This room or hall is already booked for this date.",
      });
    }

    const booking =
      await Booking.create({
        user: req.user.userId,
        room,
        bookingType,
        date,
        startTime,
        endTime,
        guests,
        specialRequest,
        totalAmount,
      });

    res.status(201).json({
      message: "Booking request created successfully.",
      booking,
    });
  } catch (error) {
    console.error(
      "Create Booking Error:",
      error
    );

    res.status(500).json({
      message: "Failed to create booking.",
    });
  }
});

/*
  GET MY BOOKINGS
*/

router.get("/my", protect, async (req, res) => {
  try {
    const bookings =
      await Booking.find({
        user: req.user.userId,
      })
        .populate(
          "room",
          "name type image price"
        )
        .sort({
          createdAt: -1,
        });

    res.json(bookings);
  } catch (error) {
    console.error(
      "Get My Bookings Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch bookings.",
    });
  }
});

/*
  GET SINGLE MY BOOKING
*/

router.get(
  "/:id",
  protect,
  async (req, res) => {
    try {
      const booking =
        await Booking.findOne({
          _id: req.params.id,
          user: req.user.userId,
        }).populate(
          "room",
          "name type image price capacity amenities"
        );

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found.",
        });
      }

      res.json(booking);
    } catch (error) {
      console.error(
        "Get Booking Error:",
        error
      );

      res.status(500).json({
        message: "Failed to fetch booking.",
      });
    }
  }
);

/*
  CANCEL MY BOOKING
*/

router.put(
  "/:id/cancel",
  protect,
  async (req, res) => {
    try {
      const booking =
        await Booking.findOne({
          _id: req.params.id,
          user: req.user.userId,
        });

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found.",
        });
      }

      if (
        ![
          "pending",
          "confirmed",
        ].includes(
          booking.bookingStatus
        )
      ) {
        return res.status(400).json({
          message:
            "This booking can no longer be cancelled.",
        });
      }

      booking.bookingStatus =
        "cancelled";

      await booking.save();

      res.json({
        message:
          "Booking cancelled successfully.",
        booking,
      });
    } catch (error) {
      console.error(
        "Cancel Booking Error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to cancel booking.",
      });
    }
  }
);

/*
  GET ALL BOOKINGS

  Employee/Admin
*/

router.get(
  "/",
  protect,
  authorize("employee", "admin"),
  async (req, res) => {
    try {
      const bookings =
        await Booking.find()
          .populate(
            "user",
            "name email phone"
          )
          .populate(
            "room",
            "name type price"
          )
          .sort({
            createdAt: -1,
          });

      res.json(bookings);
    } catch (error) {
      console.error(
        "Get All Bookings Error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch bookings.",
      });
    }
  }
);

/*
  UPDATE BOOKING STATUS

  Employee/Admin
*/

router.put(
  "/:id/status",
  protect,
  authorize("employee", "admin"),
  async (req, res) => {
    try {
      const {
        bookingStatus,
      } = req.body;

      const allowedStatuses = [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
      ];

      if (
        !allowedStatuses.includes(
          bookingStatus
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid booking status.",
        });
      }

      const booking =
        await Booking.findByIdAndUpdate(
          req.params.id,
          {
            bookingStatus,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found.",
        });
      }

      res.json({
        message:
          "Booking status updated.",
        booking,
      });
    } catch (error) {
      console.error(
        "Update Booking Status Error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to update booking status.",
      });
    }
  }
);

module.exports = router;