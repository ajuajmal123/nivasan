import React from "react";
import type { Metadata } from "next";
import ProjectsList from "./ProjectsList";

export const metadata: Metadata = {
  title: "Our Projects | Premium Villas & Apartments in Coimbatore | Nivasan Homes",
  description: "Explore Nivasan Homes' range of luxury 4 BHK gated villas and premium 2 & 3 BHK apartments in Coimbatore. Discover timeless craftsmanship, modern architecture, and high-end specs.",
  keywords: ["Nivasan Swarnapuraa", "Nivasan Vakulam", "Luxury Apartments Coimbatore", "Gated Communities Coimbatore", "Premium Villas Tamil Nadu"],
};

export default function ProjectsPage() {
  return <ProjectsList />;
}
