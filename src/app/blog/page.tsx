import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, User } from "lucide-react";
import { blogs } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Journal & Insights | Nivasan Chronicles | Nivasan Homes",
  description: "Explore Nivasan Chronicles. Dive into architectural philosophies, interior design trends, sustainability, and real estate innovations behind Coimbatore’s most premium luxury developments.",
  keywords: ["Nivasan Chronicles", "Minimalist Architecture", "Biophilic Design Coimbatore", "Premium Home Finishes"],
};

export default function BlogPage() {
  return (
    <main className="bg-background-luxury min-h-screen pt-32 pb-24 font-sans text-primary relative">
      {/* Subtle background pattern grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto border-b border-black-luxury/10 pb-8 text-center w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-none uppercase">
            Nivasan Chronicles
          </h1>
        </div>

        {/* Blog Posts Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1500px]">
            {blogs.map((blog) => (
              <article 
                key={blog.slug} 
                className="bg-white border border-[#eae7e3] hover:border-accent/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group h-full"
              >
                {/* Visual Header/Cover placeholder with beautiful gradient */}
                <div 
                  style={{ background: blog.coverImage }}
                  className="w-full h-48 relative overflow-hidden flex items-end p-6 border-b border-[#eae7e3]"
                >
                  {/* Overlay shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 pointer-events-none" />
                  
                  <span className="relative z-10 bg-accent text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded">
                    {blog.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between gap-6">
                  <div className="flex flex-col gap-3">
                    {/* Date / Read time */}
                    <div className="flex items-center gap-4 text-[10px] text-primary/50 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} className="text-accent" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} className="text-accent" />
                        {blog.readTime}
                      </span>
                    </div>

                    {/* Blog Title */}
                    <h3 className="font-sans text-xl font-extrabold text-primary tracking-wide leading-snug group-hover:text-accent transition-colors duration-300 uppercase mt-1">
                      <Link href={`/blog/${blog.slug}`} className="hover:underline">
                        {blog.title}
                      </Link>
                    </h3>

                    {/* Brief description */}
                    <p className="text-xs text-primary/65 leading-relaxed font-sans font-medium line-clamp-3">
                      {blog.brief}
                    </p>
                  </div>

                  {/* Read More link */}
                  <div className="border-t border-[#eae7e3] pt-4 mt-2">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-extrabold text-primary hover:text-accent transition-colors duration-300 group/link"
                    >
                      Read Full Article
                      <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State fallback (just in case) */
          <div className="bg-white border border-[#eae7e3] rounded-2xl p-12 md:p-20 text-center flex flex-col items-center gap-6 shadow-sm max-w-4xl mx-auto w-full">
            <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center">
              <BookOpen size={28} />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-primary uppercase tracking-wider">
                No Articles Published Yet
              </h3>
              <p className="text-sm text-primary/65 leading-relaxed font-sans max-w-md mx-auto">
                Our architectural journals, material design philosophies, and luxury living case studies are currently being curated by our editorial team. We will publish our first release of insights shortly.
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
