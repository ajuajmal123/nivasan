"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "../ui/Logo";
import { handleNavClick, scrollAfterArrival, scrollToId } from "@/lib/smoothNav";

const navLinks = [
  { name: "Home", href: "/", num: "01" },
  { name: "Profile", href: "/#about", num: "02" },
  { name: "Projects", href: "/projects", num: "03" },
  { name: "Enquiry", href: "/#contact", num: "04" },
  { name: "Blog", href: "/blog", num: "05" },
  { name: "Contact Us", href: "/#contact", num: "06" },
];

// Home-page section id -> nav item highlighted by scroll-spy (#contact maps to "Contact Us" only)
const sectionToNav: Record<string, string> = {
  home: "Home",
  about: "Profile",
  projects: "Projects",
  contact: "Contact Us",
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("home");
  const pathname = usePathname();
  const router = useRouter();
  const prevPathname = useRef<string | null>(null);

  const isHome = pathname === "/";
  const shouldBeGlass = !isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Landing on "/": from another page start at the top (then glide to any #hash);
  // on a fresh load with a #hash, glide to that section once the page has settled.
  useEffect(() => {
    const cameFrom = prevPathname.current;
    prevPathname.current = pathname;
    if (!isHome) return;
    const hash = window.location.hash.substring(1);
    if (cameFrom !== null && cameFrom !== "/") {
      scrollAfterArrival(hash);
    } else if (cameFrom === null && hash) {
      const timer = setTimeout(() => scrollToId(hash), 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, isHome]);

  // Scroll-spy on the home page: highlight the nav item of the section in the middle of the viewport.
  // Sections without a nav item (timeline, FAQ) clear the highlight.
  useEffect(() => {
    if (!isHome) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id || null);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const activeNav = isHome
    ? (activeSection && sectionToNav[activeSection]) || null
    : pathname.startsWith("/projects")
      ? "Projects"
      : pathname.startsWith("/blog")
        ? "Blog"
        : null;

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleNavClick(e, href, pathname, router);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out flex items-center ${
          shouldBeGlass
            ? "glass-navbar h-(--navbar-height) shadow-sm"
            : "bg-transparent h-(--navbar-height-tall)"
        }`}
      >
        <div className="w-full max-w-400 mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={(e) => onNavClick(e, "/")} className="group z-50 flex items-center">
            <Logo
              textColor={shouldBeGlass ? "primary" : "white"}
              showText={true}
              className="flex-row items-center space-x-3 mt-0"
            />
          </Link>

          {/* Desktop Navigation: body font 11px on tablet, Lemon Milk from lg */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = activeNav === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => onNavClick(e, link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-[11px] font-semibold tracking-[0.02em] lg:font-display lg:text-xs lg:font-normal lg:tracking-[0.2em] uppercase transition-colors duration-300 relative py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-accent after:origin-right hover:after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100 ${
                    isActive ? "after:scale-x-100 after:origin-left" : "after:scale-x-0"
                  } ${
                    shouldBeGlass ? "text-primary hover:text-primary-hover" : "text-white text-shadow-on-dark-media"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>



          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden transition-colors duration-300 z-50 ${
              shouldBeGlass || isMobileMenuOpen ? "text-primary hover:text-primary-hover" : "text-white"
            }`}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 bg-bg-cream z-45 flex flex-col justify-between p-8 md:hidden ${
              shouldBeGlass ? "pt-[calc(var(--navbar-height)+2rem)]" : "pt-[calc(var(--navbar-height-tall)+2rem)]"
            }`}
          >
            {/* Background elements */}
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
              <span className="font-serif text-[15rem] text-primary">N</span>
            </div>

            <nav className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => {
                const isActive = activeNav === link.name;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => onNavClick(e, link.href)}
                      aria-current={isActive ? "page" : undefined}
                      className="flex items-baseline group"
                    >
                      <span className="font-display text-accent-text text-sm tracking-widest mr-4 font-bold">
                        {link.num}
                      </span>
                      <span className={`font-display text-3xl font-extrabold text-primary group-hover:text-primary-hover transition-colors duration-300 underline-offset-8 decoration-2 decoration-accent ${
                        isActive ? "underline" : ""
                      }`}>
                        {link.name}
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="ml-2 text-text-muted group-hover:text-primary-hover group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="border-t border-border pt-8"
            >
              <p className="label-caps text-text-muted mb-2">
                Inquiries
              </p>
              <a
                href="mailto:info@nivasanhomes.com"
                className="text-sm font-sans font-bold text-primary hover:text-primary-hover transition-colors duration-300 block mb-4"
              >
                info@nivasanhomes.com
              </a>
              <div className="space-y-3 mt-4">
                <div>
                  <p className="label-caps text-text-muted mb-0.5">
                    Customer Advisory
                  </p>
                  <a
                    href="tel:+919842323071"
                    className="text-xs text-primary hover:text-primary-hover font-semibold transition-colors duration-300"
                  >
                    +91 98423 23071
                  </a>
                </div>
                <div>
                  <p className="label-caps text-text-muted mb-0.5">
                    Site Visit Scheduling
                  </p>
                  <a
                    href="tel:+919942223013"
                    className="text-xs text-primary hover:text-primary-hover font-semibold transition-colors duration-300"
                  >
                    +91 99422 23013
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
