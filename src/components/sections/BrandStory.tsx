"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect on the brand image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-28 md:py-40 bg-background-luxury overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column - Image with parallax scroll */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-[4/5] overflow-hidden bg-primary shadow-2xl border border-primary/5">
              {/* Gold backing border framing the image */}
              <div className="absolute inset-4 border border-accent/30 pointer-events-none z-10" />
              
              <motion.div
                style={{ y: imgY, scale: 1.1 }}
                className="w-full h-[125%] absolute -top-[12.5%] bg-cover bg-center"
              >
                <img
                  src="/images/brand_story.png"
                  alt="Minimalist luxury materials"
                  className="w-full h-full object-cover grayscale-[10%] contrast-[1.05] hover:scale-105 transition-transform duration-[1.5s]"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column - Brand Story Content */}
          <div className="lg:col-span-6 lg:pl-12 flex flex-col justify-center">
            <Reveal delay={0.1}>
              <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent font-semibold mb-6 block">
                Our Narrative
              </span>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black-luxury font-light leading-tight mb-8">
                Building Purity. <br />
                <span className="italic text-accent">Crafting Sophistication.</span>
              </h2>
            </Reveal>

            <div className="space-y-6 text-black-luxury/75 text-sm leading-relaxed tracking-wide font-light max-w-xl">
              <Reveal delay={0.3}>
                <p>
                  At Nivasan Homes, we believe that the spaces we inhabit profoundly influence our lives. We do not seek to develop traditional residential units. Instead, we design curated architectural statements that harmonise with nature, sunlight, and raw material authenticity.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p>
                  Drawing inspiration from the understated elegance of European minimalism and the warmth of mid-century modern design, our homes prioritize open-volume spacing, rich materiality, and clean graphic lines. Every residence is a bespoke study in concrete, glass, stone, and wood, built to endure for generations.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.5} className="mt-10">
              <div className="flex items-center space-x-6">
                <Button variant="text" href="/contact">
                  Begin Your Journey
                </Button>
                <div className="h-[1px] w-20 bg-accent/50" />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
