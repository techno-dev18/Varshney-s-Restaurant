const FMdata = [
  {
    id: 1,
    name: "Butter Chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80",
    description: "Rich and creamy Indian chicken curry.",
    category: "Indian Main Course",
    type: "Non-Veg",
    rating: 4.5,
    price: 769,
    discountedPrice: 538,
    discountPercentage: 30,
  },

  {
    id: 2,
    name: "Chicken Biryani",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=300&q=80",
    description: "Aromatic rice with spices.",
    category: "Biryani & Rice",
    type: "Non-Veg",
    rating: 4.8,
    price: 899,
    discountedPrice: 699,
    discountPercentage: 22,
  },

  {
    id: 3,
    name: "Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80",
    description: "Creamy paneer curry.",
    category: "Indian Main Course",
    type: "Veg",
    rating: 4.2,
    price: 599,
    discountedPrice: 449,
    discountPercentage: 25,
  },

  {
    id: 4,
    name: "Dal Tadka",
    image: "https://images.unsplash.com/photo-1626500155537-93690c24099e?auto=format&fit=crop&w=300&q=80",
    description: "Spiced lentil dish.",
    category: "Indian Main Course",
    type: "Veg",
    rating: 3.9,
    price: 499,
    discountedPrice: 349,
    discountPercentage: 30,
  },

  {
    id: 5,
    name: "Butter Naan",
    image:
      "https://images.unsplash.com/photo-1756821753151-0879e7862e50?auto=format&fit=crop&w=300&q=80",
    description: "Soft Indian bread.",
    category: "Indian Main Course",
    type: "Veg",
    rating: 3.7,
    price: 150,
    discountedPrice: 112,
    discountPercentage: 25,
  },

  {
    id: 6,
    name: "Hakka Noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80",
    description: "Stir-fried noodles.",
    category: "Chinese Cuisine",
    type: "Veg",
    rating: 4.1,
    price: 499,
    discountedPrice: 349,
    discountPercentage: 30,
  },

  {
    id: 7,
    name: "Fried Rice",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=80",
    description: "Rice with vegetables.",
    category: "Chinese Cuisine",
    type: "Veg",
    rating: 4.0,
    price: 399,
    discountedPrice: 299,
    discountPercentage: 25,
  },

  {
    id: 8,
    name: "Spring Rolls",
    image:
      "https://images.unsplash.com/photo-1623253083987-26681ce4a992?auto=format&fit=crop&w=300&q=80",
    description: "Crispy spring rolls.",
    category: "Starters",
    type: "Veg",
    rating: 3.8,
    price: 299,
    discountedPrice: 199,
    discountPercentage: 33,
  },

  {
    id: 9,
    name: "Sweet Corn",
    image:
      "https://images.unsplash.com/photo-1774428755120-e1b2d2f208fe?auto=format&fit=crop&w=300&q=80",
    description: "Boiled corn tossed with spices.",
    category: "Starters",
    type: "Veg",
    rating: 4.1,
    price: 399,
    discountedPrice: 299,
    discountPercentage: 25,
  },

  {
    id: 10,
    name: "Dimsum",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=300&q=80",
    description: "Steamed dumplings.",
    category: "Chinese Cuisine",
    type: "Non-Veg",
    rating: 4.6,
    price: 699,
    discountedPrice: 499,
    discountPercentage: 28,
  },

  {
    id: 11,
    name: "Margherita Pizza",
    image:
      "https://images.unsplash.com/photo-1646257103650-caf1b386d81d?auto=format&fit=crop&w=300&q=80",
    description: "Classic cheese pizza.",
    category: "Italian Cuisine",
    type: "Veg",
    rating: 4.4,
    price: 799,
    discountedPrice: 599,
    discountPercentage: 25,
  },

  {
    id: 12,
    name: "White Sauce Pasta",
    image:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=300&q=80",
    description: "Creamy white sauce pasta.",
    category: "Italian Cuisine",
    type: "Veg",
    rating: 4.2,
    price: 699,
    discountedPrice: 499,
    discountPercentage: 28,
  },

  {
    id: 13,
    name: "Lasagna",
    image:
      "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=300&q=80",
    description: "Layered pasta with cheese.",
    category: "Italian Cuisine",
    type: "Veg",
    rating: 4.7,
    price: 699,
    discountedPrice: 525,
    discountPercentage: 25,
  },

  {
    id: 14,
    name: "Risotto",
    image:
      "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?auto=format&fit=crop&w=300&q=80",
    description: "Creamy Italian rice.",
    category: "Italian Cuisine",
    type: "Veg",
    rating: 3.9,
    price: 899,
    discountedPrice: 699,
    discountPercentage: 22,
  },

  {
    id: 15,
    name: "Bruschetta",
    image:
      "https://images.unsplash.com/photo-1572695157360-1153aaad020b?auto=format&fit=crop&w=300&q=80",
    description: "Toasted bread with toppings.",
    category: "Starters",
    type: "Veg",
    rating: 3.6,
    price: 399,
    discountedPrice: 299,
    discountPercentage: 25,
  },

  {
    id: 16,
    name: "Veg Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80",
    description: "Crispy veg burger.",
    category: "Fast Food",
    type: "Veg",
    rating: 3.9,
    price: 299,
    discountedPrice: 199,
    discountPercentage: 33,
  },

  {
    id: 17,
    name: "French Fries",
    image:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=300&q=80",
    description: "Golden crispy fries.",
    category: "Fast Food",
    type: "Veg",
    rating: 4.1,
    price: 199,
    discountedPrice: 149,
    discountPercentage: 25,
  },

  {
    id: 18,
    name: "Hot Dog",
    image:
      "https://plus.unsplash.com/premium_photo-1731060034920-6c10381d7731?auto=format&fit=crop&w=300&q=80",
    description: "Grilled hot dog.",
    category: "Fast Food",
    type: "Non-Veg",
    rating: 3.7,
    price: 249,
    discountedPrice: 179,
    discountPercentage: 28,
  },

  {
    id: 19,
    name: "Grilled Sandwich",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300&q=80",
    description: "Toasted grilled sandwich.",
    category: "Fast Food",
    type: "Veg",
    rating: 4.2,
    price: 299,
    discountedPrice: 229,
    discountPercentage: 23,
  },

  {
    id: 20,
    name: "Donuts",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=300&q=80",
    description: "Soft sweet donuts.",
    category: "Desserts",
    type: "Veg",
    rating: 4.5,
    price: 399,
    discountedPrice: 299,
    discountPercentage: 25,
  },

  {
    id: 21,
    name: "Green Salad",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
    description: "Fresh green salad.",
    category: "Starters",
    type: "Veg",
    rating: 4.3,
    price: 399,
    discountedPrice: 299,
    discountPercentage: 25,
  },

  {
    id: 22,
    name: "Fruit Smoothie",
    image:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=300&q=80",
    description: "Healthy fruit smoothie.",
    category: "Beverages",
    type: "Veg",
    rating: 4.6,
    price: 299,
    discountedPrice: 229,
    discountPercentage: 23,
  },

  {
    id: 23,
    name: "Oats Bowl",
    image:
      "https://images.unsplash.com/photo-1501432781167-c0ccfd492297?auto=format&fit=crop&w=300&q=80",
    description: "Nutritious oats bowl.",
    category: "Breakfast",
    type: "Veg",
    rating: 3.8,
    price: 249,
    discountedPrice: 179,
    discountPercentage: 28,
  },

  {
    id: 24,
    name: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=300&q=80",
    description: "Healthy avocado toast.",
    category: "Breakfast",
    type: "Veg",
    rating: 4.1,
    price: 349,
    discountedPrice: 269,
    discountPercentage: 23,
  },

  {
    id: 25,
    name: "Quinoa Bowl",
    image:
      "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=300&q=80",
    description: "Protein-rich quinoa bowl.",
    category: "Breakfast",
    type: "Veg",
    rating: 3.9,
    price: 499,
    discountedPrice: 379,
    discountPercentage: 24,
  },

  {
    id: 26,
    name: "Cold Coffee",
    image:
      "https://images.unsplash.com/photo-1625242662167-9ba73d268139?auto=format&fit=crop&w=300&q=80",
    description: "Refreshing cold coffee.",
    category: "Beverages",
    type: "Veg",
    rating: 4.6,
    price: 199,
    discountedPrice: 149,
    discountPercentage: 25,
  },

  {
    id: 27,
    name: "Orange Juice",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=300&q=80",
    description: "Fresh orange juice.",
    category: "Beverages",
    type: "Veg",
    rating: 4.2,
    price: 149,
    discountedPrice: 109,
    discountPercentage: 27,
  },

  {
    id: 28,
    name: "Lemonade",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80",
    description: "Refreshing lemonade.",
    category: "Beverages",
    type: "Veg",
    rating: 3.7,
    price: 99,
    discountedPrice: 79,
    discountPercentage: 20,
  },

  {
    id: 29,
    name: "Milkshake",
    image:
      "https://images.unsplash.com/photo-1568901839119-631418a3910d?auto=format&fit=crop&w=300&q=80",
    description: "Creamy milkshake.",
    category: "Beverages",
    type: "Veg",
    rating: 4.4,
    price: 249,
    discountedPrice: 189,
    discountPercentage: 24,
  },

  {
    id: 30,
    name: "Masala Chai",
    image:
      "https://images.unsplash.com/photo-1625033405953-f20401c7d848?auto=format&fit=crop&w=300&q=80",
    description: "Traditional Indian tea.",
    category: "Beverages",
    type: "Veg",
    rating: 4.8,
    price: 49,
    discountedPrice: 25,
    discountPercentage: 25,
  },
];

export default FMdata;
