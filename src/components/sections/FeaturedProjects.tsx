import React from "react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  status: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "01",
    name: "The Pavilion Residence",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "02",
    name: "Aether Penthouse",
    status: "Ongoing",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "03",
    name: "Oasis Coastal Retreat",
    status: "Ongoing",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
];

export default function FeaturedProjects() {
  const getStatusBadgeClass = (status: string) => {
    if (status === "Completed") return "bg-[#10b981] border-[#10b981]/20 text-white";
    return "bg-primary border-primary/20 text-white"; // Ongoing
  };

  return (
    <section id="projects" className="relative py-24 bg-white overflow-hidden border-b border-[#eae7e3]">
      {/* Linear backdrop grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Portfolio
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight uppercase text-black-luxury">
            Landmark Projects
          </h2>
        </div>

        {/* 3-Column Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div key={project.id}>
              <Link
                href="/projects"
                className="group relative overflow-hidden bg-[#1c1a17] border border-white/10 hover:border-primary/50 rounded-xl shadow-lg hover:shadow-2xl h-[440px] flex flex-col justify-end transition-all duration-500 cursor-pointer block"
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

                {/* Top Left Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`text-[9px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-md border ${getStatusBadgeClass(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Bottom content details - Name only */}
                <div className="relative z-10 p-6 flex flex-col gap-2">
                  <h3 className="font-sans text-xl font-extrabold tracking-tight text-white leading-tight">
                    {project.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
