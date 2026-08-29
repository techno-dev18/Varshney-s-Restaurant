const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const connectDB = require("./config/db");
const dns = require("dns");
dns.setServers(["8.8.8.8","1.1.1.1"]);
const foodRoutes = require("./routes/foodRoutes");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:");
    console.log(error.message);
  });


// Routes

app.use("/api/foods", foodRoutes);


// Test route

app.get("/", (req, res) => {
  res.send("Varshney Restaurant API Running");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


