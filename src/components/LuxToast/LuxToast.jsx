import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import "./LuxToast.css";

export default function LuxToast({ message, type = "success", onClose }) {
  const toastRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      toastRef.current,
      { opacity: 0, y: 24, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power4.out" }
    );

    const timer = setTimeout(() => {
      tl.to(toastRef.current, {
        opacity: 0,
        y: 24,
        filter: "blur(6px)",
        duration: 0.4,
        ease: "power3.in",
        onComplete: onClose,
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div ref={toastRef} className={`lux-toast ${type}`}>
      {message}
    </div>,
    document.body
  );
}
