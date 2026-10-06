const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// ==========================
// REGISTER
// ==========================
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password,
      dob,
      gender,
    } = req.body;

    // Check required fields
    if (!name || !phone || !email || !password || !dob || !gender) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer
    const user = await User.create({
      name,
      phone,
      email: email.toLowerCase(),
      password: hashedPassword,
      dob,
      gender,
      role: "customer",
    });

    res.status(201).json({
      message: "Registration successful",
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
    console.error("Register Error:", error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
});


// ==========================
// LOGIN
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",

      token,

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
    console.error("Login Error:", error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});


module.exports = router;