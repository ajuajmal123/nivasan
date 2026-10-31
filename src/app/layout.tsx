import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/ui/StickyCTA";

// Lemon Milk (brand display face) for headings, nav, buttons, badges and eyebrows.
// Body text uses the device system font stack (see --font-body in globals.css).
const lemonMilk = localFont({
  src: [
    { path: "../../public/fonts/lemon-milk/LEMONMILK-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/lemon-milk/LEMONMILK-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../../public/fonts/lemon-milk/LEMONMILK-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/lemon-milk/LEMONMILK-RegularItalic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/lemon-milk/LEMONMILK-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/lemon-milk/LEMONMILK-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../../public/fonts/lemon-milk/LEMONMILK-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/lemon-milk/LEMONMILK-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-lemon-milk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nivasan Homes | Crafting Exceptional Living Spaces",
  description: "Redefining premium residential design. Discover architectural masterpieces, bespoke luxury villas, and minimalist modern living spaces crafted with timeless sophistication.",
  keywords: ["Luxury Real Estate", "Premium Homes", "Architectural Masterpieces", "Modern Villas", "Minimalist Design", "Nivasan Homes"],
  authors: [{ name: "Nivasan Homes" }],
  icons: {
    icon: "/N-H-PNG_5.png",
  },
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
      className={`${lemonMilk.variable} min-h-screen antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-bg-cream text-heading font-sans">
        <LenisProvider>
          <Navbar />
          <div className="site-content flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          <StickyCTA />
        </LenisProvider>
      </body>
    </html>
  );
}
