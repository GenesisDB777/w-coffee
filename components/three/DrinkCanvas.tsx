"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import { CoffeeCup } from "./CoffeeCup";
import { CoffeeBeans } from "./CoffeeBeans";
import type { CupSize } from "@/lib/coffee";

type DrinkCanvasProps = {
  fill: number;
  size?: CupSize;
  showLid?: boolean;
  className?: string;
};

function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0.35, 1.55, 2.55);
    camera.lookAt(0, 0.05, 0);
  }, [camera]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = 0.35 + Math.sin(t * 0.2) * 0.05;
    camera.lookAt(0, 0.05, 0);
  });

  return null;
}

function Scene({
  fill,
  size,
  showLid,
}: {
  fill: number;
  size: CupSize;
  showLid: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#0e0d0c"]} />
      <CameraRig />
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[3.5, 7, 4]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[-2.5, 5, 2]}
        intensity={0.9}
        angle={0.45}
        penumbra={0.85}
        color="#d4af37"
      />
      <pointLight position={[0.2, 2.2, 1.5]} intensity={0.55} color="#f5e6c8" />
      <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.18}>
        <CoffeeCup fill={fill} size={size} showLid={showLid} />
      </Float>
      <CoffeeBeans />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.16, 0]}
        receiveShadow
      >
        <circleGeometry args={[2.4, 48]} />
        <meshStandardMaterial color="#0a0908" roughness={1} metalness={0} />
      </mesh>
    </>
  );
}

export function DrinkCanvas({
  fill,
  size = "medium",
  showLid = true,
  className = "",
}: DrinkCanvasProps) {
  return (
    <div className={`relative h-full w-full bg-coffee-bg ${className}`}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0.35, 1.55, 2.55], fov: 36 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0e0d0c");
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <Scene fill={fill} size={size} showLid={showLid} />
      </Canvas>
    </div>
  );
}
