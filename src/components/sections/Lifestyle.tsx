"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../ui/Reveal";

interface GridItemProps {
  title: string;
  num: string;
  image: string;
  parallaxSpeed: number; // positive = scroll faster, negative = scroll slower
  colSpan: string;
  aspect: string;
}

function GalleryCard({ title, num, image, parallaxSpeed, colSpan, aspect }: GridItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Create subtle parallax offsets
  const yOffset = useTransform(scrollYProgress, [0, 1], [`${parallaxSpeed * -50}px`, `${parallaxSpeed * 50}px`]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y: yOffset }}
      className={`${colSpan} relative overflow-hidden group border border-black-luxury/5`}
    >
      <div className={`relative w-full ${aspect} overflow-hidden bg-black-luxury`}>
        {/* Dark overlay that fades out on hover */}
        <div className="absolute inset-0 bg-black-luxury/25 group-hover:bg-black-luxury/5 transition-colors duration-500 z-10" />

        <img
          src={image}
          alt={title}
          className="w-full h-[115%] absolute -top-[7.5%] object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.8s] ease-out"
        />

        {/* Text Details overlay */}
        <div className="absolute bottom-6 left-6 z-20 flex items-baseline space-x-3 text-white">
          <span className="font-serif text-[10px] tracking-widest text-accent">
            {num}
          </span>
          <span className="h-[1px] w-4 bg-accent/60" />
          <h3 className="font-serif text-lg md:text-xl font-light tracking-wide">
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function Lifestyle() {
  return (
    <section id="gallery" className="py-28 md:py-40 bg-background-luxury overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-20 md:mb-28 text-center max-w-xl mx-auto">
          <Reveal delay={0.1}>
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent font-semibold mb-6 block">
              The Nivasan Life
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black-luxury font-light leading-tight">
              A Curated Lifestyle. <br />
              <span className="italic text-accent">Timeless Spaces.</span>
            </h2>
          </Reveal>
        </div>

        {/* Asymmetrical Parallax Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Card 1: Architecture */}
          <GalleryCard
            title="Architecture"
            num="01"
            image="/images/project1.png"
            parallaxSpeed={-0.3}
            colSpan="md:col-span-5"
            aspect="aspect-[3/4]"
          />

          {/* Card 2: Interiors */}
          <GalleryCard
            title="Interiors"
            num="02"
            image="/images/project2.png"
            parallaxSpeed={0.2}
            colSpan="md:col-span-7"
            aspect="aspect-[16/10]"
          />

          {/* Card 3: Landscapes */}
          <GalleryCard
            title="Landscapes"
            num="03"
            image="/images/brand_story.png"
            parallaxSpeed={-0.2}
            colSpan="md:col-span-7"
            aspect="aspect-[16/10]"
          />

          {/* Card 4: Community */}
          <GalleryCard
            title="Community"
            num="04"
            image="/images/hero_bg.png"
            parallaxSpeed={0.3}
            colSpan="md:col-span-5"
            aspect="aspect-[3/4]"
          />

        </div>

      </div>
    </section>
  );
}
