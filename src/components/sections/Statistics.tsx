"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  description: string;
  numStr: string;
  iconSvg: React.ReactNode;
}

function StatCard({ value, suffix = "", label, description, numStr, iconSvg }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 1.8;
      const totalMiliseconds = duration * 1000;
      const stepTime = Math.max(Math.floor(totalMiliseconds / end), 15);

      const timer = setInterval(() => {
        const increment = Math.max(Math.floor(end / 40), 1);
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="relative bg-white border border-border p-8 rounded-xl shadow-[0_4px_20px_-4px_rgba(15,120,62,0.02),0_2px_4px_rgba(15,120,62,0.01)] hover:shadow-xl hover:border-primary/40 transition-all duration-500 flex flex-col items-start text-left group overflow-hidden"
    >
      {/* Glow highlight */}
      <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-primary/0 blur-2xl group-hover:bg-primary/4 transition-all duration-500 pointer-events-none" />
      
      {/* Icon & Index Row */}
      <div className="flex items-center justify-between w-full mb-6">
        <div className="w-14 h-14 rounded-xl bg-bg-cream flex items-center justify-center border border-border text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
          {iconSvg}
        </div>
        <span className="text-[10px] font-black text-accent/35 group-hover:text-primary/30 transition-colors tracking-widest font-mono">
          {numStr}
        </span>
      </div>

      {/* Large Counter Number */}
      <div className="text-4xl font-extrabold tracking-tight leading-none mb-1 text-heading flex items-baseline">
        <span>{count.toLocaleString()}</span>
        <span className="text-xl text-primary font-bold ml-0.5">{suffix}</span>
      </div>
      
      {/* Stat Units Tag */}
      <div className="text-[9px] font-bold text-accent-text uppercase tracking-[0.2em] mb-4">
        {label}
      </div>

      {/* Card Header & Description */}
      <h3 className="text-sm font-extrabold uppercase tracking-wider mb-2 text-heading">
        {label.split(" ")[0]} Project Specs
      </h3>
      <p className="text-xs leading-relaxed text-text-muted group-hover:text-heading transition-colors">
        {description}
      </p>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="relative py-12 md:py-16 bg-bg-cream text-heading overflow-hidden border-t border-border border-b border-border">
      {/* Linear Grid lines background matching reference */}
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)] bg-size-[4rem_4rem] z-0 pointer-events-none" />
      
      {/* Smooth light highlights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-150 h-150 bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border text-[10px] font-bold tracking-widest text-primary uppercase shadow-[0_2px_10px_rgba(15,120,62,0.02)]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Heritage & Scale: Established in 1996
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl tracking-tight uppercase text-heading">
            Engineered Spaces
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-text max-w-xl">
            A high-performance portfolio of precision construction and premium residential landmarks completed across major sectors.
          </p>
        </div>

        {/* 3-Column Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <StatCard
            value={28}
            suffix="+"
            label="Years of Legacy"
            numStr="01"
            description="Established with a commitment to architectural excellence and luxury craftsmanship that endures generations."
            iconSvg={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-500 group-hover:scale-110">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            }
          />
          <StatCard
            value={35}
            suffix="+"
            label="Landmark Projects"
            numStr="02"
            description="Bespoke luxury residential developments, architectural mansions, and high-end construction landmarks."
            iconSvg={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-500 group-hover:scale-110">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
              </svg>
            }
          />
          <StatCard
            value={1200}
            suffix="+"
            label="Happy Families"
            numStr="03"
            description="Exclusive communities thriving in curated residential developments built to elevate lifestyle satisfaction."
            iconSvg={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-500 group-hover:scale-110">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}
