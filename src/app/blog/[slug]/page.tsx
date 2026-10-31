import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, ArrowRight } from "lucide-react";
import { blogs } from "@/data/blogs";
import FAQAccordion from "@/components/ui/FAQAccordion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);
  if (!blog) return {};
  return {
    title: `${blog.metaTitle} | Nivasan Chronicles`,
    description: blog.metaDescription,
    keywords: blog.tags,
  };
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-bg-cream min-h-screen pt-6 md:pt-8 pb-16 md:pb-10 font-sans text-primary relative">
      {/* Subtle background pattern grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)] bg-size-[5rem_5rem] pointer-events-none" />

      <div className="max-w-300 mx-auto px-6 md:px-12 relative z-10">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase font-display tracking-widest text-primary/60 hover:text-accent-text transition-colors duration-300 group"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
            Back to Journals
          </Link>
          <div className="text-[9px] font-black uppercase tracking-widest text-primary/40 select-none flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Journal</Link>
            <span>/</span>
            <span className="text-accent-text">{blog.category}</span>
          </div>
        </div>

        {/* Blog Header Card */}
        <div 
          style={{ background: blog.coverImage }}
          className="w-full rounded-2xl p-8 md:p-16 text-heading flex flex-col justify-end gap-6 shadow-xl border border-border relative overflow-hidden min-h-75 md:min-h-100"
        >

          <div className="relative z-10 flex flex-col gap-4 max-w-4xl">
            <span className="inline-block bg-accent/20 border border-accent/40 text-accent-text text-[9px] font-black uppercase font-display tracking-widest px-3 py-1.5 rounded-full w-max">
              {blog.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight uppercase font-sans">
              {blog.title}
            </h1>
            
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] md:text-xs text-text font-bold uppercase tracking-wider mt-2 border-t border-border pt-4">
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-accent" />
                {blog.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-accent" />
                {blog.date}
              </span>
                <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-accent" />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Two-column Layout: Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 md:mt-16 items-start">
          
          {/* Main Article Content Column */}
          <article className="lg:col-span-8 bg-white border border-border p-6 md:p-10 rounded-2xl shadow-sm">
            <div className="prose prose-luxury max-w-none">
              {blog.sections.map((section, idx) => {
                if (section.type === "paragraph") {
                  return (
                    <p 
                      key={idx} 
                      className="text-text text-sm md:text-base leading-relaxed font-sans font-normal mb-6 last:mb-0"
                    >
                      {section.text}
                    </p>
                  );
                }
                if (section.type === "heading") {
                  const Tag = section.level === 3 ? "h3" : "h2";
                  return (
                    <Tag 
                      key={idx} 
                      className={`font-sans text-primary uppercase tracking-wider ${
                        section.level === 3 
                          ? "text-lg md:text-xl font-bold mt-8 mb-4 border-l-2 border-accent/60 pl-3" 
                          : "text-xl md:text-2xl font-extrabold mt-10 mb-6 border-b border-border pb-2"
                      }`}
                    >
                      {section.text}
                    </Tag>
                  );
                }
                if (section.type === "quote") {
                  return (
                    <blockquote
                      key={idx}
                      className="border-l-4 border-accent pl-4 my-6 text-text text-sm md:text-base leading-relaxed font-sans font-semibold italic"
                    >
                      {section.text}
                    </blockquote>
                  );
                }
                if (section.type === "list") {
                  return (
                    <ul
                      key={idx}
                      className="list-disc pl-6 mb-6 space-y-2 text-text text-sm md:text-base leading-relaxed font-sans font-normal"
                    >
                      {(section.items || []).map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>

            {/* Structured FAQ Accordion block */}
            {blog.faqs && blog.faqs.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-sans text-lg md:text-xl font-black uppercase tracking-widest text-primary mb-6">
                  Frequently Asked Questions
                </h3>
                <FAQAccordion faqs={blog.faqs} />
              </div>
            )}

            {/* Content Call/WhatsApp Contact Footer */}
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-extrabold text-primary/80 uppercase tracking-wider">
                <a href="tel:+919842323071" className="hover:text-accent-text transition-colors">Call: +91 98423 23071</a>
                <span className="text-primary/20 hidden sm:inline">|</span>
                <a href="https://wa.me/919842323006" target="_blank" rel="noopener noreferrer" className="hover:text-accent-text transition-colors">WhatsApp: +91 98423 23006</a>
                <span className="text-primary/20 hidden sm:inline">|</span>
                <a href="mailto:info@nivasanhomes.com" className="hover:text-accent-text transition-colors">Email: info@nivasanhomes.com</a>
              </div>
              <Link href="/#contact" className="text-[10px] uppercase font-display tracking-widest font-black text-accent-text hover:text-primary transition-colors flex items-center gap-1 group/btn">
                Book a Site Visit 
                <ArrowRight size={11} className="group-hover/btn:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </article>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Direct Project Inquiry CTA card */}
            <div className="bg-bg-green-soft text-heading border border-border p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col gap-5">
              {/* Graphic accents */}
              <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)] bg-size-[2rem_2rem] pointer-events-none" />
              <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-accent/10 pointer-events-none blur-xl" />

              <span className="text-[9px] font-black uppercase font-display tracking-[0.25em] text-accent-text block">
                Exclusive Bookings
              </span>
              <h3 className="font-sans text-xl font-bold uppercase tracking-wide leading-snug">
                Interested in Vakulam Apartments?
              </h3>
              <p className="text-xs text-text leading-relaxed font-normal">
                Experience premium living close to Coimbatore&apos;s IT corridor near Tidel Park. Lock in site visits or request brochure details today.
              </p>
              <div className="pt-2">
                <Link
                  href="/#contact"
                  className="w-full bg-accent-text hover:bg-accent-text-hover text-white font-extrabold text-[10px] uppercase font-display tracking-widest py-3 px-5 rounded-lg transition-all duration-300 shadow-md shadow-accent/10 hover:shadow-xl hover:shadow-accent/20 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  Book Private Site Visit
                  <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            
          </aside>
          
        </div>

      </div>
    </main>
  );
}
