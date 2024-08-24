import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import React, { MutableRefObject, Suspense } from "react";
import { Group, Object3DEventMap } from "three";
import Lights from "./Lights";
import Model from "./Iphone";
import * as THREE from "three";

const ModelView: React.FC<{
  index: number;
  groupRef: MutableRefObject<Group<Object3DEventMap>>;
  gsapType: string;
  controlRef: MutableRefObject<undefined>;
  setRotationState: any;
  item: any;
  size: string;
}> = ({
  index,
  groupRef,
  gspaType,
  controlRef,
  setRotationSize,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      id={gspaType}
      className={`border-2 border-red-500 w-full h-full ${
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
        onEnd={() => setRotationSize(controlRef.current?.getAzimuthalAngle())}
      />
      <group ref={groupRef} name={`${index === 1 ? "small" : "large"}`}>
        <Suspense fallback={<div>Loading</div>} />
        <Model
          scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
          item={item}
          size={size}
        />
      </group>
    </View>
  );
};

export default ModelView;
