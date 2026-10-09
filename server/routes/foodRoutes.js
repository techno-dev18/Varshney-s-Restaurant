
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Food = require("../models/Food");

// GET all foods
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();

    res.status(200).json(foods);
  } catch (error) {
    console.error("Failed to fetch foods:", error.message);

    res.status(500).json({
      message: "Failed to fetch foods",
    });
  }
});

// GET one food by MongoDB ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID before querying MongoDB
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid food ID",
      });
    }

    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.status(200).json(food);
  } catch (error) {
    console.error("Failed to fetch food:", error.message);

    res.status(500).json({
      message: "Failed to fetch food details",
    });
  }
});

module.exports = router;