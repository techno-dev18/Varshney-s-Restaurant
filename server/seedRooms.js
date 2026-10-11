
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const connectDB = require("./config/db");
const Room = require("./models/Room");

// Add your 50 RHdata objects to this array.
// For this script, load the data from a shared JSON file instead.
const rooms = require("./data/rooms");

const seedRooms = async () => {
  try {
    await connectDB();

    const formattedRooms = rooms.map((item) => ({
      name: item.name,
      type: item.category === "Hall" ? "Hall" : item.type,
      description: item.description || "",
      image: item.image || "",
      price: Number(item.price),
      capacity: Number(
        item.capacity ||
        (item.category === "Hall" ? 200 : 2)
      ),
      amenities: item.amenities || [],
      available: true,
    }));

    // Avoid inserting duplicates when the script is run again.
    for (const room of formattedRooms) {
      await Room.updateOne(
        { name: room.name },
        { $set: room },
        { upsert: true, runValidators: true }
      );
    }

    console.log(
      `Successfully seeded ${formattedRooms.length} rooms and halls.`
    );
  } catch (error) {
    console.error("Seeding rooms failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedRooms();

