import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../styles/craft.css";

const slides = [
  {
    image: "/assets/highlight1.png",
    text: "Heat-forged aluminium unibody design for exceptional pro capability."
  },
  {
    image: "/assets/highlight2.png",
    text: "Precision-engineered internals built for sustained performance."
  },
  {
    image: "/assets/highlight3.png",
    text: "Designed to endure. Crafted to impress."
  }
];

// clone for infinite loop
const loopSlides = [
  slides[slides.length - 1],
  ...slides,
  slides[0]
];

export default function Craft() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const imgRefs = useRef([]);
  const progressRef = useRef(null);

  const [index, setIndex] = useState(1); // start from first real slide

  /* ===============================
     AUTO SLIDE (SLOW)
  =============================== */
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6500); // slower = premium

    return () => clearInterval(timer);
  }, []);

  /* ===============================
     CENTER ACTIVE SLIDE (PIXEL BASED)
  =============================== */
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const slidesEls = track.children;
    const activeSlide = slidesEls[index];

    const viewportCenter = viewport.offsetWidth / 2;
    const slideCenter =
      activeSlide.offsetLeft + activeSlide.offsetWidth / 2;

    const x = viewportCenter - slideCenter;

    gsap.to(track, {
      x,
      duration: 2.4,              // 🔑 very slow
      ease: "power4.out"
    });

    // progress
    const realIndex =
      index === 0
        ? slides.length - 1
        : index === loopSlides.length - 1
        ? 0
        : index - 1;

    gsap.to(progressRef.current, {
      width: `${((realIndex + 1) / slides.length) * 100}%`,
      duration: 0.6,
      ease: "power3.out"
    });

    // parallax for active image
    imgRefs.current.forEach((img, i) => {
      gsap.killTweensOf(img);

      if (i === index) {
        gsap.fromTo(
          img,
          { scale: 1.05, y: 0 },
          {
            scale: 1.12,
            y: -40,
            duration: 10,
            ease: "none"
          }
        );
      }
    });
  }, [index]);

  /* ===============================
     LOOP CORRECTION
  =============================== */
  useEffect(() => {
    if (index === 0) {
      gsap.delayedCall(0.05, () => setIndex(slides.length));
    }
    if (index === loopSlides.length - 1) {
      gsap.delayedCall(0.05, () => setIndex(1));
    }
  }, [index]);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  const captionIndex =
    index === 0
      ? slides.length - 1
      : index === loopSlides.length - 1
      ? 0
      : index - 1;

  return (
    <section className="highlight-luxury">
      {/* TITLE */}
      <div className="highlight-title">
        <h2>Get the highlights.</h2>
      </div>

      {/* VIEWPORT */}
      <div ref={viewportRef} className="highlight-viewport">
        <div ref={trackRef} className="highlight-track">
          {loopSlides.map((slide, i) => (
            <div
              key={i}
              className={`highlight-slide ${
                i === index ? "active" : ""
              }`}
            >
              <img
                ref={(el) => (imgRefs.current[i] = el)}
                src={slide.image}
                alt=""
              />
            </div>
          ))}
        </div>

        <button className="nav left" onClick={prev}>
          <FiChevronLeft />
        </button>
        <button className="nav right" onClick={next}>
          <FiChevronRight />
        </button>
      </div>

      {/* TEXT */}
      <p className="highlight-caption">
        {slides[captionIndex].text}
      </p>

      {/* PROGRESS */}
      <div className="highlight-progress">
        <span ref={progressRef} />
      </div>
    </section>
  );
}
