"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CupSize } from "@/lib/coffee";
import { CUP_SIZES } from "@/lib/coffee";

type CoffeeCupProps = {
  fill: number;
  size?: CupSize;
  showLid?: boolean;
  interactive?: boolean;
};

function GoldRing({
  y,
  radius,
  tube = 0.012,
}: {
  y: number;
  radius: number;
  tube?: number;
}) {
  return (
    <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, tube, 12, 64]} />
      <meshStandardMaterial
        color="#d4af37"
        metalness={0.95}
        roughness={0.28}
        emissive="#5c4810"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

function createBrandTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#7a1212";
  ctx.font = "700 220px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("W", 262, 210);

  ctx.fillStyle = "#d4af37";
  ctx.fillText("W", 256, 200);

  ctx.font = "500 28px Arial, sans-serif";
  ctx.fillStyle = "#d4af37";
  ctx.fillText("PREMIUM COFFEE", 256, 360);

  ctx.font = "400 20px Arial, sans-serif";
  ctx.fillStyle = "#c9a84c";
  ctx.fillText("— EST. 2024 —", 256, 410);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function LogoBadge({ y }: { y: number }) {
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    return createBrandTexture();
  }, []);

  if (!texture) return null;

  return (
    <mesh position={[0, y, 0.445]}>
      <planeGeometry args={[0.72, 0.9]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

export function CoffeeCup({
  fill,
  size = "medium",
  showLid = true,
  interactive = true,
}: CoffeeCupProps) {
  const group = useRef<THREE.Group>(null);
  const liquid = useRef<THREE.Mesh>(null);
  const foam = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });

  const scale = CUP_SIZES[size].scale;
  const clamped = Math.min(1, Math.max(0, fill));

  const cupMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1816",
        roughness: 0.92,
        metalness: 0.05,
      }),
    [],
  );

  const innerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2a221c",
        roughness: 0.85,
        metalness: 0.05,
        side: THREE.BackSide,
      }),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    if (interactive) {
      const mx = state.pointer.x * 0.2;
      const my = state.pointer.y * 0.1;
      target.current.x += (mx - target.current.x) * 0.06;
      target.current.y += (my - target.current.y) * 0.06;
      group.current.rotation.y = 0.35 + target.current.x + Math.sin(t * 0.35) * 0.06;
      group.current.rotation.x = 0.22 + target.current.y;
    } else {
      group.current.rotation.y = 0.35 + Math.sin(t * 0.4) * 0.1;
      group.current.rotation.x = 0.22;
    }

    const liquidHeight = 0.12 + clamped * 1.12;
    const liquidY = -0.58 + liquidHeight / 2;

    if (liquid.current) {
      liquid.current.scale.y = Math.max(0.02, liquidHeight);
      liquid.current.position.y = liquidY;
      liquid.current.visible = clamped > 0.02;
    }
    if (foam.current) {
      foam.current.position.y = -0.58 + liquidHeight + 0.015;
      foam.current.visible = clamped > 0.08;
      const foamMat = foam.current.material as THREE.MeshStandardMaterial;
      foamMat.opacity = Math.min(1, clamped * 1.4);
    }
  });

  return (
    <group ref={group} scale={scale} position={[0, -0.15, 0]}>
      {/* Outer cup */}
      <mesh castShadow receiveShadow material={cupMat}>
        <cylinderGeometry args={[0.58, 0.42, 1.35, 64, 1, true]} />
      </mesh>
      {/* Inner wall */}
      <mesh material={innerMat}>
        <cylinderGeometry args={[0.55, 0.39, 1.32, 64, 1, true]} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -0.67, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <circleGeometry args={[0.42, 48]} />
        <meshStandardMaterial color="#141210" roughness={0.9} />
      </mesh>

      <GoldRing y={0.52} radius={0.575} />
      <GoldRing y={-0.58} radius={0.435} tube={0.01} />
      <LogoBadge y={0.12} />

      {/* Coffee */}
      <mesh ref={liquid} castShadow>
        <cylinderGeometry args={[0.5, 0.37, 1, 48]} />
        <meshStandardMaterial
          color="#3d2214"
          roughness={0.28}
          metalness={0.2}
          emissive="#2a150c"
          emissiveIntensity={0.55}
        />
      </mesh>

      {/* Crema foam */}
      <mesh ref={foam}>
        <cylinderGeometry args={[0.49, 0.49, 0.06, 48]} />
        <meshStandardMaterial
          color="#d4b07a"
          roughness={0.65}
          metalness={0.08}
          transparent
          opacity={1}
        />
      </mesh>

      {showLid && (
        <group position={[0, 0.72, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.62, 0.6, 0.08, 48]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.45} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.28, 0.32, 0.1, 32]} />
            <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.25} />
          </mesh>
          <mesh position={[0.18, 0.14, 0]} rotation={[0, 0, 0.15]}>
            <boxGeometry args={[0.16, 0.04, 0.1]} />
            <meshStandardMaterial color="#0d0d0d" roughness={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
}
