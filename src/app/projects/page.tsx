"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  status: string;
  image: string;
}

const projectsList: Project[] = [
  {
    id: "the-pavilion-residence",
    name: "The Pavilion Residence",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "aether-penthouse",
    name: "Aether Penthouse",
    status: "Ongoing",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "oasis-coastal-retreat",
    name: "Oasis Coastal Retreat",
    status: "Ongoing",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"All" | "Completed" | "Ongoing">("All");

  const filteredProjects = projectsList.filter(project => {
    if (filter === "All") return true;
    return project.status === filter;
  });

  const getStatusBadgeClass = (status: string) => {
    if (status === "Completed") return "bg-[#10b981] border-[#10b981]/20 text-white";
    return "bg-primary border-primary/20 text-white"; // Ongoing
  };

  return (
    <main className="bg-background-luxury min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-3">
            Our Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-none mb-6">
            Luxury Creations
          </h1>
          <p className="text-primary/70 text-base leading-relaxed">
            Discover our collection of landmark residential developments across South India, designed with uncompromising attention to detail.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-4 scrollbar-none">
          {(["All", "Ongoing", "Completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === tab
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white border border-[#eae7e3] text-primary/70 hover:text-primary hover:border-primary/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black-luxury/95 via-black-luxury/60 to-transparent transition-opacity duration-500" />
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`text-[9px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-md border ${getStatusBadgeClass(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Text content - highly readable */}
              <div className="relative z-10 p-8 flex flex-col gap-4">
                <h3 className="font-sans text-xl font-extrabold tracking-tight text-white group-hover:text-accent transition-colors duration-300 leading-tight">
                  {project.name}
                </h3>
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
