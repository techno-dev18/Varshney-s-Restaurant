const express = require("express");

const Room = require("../models/Room");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

/*
  GET ALL AVAILABLE ROOMS / HALLS

  Public
*/

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find({
      available: true,
    }).sort({
      price: 1,
    });

    res.json(rooms);
  } catch (error) {
    console.error("Get Rooms Error:", error);

    res.status(500).json({
      message: "Failed to fetch rooms.",
    });
  }
});

/*
  GET SINGLE ROOM / HALL

  Public
*/

router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(
      req.params.id
    );

    if (!room) {
      return res.status(404).json({
        message: "Room or hall not found.",
      });
    }

    res.json(room);
  } catch (error) {
    console.error("Get Room Error:", error);

    res.status(500).json({
      message: "Failed to fetch room.",
    });
  }
});

/*
  CREATE ROOM / HALL

  Employee/Admin
*/

router.post(
  "/",
  protect,
  authorize("employee", "admin"),
  async (req, res) => {
    try {
      const room = await Room.create(req.body);

      res.status(201).json({
        message: "Room/Hall created successfully.",
        room,
      });
    } catch (error) {
      console.error("Create Room Error:", error);

      res.status(500).json({
        message: "Failed to create room.",
      });
    }
  }
);

/*
  UPDATE ROOM / HALL

  Employee/Admin
*/

router.put(
  "/:id",
  protect,
  authorize("employee", "admin"),
  async (req, res) => {
    try {
      const room = await Room.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!room) {
        return res.status(404).json({
          message: "Room or hall not found.",
        });
      }

      res.json({
        message: "Room/Hall updated successfully.",
        room,
      });
    } catch (error) {
      console.error("Update Room Error:", error);

      res.status(500).json({
        message: "Failed to update room.",
      });
    }
  }
);

/*
  DELETE ROOM / HALL

  Admin only
*/

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const room = await Room.findByIdAndDelete(
        req.params.id
      );

      if (!room) {
        return res.status(404).json({
          message: "Room or hall not found.",
        });
      }

      res.json({
        message: "Room/Hall deleted successfully.",
      });
    } catch (error) {
      console.error("Delete Room Error:", error);

      res.status(500).json({
        message: "Failed to delete room.",
      });
    }
  }
);

module.exports = router;