import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FloatingBeans } from "@/components/FloatingBeans";
import { Hero } from "@/components/sections/Hero";
import { SipExperience } from "@/components/sections/SipExperience";
import { Collection } from "@/components/sections/Collection";
import { Story } from "@/components/sections/Story";
import { Visit, Footer } from "@/components/sections/Visit";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <FloatingBeans />
      <main>
        <Hero />
        <SipExperience />
        <Collection />
        <Story />
        <Visit />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
