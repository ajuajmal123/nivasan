import React from "react";
import type { Metadata } from "next";
import Lifestyle from "@/components/sections/Lifestyle";

export const metadata: Metadata = {
  title: "Showcase Gallery | Premium Residences & Luxury Villas | Nivasan Homes",
  description: "Step inside Nivasan Homes' luxurious residences. Browse our showcase gallery of modern design, bespoke architecture, premium layouts, and exquisite gated communities in Coimbatore.",
  keywords: ["Nivasan Gallery", "Luxury Gated Villas Coimbatore", "Modern Villa Interiors", "Premium Real Estate Coimbatore"],
};

export default function GalleryPage() {
  return (
    <main className="flex-1 pt-20">
      <Lifestyle />
    </main>
  );
}
