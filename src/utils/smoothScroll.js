import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother;

export const initSmoothScroll = () => {
  if (smoother) return smoother;

  smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,          // 🍎 Apple-like feel
    smoothTouch: 0.2,     // mobile safe
    normalizeScroll: true,
    effects: true,
  });

  return smoother;
};

export const killSmoothScroll = () => {
  if (smoother) {
    smoother.kill();
    smoother = null;
  }
};
