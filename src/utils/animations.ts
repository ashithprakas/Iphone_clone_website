import { CSSPlugin } from "gsap/CSSPlugin";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);

export const animateWithGsap = (
  target: string | gsap.DOMTarget,
  animationProps: gsap.TweenVars,
  scrollProps: ScrollTrigger.Vars
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  firstTarget: string,
  secondTarget: string,
  animateProps: gsap.TweenVars
) => {
  timeline.to(
    firstTarget,
    {
      ...animateProps,
      ease: "power1.inOut",
    },
    "<"
  );
  timeline.to(
    secondTarget,
    {
      ...animateProps,
      ease: "power1.inOut",
    },
    "<"
  );
};
