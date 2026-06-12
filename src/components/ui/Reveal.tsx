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
    margin: "-10% 0px -10% 0px" // Trigger slightly before it hits fully in view
  };
  const isInView = useInView(ref, inViewOptions);

  return (
    <div
      ref={ref}
      className={`${width === "full" ? "w-full" : "w-fit"} overflow-hidden`}
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
          ease: [0.16, 1, 0.3, 1], // Luxury deceleration bezier curve
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
