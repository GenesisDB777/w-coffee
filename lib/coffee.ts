export type CupSize = "large" | "medium" | "small";

export const CUP_SIZES: Record<
  CupSize,
  { label: string; oz: string; scale: number; blurb: string }
> = {
  large: {
    label: "Signature Dark",
    oz: "16 oz",
    scale: 1.15,
    blurb: "Bold roast. Deep cocoa. A slow, velvet finish.",
  },
  medium: {
    label: "Balanced Roast",
    oz: "12 oz",
    scale: 1,
    blurb: "Caramel warmth with a clean, aromatic body.",
  },
  small: {
    label: "Artisan Espresso",
    oz: "8 oz",
    scale: 0.82,
    blurb: "Concentrated intensity for pure coffee lovers.",
  },
};

export const TASTING_NOTES = [
  { title: "Origin", text: "Single-origin lots, roasted in small batches." },
  { title: "Roast", text: "Dark charcoal profile with gold crema." },
  { title: "Sip", text: "From first pour to last drop — crafted to linger." },
];

export const RITUAL_STEPS = [
  {
    n: "01",
    title: "Choose your cup",
    text: "Three sizes. One standard — impeccable.",
  },
  {
    n: "02",
    title: "Watch it pour",
    text: "Scroll and sip. Watch the brew lower in real time.",
  },
  {
    n: "03",
    title: "Come back for more",
    text: "Every visit, a warmer ritual.",
  },
];
