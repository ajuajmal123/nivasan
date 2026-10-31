"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

// The running Lenis instance, so nav code can scroll through it instead of fighting it
let activeLenis: Lenis | null = null;
export const getLenis = () => activeLenis;

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // elegant deceleration ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });
    activeLenis = lenis;

    // Foolproof browser requestAnimationFrame loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (activeLenis === lenis) activeLenis = null;
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
