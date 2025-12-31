import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/products.api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProductListing.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    getProducts({ gender })
      .then(setProducts)
      .catch(console.error);
  }, [gender]);

  /* =========================
     GSAP SCROLL ANIMATION
  ========================= */

  useEffect(() => {
    if (!products.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 40,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true, // 🔥 plays only once
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <section ref={sectionRef} className="plp-apple-scope">
      {/* HEADER */}
      <header className="plp-apple-header">
        <h1 className="plp-apple-title">The Collection</h1>
        <p className="plp-apple-subtitle">
          Crafted fragrances with lasting presence
        </p>
      </header>

      {/* FILTER BAR */}
      <div className="plp-apple-filters">
        {["", "men", "women", "unisex"].map((g) => (
          <button
            key={g}
            className={`plp-apple-chip ${
              gender === g ? "plp-apple-chip--active" : ""
            }`}
            onClick={() => setGender(g)}
          >
            {g === "" ? "All" : g}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="plp-apple-grid">
        {products.map((product, index) => (
          <article
            key={product.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="plp-apple-card"
            onClick={() => navigate(`/products/${product.slug}`)}
          >
            <div className="plp-apple-imageWrap">
              <img
                src={product.image || "/placeholder.jpg"}
                alt={product.name}
              />
            </div>

            <div className="plp-apple-meta">
              <h3 className="plp-apple-name">{product.name}</h3>
              <p className="plp-apple-scent">{product.scent}</p>
              <span className="plp-apple-price">
                From ₹{product.starting_price}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
