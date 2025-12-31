import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/Hero.css";

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: 40, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "power4.out",
        stagger: 0.15,
        delay: 0.5,
      }
    );
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <h1 ref={titleRef}>NOIR ÉLIXIR</h1>
        <p ref={subtitleRef}>Crafted for presence. Designed to linger.</p>
      </div>
    </section>
  );
}
