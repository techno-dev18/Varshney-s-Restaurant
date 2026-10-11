
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    bookingType: {
      type: String,
      enum: ["room", "hall"],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    specialRequest: {
      type: String,
      default: "",
      maxlength: 1000,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Helps queries that check room availability for a date and status.
// This index does not replace the booking-lock transaction.
bookingSchema.index({
  room: 1,
  date: 1,
  bookingStatus: 1,
});

module.exports = mongoose.model("Booking", bookingSchema);
