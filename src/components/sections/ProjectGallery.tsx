"use client";

import React, { useState, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCcw, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProjectGalleryProps {
  projectId: string;
  projectName: string;
  images: string[];
}

export default function ProjectGallery({ projectId, projectName, images }: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const handleOpen = (index: number) => {
    setActiveIndex(index);
    setZoom(1);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setZoom(1);
  };

  const handleNext = () => {
    setZoom(1);
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setZoom(1);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Lock background scroll while the lightbox is open; always restored on close or unmount
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Keyboard navigation support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setZoom(1);
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setZoom(1);
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setZoom(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

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
      return `Nivasan Springs ${getSpringsFeature(idx)} — Premium Apartment in Gandhi Nagar, Vilankurichi, Coimbatore`;
    }
    return `${projectName} Gallery ${idx + 1}`;
  };

  // Don't render an empty "Project Gallery" heading when a project has no images
  if (images.length === 0) return null;

  return (
    <div id="project-gallery" className="border-t border-border pt-12">
      <span className="text-xs uppercase font-display tracking-[0.3em] text-accent-text font-black block mb-2">
        Visual Showcase
      </span>
      <h3 className="text-2xl md:text-3xl font-extrabold text-heading tracking-tight mb-8 uppercase">
        Project Gallery
      </h3>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => handleOpen(index)}
            className="h-64 rounded-xl overflow-hidden border border-border group cursor-pointer bg-bg-green-soft relative shadow-sm card-interactive"
          >
            <Image
              src={img}
              alt={getAltText(index)}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="w-full h-full object-cover scale-100 transition-transform duration-300 ease-out group-hover:scale-105"
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
            role="dialog"
            aria-modal="true"
            aria-label={`${projectName} image gallery`}
            className="fixed inset-0 z-100 bg-white/95 backdrop-blur-md flex flex-col items-center justify-between p-4 select-none"
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-400 flex items-center justify-between text-text py-2.5 px-4 z-10">
              <span className="text-xs uppercase tracking-widest font-extrabold text-heading">
                {projectName} — {getFeature(activeIndex)}
              </span>
              <button
                onClick={handleClose}
                aria-label="Close gallery"
                className="btn btn-secondary w-10 h-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Stage (Image & Navigation) */}
            <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="btn btn-secondary absolute left-4 w-12 h-12 pointer-events-auto z-10"
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
                aria-label="Next image"
                className="btn btn-secondary absolute right-4 w-12 h-12 pointer-events-auto z-10"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Toolbar Controls (Zoom & Numbers) */}
            <div className="w-full max-w-400 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 border-t border-border z-10">
              <span className="text-xs uppercase tracking-widest font-extrabold text-text-muted">
                Image {activeIndex + 1} of {images.length}
              </span>

              {/* Zoom Buttons Group */}
              <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full border border-border shadow-inner">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className="w-8 h-8 text-primary hover:text-primary-hover disabled:text-text-muted/50 flex items-center justify-center transition-colors duration-300 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>

                {/* Vertical Divider */}
                <div className="w-px h-4 bg-primary/10" />

                <button
                  onClick={handleZoomReset}
                  className="label-caps text-primary hover:text-primary-hover px-2 transition-colors duration-300 cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw size={14} className="inline mr-1" /> {zoom.toFixed(1)}x
                </button>

                <div className="w-px h-4 bg-primary/10" />

                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  className="w-8 h-8 text-primary hover:text-primary-hover disabled:text-text-muted/50 flex items-center justify-center transition-colors duration-300 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
              </div>

              {/* Guide Hint */}
              <span className="label-caps text-text-muted hidden md:inline">
                Use Arrow Keys to Navigate • Esc to Close • Drag to pan zoom
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
