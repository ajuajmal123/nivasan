"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../ui/Logo";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              document.body.style.overflow = "unset";
              onComplete();
            }, 800); // Luxury slow exit transition
          }, 500); // Hold at 100%
          return 100;
        }
        const diff = Math.floor(Math.random() * 20) + 5;
        return Math.min(prev + diff, 100);
      });
    }, 180);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 bg-primary flex flex-col items-center justify-between p-12 text-white"
        >
          {/* Logo / Brand Header */}
          <div className="w-full flex justify-between items-center text-white/30 text-[9px] tracking-[0.25em] font-sans">
            <span>NIVASAN HOMES</span>
            <span>EST. 1996</span>
          </div>

          {/* Central Animated Logo */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Logo size={100} showText={true} textColor="white" />
            </motion.div>
          </div>

          {/* Progress Indicator */}
          <div className="w-full max-w-xs md:max-w-md flex flex-col items-center space-y-4">
            <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
                className="absolute top-0 left-0 h-full bg-accent"
              />
            </div>
            
            <div className="w-full flex justify-between items-baseline">
              <span className="text-white/30 text-[8px] tracking-[0.2em] uppercase font-sans">
                LOADING EXPERIENCE
              </span>
              <span className="text-accent text-3xl font-light font-serif">
                {progress.toString().padStart(3, "0")}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
