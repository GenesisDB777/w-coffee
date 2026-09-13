"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <Image
        src="/w-brand.jpg"
        alt="W Premium Coffee cups with gold branding"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-bg via-coffee-bg/55 to-coffee-bg/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-bg/70 via-transparent to-coffee-bg/40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-5 font-display text-7xl font-bold tracking-[0.12em] text-coffee-gold w-mark md:text-8xl lg:text-9xl">
            W
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-[0.2em] text-coffee-text md:text-5xl">
            PREMIUM COFFEE
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.45em] text-coffee-gold/80">
            — Est. 2024 —
          </p>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-coffee-muted md:text-lg">
            Coffee heaven, poured dark. Scroll to sip — watch the cup go from
            full to empty as the ritual unfolds.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#sip"
              className="bg-coffee-gold px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.28em] text-coffee-bg transition hover:bg-coffee-gold-soft"
            >
              Start drinking
            </a>
            <a
              href="#collection"
              className="border border-coffee-gold/40 px-7 py-3.5 text-[11px] uppercase tracking-[0.28em] text-coffee-gold transition hover:border-coffee-gold"
            >
              Meet the cups
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-14 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-coffee-muted"
        >
          <span className="block h-px w-10 bg-coffee-gold/50" />
          Scroll to drink
        </motion.div>
      </div>
    </section>
  );
}
