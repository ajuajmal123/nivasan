"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../ui/Reveal";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: "1996",
    title: "The Genesis",
    description: "Nivasan Homes was founded in Coimbatore with a clear architectural mission: to introduce geometric clarity, structural integrity, and custom construction standards to residential building.",
  },
  {
    year: "2008",
    title: "Luxury Gated Communities",
    description: "Pioneered luxury gated villa formats in prime locations. We introduced open-volume design, private courtyards, and clean-line concrete work, shifting from basic builds to spatial art.",
  },
  {
    year: "2016",
    title: "Elevating Volumetric Living",
    description: "Launched high-rise luxury apartment residences. Our designs expanded vertically, introducing double-height ceiling profiles, premium marble finishes, and floating architectural balconies.",
  },
  {
    year: "2025",
    title: "Timeless Masterpieces",
    description: "Completion of flagship works like The Pavilion Residence. Today, Nivasan Homes stands as a premier luxury developer, recognized for architectural purity, premium textures, and minimalist luxury.",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Scale the progress line height from 0% to 100%
  const scaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" ref={containerRef} className="py-28 md:py-40 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-24 md:mb-32 text-center max-w-xl mx-auto">
          <Reveal delay={0.1}>
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent font-semibold mb-6 block">
              Our Journey
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black-luxury font-light leading-tight">
              A Legacy in Time. <br />
              <span className="italic text-accent">Defining Generations.</span>
            </h2>
          </Reveal>
        </div>

        {/* Timeline body wrapper */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical central tracking line (Desktop) / Left tracking line (Mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-black-luxury/5 -translate-x-1/2" />
          
          {/* Scroll-driven gold progression line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-accent -translate-x-1/2"
          />

          {/* Milestones list */}
          <div className="space-y-20 md:space-y-32">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={milestone.year}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start"
                >
                  {/* Gold Node dot on the timeline line */}
                  <div className="absolute left-4 md:left-1/2 top-2 md:top-4 -translate-x-1/2 z-20">
                    <motion.div
                      variants={{
                        hidden: { scale: 0.8, backgroundColor: "#FFFFFF", borderColor: "rgba(179, 162, 53, 0.3)" },
                        visible: { scale: 1.2, backgroundColor: "#B3A235", borderColor: "#B3A235" }
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 0.5 }}
                      className="w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </motion.div>
                  </div>

                  {/* Left Column / Year side */}
                  <div
                    className={`pl-10 md:pl-0 md:text-right ${
                      isEven ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <Reveal delay={0.1} yOffset={20}>
                      <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-accent font-light italic">
                        {milestone.year}
                      </span>
                    </Reveal>
                  </div>

                  {/* Right Column / Content side */}
                  <div
                    className={`pl-10 md:pl-0 ${
                      isEven ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <div className="max-w-md">
                      <Reveal delay={0.2} yOffset={25}>
                        <h3 className="font-serif text-lg md:text-xl text-black-luxury font-medium mb-3">
                          {milestone.title}
                        </h3>
                      </Reveal>
                      <Reveal delay={0.3} yOffset={30}>
                        <p className="text-black-luxury/60 text-sm leading-relaxed tracking-wide font-light">
                          {milestone.description}
                        </p>
                      </Reveal>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
