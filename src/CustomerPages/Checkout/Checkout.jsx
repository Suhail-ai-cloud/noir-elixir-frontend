import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../services/cart.api";
import api from "../../utils/axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Checkout.css";

gsap.registerPlugin(ScrollTrigger);

export default function Checkout() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showHint, setShowHint] = useState(false);

  /* GSAP refs */
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const addressRef = useRef(null);
  const itemsRef = useRef([]);
  const summaryRef = useRef(null);

  useEffect(() => {
    getCart()
      .then((cart) => {
        if (!cart?.items?.length) {
          navigate("/cart");
          return;
        }
        setItems(cart.items);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  useEffect(() => {
    if (!items.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.from(headerRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          addressRef.current,
          {
            opacity: 0,
            y: 24,
            filter: "blur(6px)",
            duration: 1,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .from(
          itemsRef.current,
          {
            opacity: 0,
            y: 22,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          summaryRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  const totalAmount = items.reduce(
    (sum, i) => sum + Number(i.price) * i.quantity,
    0
  );

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    setShowHint(false);
  };

  const isAddressComplete = Object.values(address).every(
    (field) => field.trim() !== ""
  );

  const canProceed = isAddressComplete && acceptedTerms;

  const handleContinue = async () => {
    if (!canProceed) {
      setShowHint(true);
      return;
    }

    try {
      const res = await api.post("/orders/create/", address);
      navigate("/payment", {
        state: {
          order_id: res.data.id,
          totalAmount: res.data.total_amount,
        },
      });
    } catch {
      setShowHint(true);
    }
  };

  if (loading) {
    return <div className="lux-loading">Preparing checkout…</div>;
  }

  return (
    <section ref={sectionRef} className="lux-checkout">
      <header ref={headerRef} className="lux-checkout-header">
        <h1>Checkout</h1>
        <p>Delivery details & order review</p>
      </header>

      <div className="lux-checkout-grid">
        {/* LEFT */}
        <div>
          {/* ADDRESS */}
          <div ref={addressRef} className="lux-address-card">
            <h2>Delivery address</h2>

            <div className="lux-field">
              <input name="full_name" placeholder="Full name" onChange={handleAddressChange} />
            </div>

            <div className="lux-field">
              <input name="phone" placeholder="Phone number" onChange={handleAddressChange} />
            </div>

            <div className="lux-field">
              <textarea name="address_line" placeholder="Street address" onChange={handleAddressChange} />
            </div>

            <div className="lux-row">
              <input name="city" placeholder="City" onChange={handleAddressChange} />
              <input name="state" placeholder="State" onChange={handleAddressChange} />
            </div>

            <div className="lux-field">
              <input name="pincode" placeholder="Pincode" onChange={handleAddressChange} />
            </div>

            {/* TERMS */}
            <div className="lux-terms">
              <label className="lux-checkbox">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    setShowHint(false);
                  }}
                />
                <span>
                  I agree to the{" "}
                  <a href="/refund-policy" target="_blank" rel="noopener noreferrer">
                    no-refund & no-return policy
                  </a>
                </span>
              </label>
            </div>
          </div>

          {/* ITEMS */}
          <div className="lux-items">
            {items.map((item, i) => (
              <div
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="lux-item-card"
              >
                <div className="lux-image-wrap">
                  <img
                    src={item.product_image || "/placeholder-perfume.jpg"}
                    alt={item.product_name}
                  />
                </div>

                <div className="lux-item-meta">
                  <h3>{item.product_name}</h3>
                  <span>{item.size_ml} ml · Qty {item.quantity}</span>
                </div>

                <div className="lux-item-price">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <aside ref={summaryRef} className="lux-summary">
          <div className="lux-summary-card">
            <h2>Order summary</h2>

            <div className="lux-line">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="lux-line muted">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>

            <div className="lux-divider" />

            <div className="lux-total">
              <span>Total</span>
              <strong>₹{totalAmount.toFixed(2)}</strong>
            </div>

            <button
              className="lux-pay-btn"
              disabled={!canProceed}
              onClick={handleContinue}
            >
              Continue to payment
            </button>

            {showHint && (
              <p className="lux-hint">
                Please complete all delivery details and accept the policy to proceed.
              </p>
            )}

            <p className="lux-secure">Secure & encrypted checkout</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
