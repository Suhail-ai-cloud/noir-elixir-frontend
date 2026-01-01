import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { addToCart } from "../../services/cart.api";
import RefundPolicy from "../RefundPolicy/RefundPolicy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LuxToast from "../../components/LuxToast/LuxToast";
import "./ProductDetail.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(null);

  /* 🔔 TOAST STATE */
  const [toast, setToast] = useState(null);
  const [adding, setAdding] = useState(false);

  /* GSAP refs */
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const thumbsRef = useRef([]);
  const infoRef = useRef([]);

  /* =========================
     FETCH PRODUCT
  ========================= */
  useEffect(() => {
    api
      .get(`/products/${slug}/`)
      .then((res) => {
        setProduct(res.data);

        if (res.data.variants?.length) {
          setSelectedVariant(res.data.variants[0]);
        }

        if (res.data.images?.length) {
          setActiveImage(res.data.images[0].image);
        }
      })
      .catch(console.error);
  }, [slug]);

  /* =========================
     GSAP SCROLL ANIMATION
  ========================= */
  useEffect(() => {
    if (!product) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.from(imageRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
        duration: 1.3,
        ease: "power4.out",
      })
        .from(
          thumbsRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          infoRef.current,
          {
            opacity: 0,
            y: 30,
            filter: "blur(6px)",
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [product]);

  if (!product || !selectedVariant) {
    return <div className="pd-loading">Loading…</div>;
  }

  const unitPrice = Number(selectedVariant.price);
  const totalPrice = unitPrice * quantity;

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

  setAdding(true);

  try {
    await addToCart(selectedVariant.id, quantity);
    setToast({ type: "success", message: "Added to bag" });
  } catch {
    setToast({ type: "error", message: "Could not add to bag" });
  } finally {
    setAdding(false);
  }
};


  return (
    <>
      <section ref={sectionRef} className="pd-wrapper">
        {/* IMAGE GALLERY */}
        <div className="pd-image-section">
          <div ref={imageRef} className="pd-image">
            <img
              src={activeImage || "/placeholder.jpg"}
              alt={product.name}
            />
          </div>

          {product.images.length > 1 && (
            <div className="pd-thumbs">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  ref={(el) => (thumbsRef.current[idx] = el)}
                  className={`pd-thumb ${
                    activeImage === img.image ? "active" : ""
                  }`}
                  onClick={() => setActiveImage(img.image)}
                >
                  <img src={img.image} alt="thumbnail" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="pd-info">
          <h1 ref={(el) => (infoRef.current[0] = el)}>
            {product.name}
          </h1>

          <p ref={(el) => (infoRef.current[1] = el)} className="pd-scent">
            {product.scent}
          </p>

          <div ref={(el) => (infoRef.current[2] = el)} className="pd-price">
            ₹{totalPrice.toLocaleString()}
            <span className="pd-unit-price">
              &nbsp;(₹{unitPrice} × {quantity})
            </span>
          </div>

          <div ref={(el) => (infoRef.current[3] = el)} className="pd-variants">
            <label>Size</label>
            <div className="variant-options">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  className={`variant-btn ${
                    selectedVariant.id === variant.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setQuantity(1);
                  }}
                >
                  {variant.size_ml} ml
                </button>
              ))}
            </div>
          </div>

          <div ref={(el) => (infoRef.current[4] = el)} className="pd-quantity">
            <label>Quantity</label>
            <div className="qty-controls">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button
                disabled={quantity >= selectedVariant.stock}
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <p ref={(el) => (infoRef.current[5] = el)} className="pd-desc">
            {product.description}
          </p>

          <div ref={(el) => (infoRef.current[6] = el)} className="pd-actions">
            <button
  className="btn-primary"
  onClick={handleAddToBag}
  disabled={adding}
>
  {adding ? "Adding…" : "Add to Bag"}
</button>

          </div>
        </div>
      </section>

      <RefundPolicy />

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
