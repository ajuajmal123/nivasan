import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/ui/StickyCTA";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nivasan Homes | Crafting Exceptional Living Spaces",
  description: "Redefining premium residential design. Discover architectural masterpieces, bespoke luxury villas, and minimalist modern living spaces crafted with timeless sophistication.",
  keywords: ["Luxury Real Estate", "Premium Homes", "Architectural Masterpieces", "Modern Villas", "Minimalist Design", "Nivasan Homes"],
  authors: [{ name: "Nivasan Homes" }],
  openGraph: {
    title: "Nivasan Homes | Crafting Exceptional Living Spaces",
    description: "Discover modern luxury villa developments and premium architectural residences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivasan Homes | Crafting Exceptional Living Spaces",
    description: "Modern luxury villa developments and premium architectural residences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-luxury text-text-onyx font-sans">
        <LenisProvider>
          <Navbar />
          <div className="flex-1 flex flex-col pt-0">
            {children}
          </div>
          <Footer />
          <StickyCTA />
        </LenisProvider>
      </body>
    </html>
  );
}
