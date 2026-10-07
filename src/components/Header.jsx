import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaShoppingCart,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

import logo from "../imgRes/123.png";
import { useCart } from "./CartContext";
import "../Css/Header.css";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/foodmenu", label: "Food Menu" },
  { to: "/rooms", label: "Rooms & Halls" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Header() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const accountRef = useRef(null);

  /* =====================================================
     LOAD LOGGED-IN USER
     ===================================================== */

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  /* =====================================================
     HEADER SCROLL EFFECT
     ===================================================== */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* =====================================================
     CLOSE DROPDOWN / MENU
     ===================================================== */

  useEffect(() => {
    const onMouseDown = (event) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setAccountOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setAccountOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  /* =====================================================
     CLOSE MENUS
     ===================================================== */

  const closeMenus = () => {
    setMenuOpen(false);
    setAccountOpen(false);
  };

  /* =====================================================
     LOGOUT
     ===================================================== */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setAccountOpen(false);
    setMenuOpen(false);

    navigate("/");
  };

  /* =====================================================
     CART COUNT
     ===================================================== */

  const cartCount = cartItems.length;

  /* =====================================================
     USER NAME
     ===================================================== */

  const userName = user?.name || "User";

  return (
    <header
      className={`vh-header${scrolled ? " is-scrolled" : ""}`}
    >
      <div className="vh-inner">

        {/* =================================================
            BRAND
            ================================================= */}

        <Link
          to="/"
          className="vh-brand"
          onClick={closeMenus}
          aria-label="Varshney's Restaurant, home"
        >
          <img
            src={logo}
            alt="Varshney's Restaurant"
            className="vh-logo"
          />

          <span className="vh-wordmark">
            <span className="vh-name">
              Varshney's
            </span>

            <span className="vh-sub">
              Restaurant
            </span>
          </span>
        </Link>

        {/* =================================================
            NAVIGATION
            ================================================= */}

        <nav
          id="primary-nav"
          className={`vh-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={closeMenus}
              className={({ isActive }) =>
                `vh-link${isActive ? " is-active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* =================================================
            ACTIONS
            ================================================= */}

        <div className="vh-actions">

          {/* CART */}

          <Link
            to="/cart"
            className="vh-icon-btn"
            onClick={closeMenus}
            aria-label={`Cart, ${cartCount} ${
              cartCount === 1 ? "item" : "items"
            }`}
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="vh-badge">
                {cartCount}
              </span>
            )}
          </Link>

          {/* ACCOUNT */}

          <div
            className="vh-account"
            ref={accountRef}
          >
            <button
              type="button"
              className="vh-icon-btn"
              aria-label="Account menu"
              aria-expanded={accountOpen}
              onClick={() =>
                setAccountOpen((open) => !open)
              }
            >
              <FaUserCircle />
            </button>

            {accountOpen && (
              <div className="vh-dropdown">

                {user ? (
                  <>
                    {/* USER INFORMATION */}

                    <div className="vh-user-header">
                      <span className="vh-user-welcome">
                        Welcome
                      </span>

                      <strong>
                        {userName}
                      </strong>

                      {user.email && (
                        <small>
                          {user.email}
                        </small>
                      )}
                    </div>

                    <div className="vh-dropdown-divider"></div>

                    {/* ACCOUNT LINKS */}

                    <Link
                      to="/orders"
                      onClick={closeMenus}
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/bookings"
                      onClick={closeMenus}
                    >
                      My Bookings
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={closeMenus}
                    >
                      Wishlist
                    </Link>

                    <div className="vh-dropdown-divider"></div>

                    {/* LOGOUT */}

                    <button
                      type="button"
                      className="vh-logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {/* GUEST */}

                    <div className="vh-guest-header">
                      <strong>
                        Welcome
                      </strong>

                      <span>
                        Login to access your account
                      </span>
                    </div>

                    <div className="vh-dropdown-divider"></div>

                    <Link
                      to="/login"
                      onClick={closeMenus}
                    >
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      onClick={closeMenus}
                    >
                      Sign Up
                    </Link>
                  </>
                )}

              </div>
            )}
          </div>

          {/* MOBILE MENU */}

          <button
            type="button"
            className="vh-icon-btn vh-toggle"
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-controls="primary-nav"
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((open) => !open)
            }
          >
            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;