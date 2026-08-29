const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    price: {
      type: Number,
      required: true
    },

    discountedPrice: {
      type: Number
    },

    discountPercentage: {
      type: Number,
      default: 0
    },

    type: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Food", foodSchema);