import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });
    gsap.to(".link", { opacity: 1, y: 0, stagger: 0.25, duration: 1 });
  }, []);
  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 md:flex w-full items-center justify-between">
          <h1 id="title" className="section-heading">
            Get the hightlights.
          </h1>
          <div className="flex flex-wrap  gap-4 items-center">
            <p className="link">
              Watch the film
              <img className="ml-2" src={watchImg} alt="watch image" />
            </p>
            <p className="link">
              Watch the event
              <img className="ml-2" src={rightImg} alt="watch image" />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
