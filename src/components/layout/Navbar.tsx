"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

const navLinks = [
  { name: "Home", href: "/", num: "01" },
  { name: "Profile", href: "/#about", num: "02" },
  { name: "Projects", href: "/projects", num: "03" },
  { name: "Enquiry", href: "/#contact", num: "04" },
  { name: "Blog", href: "/blog", num: "05" },
  { name: "Contact Us", href: "/#contact", num: "06" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll logic for hash anchors on Home route
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && isHome) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const targetId = href.substring(2);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Check URL hash on page load / pathname change to scroll smoothly
  useEffect(() => {
    if (isHome && typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const timer = setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          shouldBeGlass
            ? "glass-navbar py-3 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group z-50 flex items-center">
            <Logo
              size={shouldBeGlass ? 52 : 64}
              textColor={shouldBeGlass ? "primary" : "white"}
              showText={true}
              className="flex-row items-center space-x-3 mt-0"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 relative py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:origin-right hover:after:origin-left after:transition-transform after:duration-500 ${
                    isActive
                      ? "text-accent font-semibold after:scale-x-100 after:origin-left"
                      : `after:scale-x-0 hover:after:scale-x-100 ${
                          shouldBeGlass ? "text-primary/80 hover:text-accent" : "text-white/80 hover:text-accent"
                        }`
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
            className={`md:hidden transition-colors duration-300 focus:outline-none z-50 ${
              shouldBeGlass || isMobileMenuOpen ? "text-primary hover:text-accent" : "text-white hover:text-accent"
            }`}
            aria-label="Toggle Menu"
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
            className="fixed inset-0 bg-primary z-45 flex flex-col justify-between p-8 pt-32 md:hidden"
          >
            {/* Background elements */}
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
              <span className="font-serif text-[15rem] text-white">N</span>
            </div>

            <nav className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        handleLinkClick(e, link.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-baseline group"
                    >
                      <span className="font-sans text-accent text-sm tracking-[0.1em] mr-4 font-bold">
                        {link.num}
                      </span>
                      <span className={`font-sans text-3xl font-extrabold transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-white/90 group-hover:text-accent"
                      }`}>
                        {link.name}
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="ml-2 text-white/40 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 opacity-0 group-hover:opacity-100"
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
              className="border-t border-white/10 pt-8"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                Inquiries
              </p>
              <a
                href="mailto:info@nivasanhomes.com"
                className="text-sm font-sans font-bold text-accent hover:underline block mb-4"
              >
                info@nivasanhomes.com
              </a>
              <div className="space-y-3 mt-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-white/40 mb-0.5">
                    Customer Advisory
                  </p>
                  <a
                    href="tel:+919842323071"
                    className="text-xs text-white hover:text-accent font-semibold transition-colors duration-300"
                  >
                    +91 98423 23071
                  </a>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-white/40 mb-0.5">
                    Site Visit Scheduling
                  </p>
                  <a
                    href="tel:+919942223013"
                    className="text-xs text-white hover:text-accent font-semibold transition-colors duration-300"
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
