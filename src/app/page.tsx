import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import BrandStory from "@/components/sections/BrandStory";
import Timeline from "@/components/sections/Timeline";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Nivasan Homes | Luxury Gated Villas & Premium Apartments in Coimbatore",
  description: "Redefining premium residential design in Coimbatore. Discover architectural masterpieces, bespoke luxury 4 BHK villas, and minimalist modern living spaces crafted with timeless sophistication.",
};

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <FeaturedProjects />
      <BrandStory />
      <Timeline />
      <ContactCTA />
    </main>
  );
}
