"use client";

import React, { useRef } from "react";
import { motion, useInView, UseInViewOptions } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit" | "full";
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  width = "fit",
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewOptions: UseInViewOptions = {
    once: once,
    margin: "-5% 0px -5% 0px" // Trigger slightly before it hits view
  };
  const isInView = useInView(ref, inViewOptions);

  return (
    <div
      ref={ref}
      className={`${width === "full" ? "w-full" : "w-fit"} relative`}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: yOffset },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1], // Luxury deceleration curve
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
