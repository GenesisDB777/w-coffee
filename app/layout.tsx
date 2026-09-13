import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "W Premium Coffee | Coffee Heaven · Est. 2024",
  description:
    "Dark cups. Gold crema. Scroll to sip — an interactive coffee ritual for people who refuse ordinary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${outfit.variable}`}>
      <body className="bg-coffee-bg text-coffee-text antialiased">
        <div className="noise-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}
