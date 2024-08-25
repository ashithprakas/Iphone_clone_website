import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import React, { MutableRefObject } from "react";
import Lights from "./Lights";
import IphoneModel from "./Iphone";
import * as THREE from "three";
import { ModelData } from "../interfaces/Models.interface";

const ModelView: React.FC<{
  index: number;
  groupRef: MutableRefObject<any>;
  gsapType: string;
  controlRef: MutableRefObject<any>;
  item: ModelData;
  size: string;
}> = ({ index, groupRef, gsapType, controlRef, size, item }) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={` w-full h-full absolute ease-in-out  ${
        index == 2 ? "right-[-100%]" : ""
      }`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
      />
      <group ref={groupRef} name={`${index === 1 ? "small" : "large"}`}>
        <IphoneModel
          scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
          item={item}
          size={size}
        />
      </group>
    </View>
  );
};

export default ModelView;
