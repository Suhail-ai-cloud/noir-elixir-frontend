import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProducts } from "../services/products.api";
import { addToCart } from "../services/cart.api";
import LuxToast from "../components/LuxToast/LuxToast";
import "../styles/Section.css";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const imageWrapRef = useRef(null);
  const infoRef = useRef(null);
  const flyRef = useRef(null);
  const stickyRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [adding, setAdding] = useState(false);

  /* =========================
     FETCH PRODUCT ID = 1
  ========================= */
useEffect(() => {
  getProducts().then((data) => {
    if (!data || data.length === 0) return;

    // ✅ Always pick the first available product
    const firstProduct = [...data].sort(
      (a, b) => a.id - b.id
    )[0];

    setProduct(firstProduct);
  });
}, []);


  /* =========================
     GSAP SCROLL ANIMATIONS
  ========================= */
  useEffect(() => {
    if (!product) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 60,
        filter: "blur(10px)",
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      gsap.from(imageWrapRef.current, {
        scale: 1.08,
        y: 80,
        opacity: 0,
        duration: 1.6,
        ease: "power4.out",
        scrollTrigger: {
          trigger: imageWrapRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.from(infoRef.current.children, {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
        stagger: 0.14,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 75%",
          once: true,
        },
      });

      /* STICKY ADD TO BAG */
      gsap.fromTo(
        stickyRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "bottom bottom",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [product]);

  /* =========================
     AUTH CHECK
  ========================= */
  const requireAuth = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return false;
    }
    return true;
  };

  /* =========================
     ADD TO BAG HANDLER
  ========================= */
  const handleAddToBag = async () => {
    if (!requireAuth()) return;
    if (!product || adding) return;

    setAdding(true);

    try {
      await addToCart(product.id);

      /* 🔔 LUXURY TOAST */
      setToast({ type: "success", message: "Added to bag" });

      /* ===== FLY TO BAG ANIMATION ===== */
      const button = document.querySelector(".btn-secondary");
      const bagIcon = document.getElementById("nav-bag-icon");
      const flyEl = flyRef.current;

      if (!button || !bagIcon || !flyEl) return;

      const btnRect = button.getBoundingClientRect();
      const bagRect = bagIcon.getBoundingClientRect();

      gsap.set(flyEl, {
        x: btnRect.left + btnRect.width / 2,
        y: btnRect.top + btnRect.height / 2,
        scale: 0.6,
        opacity: 1,
      });

      gsap.fromTo(
        button,
        { scale: 1 },
        { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1 }
      );

      gsap.to(flyEl, {
        x: bagRect.left + bagRect.width / 2,
        y: bagRect.top + bagRect.height / 2,
        scale: 0.15,
        opacity: 0,
        duration: 0.9,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.fromTo(
            bagIcon,
            { scale: 1 },
            { scale: 1.15, duration: 0.25, yoyo: true, repeat: 1 }
          );
        },
      });
    } catch {
      setToast({ type: "error", message: "Could not add to bag" });
    } finally {
      setAdding(false);
    }
  };

  if (!product) return null;

  return (
    <>
      <section ref={sectionRef} className="module product">
        {/* SECTION HEADER */}
        <div ref={headerRef} className="product-header">
          <h1 className="page-title">Our Signature Creation</h1>
          <p className="page-subtitle">
            A study in depth, restraint, and lasting presence.
          </p>
        </div>

        {/* CONTENT */}
        <div className="module-inner product-inner">
          {/* IMAGE */}
          <div ref={imageWrapRef} className="product-image-wrap">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <p className="product-name-caption">{product.name}</p>
          </div>

          {/* INFO */}
          <div ref={infoRef} className="product-info">
            <h2 className="product-title">
              {product.concentration || "Eau de Parfum"}
            </h2>

            <p className="product-description">
              {product.description}
            </p>

            <div className="product-price">
              ₹{product.starting_price}
            </div>

            <div className="product-actions">
              <button
                className="btn-secondary"
                onClick={handleAddToBag}
                disabled={adding}
              >
                {adding ? "Adding…" : "Add to Bag"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY ADD TO BAG */}
      <div ref={stickyRef} className="sticky-add">
        <span>{product.name}</span>
        <button onClick={handleAddToBag} disabled={adding}>
          {adding ? "Adding…" : "Add to Bag"}
        </button>
      </div>

      {/* FLYING GLOW */}
      <div ref={flyRef} className="fly-to-bag" />

      {/* 🔔 LUXURY TOAST */}
      {toast && (
        <LuxToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
