"use client";

import React from "react";
import Link from "next/link";
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
    image: "/ongoing/p1/image.png",
  },
  {
    id: "nivasan-vakulam",
    name: "Nivasan Vakulam",
    status: "Ongoing",
    tag: "Premium 2 & 3 BHK Apartments",
    image: "/ongoing/p2/image2.png",
  },
  {
    id: "nivasan-udhyana",
    name: "Nivasan Udhyana",
    status: "Completed",
    tag: "Ultra Luxury Gated Villas",
    image: "/completed/p1/image.png",
  },
  {
    id: "nivasan-bliss",
    name: "Nivasan Bliss",
    status: "Completed",
    tag: "Luxury Residential Apartments",
    image: "/completed/p2/image.png",
  },
  {
    id: "nivasan-ramaas",
    name: "Nivasan Ramaas",
    status: "Completed",
    tag: "Premium Residential Apartments",
    image: "/completed/p3/image.png",
  },
  {
    id: "echo-point-plaza",
    name: "Echo Point Plaza",
    status: "Completed",
    tag: "Premium Commercial Spaces",
    image: "/completed/p4/image.png",
  },
  {
    id: "echo-point-aavaas",
    name: "Echo Point Aavaas",
    status: "Completed",
    tag: "Designer Luxury Apartments",
    image: "/completed/p5/image.png",
  },
  {
    id: "saradha-greens",
    name: "Saradha Greens",
    status: "Completed",
    tag: "Ultra Luxury Independent Villas",
    image: "/completed/p6/image.png",
  },
  {
    id: "nivasan-springs",
    name: "Nivasan Springs",
    status: "Completed",
    tag: "Premium Residential Apartments",
    image: "/completed/p7/image.png",
  },
];

export default function FeaturedProjects() {
  const getStatusBadgeClass = (status: string) => {
    if (status === "Completed") {
      return "bg-emerald-600 border-emerald-600/20 text-white";
    }
    return "bg-primary border-primary/20 text-white"; // Ongoing
  };

  return (
    <section id="projects" className="relative py-24 bg-white overflow-hidden border-b border-[#eae7e3]">
      {/* Linear backdrop grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight uppercase text-black-luxury">
            Landmark Projects
          </h2>
        </div>

        {/* 3-Column Projects Grid - Staggered Animated */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
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
                className="group relative overflow-hidden bg-[#1c1a17] border border-white/10 hover:border-primary/50 rounded-xl shadow-lg hover:shadow-2xl aspect-[3/4] w-full flex flex-col justify-end transition-all duration-500 cursor-pointer block"
              >
                {/* Background image & gradient overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-luxury/95 via-black-luxury/70 to-transparent transition-opacity duration-500" />
                </div>

                {/* Top Left Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`text-[9px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-md border ${getStatusBadgeClass(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Bottom content details - Name and Tag with high legibility drop shadow */}
                <div className="relative z-10 p-6 flex flex-col gap-1.5 drop-shadow-md">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent drop-shadow-sm">
                    {project.tag}
                  </span>
                  <h3 className="font-sans text-xl font-extrabold tracking-tight text-white leading-tight">
                    {project.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View More Projects Link */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-extrabold text-primary hover:text-accent transition-colors duration-300 group/link cursor-pointer border border-primary/20 hover:border-accent px-8 py-3.5 rounded-full bg-white shadow-sm hover:shadow"
          >
            View More Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
