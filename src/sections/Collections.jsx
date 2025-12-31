import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getProducts } from "../services/products.api";
import "../styles/collections.css";

gsap.registerPlugin(ScrollTrigger);

export default function CollectionsHorizontal() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  /* =========================
     FETCH (ONLY 5)
  ========================= */
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.slice(0, 5)))
      .catch(console.error);
  }, []);

  /* =========================
     GSAP ENTRANCE
  ========================= */
  useEffect(() => {
    if (!products.length) return;

    const ctx = gsap.context(() => {
      gsap.from(".lux-collections-header", {
        opacity: 0,
        y: 40,
        filter: "blur(6px)",
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.from(".lux-collection-card", {
        opacity: 0,
        y: 30,
        scale: 0.96,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

  /* =========================
     ARROW SCROLL
  ========================= */
  const scrollBy = (direction) => {
    const amount = 360;
    trackRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="lux-collections">
      {/* HEADER */}
      <div className="lux-collections-header">
        <h2>Explore the collection.</h2>
        <button onClick={() => navigate("/products")}>
          View all fragrances →
        </button>
      </div>

      {/* HORIZONTAL TRACK */}
      <div className="lux-collections-rail">
        <button
          className="lux-arrow lux-arrow-left"
          onClick={() => scrollBy("left")}
        >
          <FiChevronLeft />
        </button>

        <div ref={trackRef} className="lux-collections-track">
          {products.map((item) => (
            <article
              key={item.id}
              className="lux-collection-card"
              onClick={() => navigate("/products")}
            >
              <div className="lux-collection-image">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                />
              </div>

              <div className="lux-collection-info">
                <span className="lux-collection-tag">
                  {item.gender || "Signature"}
                </span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="lux-collection-price">
                  From ₹{item.starting_price}
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          className="lux-arrow lux-arrow-right"
          onClick={() => scrollBy("right")}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}
