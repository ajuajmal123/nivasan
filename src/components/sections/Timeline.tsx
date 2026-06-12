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
    year: "2010",
    title: "Nivasan Homes Founded",
    description: "Established with a vision to deliver quality homes in Coimbatore with customer-first values and ethical practices.",
  },
  {
    year: "2013",
    title: "First Projects Delivered",
    description: "Early premium apartment projects demonstrated the Nivasan commitment to quality and on-time possession.",
  },
  {
    year: "2016",
    title: "Nivasan Bliss & Ramaas",
    description: "Landmark luxury apartment developments on Avinashi Road set new standards for premium living in the city.",
  },
  {
    year: "2019",
    title: "Echo Point Projects",
    description: "Expanded into commercial real estate with Echo Point Plaza premium offices and retail opposite KMCH.",
  },
  {
    year: "2022",
    title: "CREDAI Membership",
    description: "Recognised as a leading Coimbatore developer with formal affiliation to the industry apex body CREDAI.",
  },
  {
    year: "2024",
    title: "Swarnapuraa & Vakulam",
    description: "Two simultaneous RERA-registered active projects premium villas and apartments serving multiple buyer profiles.",
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
    <section id="timeline" ref={containerRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle background decoration grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Header - Centered via width="full" on Reveal */}
        <div className="mb-12 md:mb-16 text-center max-w-xl mx-auto w-full">
          <Reveal delay={0.1} width="full">
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent font-semibold mb-4 block text-center w-full">
              Our Journey
            </span>
          </Reveal>
          <Reveal delay={0.2} width="full">
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-black-luxury leading-tight text-center w-full">
              A Legacy in Time. <br />
              <span className="text-accent">Defining Generations.</span>
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
          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={milestone.year}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start"
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
                      className="w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center shadow-md"
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
                      <span className="font-sans text-4xl md:text-5xl lg:text-6xl text-accent font-extrabold drop-shadow-sm">
                        {milestone.year}
                      </span>
                    </Reveal>
                  </div>

                  {/* Right Column / Content side - Premium Card Container */}
                  <div
                    className={`pl-10 md:pl-0 ${
                      isEven ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <div className="max-w-md bg-background-luxury border border-[#eae7e3] hover:border-accent hover:shadow-xl hover:shadow-primary/5 p-6 rounded-xl transition-all duration-300 group">
                      <Reveal delay={0.2} yOffset={25}>
                        <h3 className="font-sans text-lg md:text-xl text-black-luxury font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                          {milestone.title}
                        </h3>
                      </Reveal>
                      <Reveal delay={0.3} yOffset={30}>
                        <p className="text-black-luxury/80 text-sm leading-relaxed tracking-wide font-medium">
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
