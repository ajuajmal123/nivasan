"use client";

import React, { useState, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCcw, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectGalleryProps {
  projectId: string;
  projectName: string;
  images: string[];
}

export default function ProjectGallery({ projectId, projectName, images }: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  // Keyboard navigation support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex]);

  const handleOpen = (index: number) => {
    setActiveIndex(index);
    setZoom(1);
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
  };

  const handleClose = () => {
    setIsOpen(false);
    setZoom(1);
    document.body.style.overflow = "auto";
  };

  const handleNext = () => {
    setZoom(1);
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setZoom(1);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.5, 1));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  const getSwarnapuraaFeature = (idx: number) => {
    const features = [
      "Front Elevation",
      "Living Room",
      "Master Bedroom",
      "Kitchen Interior",
      "Dining Space",
      "Landscape View",
      "Premium Villa Entry",
      "Gated Community Pathway",
      "Architectural Details"
    ];
    return features[idx] || `Showcase Detail ${idx + 1}`;
  };

  const getVakulamFeature = (idx: number) => {
    const features = [
      "Model Kitchen",
      "Living Room",
      "Balcony View",
      "Master Suite",
      "Community Clubhouse",
      "Exterior Landscape"
    ];
    return features[idx] || `Showcase Detail ${idx + 1}`;
  };

  const getUdhyanaFeature = (idx: number) => {
    const features = ["Exterior Elevation"];
    return features[idx] || `Showcase Detail ${idx + 1}`;
  };

  const getBlissFeature = (idx: number) => {
    const features = ["Exterior Elevation"];
    return features[idx] || `Showcase Detail ${idx + 1}`;
  };

  const getRamaasFeature = (idx: number) => {
    const features = ["Exterior Elevation"];
    return features[idx] || `Showcase Detail ${idx + 1}`;
  };

  const getPlazaFeature = (idx: number) => {
    const features = ["Exterior Elevation"];
    return features[idx] || `Showcase Detail ${idx + 1}`;
  };

  const getAavaasFeature = (idx: number) => {
    const features = ["Exterior Elevation"];
    return features[idx] || `Showcase Detail ${idx + 1}`;
  };

  const getGreensFeature = (idx: number) => {
    const features = ["Exterior Elevation"];
    return features[idx] || `Showcase Detail ${idx + 1}`;
  };

  const getSpringsFeature = (idx: number) => {
    const features = ["Exterior Elevation"];
    return features[idx] || `Showcase Detail ${idx + 1}`;
  };

  const getFeature = (idx: number) => {
    if (projectId === "nivasan-swarnapuraa") return getSwarnapuraaFeature(idx);
    if (projectId === "nivasan-vakulam") return getVakulamFeature(idx);
    if (projectId === "nivasan-udhyana") return getUdhyanaFeature(idx);
    if (projectId === "nivasan-bliss") return getBlissFeature(idx);
    if (projectId === "nivasan-ramaas") return getRamaasFeature(idx);
    if (projectId === "echo-point-plaza") return getPlazaFeature(idx);
    if (projectId === "echo-point-aavaas") return getAavaasFeature(idx);
    if (projectId === "saradha-greens") return getGreensFeature(idx);
    if (projectId === "nivasan-springs") return getSpringsFeature(idx);
    return `View Detail ${idx + 1}`;
  };

  const getAltText = (idx: number) => {
    if (projectId === "nivasan-swarnapuraa") {
      return `Nivasan Swarnapuraa ${getSwarnapuraaFeature(idx)} — 4 BHK villa in Kalapatti, Coimbatore`;
    }
    if (projectId === "nivasan-vakulam") {
      return `Nivasan Vakulam ${getVakulamFeature(idx)} — 2/3 BHK apartment near Tidel Park, Coimbatore`;
    }
    if (projectId === "nivasan-udhyana") {
      return `Nivasan Udhyana ${getUdhyanaFeature(idx)} — Luxury Independent Villa near CODISSIA, Coimbatore`;
    }
    if (projectId === "nivasan-bliss") {
      return `Nivasan Bliss ${getBlissFeature(idx)} — Luxury Apartment in Avinashi Road Corridor, Coimbatore`;
    }
    if (projectId === "nivasan-ramaas") {
      return `Nivasan Ramaas ${getRamaasFeature(idx)} — Premium Apartment in Peelamedu, Coimbatore`;
    }
    if (projectId === "echo-point-plaza") {
      return `Echo Point Plaza ${getPlazaFeature(idx)} — Premium Commercial Space on Avinashi Road, Coimbatore`;
    }
    if (projectId === "echo-point-aavaas") {
      return `Echo Point Aavaas ${getAavaasFeature(idx)} — Designer Apartment on Avinashi Road, Coimbatore`;
    }
    if (projectId === "saradha-greens") {
      return `Saradha Greens ${getGreensFeature(idx)} — Ultra Luxury Villa in Peelamedu, Coimbatore`;
    }
    if (projectId === "nivasan-springs") {
      return `Nivasan Springs ${getSpringsFeature(idx)} — Premium Apartment in Peelamedu, Coimbatore`;
    }
    return `${projectName} Gallery ${idx + 1}`;
  };

  return (
    <div className="border-t border-black-luxury/10 pt-12">
      <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-black block mb-2">
        Visual Showcase
      </span>
      <h3 className="text-2xl md:text-3xl font-extrabold text-text-onyx tracking-tight mb-8 uppercase">
        Project Gallery
      </h3>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => handleOpen(index)}
            className="h-64 rounded-xl overflow-hidden border border-[#eae7e3] group cursor-pointer bg-black-luxury relative shadow-sm hover:shadow-md transition-all duration-300"
          >
            <img
              src={img}
              alt={getAltText(index)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 select-none"
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-[1600px] flex items-center justify-between text-white/70 py-2.5 px-4 z-10">
              <span className="text-xs uppercase tracking-widest font-extrabold text-white">
                {projectName} — {getFeature(activeIndex)}
              </span>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Stage (Image & Navigation) */}
            <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300 cursor-pointer z-10"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Image Container with Framing constraints */}
              <div className="w-full max-w-4xl max-h-[75vh] flex items-center justify-center overflow-hidden p-2">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex items-center justify-center"
                >
                  <motion.img
                    src={images[activeIndex]}
                    alt={getAltText(activeIndex)}
                    drag={zoom > 1}
                    dragConstraints={{
                      left: -200 * (zoom - 1),
                      right: 200 * (zoom - 1),
                      top: -200 * (zoom - 1),
                      bottom: 200 * (zoom - 1)
                    }}
                    animate={{ scale: zoom }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="max-w-full max-h-[70vh] object-contain rounded shadow-2xl pointer-events-none select-none"
                  />
                </motion.div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300 cursor-pointer z-10"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Toolbar Controls (Zoom & Numbers) */}
            <div className="w-full max-w-[1600px] flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 border-t border-white/10 z-10">
              <span className="text-xs uppercase tracking-widest font-extrabold text-white/50">
                Image {activeIndex + 1} of {images.length}
              </span>

              {/* Zoom Buttons Group */}
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/5 shadow-inner">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className="w-8 h-8 text-white hover:text-accent disabled:text-white/30 flex items-center justify-center transition-colors duration-300 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>

                {/* Vertical Divider */}
                <div className="w-[1px] h-4 bg-white/10" />

                <button
                  onClick={handleZoomReset}
                  className="text-[10px] text-white hover:text-accent font-extrabold tracking-widest uppercase px-2 transition-colors duration-300 cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw size={14} className="inline mr-1" /> {zoom.toFixed(1)}x
                </button>

                <div className="w-[1px] h-4 bg-white/10" />

                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  className="w-8 h-8 text-white hover:text-accent disabled:text-white/30 flex items-center justify-center transition-colors duration-300 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
              </div>

              {/* Guide Hint */}
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold hidden md:inline">
                Use Arrow Keys to Navigate • Esc to Close • Drag to pan zoom
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
