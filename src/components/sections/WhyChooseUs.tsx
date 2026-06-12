"use client";

import React from "react";

interface ValueCardProps {
  iconSvg: React.ReactNode;
  title: string;
  description: string;
  badgeColorClass: string;
  lineColorClass: string;
}

function ValueCard({ iconSvg, title, description, badgeColorClass, lineColorClass }: ValueCardProps) {
  return (
    <div className="flex flex-col items-center text-center group max-w-sm mx-auto">
      {/* Circle Icon Container */}
      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 mb-6 shrink-0 ${badgeColorClass}`}>
        {iconSvg}
      </div>

      {/* Value Title */}
      <h3 className="font-sans text-base font-extrabold tracking-wider uppercase mb-3 text-black-luxury">
        {title}
      </h3>

      {/* Growing colored underline indicator */}
      <div className={`w-8 h-[2px] opacity-60 my-1 transition-all duration-300 group-hover:w-16 rounded-full ${lineColorClass}`} />

      {/* Description */}
      <p className="text-[#6D675E] text-xs leading-relaxed mt-3 group-hover:text-black-luxury transition-colors font-light">
        {description}
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-[#f7f6f4] text-[#1c1a17] overflow-hidden border-b border-[#eae7e3]">
      {/* Backdrop linear grid matching reference */}
      <div className="absolute inset-0 opacity-[0.012] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Core Beliefs
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight uppercase text-black-luxury">
            Our Corporate Values
          </h2>
          <p className="text-sm leading-relaxed text-[#4F4C42] max-w-xl">
            The foundation of our business execution, engineering ethics, and long-standing partnership legacy completed since 1996.
          </p>
        </div>

        {/* 3-Column Corporate Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          <ValueCard
            title="Customer Satisfaction"
            badgeColorClass="bg-primary shadow-primary/20"
            lineColorClass="bg-primary"
            description="We strive to understand our customers' needs and to deliver products and services that fulfil and exceed all their requirements. In doing so, we become partners in fulfilling their mission."
            iconSvg={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="m11 17 2 2a1 1 0 1 0 3-3"></path>
                <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path>
                <path d="m21 3 1 11h-2"></path>
                <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path>
                <path d="M3 4h8"></path>
              </svg>
            }
          />
          <ValueCard
            title="Reliability & High Quality"
            badgeColorClass="bg-accent shadow-accent/20"
            lineColorClass="bg-accent"
            description="We are committed to delivering products and services that conform to highest standards of design, manufacture, reliability, maintainability and fitness for use as desired by our customers."
            iconSvg={
              <svg xmlns="http://www.w3.org/2005/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <circle cx="12" cy="8" r="6"></circle>
                <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
              </svg>
            }
          />
          <ValueCard
            title="Cost & Time Consciousness"
            badgeColorClass="bg-black-luxury shadow-black-luxury/20"
            lineColorClass="bg-black-luxury"
            description="We believe in reducing cost and shortening the delivery period of our products and services. High quality and cost-effectiveness are achieved by eliminating waste in all activities."
            iconSvg={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}
