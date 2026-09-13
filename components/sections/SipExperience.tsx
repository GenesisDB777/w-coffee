"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const DrinkCanvas = dynamic(
  () => import("../three/DrinkCanvas").then((m) => m.DrinkCanvas),
  { ssr: false, loading: () => <div className="h-full w-full bg-coffee-surface" /> },
);

const moments = [
  { at: 0.08, label: "Full pour", copy: "Crema at the rim. The first inhale." },
  { at: 0.45, label: "Mid sip", copy: "Warmth settles. Notes open up." },
  { at: 0.82, label: "Last drop", copy: "Empty cup. Full memory." },
];

export function SipExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [fill, setFill] = useState(1);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const fillMv = useTransform(scrollYProgress, [0.05, 0.92], [1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(fillMv, "change", (v) => {
    setFill(v);
    if (v > 0.7) setActive(0);
    else if (v > 0.35) setActive(1);
    else setActive(2);
  });

  useEffect(() => {
    setFill(fillMv.get());
  }, [fillMv]);

  return (
    <section
      id="sip"
      ref={sectionRef}
      className="relative h-[280vh] bg-coffee-bg"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden md:flex-row">
        <div className="relative h-[52%] w-full md:h-full md:w-[55%]">
          <DrinkCanvas fill={fill} size="medium" showLid={false} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-coffee-bg to-transparent md:hidden" />
        </div>

        <div className="relative flex h-[48%] flex-col justify-center px-6 py-8 md:h-full md:w-[45%] md:px-12 lg:px-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-coffee-gold">
            The ritual
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[0.12em] text-coffee-text md:text-4xl lg:text-5xl">
            Scroll to drink
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-coffee-muted md:text-base">
            Move down the page and the cup empties with you — a living pour for
            people who live for coffee.
          </p>

          <div className="mt-8 space-y-5">
            {moments.map((m, i) => (
              <motion.div
                key={m.label}
                animate={{
                  opacity: active === i ? 1 : 0.35,
                  x: active === i ? 0 : -6,
                }}
                transition={{ duration: 0.35 }}
                className="border-l border-coffee-gold/25 pl-4"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-coffee-gold">
                  {m.label}
                </p>
                <p className="mt-1 text-sm text-coffee-text/90">{m.copy}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <div className="mb-2 flex justify-between text-[10px] uppercase tracking-[0.28em] text-coffee-muted">
              <span>Full</span>
              <span>{Math.round(fill * 100)}%</span>
              <span>Empty</span>
            </div>
            <div className="h-px w-full bg-coffee-elevated">
              <motion.div
                className="h-px bg-coffee-gold"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
