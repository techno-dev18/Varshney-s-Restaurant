const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dns = require("dns");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

    } catch (error) {
        console.log("MongoDB Connection Error:");
        console.log(error.message);
    }
};

module.exports = connectDB;