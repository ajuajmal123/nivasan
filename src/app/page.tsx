import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import BrandStory from "@/components/sections/BrandStory";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Statistics from "@/components/sections/Statistics";
import Timeline from "@/components/sections/Timeline";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <FeaturedProjects />
      <BrandStory />
      <WhyChooseUs />
      <Statistics />
      <Timeline />
      <ContactCTA />
    </main>
  );
}
