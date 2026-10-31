"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../ui/Logo";
import { handleNavClick } from "@/lib/smoothNav";

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

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const navItems = [
  { name: "Home", href: "/" },
  { name: "Profile", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Enquiry", href: "/#contact" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/#contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/nivasanhomes/", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nivasan-homes", Icon: LinkedinIcon },
  { label: "Facebook", href: "https://www.facebook.com/nivasanhomes/", Icon: FacebookIcon },
  { label: "Twitter", href: "https://x.com/HomesNivasan?s=09", Icon: TwitterIcon },
];

const linkClass = "text-primary hover:text-primary-hover transition-colors duration-300";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <footer className="bg-bg-green-soft text-text pt-8 pb-5 overflow-hidden border-t border-border">
      <div className="max-w-400 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-6 border-b border-border">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" onClick={(e) => handleNavClick(e, "/", pathname, router)} className="group inline-block w-fit">
              <Logo showText={true} className="items-start" />
            </Link>
            <p className="text-text text-xs leading-relaxed max-w-xs font-sans tracking-wide">
              Crafting exceptional living spaces inspired by minimalist purity, premium materiality, and timeless architectural sophistication.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={label}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="label-caps! text-primary mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, pathname, router)}
                    className={`text-xs ${linkClass}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="label-caps! text-primary mb-3">
              Head Office
            </h4>
            <p className="text-xs text-text leading-relaxed mb-3 font-sans">
              No. 252, Avinashi Road (Opp: Varadharaja Mills),<br />
              Peelamedu, Coimbatore - 641 004
            </p>
            <div className="space-y-2 text-xs text-text">
              <div>
                <span className="block label-caps text-accent-text mb-0.5">
                  Customer Advisory
                </span>
                <a href="tel:+919842323071" className={`font-semibold block ${linkClass}`}>
                  +91 98423 23071
                </a>
              </div>
              <div>
                <span className="block label-caps text-accent-text mb-0.5">
                  Site Visit Scheduling
                </span>
                <a href="tel:+919942223013" className={`font-semibold block ${linkClass}`}>
                  +91 99422 23013
                </a>
              </div>
              <div>
                <span className="block label-caps text-accent-text mb-0.5">
                  Email Inquiry
                </span>
                <a href="mailto:info@nivasanhomes.com" className={`block ${linkClass}`}>
                  info@nivasanhomes.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center pt-4 text-[11px] text-text-muted tracking-wider gap-3 md:gap-8 text-center">
          <div className="flex items-center space-x-4 md:space-x-6">
            <a href="/Nivasan_Homes_Privacy_Policy.pdf" target="_blank" rel="noopener noreferrer" className={`whitespace-nowrap ${linkClass}`}>
              Privacy Policy
            </a>
            <a href="/Nivasan_Homes_Terms_and_Conditions.pdf" target="_blank" rel="noopener noreferrer" className={`whitespace-nowrap ${linkClass}`}>
              Terms & Conditions
            </a>
          </div>

          <p className="whitespace-nowrap">&copy; {currentYear} Nivasan Homes Private Limited. All rights reserved.</p>

          <p className="flex items-center gap-1.5 whitespace-nowrap">
            <span>Designed by</span>
            <a href="https://www.instagram.com/nashcreations.in" className="blinking-text" target="_blank" rel="noopener noreferrer">
              Creations
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
