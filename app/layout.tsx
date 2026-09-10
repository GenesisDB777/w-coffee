import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "W Premium Coffee | Est. 2024",
  description: "Impeccably roasted, richly textured, and crafted for the discerning palate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="bg-coffee-bg text-coffee-text font-sans antialiased selection:bg-coffee-gold selection:text-coffee-bg">
        {children}
      </body>
    </html>
  );
}