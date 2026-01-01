import { Link } from "react-router-dom";
import { FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getCart } from "../../services/cart.api";
import "./Navbar.css";

export default function Navbar() {
  /* =========================
     STATE
  ========================= */
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  /* =========================
     LISTEN LOGIN / LOGOUT
  ========================= */
  useEffect(() => {
    const handleAuthChange = () => {
      const loggedIn = !!localStorage.getItem("access_token");
      setIsLoggedIn(loggedIn);

      if (!loggedIn) {
        setCartCount(0);
      }
    };

    window.addEventListener("auth-changed", handleAuthChange);
    return () =>
      window.removeEventListener("auth-changed", handleAuthChange);
  }, []);

  /* =========================
     FETCH CART AFTER LOGIN
  ========================= */
  useEffect(() => {
    if (!isLoggedIn) return;

    getCart()
      .then((cart) => {
        const count = cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartCount(count);
      })
      .catch(() => setCartCount(0));
  }, [isLoggedIn]);

  /* =========================
     LISTEN CART UPDATES
  ========================= */
  useEffect(() => {
    const updateCartCount = (e) => {
      setCartCount(e.detail);
    };

    window.addEventListener("cart-updated", updateCartCount);
    return () =>
      window.removeEventListener("cart-updated", updateCartCount);
  }, []);

  const displayCount = cartCount > 9 ? "9+" : cartCount;

  return (
    <>
      <nav className="lux-nav">
        <div className="lux-nav-glass">
          {/* LEFT (MOBILE MENU) */}
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
                <FiShoppingBag id="nav-bag-icon" />
                {cartCount > 0 && (
                  <span className="cart-badge">{displayCount}</span>
                )}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="lux-mobile-menu">
          <button
            className="lux-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <FiX />
          </button>

          <Link to="/products" onClick={() => setOpen(false)}>
            Shop
          </Link>
          <Link to="/stores" onClick={() => setOpen(false)}>
            Stores
          </Link>
          {isLoggedIn && (
            <Link to="/orders" onClick={() => setOpen(false)}>
              Orders
            </Link>
          )}
        </div>
      )}
    </>
  );
}
