"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { RITUAL_STEPS, TASTING_NOTES } from "@/lib/coffee";

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section id="story" ref={ref} className="relative overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-coffee-gold/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-coffee-red/10 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-coffee-gold">
              Our story
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-[0.12em] md:text-5xl">
              Built for people who never settle for lukewarm.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-coffee-muted">
              W is a boutique roast house wrapped in charcoal and gold. Every
              cup is a quiet flex — matte paper, metallic mark, beans underfoot.
              We make coffee that feels like a place you want to return to.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {TASTING_NOTES.map((note, i) => (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i, duration: 0.55 }}
                className="border-t border-coffee-gold/25 pt-4"
              >
                <p className="font-display text-sm tracking-[0.2em] text-coffee-gold">
                  {note.title}
                </p>
                <p className="mt-2 text-sm text-coffee-muted">{note.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {RITUAL_STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
            >
              <p className="font-display text-4xl text-coffee-gold/30">{step.n}</p>
              <h3 className="mt-3 font-display text-lg tracking-[0.14em]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-coffee-muted">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
