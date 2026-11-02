"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import LogoMark from "../ui/LogoMark";

interface Milestone {
  year: string;
  title: string;
  description: string;
  image: string | null; // null -> brand panel with the logo mark
}

const milestones: Milestone[] = [
  {
    year: "2010",
    title: "Nivasan Homes Founded",
    description: "Established with a vision to deliver quality homes in Coimbatore with customer-first values and ethical practices.",
    image: null,
  },
  {
    year: "2013",
    title: "First Projects Delivered",
    description: "Early premium apartment projects demonstrated the Nivasan commitment to quality and on-time possession.",
    image: "/completed/p8/1.png",
  },
  {
    year: "2016",
    title: "Nivasan Bliss & Ramaas",
    description: "Landmark luxury apartment developments on Avinashi Road set new standards for premium living in the city.",
    image: "/completed/p2/1.png",
  },
  {
    year: "2019",
    title: "Echo Point Projects",
    description: "Expanded into commercial real estate with Echo Point Plaza premium offices and retail opposite KMCH.",
    image: "/completed/p4/1.png",
  },
  {
    year: "2022",
    title: "CREDAI Membership",
    description: "Recognised as a leading Coimbatore developer with formal affiliation to the industry apex body CREDAI.",
    image: "/completed/p11/1.png",
  },
  {
    year: "2024",
    title: "Swarnapuraa & Vakulam",
    description: "Two simultaneous RERA-registered active projects premium villas and apartments serving multiple buyer profiles.",
    image: "/ongoing/p1/image.png",
  },
];

const AUTOPLAY_MS = 2000;
const SWIPE_PX = 40;

// Circular distance from the active card: 0 = centre, -1/+1 = peeking neighbours, beyond = hidden
function offsetFrom(idx: number, active: number) {
  const n = milestones.length;
  let d = (idx - active + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

export default function Timeline() {
  const pausedRef = useRef(false); // true while hovered / focused / touched
  const swipeStartRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0); // 2010 starts in the centre

  const goTo = useCallback((index: number) => {
    setActive((index + milestones.length) % milestones.length);
  }, []);

  // Auto-advance (loops); paused on hover/focus/touch, when the tab is hidden, and for reduced motion
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      setActive((current) => (current + 1) % milestones.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  // Horizontal swipe (touch or mouse drag) moves one card; vertical page scroll is left alone
  const onPointerDown = (e: React.PointerEvent) => { swipeStartRef.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStartRef.current === null) return;
    const dx = e.clientX - swipeStartRef.current;
    swipeStartRef.current = null;
    if (Math.abs(dx) >= SWIPE_PX) goTo(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section id="timeline" className="py-12 md:py-16 bg-white relative overflow-hidden">
      {/* Subtle background decoration grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)] bg-size-[5rem_5rem] pointer-events-none" />

      <div className="max-w-400 mx-auto px-6 md:px-12">

        {/* Header - Centered via width="full" on Reveal */}
        <div className="mb-8 md:mb-12 text-center max-w-xl mx-auto w-full">
          <Reveal delay={0.1} width="full">
            <span className="text-xs tracking-[0.3em] uppercase font-display text-accent-text font-semibold mb-4 block text-center w-full">
              Our Journey
            </span>
          </Reveal>
          <Reveal delay={0.2} width="full">
            <h2 className="font-sans text-xl sm:text-3xl md:text-4xl font-extrabold text-heading leading-tight text-center w-full">
              A Legacy in Time. <br />
              <span className="text-accent-text">Defining Generations.</span>
            </h2>
          </Reveal>
        </div>

        {/* Centre-focus carousel: active milestone large in the middle, neighbours smaller and dimmed at the edges */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
        >
          <div
            className="relative h-120 md:h-125 mb-8 touch-pan-y select-none"
            aria-roledescription="carousel"
            aria-label="Nivasan milestones"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { swipeStartRef.current = null; }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") goTo(active - 1);
              if (e.key === "ArrowRight") goTo(active + 1);
            }}
          >
            {milestones.map((milestone, idx) => {
              const d = offsetFrom(idx, active);
              const isActive = d === 0;
              const isVisible = Math.abs(d) <= 1;
              return (
                <article
                  key={milestone.year}
                  aria-hidden={!isVisible}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => !isActive && goTo(idx)}
                  style={{
                    transform: `translateX(calc(-50% + ${d * 92}%)) scale(${isActive ? 1 : 0.82})`,
                    opacity: isActive ? 1 : isVisible ? 0.5 : 0,
                    zIndex: isActive ? 20 : isVisible ? 10 : 0,
                  }}
                  className={`absolute top-0 left-1/2 h-full w-[82%] sm:w-[60%] md:w-[48%] lg:w-[38%] bg-bg-cream border rounded-xl overflow-hidden flex flex-col transition-[transform,opacity,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isActive ? "border-accent/40 shadow-xl" : "border-border shadow-sm"
                  } ${isVisible ? (isActive ? "" : "cursor-pointer") : "pointer-events-none"}`}
                >
                  <div className="relative h-[42%] shrink-0 overflow-hidden bg-bg-green-soft">
                    {milestone.image ? (
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        fill
                        draggable={false}
                        sizes="(min-width: 1024px) 440px, (min-width: 768px) 48vw, 82vw"
                        className={`object-cover transition-transform duration-700 ease-out ${isActive ? "scale-105" : "scale-100"}`}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <LogoMark className="w-1/3 max-w-32" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 md:p-6 flex flex-col gap-2">
                    <span className="font-display font-bold text-accent-text text-3xl md:text-4xl leading-none">
                      {milestone.year}
                    </span>
                    <h3 className="text-lg md:text-xl text-heading mt-2">
                      {milestone.title}
                    </h3>
                    <p className="text-text text-sm leading-relaxed tracking-wide font-normal">
                      {milestone.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Position: thin gold progress bar */}
          <div className="relative max-w-md mx-auto h-1 bg-primary/10 rounded-full overflow-hidden" aria-hidden="true">
            <div
              className="absolute inset-y-0 left-0 bg-accent rounded-full transition-[width] duration-500 ease-out"
              style={{ width: `${((active + 1) / milestones.length) * 100}%` }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
