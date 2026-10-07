const express = require("express");
const cors = require("cors");
const dns = require("dns");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const connectDB = require("./config/db");
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const orderRoutes = require("./routes/orderRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const app = express();

// DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/bookings", bookingRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("Varshney Restaurant API Running");
});

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

startServer();