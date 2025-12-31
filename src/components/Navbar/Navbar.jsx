import { Link } from "react-router-dom";
import { FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem("access_token");
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="lux-nav">
        <div className="lux-nav-glass">
          {/* LEFT (Hamburger – mobile only) */}
          <button
            className="lux-menu-btn"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>

          {/* BRAND */}
          <Link to="/" className="lux-brand">
            NOIR
          </Link>

          {/* DESKTOP LINKS */}
          <div className="lux-nav-links">
            <Link to="/products">Products</Link>
            <Link to="/stores">Stores</Link>
            {isLoggedIn && <Link to="/orders">Orders</Link>}
          </div>

          {/* RIGHT ACTION */}
          <div className="lux-nav-actions">
            {!isLoggedIn ? (
              <Link to="/login" className="lux-login-btn">
                Login
              </Link>
            ) : (
              <Link to="/cart" className="lux-icon-btn">
                <FiShoppingBag />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {open && (
        <div className="lux-mobile-menu">
          <button
            className="lux-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <FiX />
          </button>

          <Link to="/products" onClick={() => setOpen(false)}>Shop</Link>
          <Link to="/stores" onClick={() => setOpen(false)}>Stores</Link>
          {isLoggedIn && (
            <Link to="/orders" onClick={() => setOpen(false)}>Orders</Link>
          )}
        </div>
      )}
    </>
  );
}
