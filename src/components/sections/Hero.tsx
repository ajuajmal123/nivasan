"use client";

import React, { useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black-luxury flex items-center justify-center"
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 w-full h-full opacity-35 select-none pointer-events-none z-0">
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

      {/* Dark gradient overlay matching reference site structure */}
      <div className="absolute inset-0 bg-gradient-to-b from-black-luxury/80 via-black-luxury/60 to-black-luxury z-10 pointer-events-none" />

      {/* Grid Pattern Overlay matching reference site */}
      <div className="absolute inset-0 grid-pattern-dark z-10 pointer-events-none" />

      {/* Content wrapper - Centered */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 sm:gap-7">
          
          {/* Heading */}
          <h1 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] text-center whitespace-nowrap">
            Welcome to Nivasan Homes
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-xs sm:text-sm tracking-[0.25em] uppercase text-center font-extrabold mt-2">
            LUXURY VILLAS & APARTMENTS IN COIMBATORE
          </p>
        </div>
      </div>

      {/* Side Vertical Lines matching reference layout */}
      <div className="absolute inset-y-0 left-[8%] w-[1px] bg-white/[0.02] hidden lg:block pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-[8%] w-[1px] bg-white/[0.02] hidden lg:block pointer-events-none z-10" />
    </section>
  );
}
