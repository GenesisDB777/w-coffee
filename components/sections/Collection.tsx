"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CUP_SIZES, type CupSize } from "@/lib/coffee";

const DrinkCanvas = dynamic(
  () => import("../three/DrinkCanvas").then((m) => m.DrinkCanvas),
  { ssr: false, loading: () => <div className="h-full w-full bg-coffee-surface" /> },
);

const order: CupSize[] = ["large", "medium", "small"];

export function Collection() {
  const [size, setSize] = useState<CupSize>("medium");
  const [fill, setFill] = useState(0.92);
  const active = CUP_SIZES[size];

  return (
    <section id="collection" className="stone-glow relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-coffee-gold">
            The lineup
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[0.14em] md:text-5xl">
            Three cups. One obsession.
          </h2>
          <p className="mt-4 text-coffee-muted">
            Tap a size. Spin the cup. Pour it down — your brew, your pace.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <div className="relative h-[420px] overflow-hidden rounded-sm border border-coffee-gold/15 bg-coffee-surface md:h-[520px]">
            <DrinkCanvas fill={fill} size={size} showLid={false} />
          </div>

          <div>
            <div className="flex flex-wrap gap-3">
              {order.map((key) => {
                const item = CUP_SIZES[key];
                const selected = key === size;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSize(key)}
                    className={`min-w-[7.5rem] border px-5 py-4 text-left transition ${
                      selected
                        ? "border-coffee-gold bg-coffee-gold/10 text-coffee-gold"
                        : "border-coffee-gold/20 text-coffee-muted hover:border-coffee-gold/50"
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.28em]">
                      {item.oz}
                    </span>
                    <span className="mt-1 block font-display text-sm tracking-wide text-coffee-text">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={size}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="mt-10"
              >
                <h3 className="font-display text-2xl tracking-[0.12em] text-coffee-gold">
                  {active.label}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-coffee-muted">
                  {active.blurb}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10">
              <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-coffee-muted">
                <span>Fill level</span>
                <span>{Math.round(fill * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(fill * 100)}
                onChange={(e) => setFill(Number(e.target.value) / 100)}
                className="h-1 w-full cursor-pointer appearance-none bg-coffee-elevated accent-coffee-gold"
                aria-label="Coffee fill level"
              />
              <p className="mt-3 text-xs text-coffee-muted/80">
                Drag to drink — from full crema to an empty charcoal cup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
