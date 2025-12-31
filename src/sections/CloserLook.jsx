import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/closer-look.css";

gsap.registerPlugin(ScrollTrigger);

export default function CloserLook() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* TITLE */
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(6px)",
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true
        }
      });

      /* CARD */
      gsap.from(cardRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true
        }
      });

      /* TEXT + BUTTON */
      gsap.from([textRef.current, btnRef.current], {
        opacity: 0,
        y: 28,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="closer-section">
      {/* TOP TITLE */}
      <h2 ref={titleRef} className="closer-title">
        Take a closer look.
      </h2>

      {/* FULL IMAGE CARD */}
      <div ref={cardRef} className="closer-card">
        <div className="closer-overlay">
          <h3 ref={textRef}>
            A guided tour of <br />
            Noir Élixir and our signature collection
          </h3>

          <button ref={btnRef} className="closer-btn">
            Watch the film
          </button>
        </div>
      </div>
    </section>
  );
}
