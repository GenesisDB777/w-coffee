"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#top", label: "Home" },
  { href: "#sip", label: "Menu" },
  { href: "#story", label: "About us" },
  { href: "#collection", label: "Collection" },
  { href: "#visit", label: "Visit" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-coffee-gold/15 bg-coffee-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="group flex items-baseline gap-3">
          <span className="font-display w-mark text-3xl font-bold tracking-[0.18em] text-coffee-gold transition group-hover:text-coffee-gold-soft">
            W
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.35em] text-coffee-muted sm:inline">
            Premium Coffee
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.28em] text-coffee-muted transition hover:text-coffee-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#collection"
          className="border border-coffee-gold/50 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-coffee-gold transition hover:border-coffee-gold hover:bg-coffee-gold hover:text-coffee-bg"
        >
          Order now
        </a>
      </div>
    </motion.header>
  );
}
