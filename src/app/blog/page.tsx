import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Journal & Insights | Nivasan Chronicles | Nivasan Homes",
  description: "Explore Nivasan Chronicles. Dive into architectural philosophies, interior design trends, sustainability, and real estate innovations behind Coimbatore’s most premium luxury developments.",
  keywords: ["Nivasan Chronicles", "Minimalist Architecture", "Biophilic Design Coimbatore", "Premium Home Finishes"],
};

export default function BlogPage() {
  return (
    <main className="bg-background-luxury min-h-screen pt-32 pb-24 font-sans">
      {/* Linear backdrop grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="max-w-3xl border-b border-black-luxury/10 pb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-3">
            Journal & Insights
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-onyx tracking-tight leading-none mb-6 uppercase">
            Nivasan Chronicles
          </h1>
          <p className="text-text-onyx/70 text-base leading-relaxed">
            Delve into our curation of architectural philosophies, interior trends, and engineering innovations behind Coimbatore’s most premium luxury developments.
          </p>
        </div>

        {/* Empty Blog Placeholder Card */}
        <div className="bg-white border border-[#eae7e3] rounded-2xl p-12 md:p-20 text-center flex flex-col items-center gap-6 shadow-sm max-w-4xl mx-auto w-full">
          <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center">
            <BookOpen size={28} />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-text-onyx uppercase tracking-wider">
              No Articles Published Yet
            </h3>
            <p className="text-sm text-text-onyx/65 leading-relaxed font-sans max-w-md mx-auto">
              Our architectural journals, material design philosophies, and luxury living case studies are currently being curated by our editorial team. We will publish our first release of insights shortly.
            </p>
          </div>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-extrabold text-primary hover:text-accent transition-all duration-300 group border border-primary/20 hover:border-accent/40 px-6 py-3 rounded-full bg-white shadow-sm"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Homepage
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
