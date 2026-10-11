
const mongoose = require("mongoose");

const bookingLockSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    dateKey: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

bookingLockSchema.index(
  { room: 1, dateKey: 1 },
  { unique: true }
);

module.exports = mongoose.model("BookingLock", bookingLockSchema);
