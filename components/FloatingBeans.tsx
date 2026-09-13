"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const beans = [
  { x: "8%", y: "18%", delay: 0, size: 14 },
  { x: "88%", y: "22%", delay: 0.4, size: 18 },
  { x: "12%", y: "72%", delay: 0.8, size: 12 },
  { x: "82%", y: "68%", delay: 1.1, size: 16 },
  { x: "48%", y: "88%", delay: 0.2, size: 11 },
];

export function FloatingBeans() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 24;
      const ny = (e.clientY / window.innerHeight - 0.5) * 16;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 hidden md:block"
      aria-hidden
    >
      {beans.map((bean, i) => (
        <motion.span
          key={i}
          className="bean-drift absolute rounded-[50%] bg-coffee-bean opacity-40 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.45)]"
          style={{
            left: bean.x,
            top: bean.y,
            width: bean.size,
            height: bean.size * 0.65,
            x: sx,
            y: sy,
            animationDelay: `${bean.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
