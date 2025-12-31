import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment, verifyPayment } from "../../services/payments.api";
import gsap from "gsap";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const screenRef = useRef(null);

  /* =========================
    _attache subtle GSAP fade
  ========================= */

  useEffect(() => {
    gsap.fromTo(
      screenRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    if (!state?.order_id) {
      navigate("/");
      return;
    }

    async function startPayment() {
      try {
        const res = await createPayment(state.order_id);

        const options = {
          key: res.data.razorpay_key,
          amount: res.data.amount,
          currency: "INR",
          name: "Noir Élixir",
          description: "Luxury Perfume Purchase",
          order_id: res.data.razorpay_order_id,

          handler: async (response) => {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            navigate("/order-success");
          },

          modal: {
            ondismiss: () => {
              navigate("/checkout");
            },
          },

          theme: { color: "#000" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error(err);
        alert("Payment initialization failed");
        navigate("/checkout");
      }
    }

    startPayment();
  }, [state, navigate]);

  return (
    <div
      ref={screenRef}
      style={{
        minHeight: "100vh",
        paddingTop: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#555",
        textAlign: "center",
      }}
    >
      <div>
        <h2 style={{ fontWeight: 500, marginBottom: 12 }}>
          Redirecting to secure payment
        </h2>
        <p style={{ fontSize: 14 }}>
          Please don’t refresh or close this window
        </p>
      </div>
    </div>
  );
}
