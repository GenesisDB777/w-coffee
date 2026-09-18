"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeBeanTexture } from "@/lib/textures";

function createBeanGeometry() {
  const geo = new THREE.SphereGeometry(0.085, 28, 20);
  geo.scale(1.4, 0.7, 0.88);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const crease = Math.exp(-(x * x) * 95) * 0.02;
    pos.setZ(i, z - Math.sign(z || 1) * crease * (1 - Math.abs(y) * 2.2));
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

function Bean({
  position,
  rotation,
  scale,
  speed,
  geometry,
  map,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  geometry: THREE.BufferGeometry;
  map: THREE.Texture | null;
}) {
  const ref = useRef<THREE.Group>(null);
  const base = useRef(position[1]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = base.current + Math.sin(t + position[0] * 2) * 0.05;
    ref.current.rotation.x += 0.0025 * speed;
    ref.current.rotation.z += 0.0018 * speed;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#4f2d18"
          map={map ?? undefined}
          roughness={0.48}
          metalness={0.1}
          clearcoat={0.45}
          clearcoatRoughness={0.35}
          sheen={0.55}
          sheenColor="#8b5a2b"
          envMapIntensity={0.65}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.005, 0.005, 0.1, 8]} />
        <meshStandardMaterial color="#1a0e08" roughness={0.85} />
      </mesh>
    </group>
  );
}

export function CoffeeBeans({ count = 34 }: { count?: number }) {
  const geometry = useMemo(() => createBeanGeometry(), []);
  const map = useMemo(() => {
    if (typeof document === "undefined") return null;
    return makeBeanTexture();
  }, []);

  const beans = useMemo(() => {
    const seeded = (n: number) => {
      const x = Math.sin(n * 127.1) * 43758.5453;
      return x - Math.floor(x);
    };

    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + seeded(i) * 0.35;
      const r = 0.95 + seeded(i + 3) * 0.8;
      const ground = seeded(i + 7) > 0.5;
      return {
        position: [
          Math.cos(a) * r,
          ground ? -1.08 + seeded(i + 11) * 0.03 : -0.8 + seeded(i + 13) * 0.5,
          Math.sin(a) * r * 0.85 - 0.12,
        ] as [number, number, number],
        rotation: [
          seeded(i + 17) * Math.PI,
          seeded(i + 19) * Math.PI,
          seeded(i + 23) * Math.PI,
        ] as [number, number, number],
        scale: 0.75 + seeded(i + 29) * 0.5,
        speed: ground ? 0.2 + seeded(i) * 0.15 : 0.5 + seeded(i + 31) * 0.3,
      };
    });
  }, [count]);

  return (
    <group>
      {beans.map((bean, i) => (
        <Bean key={i} {...bean} geometry={geometry} map={map} />
      ))}
    </group>
  );
}
