const express = require("express");

const User = require("../models/User");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

/*
  GET CURRENT USER
*/

router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Get User Error:", error);

    res.status(500).json({
      message: "Failed to get user.",
    });
  }
});

/*
  UPDATE CURRENT USER
*/

router.put("/me", protect, async (req, res) => {
  try {
    const {
      name,
      phone,
      dob,
      gender,
    } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (name !== undefined) {
      user.name = name.trim();
    }

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    if (dob !== undefined) {
      user.dob = dob;
    }

    if (gender !== undefined) {
      user.gender = gender;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        dob: user.dob,
        gender: user.gender,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update User Error:", error);

    res.status(500).json({
      message: "Failed to update profile.",
    });
  }
});

module.exports = router;