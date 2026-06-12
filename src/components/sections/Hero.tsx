"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black-luxury flex items-center justify-center"
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/herovideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Grid Pattern Overlay matching reference site */}
      <div className="absolute inset-0 grid-pattern-dark z-10 pointer-events-none" />

      {/* Content wrapper - Centered */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5 sm:gap-6">
          
          {/* Animated Heading - Single Line */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-extrabold text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-none text-center drop-shadow-lg whitespace-nowrap select-none"
          >
            Welcome to <span className="text-accent">Nivasan Homes</span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/95 text-[9px] sm:text-xs tracking-[0.25em] uppercase text-center font-extrabold mt-2 drop-shadow-md select-none"
          >
            LUXURY VILLAS & APARTMENTS IN COIMBATORE
          </motion.p>
        </div>
      </div>

      {/* Side Vertical Lines matching reference layout */}
      <div className="absolute inset-y-0 left-[8%] w-[1px] bg-white/[0.02] hidden lg:block pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-[8%] w-[1px] bg-white/[0.02] hidden lg:block pointer-events-none z-10" />
    </section>
  );
}
