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
const app = express();

// DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
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