"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Bean({
  position,
  rotation,
  scale,
  speed,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const base = useRef(position[1]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = base.current + Math.sin(t + position[0]) * 0.12;
    ref.current.rotation.x += 0.004 * speed;
    ref.current.rotation.z += 0.003 * speed;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale} castShadow>
      <sphereGeometry args={[0.08, 16, 12]} />
      <meshStandardMaterial color="#3a2418" roughness={0.85} metalness={0.05} />
    </mesh>
  );
}

export function CoffeeBeans({ count = 28 }: { count?: number }) {
  const beans = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      const r = 1.1 + (i % 5) * 0.22;
      return {
        position: [
          Math.cos(a) * r + (i % 3) * 0.08,
          -1.05 + (i % 4) * 0.05,
          Math.sin(a) * r - 0.2,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: 0.55 + (i % 4) * 0.18,
        speed: 0.6 + (i % 5) * 0.15,
      };
    });
  }, [count]);

  return (
    <group>
      {beans.map((bean, i) => (
        <Bean key={i} {...bean} />
      ))}
    </group>
  );
}
