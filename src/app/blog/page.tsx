import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "Minimalism in Modern Villa Architecture",
    excerpt: "Exploring the intersections of geometric simplicity, natural lighting, and open layout designs in contemporary home design.",
    category: "Architecture",
    date: "June 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Sourcing Materiality: The Premium Stone & Wood Elements",
    excerpt: "A look into how curated marble, textured slate, and sustainable teak form the bedrock of Nivasan's luxury finishes.",
    category: "Design",
    date: "May 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Green Corridors: Integrating Nature with High-End Apartments",
    excerpt: "How vertical gardens, double-height terraces, and biophilic design patterns are revolutionizing Coimbatore real estate.",
    category: "Sustainability",
    date: "April 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
  }
];

export default function BlogPage() {
  return (
    <main className="bg-background-luxury min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 border-b border-black-luxury/10 pb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-3">
            Journal & Insights
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-none mb-6">
            Nivasan Chronicles
          </h1>
          <p className="text-primary/70 text-base leading-relaxed">
            Delve into our curation of architectural philosophies, interior trends, and engineering innovations behind Coimbatore’s most premium luxury developments.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white border border-[#eae7e3] overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 rounded-lg flex flex-col h-full"
            >
              {/* Image block */}
              <div className="relative h-64 overflow-hidden bg-black-luxury">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-[10px] tracking-widest uppercase px-3 py-1 font-bold rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Text content block */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-primary/50 mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-primary mb-4 leading-snug group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-primary/70 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-black-luxury/5 flex items-center justify-between text-xs tracking-wider uppercase font-bold text-primary group-hover:text-accent transition-colors duration-300 cursor-pointer">
                  <span>Read Article</span>
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
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
