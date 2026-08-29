const express = require("express");
const router = express.Router();

const Food = require("../models/Food");
router.get("/", async (req, res) => {
  try {

    const foods = await Food.find();

    res.status(200).json(foods);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch foods"
    });

  }
});

module.exports = router;