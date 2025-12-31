import { useEffect, useState, useRef } from "react";
import { getMyOrders } from "../../services/orders.api";
import {
  FiX,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";
import gsap from "gsap";
import "./MyOrders.css";

/* =====================
   ORDER TIMELINE
===================== */
function OrderTimeline({ status }) {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    gsap.fromTo(
      timelineRef.current.children,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power3.out",
      }
    );
  }, []);

  const steps = ["paid", "shipped", "delivered"];

  const getState = (step) => {
    if (steps.indexOf(step) < steps.indexOf(status)) return "done";
    if (step === status) return "active";
    return "upcoming";
  };

  return (
    <div className="lux-timeline" ref={timelineRef}>
      {steps.map((step, index) => (
        <div
          key={step}
          className={`lux-timeline-step ${getState(step)}`}
        >
          <div className="lux-dot" />
          <span className="lux-label">
            {step.charAt(0).toUpperCase() + step.slice(1)}
          </span>
          {index < steps.length - 1 && <div className="lux-line" />}
        </div>
      ))}
    </div>
  );
}

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Only PAID / SHIPPED / DELIVERED
  const visibleOrders = orders.filter(
    (order) =>
      order.status === "paid" ||
      order.status === "shipped" ||
      order.status === "delivered"
  );

  if (loading) {
    return <div className="lux-loading">Loading your collection…</div>;
  }

  return (
    <section className="lux-orders">
      <header className="lux-header">
        <h1>Your Collection</h1>
        <p>Fragrances you’ve chosen</p>
      </header>

      {/* EMPTY STATE */}
      {visibleOrders.length === 0 ? (
        <div className="lux-empty">
          <h2>No orders yet</h2>
          <p>
            Your purchased fragrances will appear here once payment is completed.
          </p>
        </div>
      ) : (
        <div className="lux-product-grid">
          {visibleOrders.map((order) =>
            order.items.map((item, index) => (
              <article
                key={`${order.id}-${index}`}
                className="lux-product-card"
                onClick={() => setActiveItem({ ...item, order })}
              >
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="lux-product-image"
                />

                <div className="lux-product-info">
                  <h3>{item.product_name}</h3>
                  <p className="lux-sub">
                    Eau de Parfum · Qty {item.quantity}
                  </p>

                  <span className="lux-status-text">
                    {order.status === "paid" && (
                      <>
                        <FiCheckCircle /> Paid
                      </>
                    )}
                    {order.status === "shipped" && (
                      <>
                        <FiTruck /> Shipped
                      </>
                    )}
                    {order.status === "delivered" && "Delivered"}
                  </span>

                  <span className="lux-price">₹{item.price}</span>
                </div>
              </article>
            ))
          )}
        </div>
      )}

      {/* DETAIL SHEET */}
      {activeItem && (
        <div className="lux-sheet-overlay">
          <div className="lux-sheet">
            <button
              className="lux-close"
              onClick={() => setActiveItem(null)}
            >
              <FiX />
            </button>

            <img
              src={activeItem.product_image}
              alt={activeItem.product_name}
              className="lux-sheet-image"
            />

            <div className="lux-sheet-content">
              <h2>{activeItem.product_name}</h2>

              {/* TIMELINE */}
              <OrderTimeline status={activeItem.order.status} />

              <p className="lux-sheet-sub">Eau de Parfum</p>

              <div className="lux-sheet-row">
                <span>Quantity</span>
                <span>{activeItem.quantity}</span>
              </div>

              <div className="lux-sheet-row">
                <span>Price</span>
                <span>₹{activeItem.price}</span>
              </div>

              <div className="lux-sheet-row">
                <span>Order Date</span>
                <span>
                  {new Date(
                    activeItem.order.created_at
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="lux-sheet-total">
                Total — ₹{activeItem.order.total_amount}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
