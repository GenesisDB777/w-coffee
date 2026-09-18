"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useEffect } from "react";
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
    camera.position.set(0.5, 1.75, 2.35);
    camera.lookAt(0, 0.15, 0);
  }, [camera]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = 0.5 + Math.sin(t * 0.16) * 0.035;
    camera.position.y = 1.75 + Math.sin(t * 0.11) * 0.015;
    camera.lookAt(0, 0.15, 0);
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
      <color attach="background" args={["#0c0b0a"]} />
      <fog attach="fog" args={["#0c0b0a", 7, 16]} />
      <CameraRig />

      <ambientLight intensity={0.28} color="#d4c3a4" />
      <directionalLight
        position={[4.2, 8.5, 3.2]}
        intensity={2.35}
        color="#fff6e8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00025}
      />
      <directionalLight position={[-3.2, 2.8, -2]} intensity={0.4} color="#7a91ff" />
      <spotLight
        position={[-2.2, 5.2, 2.8]}
        intensity={1.55}
        angle={0.38}
        penumbra={0.75}
        color="#d4af37"
        castShadow
      />
      <pointLight position={[0.25, 2.5, 1.3]} intensity={0.8} color="#ffe8c8" distance={6} />

      <Suspense fallback={null}>
        <Environment preset="apartment" environmentIntensity={0.62} />
      </Suspense>

      <Float speed={0.85} rotationIntensity={0.035} floatIntensity={0.1}>
        <CoffeeCup fill={fill} size={size} showLid={showLid} />
      </Float>

      <CoffeeBeans />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]} receiveShadow>
        <circleGeometry args={[3.4, 64]} />
        <meshStandardMaterial color="#090807" roughness={0.96} metalness={0.04} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.175, 0]}>
        <circleGeometry args={[1.4, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.45} />
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
        dpr={[1, 1.75]}
        camera={{ position: [0.5, 1.75, 2.35], fov: 33, near: 0.1, far: 40 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0c0b0a");
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <Scene fill={fill} size={size} showLid={showLid} />
      </Canvas>
    </div>
  );
}
