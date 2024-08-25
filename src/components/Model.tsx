import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../utils/Constants";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState(models[0]);

  const cameraControlSmallPhone = useRef<any>();
  const cameraControlLargePhone = useRef<any>();

  const smallPhone = useRef<any>(new THREE.Group());
  const largePhone = useRef<any>(new THREE.Group());

  const timeline = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      console.log("is larege");
      animateWithGsapTimeline(timeline, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }
    if (size === "small") {
      console.log("is small");
      animateWithGsapTimeline(timeline, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", {
      y: 0,
      opacity: 1,
    });
  }, []);
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a close look.
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={smallPhone}
              gsapType="view1"
              controlRef={cameraControlSmallPhone}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={largePhone}
              gsapType="view2"
              controlRef={cameraControlLargePhone}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full "
              style={{ position: "fixed", top: 0, left: 0, overflow: "hidden" }}
              eventSource={document.getElementById("root") as HTMLElement}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className=" font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container ">
                {models.map((model, index) => (
                  <li
                    key={index}
                    className="w-6 h-6 rounded-full mx-2"
                    style={{ background: model.color[0] }}
                    onClick={() => setModel(model)}
                  ></li>
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    className="size-btn "
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    key={label}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
