
import "./Css/Home.css";
import "./Css/Theme.css";
import "./Css/AboutUs.css";
import "./Css/Login.css";
import "./Css/Signup.css";
import "./Css/RoomHall.css";
import "./Css/FoodDetails.css";
import BookingDetails from "./pages/BookingDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyOrders from "./pages/MyOrders";
import MyBookings from "./pages/MyBookings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FoodMenu from "./pages/FoodMenu";
import FoodDetails from "./pages/FoodDetails";
import RoomHall from "./pages/RoomHall";
import Cart from "./pages/Cart";

import { CartProvider } from "./components/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
<Route path="/orders" element={<MyOrders />} />
          <Route path="/foodmenu" element={<FoodMenu />} />
          <Route path="/food/:id" element={<FoodDetails />} />
<Route path="/checkout" element={<Checkout />} />
<Route path="/bookings/:id" element={<BookingDetails />} />
<Route path="/bookings" element={<MyBookings />} />
          <Route path="/rooms" element={<RoomHall />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;