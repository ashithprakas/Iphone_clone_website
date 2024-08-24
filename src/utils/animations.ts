import { CSSPlugin } from "gsap/CSSPlugin";
import gsap from "gsap";

gsap.registerPlugin(CSSPlugin);

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
