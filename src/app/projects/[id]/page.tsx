"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

interface ProjectDetails {
  id: string;
  name: string;
  status: string;
  location: string;
  description: string;
  mapEmbedUrl: string;
  images: string[];
  specs: { label: string; value: string }[];
}

const projectsData: Record<string, ProjectDetails> = {
  "the-pavilion-residence": {
    id: "the-pavilion-residence",
    name: "The Pavilion Residence",
    status: "Completed",
    location: "Race Course, Coimbatore",
    description: "A minimalist sanctuary constructed from structural glass and raw off-white concrete, nestled within lush landscape screens to dissolve boundaries between nature and luxury interiors.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3262694119957!2d76.9749178!3d10.9992523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ab93a151b7%3A0x6b80cd9b9c1d6ffb!2sRace%20Course%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
    ],
    specs: [
      { label: "Project Type", value: "Luxury Villas" },
      { label: "Total Units", value: "12 Signature Estates" },
      { label: "Configuration", value: "4 & 5 BHK Smart Villas" },
      { label: "Completed Year", value: "2026" }
    ]
  },
  "aether-penthouse": {
    id: "aether-penthouse",
    name: "Aether Penthouse",
    status: "Ongoing",
    location: "Trichy Road, Coimbatore",
    description: "Elevated design meets architectural volume. A double-height luxury penthouse combining Nero Marquina marble, structural steel columns, and custom oak paneling.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.48163989189!2d76.994234!3d10.992683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859942a6adfa5%3A0x4642f5eb333dfd26!2sTrichy%20Rd%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    ],
    specs: [
      { label: "Project Type", value: "Premium Apartments" },
      { label: "Total Units", value: "24 Exclusive Residences" },
      { label: "Configuration", value: "3 & 4 BHK Duplex Penthouses" },
      { label: "Expected Delivery", value: "Q4 2027" }
    ]
  },
  "oasis-coastal-retreat": {
    id: "oasis-coastal-retreat",
    name: "Oasis Coastal Retreat",
    status: "Ongoing",
    location: "ECR, Chennai",
    description: "A brutalist coastal masterpiece that utilizes geometric concrete forms to deflect ocean winds while framing expansive ocean horizons through floor-to-ceiling glass.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8924040995077!2d80.2520336!3d12.9787163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ab93a151b7%3A0x6b80cd9b9c1d6ffb!2sEast%20Coast%20Rd%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    specs: [
      { label: "Project Type", value: "Signature Retreats" },
      { label: "Total Units", value: "8 Oceanfront Estates" },
      { label: "Configuration", value: "5 BHK Luxury Mansions" },
      { label: "Expected Delivery", value: "Q2 2028" }
    ]
  }
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const project = projectsData[id];

  if (!project) {
    return (
      <main className="bg-background-luxury min-h-screen pt-32 pb-24 font-sans flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Project Not Found</h2>
          <button
            onClick={() => router.push("/projects")}
            className="text-accent font-bold hover:underline cursor-pointer"
          >
            Back to Projects
          </button>
        </div>
      </main>
    );
  }

  const getStatusBadgeClass = (status: string) => {
    if (status === "Completed") return "bg-[#10b981] text-white";
    return "bg-primary text-white";
  };

  return (
    <main className="bg-background-luxury min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => router.push("/projects")}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary/60 hover:text-primary transition-colors duration-300 mb-8 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Projects
        </button>

        {/* Title & Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-black-luxury/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-sm ${getStatusBadgeClass(project.status)}`}>
                {project.status}
              </span>
              <span className="text-xs text-primary/50 font-bold uppercase tracking-wider flex items-center gap-1">
                <MapPin size={12} className="text-accent" /> {project.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
              {project.name}
            </h1>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Main Details and Spec Sheet */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Description */}
            <div className="bg-white border border-[#eae7e3] p-8 rounded-xl">
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-black-luxury/5 pb-3">
                Project Overview
              </h3>
              <p className="text-primary/70 text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Spec sheet */}
            <div className="bg-white border border-[#eae7e3] p-8 rounded-xl">
              <h3 className="text-lg font-bold text-primary mb-6 border-b border-black-luxury/5 pb-3">
                Specifications & Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.specs.map((spec, index) => (
                  <div key={index} className="flex flex-col border-b border-black-luxury/5 pb-2">
                    <span className="text-[10px] uppercase tracking-wider text-primary/40 font-bold">
                      {spec.label}
                    </span>
                    <span className="text-sm text-primary font-bold mt-1">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Map Block */}
          <div className="lg:col-span-5 h-[350px] lg:h-full min-h-[350px] bg-white border border-[#eae7e3] rounded-xl overflow-hidden p-3 flex flex-col justify-between">
            <h3 className="text-sm font-bold text-primary px-3 pt-2 pb-3 flex items-center gap-2">
              <MapPin size={16} className="text-accent" /> Location Map
            </h3>
            <div className="flex-1 rounded-lg overflow-hidden border border-[#eae7e3]">
              <iframe
                src={project.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${project.name} Location Map`}
              />
            </div>
          </div>
        </div>

        {/* Project Image Gallery Section */}
        <div className="border-t border-black-luxury/10 pt-16">
          <h3 className="text-2xl font-extrabold text-primary tracking-tight mb-8">
            Project Showcase Gallery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {project.images.map((img, index) => (
              <div key={index} className="h-64 rounded-xl overflow-hidden border border-[#eae7e3] group cursor-pointer bg-black-luxury relative">
                <img
                  src={img}
                  alt={`${project.name} Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
