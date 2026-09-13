"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

export function Visit() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  };

  return (
    <section id="visit" className="relative border-t border-coffee-gold/15 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="font-display text-6xl font-bold tracking-[0.14em] text-coffee-gold w-mark md:text-7xl">
          W
        </p>
        <h2 className="mt-6 font-display text-3xl tracking-[0.16em] md:text-4xl">
          Come back for another pour
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-coffee-muted md:text-base">
          Drop your email. Be first when new roasts drop, midnight tastings open,
          and limited gold-sleeve runs go live.
        </p>

        {joined ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-sm tracking-[0.2em] text-coffee-gold uppercase"
          >
            You&apos;re on the list. See you at the next cup.
          </motion.p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@coffeelover.com"
              className="flex-1 border border-coffee-gold/25 bg-coffee-surface px-4 py-3 text-sm text-coffee-text outline-none transition placeholder:text-coffee-muted/50 focus:border-coffee-gold"
            />
            <button
              type="submit"
              className="bg-coffee-gold px-6 py-3 text-[11px] font-medium uppercase tracking-[0.28em] text-coffee-bg transition hover:bg-coffee-gold-soft"
            >
              Join the ritual
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-coffee-gold/15 px-6 py-10 text-center md:px-10">
      <p className="text-[10px] uppercase tracking-[0.35em] text-coffee-muted">
        © 2024–2026 W Premium Coffee · Coffee Heaven
      </p>
    </footer>
  );
}
