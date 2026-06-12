"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  status: string;
  tag: string;
  image: string;
}

const projectsList: Project[] = [
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

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"All" | "Completed" | "Ongoing">("All");

  const filteredProjects = projectsList.filter(project => {
    if (filter === "All") return true;
    return project.status === filter;
  });

  const getStatusBadgeClass = (status: string) => {
    if (status === "Completed") {
      return "bg-emerald-600 border-emerald-600/20 text-white";
    }
    return "bg-primary border-primary/20 text-white"; // Ongoing
  };

  return (
    <main className="bg-background-luxury min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section - Centered, Heading "Our Creations" Only */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-none select-none">
            Our Creations
          </h1>
        </div>

        {/* Filters Panel - Centered with Filter Options Heading */}
        <div className="flex flex-col items-center justify-center mb-12">

          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            {(["All", "Ongoing", "Completed"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${filter === tab
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white border border-[#eae7e3] text-primary/70 hover:text-primary hover:border-primary/30"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - Fully Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group relative overflow-hidden bg-black-luxury border border-white/10 hover:border-primary/50 rounded-xl shadow-lg hover:shadow-2xl h-[440px] flex flex-col justify-end transition-all duration-500 cursor-pointer block"
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

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`text-[9px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-md border ${getStatusBadgeClass(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Text content - highly readable */}
              <div className="relative z-10 p-8 flex flex-col gap-3 drop-shadow-md">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent drop-shadow-sm">
                    {project.tag}
                  </span>
                  <h3 className="font-sans text-xl font-extrabold tracking-tight text-white group-hover:text-accent transition-colors duration-300 leading-tight">
                    {project.name}
                  </h3>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs tracking-wider uppercase font-bold text-white/80 group-hover:text-accent transition-colors duration-300">
                  <span>View Details</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
