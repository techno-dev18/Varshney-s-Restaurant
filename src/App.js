// import logo from './logo.svg';
import './Appcss/Home.css';
import "./Appcss/Theme.css";
import "./Appcss/AboutUs.css";
import "./Appcss/Login.css";
import "./Appcss/Signup.css";
import "./Appcss/RoomHall.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
// import Menu from './pages/Menu';
import FoodMenu from './pages/FoodMenu';
import Login from './pages/Login';
import RoomHall from './pages/RoomHall';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
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
        {/* <Route path="/menu" element={<Menu />} /> */}
        <Route path="/foodmenu" element={<FoodMenu />} />
        <Route path="/rooms" element={<RoomHall />} />
    <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
        </CartProvider>
    </BrowserRouter>
  );
}

export default App;
