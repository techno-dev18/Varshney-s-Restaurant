import "./Css/Home.css";
import "./Css/Theme.css";
import "./Css/AboutUs.css";
import "./Css/Login.css";
import "./Css/Signup.css";
import "./Css/RoomHall.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FoodMenu from "./pages/FoodMenu";
import RoomHall from "./pages/RoomHall";
import Cart from "./pages/Cart";

import { CartProvider } from "./components/CartContext";

function App() {
  return (
    <BrowserRouter>

      <CartProvider>

        {/* Header appears on every page */}
        <Header />

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* About */}
          <Route
            path="/about"
            element={<AboutUs />}
          />

          {/* Contact */}
          <Route
            path="/contact"
            element={<ContactUs />}
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* Food */}
          <Route
            path="/foodmenu"
            element={<FoodMenu />}
          />

          {/* Rooms & Halls */}
          <Route
            path="/rooms"
            element={<RoomHall />}
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={<Cart />}
          />

        </Routes>

        {/* Footer appears on every page */}
        <Footer />

      </CartProvider>

    </BrowserRouter>
  );
}

export default App;