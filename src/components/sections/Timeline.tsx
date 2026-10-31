"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const TRACK_GAP_PX = 24; // gap-6
const AUTOPLAY_MS = 4000;

export default function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false); // true while hovered / focused
  const reduceMotion = useReducedMotion();
  const [thumb, setThumb] = useState({ width: 100, left: 0 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Gold progress bar: thumb width = visible share of the track, position = scroll position
  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const width = (track.clientWidth / track.scrollWidth) * 100;
    const progress = max > 0 ? track.scrollLeft / max : 0;
    setThumb({ width, left: progress * (100 - width) });
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    updateProgress();
    track?.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      track?.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-milestone]");
    const step = card ? card.offsetWidth + TRACK_GAP_PX : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  // Auto-advance one card at a time, looping back to the start; paused on hover/focus,
  // when the tab is hidden, and for visitors who prefer reduced motion.
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      const track = trackRef.current;
      if (!track || pausedRef.current || document.hidden) return;
      const max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= max - 2) track.scrollTo({ left: 0, behavior: "smooth" });
      else scrollByCard(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduceMotion, scrollByCard]);

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  return (
    <section id="timeline" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle background decoration grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)] bg-size-[5rem_5rem] pointer-events-none" />

      <div className="max-w-400 mx-auto px-6 md:px-12">

        {/* Header - Centered via width="full" on Reveal */}
        <div className="mb-12 md:mb-16 text-center max-w-xl mx-auto w-full">
          <Reveal delay={0.1} width="full">
            <span className="text-xs tracking-[0.3em] uppercase font-display text-accent-text font-semibold mb-4 block text-center w-full">
              Our Journey
            </span>
          </Reveal>
          <Reveal delay={0.2} width="full">
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-heading leading-tight text-center w-full">
              A Legacy in Time. <br />
              <span className="text-accent-text">Defining Generations.</span>
            </h2>
          </Reveal>
        </div>

        {/* Milestone slider: 1 card (mobile, swipe) / 2 (tablet) / 3 (desktop), CSS scroll-snap */}
        <div
          className="max-w-6xl mx-auto"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
        >
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pt-2 pb-8 -mx-2 px-2"
            aria-label="Nivasan milestones"
          >
            {milestones.map((milestone, idx) => (
              <motion.article
                key={milestone.year}
                data-milestone
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: reduceMotion ? 0 : (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group snap-start shrink-0 basis-full md:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)] bg-bg-cream border border-border rounded-xl overflow-hidden card-interactive flex flex-col"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-bg-green-soft">
                  {milestone.image ? (
                    <Image
                      src={milestone.image}
                      alt={milestone.title}
                      fill
                      sizes="(min-width: 1024px) 368px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105">
                      <LogoMark className="w-2/5" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <span className="font-display text-4xl md:text-5xl font-bold text-accent-text leading-none">
                    {milestone.year}
                  </span>
                  <h3 className="text-lg md:text-xl text-heading mt-2">
                    {milestone.title}
                  </h3>
                  <p className="text-text text-sm leading-relaxed tracking-wide font-normal">
                    {milestone.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Position: thin gold progress bar + prev/next (arrows from tablet up; mobile swipes) */}
          <div className="flex items-center gap-6">
            <div className="relative flex-1 h-0.5 bg-primary/10 rounded-full overflow-hidden" aria-hidden="true">
              <div
                className="absolute inset-y-0 bg-accent rounded-full transition-[left,width] duration-300 ease-out"
                style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
              />
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={atStart}
                aria-label="Previous milestone"
                className="btn btn-secondary w-11 h-11"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={atEnd}
                aria-label="Next milestone"
                className="btn btn-secondary w-11 h-11"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
