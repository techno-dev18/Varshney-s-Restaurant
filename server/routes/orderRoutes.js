const express = require("express");

const Order = require("../models/Order");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

/*
  CREATE ORDER

  Logged-in customer
*/

router.post("/", protect, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      orderType,
      deliveryAddress,
      phone,
      paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item.",
      });
    }

    if (
      totalAmount === undefined ||
      totalAmount < 0
    ) {
      return res.status(400).json({
        message: "Invalid total amount.",
      });
    }

    const order = await Order.create({
      user: req.user.userId,
      items,
      totalAmount,
      orderType,
      deliveryAddress,
      phone,
      paymentMethod,
    });

    res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      message: "Failed to place order.",
    });
  }
});

/*
  GET MY ORDERS

  Logged-in user
*/

router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error("Get My Orders Error:", error);

    res.status(500).json({
      message: "Failed to fetch orders.",
    });
  }
});

/*
  GET SINGLE MY ORDER
*/

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.json(order);
  } catch (error) {
    console.error("Get Order Error:", error);

    res.status(500).json({
      message: "Failed to fetch order.",
    });
  }
});

/*
  CANCEL MY ORDER

  Only before preparation
*/

router.put(
  "/:id/cancel",
  protect,
  async (req, res) => {
    try {
      const order = await Order.findOne({
        _id: req.params.id,
        user: req.user.userId,
      });

      if (!order) {
        return res.status(404).json({
          message: "Order not found.",
        });
      }

      if (
        ![
          "placed",
          "confirmed",
        ].includes(order.orderStatus)
      ) {
        return res.status(400).json({
          message:
            "This order can no longer be cancelled.",
        });
      }

      order.orderStatus = "cancelled";

      await order.save();

      res.json({
        message: "Order cancelled successfully.",
        order,
      });
    } catch (error) {
      console.error("Cancel Order Error:", error);

      res.status(500).json({
        message: "Failed to cancel order.",
      });
    }
  }
);

/*
  GET ALL ORDERS

  Employee/Admin
*/

router.get(
  "/",
  protect,
  authorize("employee", "admin"),
  async (req, res) => {
    try {
      const orders = await Order.find()
        .populate(
          "user",
          "name email phone"
        )
        .sort({
          createdAt: -1,
        });

      res.json(orders);
    } catch (error) {
      console.error("Get All Orders Error:", error);

      res.status(500).json({
        message: "Failed to fetch orders.",
      });
    }
  }
);

/*
  UPDATE ORDER STATUS

  Employee/Admin
*/

router.put(
  "/:id/status",
  protect,
  authorize("employee", "admin"),
  async (req, res) => {
    try {
      const {
        orderStatus,
      } = req.body;

      const allowedStatuses = [
        "placed",
        "confirmed",
        "preparing",
        "ready",
        "out-for-delivery",
        "delivered",
        "cancelled",
      ];

      if (
        !allowedStatuses.includes(orderStatus)
      ) {
        return res.status(400).json({
          message: "Invalid order status.",
        });
      }

      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            orderStatus,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!order) {
        return res.status(404).json({
          message: "Order not found.",
        });
      }

      res.json({
        message: "Order status updated.",
        order,
      });
    } catch (error) {
      console.error(
        "Update Order Status Error:",
        error
      );

      res.status(500).json({
        message: "Failed to update order status.",
      });
    }
  }
);

module.exports = router;