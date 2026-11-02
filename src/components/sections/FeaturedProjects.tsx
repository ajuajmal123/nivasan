"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  status: string;
  tag: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "nivasan-swarnapuraa",
    name: "Nivasan Swarnapuraa",
    status: "Ongoing",
    tag: "Premium 4 BHK Gated Villas",
    image: "/covers/nivasan-swarnapuraa.webp",
  },
  {
    id: "nivasan-vakulam",
    name: "Nivasan Vakulam",
    status: "Ongoing",
    tag: "Premium 2 & 3 BHK Apartments",
    image: "/covers/nivasan-vakulam.webp",
  },
  {
    id: "nivasan-udhyana",
    name: "Nivasan Udhyana",
    status: "Completed",
    tag: "Ultra Luxury Gated Villas",
    image: "/covers/nivasan-udhyana.webp",
  },
  {
    id: "nivasan-bliss",
    name: "Nivasan Bliss",
    status: "Completed",
    tag: "Luxury Residential Apartments",
    image: "/covers/nivasan-bliss.webp",
  },
  {
    id: "nivasan-ramaas",
    name: "Nivasan Ramaas",
    status: "Completed",
    tag: "Premium Residential Apartments",
    image: "/covers/nivasan-ramaas.webp",
  },
  {
    id: "echo-point-plaza",
    name: "Echo Point Plaza",
    status: "Completed",
    tag: "Premium Commercial Spaces",
    image: "/covers/echo-point-plaza.webp",
  },
  {
    id: "echo-point-aavaas",
    name: "Echo Point Aavaas",
    status: "Completed",
    tag: "Designer Luxury Apartments",
    image: "/covers/echo-point-aavaas.webp",
  },
  {
    id: "saradha-greens",
    name: "Saradha Greens",
    status: "Completed",
    tag: "Ultra Luxury Independent Villas",
    image: "/covers/saradha-greens.webp",
  },
  {
    id: "nivasan-springs",
    name: "Nivasan Springs",
    status: "Completed",
    tag: "Premium Residential Apartments",
    image: "/covers/nivasan-springs.webp",
  },
];

export default function FeaturedProjects() {
  const getStatusBadgeClass = (status: string) => {
    if (status === "Completed") {
      return "bg-primary border-primary/20 text-white";
    }
    return "bg-accent-text border-accent-text/20 text-white"; // Ongoing (Golden)
  };

  return (
    <section id="projects" className="relative py-12 md:py-16 bg-white overflow-hidden border-b border-border">
      {/* Linear backdrop grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)] bg-size-[5rem_5rem] pointer-events-none" />

      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 flex flex-col items-center gap-4">
          <h2 className="font-sans font-extrabold text-2xl sm:text-4xl tracking-tight uppercase text-heading">
            Landmark Projects
          </h2>
        </div>

        {/* 3-Column Projects Grid - Staggered Animated */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-400 mx-auto">
          {projects.slice(0, 3).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group relative overflow-hidden bg-bg-green-soft border border-border rounded-xl shadow-lg card-interactive aspect-3/4 w-full flex flex-col justify-end cursor-pointer"
              >
                {/* Background image */}
                <div className="absolute -inset-0.75 z-0 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    loading="eager"
                    className="w-full h-full object-cover scale-100 transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Top Left Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`label-caps px-3.5 py-1.5 rounded-full shadow-md border ${getStatusBadgeClass(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Bottom content details - Name and Tag with high legibility drop shadow */}
                <div className="relative z-10 p-6 pt-16 flex flex-col gap-1.5 bg-linear-to-t from-heading/90 via-heading/60 to-transparent">
                  <span className="label-caps text-white/90 text-shadow-on-dark-media">
                    {project.tag}
                  </span>
                  <h3 className="font-sans text-xl font-extrabold tracking-tight leading-tight text-accent text-shadow-on-dark-media">
                    {project.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View More Projects Link */}
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="btn btn-secondary btn-md"
          >
            View More Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
