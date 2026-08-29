const mongoose = require("mongoose");
require("dotenv").config();
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const Food = require("./models/Food");

const foods = [
  {
    name: "Butter Chicken",
    description: "Rich and creamy Indian chicken curry.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    rating: 4.5,
    price: 769,
    discountedPrice: 538,
    discountPercentage: 30,
    type: "dish",
    category: "Indian"
  },

  {
    name: "Chicken Biryani",
    description: "Aromatic rice with spices.",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
    rating: 4.8,
    price: 899,
    discountedPrice: 699,
    discountPercentage: 22,
    type: "cuisine",
    category: "Indian"
  },

  {
    name: "Paneer Butter Masala",
    description: "Creamy paneer curry.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
    rating: 4.2,
    price: 599,
    discountedPrice: 449,
    discountPercentage: 25,
    type: "dish",
    category: "Indian"
  },

  {
    name: "Hakka Noodles",
    description: "Stir-fried noodles.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
    rating: 4.1,
    price: 499,
    discountedPrice: 349,
    discountPercentage: 30,
    type: "dish",
    category: "Chinese"
  },

  {
    name: "Margherita Pizza",
    description: "Classic Italian pizza.",
    image: "https://images.unsplash.com/photo-1646257103650-caf1b386d81d",
    rating: 4.4,
    price: 799,
    discountedPrice: 599,
    discountPercentage: 25,
    type: "dish",
    category: "Italian"
  },

  {
    name: "French Fries",
    description: "Crispy golden fries.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5",
    rating: 4.1,
    price: 199,
    discountedPrice: 149,
    discountPercentage: 25,
    type: "dish",
    category: "Fast Food"
  },

  {
    name: "Cold Coffee",
    description: "Chilled creamy coffee.",
    image: "https://images.unsplash.com/photo-1625242662167-9ba73d268139",
    rating: 4.6,
    price: 199,
    discountedPrice: 149,
    discountPercentage: 25,
    type: "beverage",
    category: "Drinks"
  }
];

const seedDatabase = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Food.deleteMany();

    await Food.insertMany(foods);

    console.log("Food data inserted successfully");

    await mongoose.connection.close();

  } catch (error) {

    console.log(error);

  }
};

seedDatabase();