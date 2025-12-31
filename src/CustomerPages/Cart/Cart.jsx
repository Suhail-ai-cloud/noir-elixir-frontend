import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateCart,
  removeFromCart,
} from "../../services/cart.api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Cart.css";

gsap.registerPlugin(ScrollTrigger);

export default function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  /* GSAP refs */
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);
  const summaryRef = useRef(null);
  const emptyRef = useRef(null);

  useEffect(() => {
    getCart().then(setCart).catch(console.error);
  }, []);

  /* =========================
     GSAP SCROLL ANIMATION
  ========================= */

  useEffect(() => {
    if (!cart) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
      });

      // EMPTY CART
      if (cart.items.length === 0 && emptyRef.current) {
        tl.from(
          emptyRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      // ITEMS
      if (cart.items.length > 0 && itemsRef.current.length) {
        tl.from(
          itemsRef.current,
          {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      // SUMMARY
      if (cart.items.length > 0 && summaryRef.current) {
        tl.from(
          summaryRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [cart]);

  if (!cart) return <div className="cart-loading">Loading cart…</div>;

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <section ref={sectionRef} className="cart-wrapper">
      <h1 ref={titleRef}>Your Cart</h1>

      {/* =====================
          EMPTY STATE
      ===================== */}
      {cart.items.length === 0 && (
        <div ref={emptyRef} className="cart-empty-state">
          <h2>Your cart is empty</h2>
          <p>
            Discover our signature fragrances and add them to your collection.
          </p>

          <button
            className="cart-empty-btn"
            onClick={() => navigate("/products")}
          >
            Explore Collection
          </button>
        </div>
      )}

      {/* =====================
          CART ITEMS
      ===================== */}
      {cart.items.length > 0 && (
        <>
          <div className="cart-list">
            {cart.items.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[index] = el)}
                className="cart-item"
              >
                {/* IMAGE */}
                <div className="cart-image">
                  <img
                    src={item.product_image || "/placeholder-perfume.jpg"}
                    alt={item.product_name}
                  />
                </div>

                {/* INFO */}
                <div className="cart-info">
                  <h3>{item.product_name}</h3>
                  <p>{item.size_ml} ml</p>
                  <p className="cart-price">₹{item.price}</p>
                </div>

                {/* QTY */}
                <div className="cart-qty">
                  <button
                    onClick={() =>
                      updateCart(item.id, Math.max(1, item.quantity - 1))
                        .then(getCart)
                        .then(setCart)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateCart(
                        item.id,
                        Math.min(item.quantity + 1, item.stock)
                      )
                        .then(getCart)
                        .then(setCart)
                    }
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  className="cart-remove"
                  onClick={() =>
                    removeFromCart(item.id)
                      .then(getCart)
                      .then(setCart)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div ref={summaryRef} className="cart-summary">
            <h2>Total: ₹{totalAmount.toFixed(2)}</h2>

            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/checkout", { state: { source: "cart" } })
              }
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
