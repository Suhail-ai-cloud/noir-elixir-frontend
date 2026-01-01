import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lottie from "lottie-react";
import successAnimation from "./assets/happy-autumn-shopping.json";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const navigate = useNavigate();

  // GSAP refs
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const animationRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
          duration: 1.1,
        },
      });

      // Page fade
      tl.from(wrapperRef.current, {
        opacity: 0,
        duration: 0.6,
      });

      // Card rise + blur
      tl.from(cardRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.96,
        filter: "blur(10px)",
      }, "-=0.3");

      // Animation pop
      tl.from(animationRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 0.9,
      }, "-=0.5");

      // Title
      tl.from(titleRef.current, {
        y: 20,
        opacity: 0,
      }, "-=0.4");

      // Text
      tl.from(textRef.current, {
        y: 16,
        opacity: 0,
      }, "-=0.35");

      // Button (final CTA emphasis)
      tl.from(buttonRef.current, {
        y: 14,
        opacity: 0,
        scale: 0.96,
      }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="order-success-wrapper" ref={wrapperRef}>
      <div className="order-success-card" ref={cardRef}>
        {/* ANIMATION */}
        <div
          className="order-success-animation"
          ref={animationRef}
        >
          <Lottie animationData={successAnimation} loop={false} />
        </div>

        {/* CONTENT */}
        <h1 ref={titleRef}>Your order is confirmed</h1>

        <p ref={textRef}>
          Thank you for choosing <strong>Noir Élixir</strong>.
          <br />
          Your fragrance is being prepared with care.
        </p>

        {/* ACTION */}
        <button
          ref={buttonRef}
          className="lux-primary-btn"
          onClick={() => navigate("/orders")}
        >
          View my orders
        </button>
      </div>
    </section>
  );
}
