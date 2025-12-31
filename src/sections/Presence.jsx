import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/presence.css";

gsap.registerPlugin(ScrollTrigger);

export default function Presence() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* SECTION FADE */
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true
        }
      });

      /* STATS STAGGER */
      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="presence-section">
      <div className="presence-inner">

        {/* TITLE */}
        <div className="presence-header">
          <h2>Crafted worldwide. Experienced everywhere.</h2>
          <p>
            From flagship boutiques to select partners, Noir Élixir
            is present across the world’s most discerning destinations.
          </p>
        </div>

        {/* STATS */}
        <div className="presence-grid">
          {[
            { value: "120+", label: "Boutiques worldwide" },
            { value: "18", label: "Countries" },
            { value: "250+", label: "Partner stores" },
            { value: "Global", label: "Shipping available" }
          ].map((item, i) => (
            <div
              key={i}
              className="presence-card"
              ref={(el) => (itemsRef.current[i] = el)}
            >
              <span className="presence-value">{item.value}</span>
              <span className="presence-label">{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
