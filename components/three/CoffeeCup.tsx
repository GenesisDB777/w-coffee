"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CupSize } from "@/lib/coffee";
import { CUP_SIZES } from "@/lib/coffee";
import {
  makeBrandTexture,
  makeCremaNormal,
  makeCremaTexture,
  makePaperRoughness,
  makePaperTexture,
} from "@/lib/textures";

type CoffeeCupProps = {
  fill: number;
  size?: CupSize;
  showLid?: boolean;
  interactive?: boolean;
};

const CUP_H = 1.35;
const CUP_TOP = 0.58;
const CUP_BOT = 0.42;
const INNER_TOP = 0.545;
const INNER_BOT = 0.385;
const BOTTOM_Y = -CUP_H / 2;

function radiusAtHeight(y: number, topR: number, botR: number) {
  const t = (y - BOTTOM_Y) / CUP_H;
  return THREE.MathUtils.lerp(botR, topR, t);
}

function GoldRing({
  y,
  radius,
  tube = 0.011,
}: {
  y: number;
  radius: number;
  tube?: number;
}) {
  return (
    <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, tube, 20, 96]} />
      <meshPhysicalMaterial
        color="#d4af37"
        metalness={1}
        roughness={0.16}
        clearcoat={0.7}
        clearcoatRoughness={0.18}
        envMapIntensity={1.8}
        emissive="#5c4010"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function CoffeeBody({ fill }: { fill: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const top = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const clamped = Math.min(1, Math.max(0, fill));
    const liquidHeight = Math.max(0.02, 0.1 + clamped * (CUP_H - 0.22));
    const topY = BOTTOM_Y + 0.04 + liquidHeight;
    if (mesh.current) {
      mesh.current.scale.y = liquidHeight;
      mesh.current.position.y = BOTTOM_Y + 0.04 + liquidHeight / 2;
      mesh.current.visible = clamped > 0.02;
    }
    if (top.current) {
      // keep a dark espresso under-layer slightly below the crema disc
      top.current.position.y = topY - 0.012;
      const r = radiusAtHeight(topY, INNER_TOP - 0.02, INNER_BOT - 0.02);
      top.current.scale.setScalar(Math.max(0.05, r / 0.48));
      top.current.visible = clamped > 0.02;
    }
  });

  return (
    <group>
      <mesh ref={mesh} castShadow>
        <cylinderGeometry args={[INNER_TOP - 0.02, INNER_BOT - 0.015, 1, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#24140c"
          roughness={0.18}
          metalness={0.08}
          envMapIntensity={0.45}
          emissive="#120805"
          emissiveIntensity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={top} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.48, 64]} />
        <meshPhysicalMaterial color="#1a0e08" roughness={0.35} metalness={0.05} />
      </mesh>
    </group>
  );
}

function CoffeeSurface({ fill }: { fill: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);

  const maps = useMemo(() => {
    if (typeof document === "undefined") return null;
    return {
      crema: makeCremaTexture(),
      normal: makeCremaNormal(),
    };
  }, []);

  useFrame((state) => {
    const clamped = Math.min(1, Math.max(0, fill));
    const liquidHeight = 0.1 + clamped * (CUP_H - 0.22);
    const surfaceY = BOTTOM_Y + 0.04 + liquidHeight;
    const r = radiusAtHeight(surfaceY, INNER_TOP - 0.006, INNER_BOT - 0.006);

    if (mesh.current) {
      mesh.current.position.y =
        surfaceY + 0.008 + Math.sin(state.clock.elapsedTime * 1.7) * 0.002;
      mesh.current.scale.setScalar(Math.max(0.05, r / 0.5));
      mesh.current.visible = clamped > 0.03;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.04;
    }
  });

  if (!maps) return null;

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} renderOrder={3}>
      <circleGeometry args={[0.5, 96]} />
      <meshPhysicalMaterial
        ref={mat}
        map={maps.crema}
        normalMap={maps.normal}
        normalScale={new THREE.Vector2(1.25, 1.25)}
        color="#ffffff"
        roughness={0.55}
        metalness={0.05}
        clearcoat={0.25}
        clearcoatRoughness={0.55}
        sheen={0.6}
        sheenRoughness={0.5}
        sheenColor="#e8c989"
        transparent={false}
        depthWrite
        envMapIntensity={0.7}
        emissive="#2a1808"
        emissiveIntensity={0.04}
      />
    </mesh>
  );
}

function Meniscus({ fill }: { fill: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const clamped = Math.min(1, Math.max(0, fill));
    const liquidHeight = 0.1 + clamped * (CUP_H - 0.22);
    const surfaceY = BOTTOM_Y + 0.04 + liquidHeight;
    const r = radiusAtHeight(surfaceY, INNER_TOP - 0.01, INNER_BOT - 0.01);
    if (ref.current) {
      ref.current.position.y = surfaceY + 0.003;
      ref.current.scale.set(r / 0.5, 1, r / 0.5);
      ref.current.visible = clamped > 0.08;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.45, 0.5, 64]} />
      <meshPhysicalMaterial
        color="#1a0e08"
        roughness={0.12}
        metalness={0.15}
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
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
  const target = useRef({ x: 0, y: 0 });
  const scale = CUP_SIZES[size].scale;

  const textures = useMemo(() => {
    if (typeof document === "undefined") return null;
    return {
      paper: makePaperTexture(),
      rough: makePaperRoughness(),
      brand: makeBrandTexture(),
    };
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    if (interactive) {
      const mx = state.pointer.x * 0.16;
      const my = state.pointer.y * 0.07;
      target.current.x += (mx - target.current.x) * 0.05;
      target.current.y += (my - target.current.y) * 0.05;
      group.current.rotation.y = 0.35 + target.current.x + Math.sin(t * 0.28) * 0.035;
      group.current.rotation.x = 0.32 + target.current.y;
    } else {
      group.current.rotation.y = 0.35 + Math.sin(t * 0.32) * 0.07;
      group.current.rotation.x = 0.32;
    }
  });

  return (
    <group ref={group} scale={scale} position={[0, -0.1, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[CUP_TOP, CUP_BOT, CUP_H, 96, 1, true]} />
        <meshPhysicalMaterial
          color="#1b1815"
          map={textures?.paper ?? undefined}
          roughnessMap={textures?.rough ?? undefined}
          roughness={0.9}
          metalness={0.02}
          clearcoat={0.06}
          clearcoatRoughness={0.75}
          envMapIntensity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh>
        <cylinderGeometry args={[INNER_TOP, INNER_BOT, CUP_H - 0.02, 96, 1, true]} />
        <meshPhysicalMaterial
          color="#32261f"
          roughness={0.7}
          metalness={0.04}
          side={THREE.BackSide}
          envMapIntensity={0.3}
        />
      </mesh>

      <mesh position={[0, BOTTOM_Y + 0.01, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <circleGeometry args={[CUP_BOT - 0.005, 64]} />
        <meshPhysicalMaterial color="#100e0c" roughness={0.92} />
      </mesh>

      <mesh position={[0, CUP_H / 2 - 0.01, 0]}>
        <torusGeometry args={[CUP_TOP - 0.01, 0.015, 16, 96]} />
        <meshPhysicalMaterial color="#151310" roughness={0.5} clearcoat={0.35} />
      </mesh>

      <GoldRing y={CUP_H / 2 - 0.14} radius={CUP_TOP - 0.004} />
      <GoldRing y={BOTTOM_Y + 0.1} radius={CUP_BOT + 0.012} tube={0.009} />

      {textures?.brand && (
        <mesh position={[0, 0.08, CUP_TOP - 0.055]} rotation={[0.02, 0, 0]}>
          <planeGeometry args={[0.42, 0.52]} />
          <meshPhysicalMaterial
            map={textures.brand}
            transparent
            roughness={0.3}
            metalness={0.6}
            clearcoat={0.5}
            depthWrite={false}
            side={THREE.DoubleSide}
            envMapIntensity={1.05}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>
      )}

      <CoffeeBody fill={fill} />
      <Meniscus fill={fill} />
      <CoffeeSurface fill={fill} />

      {showLid && (
        <group position={[0, CUP_H / 2 + 0.05, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.62, 0.6, 0.07, 64]} />
            <meshPhysicalMaterial
              color="#0c0c0c"
              roughness={0.25}
              metalness={0.4}
              clearcoat={1}
              clearcoatRoughness={0.12}
              envMapIntensity={1.2}
            />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.26, 0.3, 0.09, 48]} />
            <meshPhysicalMaterial
              color="#101010"
              roughness={0.22}
              metalness={0.45}
              clearcoat={1}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
