import React from 'react'
import { Link } from "react-router-dom";
import logo from "../imgRes/123.png";
import "../Appcss/Header.css";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
function Header() {
  const { cartItems } = useCart();
  return (

    <header className="header">
      <div className="logo">
        <div className="search-box">
    <input
        type="text"
        placeholder="Search for cuisines or dishes..."
    />
    <button className="search-btn">
        Search
    </button>
 
</div>
     <div className="profile-menu">
  <FaUserCircle className="profile-icon" />

  <div className="profile-dropdown">
    <Link to="/login">Login</Link>
    <Link to="/signup">Sign Up</Link>
  </div>
</div>
  
          <nav className="navbar">
            <img 
         src={logo}  
         alt="Varshney Group's Logo"
          height="90 px"
        border-radius="90%"
        />
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT US</Link>
        <Link to="/contact">CONTACT US</Link>
        <Link to="/foodmenu">FOOD MENU</Link>
        {/* <Link to="/menu">MENU</Link> */}
        <Link to="/rooms">ROOMS & HALLS</Link>
        <Link to="/dropdowncard">DROPDOWN CARD</Link>
        <Link to="/cart" className="cart-icon">
  <FaShoppingCart />
  <span>{cartItems.length}</span>
</Link>
        
      </nav>

      
     
 </div>
    
    </header>
  );
}

export default Header;

