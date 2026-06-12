"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Nivasan Homes transformed our vision of a sanctuary into a stunning reality. The clean architectural lines, open spacing, and tactile concrete detail exceed every standard of luxury living.",
    author: "Dr. Aravind Swamy",
    role: "Resident",
    project: "The Pavilion Residence",
  },
  {
    quote: "The team's absolute transparency throughout construction and dedication to bespoke finish details was exceptional. They build with structural integrity and artistic intent.",
    author: "Meera Krishnan",
    role: "Collector & Proprietor",
    project: "Aether Penthouse Client",
  },
  {
    quote: "An outstanding architectural studio disguised as a developer. Nivasan doesn't just build homes; they design timeless masterpieces that set a new benchmark for luxury residences.",
    author: "Vikram & Anjali Sen",
    role: "Founder, V&A Architects",
    project: "Oasis Coastal Owner",
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-28 md:py-40 bg-background-luxury overflow-hidden relative">
      {/* Decorative quotes background */}
      <div className="absolute top-10 left-12 font-serif text-[18rem] text-black-luxury/[0.02] leading-none select-none pointer-events-none">
        “
      </div>
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <Reveal delay={0.1}>
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent font-semibold mb-6 block">
              Client Chronicles
            </span>
          </Reveal>
        </div>

        {/* Testimonial Core Slider */}
        <div className="min-h-[300px] md:min-h-[260px] flex flex-col justify-between items-center text-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              {/* Quote Mark */}
              <span className="font-serif text-6xl text-accent/60 leading-none mb-6">“</span>

              {/* Quote text */}
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-black-luxury font-light leading-relaxed max-w-4xl italic mb-10">
                {testimonials[activeIdx].quote}
              </blockquote>

              {/* Client Info */}
              <div>
                <cite className="not-italic text-xs uppercase tracking-[0.25em] text-black-luxury font-semibold block mb-1">
                  {testimonials[activeIdx].author}
                </cite>
                <span className="text-[10px] tracking-[0.2em] text-black-luxury/45 uppercase font-sans">
                  {testimonials[activeIdx].role} &bull; {testimonials[activeIdx].project}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-8 mt-16">
            <button
              onClick={handlePrev}
              className="p-3 border border-black-luxury/10 rounded-full text-black-luxury hover:border-accent hover:text-accent transition-all duration-300 focus:outline-none"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft size={16} />
            </button>
            
            <div className="text-xs tracking-[0.2em] text-black-luxury/45 font-mono">
              <span className="text-black-luxury font-bold">{(activeIdx + 1).toString().padStart(2, "0")}</span>
              <span className="mx-2">/</span>
              <span>{testimonials.length.toString().padStart(2, "0")}</span>
            </div>

            <button
              onClick={handleNext}
              className="p-3 border border-black-luxury/10 rounded-full text-black-luxury hover:border-accent hover:text-accent transition-all duration-300 focus:outline-none"
              aria-label="Next Testimonial"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
