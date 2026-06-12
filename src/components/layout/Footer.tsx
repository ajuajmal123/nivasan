"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "../ui/Logo";

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black-luxury text-white pt-16 pb-8 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="group inline-block mb-4">
                <Logo size={34} showText={true} textColor="white" className="items-start" />
              </Link>
              <p className="text-white/60 text-xs leading-relaxed max-w-xs font-sans tracking-wide mt-2">
                Crafting exceptional living spaces inspired by minimalist purity, premium materiality, and timeless architectural sophistication.
              </p>
            </div>
            {/* Social Links */}
            <div className="flex items-center space-x-6 mt-6">
              <a
                href="#"
                className="text-white/60 hover:text-accent transition-colors duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-accent transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-accent transition-colors duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-accent transition-colors duration-300"
                aria-label="YouTube"
              >
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300"
                >
                  Enquiry
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 md:col-start-10">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold mb-4">
              Head Office
            </h4>
            <p className="text-xs text-white/70 leading-relaxed mb-3 font-sans">
              Avinashi Rd, next to PSG Tech,<br />
              Peelamedu, Coimbatore,<br />
              Tamil Nadu 641004
            </p>
            <div className="space-y-2 text-xs text-white/70">
              <p>
                T:{" "}
                <a href="tel:+914222456789" className="hover:text-accent">
                  +91 422 245 6789
                </a>
              </p>
              <p>
                E:{" "}
                <a href="mailto:info@nivasanhomes.com" className="hover:text-accent">
                  info@nivasanhomes.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 mt-6 text-[10px] text-white/40 tracking-wider">
          <p>&copy; {currentYear} Nivasan Homes Private Limited. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300">
              Terms & Conditions
            </a>
            <a
              href="#"
              onClick={handleScrollToTop}
              className="flex items-center hover:text-accent transition-colors duration-300"
            >
              Back to Top <ArrowUpRight size={12} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
