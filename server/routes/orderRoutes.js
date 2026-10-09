const express = require("express");
const Food = require("../models/Food");
const mongoose = require("mongoose");
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
      orderType = "delivery",
      deliveryAddress = "",
      phone = "",
      paymentMethod = "cash",
    } = req.body;

    const validOrderTypes = ["delivery", "takeaway", "dine-in"];

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Your order must contain at least one item.",
      });
    }

    if (items.length > 50) {
      return res.status(400).json({
        message: "Too many different items in one order.",
      });
    }

    if (!validOrderTypes.includes(orderType)) {
      return res.status(400).json({
        message: "Invalid order type.",
      });
    }

    // Online payments must not be accepted until a payment
    // gateway has been integrated and verified.
    if (paymentMethod !== "cash") {
      return res.status(400).json({
        message: "Only cash payment is currently supported.",
      });
    }

    if (typeof phone !== "string" || !phone.trim()) {
      return res.status(400).json({
        message: "Please provide a contact phone number.",
      });
    }

    if (orderType === "delivery" &&
        (typeof deliveryAddress !== "string" ||
         !deliveryAddress.trim())) {
      return res.status(400).json({
        message: "Please provide your delivery address.",
      });
    }

    // Validate item IDs and quantities before querying MongoDB.
    const requestedItems = [];
    const quantitiesById = new Map();

    for (const item of items) {
      const foodId = item.food || item.foodId;
      const quantity = Number(item.quantity);

      if (!mongoose.isValidObjectId(foodId)) {
        return res.status(400).json({
          message: "An item in your cart has an invalid ID.",
        });
      }

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return res.status(400).json({
          message: "Each item quantity must be between 1 and 99.",
        });
      }

      const id = String(foodId);
      quantitiesById.set(
        id,
        (quantitiesById.get(id) || 0) + quantity
      );
    }

    for (const [foodId, quantity] of quantitiesById) {
      if (quantity > 99) {
        return res.status(400).json({
          message: "The maximum quantity per dish is 99.",
        });
      }

      requestedItems.push({ foodId, quantity });
    }

    const foods = await Food.find({
      _id: { $in: requestedItems.map((item) => item.foodId) },
    });

    if (foods.length !== requestedItems.length) {
      return res.status(400).json({
        message: "One or more selected dishes no longer exist.",
      });
    }

    const foodById = new Map(
      foods.map((food) => [String(food._id), food])
    );

    let totalAmount = 0;

    const orderItems = requestedItems.map(({ foodId, quantity }) => {
      const food = foodById.get(foodId);

      const regularPrice = Number(food.price);
      const discountedPrice = Number(food.discountedPrice);
      const price =
        Number.isFinite(discountedPrice) && discountedPrice > 0
          ? discountedPrice
          : regularPrice;

      if (!Number.isFinite(price) || price < 0) {
        throw new Error(`Invalid price for food item ${foodId}`);
      }

      totalAmount += price * quantity;

      return {
        food: food._id,
        name: food.name,
        price,
        quantity,
        image: food.image || food.imgUrl || "",
      };
    });

    const order = await Order.create({
      user: req.user.userId,
      items: orderItems,
      totalAmount: Number(totalAmount.toFixed(2)),
      orderType,
      deliveryAddress:
        orderType === "delivery" ? deliveryAddress.trim() : "",
      phone: phone.trim(),
      paymentMethod: "cash",
      paymentStatus: "pending",
      orderStatus: "placed",
    });

    return res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error.message);

    return res.status(500).json({
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