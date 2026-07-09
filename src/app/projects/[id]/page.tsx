import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import ProjectInquiryForm from "@/components/sections/ProjectInquiryForm";
import ProjectGallery from "@/components/sections/ProjectGallery";
import FAQAccordion from "@/components/ui/FAQAccordion";

interface ProjectDetails {
  id: string;
  name: string;
  status: string;
  location: string;
  description: string;
  mapEmbedUrl: string;
  images: string[];
  specs: { label: string; value: string }[];
  amenities: string[];
  locationAdvantages?: string[];
  aboutDeveloper?: {
    title: string;
    content: string;
  };
  faqs?: { question: string; answer: string }[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  aioSentence?: string;
}

const projectsData: Record<string, ProjectDetails> = {
  "nivasan-swarnapuraa": {
    id: "nivasan-swarnapuraa",
    name: "Nivasan Swarnapuraa",
    status: "Ongoing",
    location: "Kalapatti, Near Broadway Mall & Coimbatore Airport",
    aioSentence: "Nivasan Swarnapuraa by Nivasan Homes is a RERA-approved premium 4 & 5 BHK gated villa community located in Kalapatti, near Broadway Mall and Coimbatore Airport.",
    description: "Nivasan Swarnapuraa is a sanctuary of tranquility and a beacon of sophisticated living in Kalapatti, Coimbatore — moments from Broadway Mall and Coimbatore Airport. Spread across 2.01 acres, this gated community of 19 exclusive 4 & 5 BHK villas combines the finest of modern architectural design with the warmth of a family home. Large windows invite golden sunlight into every room, bathing interiors in warmth while framing views of verdant, landscaped surroundings.\n\nEach villa is thoughtfully planned at 2,800 sq.ft, built for families who want space, privacy, and premium construction quality without compromise — backed by full RERA transparency (TN/11/BUILDING/0467/2024) and Nivasan Homes' 15-year track record in Coimbatore real estate.\n\nIdeal for: Families upgrading to a villa lifestyle, NRIs seeking a secure long-term investment, and buyers who want a gated community close to the airport and key commercial hubs.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1417086820515!2d77.0185984!3d11.0183141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857b28203f191%3A0xb3de2c270d4d4bb2!2sKalapatti%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "/ongoing/p1/image.png",
      "/ongoing/p1/image1.png",
      "/ongoing/p1/image2.png",
      "/ongoing/p1/image3.png",
      "/ongoing/p1/image4.png",
      "/ongoing/p1/image5.png",
      "/ongoing/p1/image6.png",
      "/ongoing/p1/image7.png",
      "/ongoing/p1/image8.png"
    ],
    specs: [
      { label: "Configuration", value: "4 & 5 BHK Premium Villa" },
      { label: "Total Units", value: "19 Exclusive Villas" },
      { label: "Land Area", value: "2.01 Acres" },
      { label: "Villa Size", value: "2,800 sq.ft each" },
      { label: "Type", value: "Gated Community" },
      { label: "Status", value: "Final Units Available" },
      { label: "Launched", value: "Sep 2024" },
      { label: "RERA", value: "TN/11/BUILDING/0467/2024" }
    ],
    amenities: [
      "24-hour Water Supply",
      "CCTV Surveillance (compound-wide)",
      "Fire Safety Systems",
      "Gated Compound Wall",
      "Covered Parking (per villa)"
    ],
    locationAdvantages: [
      "Broadway Mall — minutes away for retail, dining, entertainment",
      "Coimbatore International Airport — quick connectivity for frequent flyers and NRI buyers",
      "Kalapatti — an established, fast-growing residential micro-market in Coimbatore",
      "Easy access to arterial roads connecting to the wider city"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010. With 10+ projects delivered and 500+ happy families housed, Nivasan Homes is a CREDAI-affiliated, fully RERA-registered developer known for customer-first values, eco-conscious design, uncompromising build quality, complete transparency, and a consistent record of on-time delivery. Every Nivasan Swarnapuraa villa is backed by this same legacy of trust."
    },
    faqs: [
      {
        question: "What is the RERA registration number for Nivasan Swarnapuraa?",
        answer: "TN/11/BUILDING/0467/2024."
      },
      {
        question: "Where exactly is Nivasan Swarnapuraa located?",
        answer: "In Kalapatti, Coimbatore, near Broadway Mall and Coimbatore International Airport."
      },
      {
        question: "What configurations are available?",
        answer: "4 & 5 BHK premium villas, each approximately 2,800 sq.ft, within a 19-villa gated community."
      },
      {
        question: "Is this project ready to move in or under construction?",
        answer: "Final units are available for booking — confirm current construction/possession stage with the sales team for the latest update."
      },
      {
        question: "Is home loan assistance available?",
        answer: "(To be confirmed by Nivasan Homes sales team.)"
      },
      {
        question: "Can I schedule a site visit?",
        answer: "Yes — call +91 99422 23013 to schedule a site visit, or +91 98423 23071 for general advisory."
      },
      {
        question: "Is Nivasan Swarnapuraa RERA-approved?",
        answer: "Yes, fully RERA-registered under TN/11/BUILDING/0467/2024."
      }
    ],
    metaTitle: "Nivasan Swarnapuraa",
    metaDescription: "Premium 4 & 5 BHK gated villas in Kalapatti, Coimbatore, near Broadway Mall & Coimbatore Airport. RERA TN/11/BUILDING/0467/2024. Final units available.",
    keywords: ["Nivasan Swarnapuraa", "villas in Kalapatti Coimbatore", "4 BHK villas Coimbatore", "gated villa community Coimbatore"]
  },
  "nivasan-vakulam": {
    id: "nivasan-vakulam",
    name: "Nivasan Vakulam",
    status: "Ongoing",
    location: "Near Tidel Park, Coimbatore",
    aioSentence: "Nivasan Vakulam by Nivasan Homes is a premium 2 & 3 BHK apartment community near Tidel Park, Coimbatore, with possession scheduled for 31 March 2029.",
    description: "Nivasan Vakulam is a thoughtfully designed residential apartment community near Tidel Park, Coimbatore — crafted for families and professionals who want calm living paired with city convenience. Spacious, well-ventilated 2 & 3 BHK homes are set within a fully-amenitized community, at an address positioned in one of Coimbatore's strongest IT-corridor micro-markets, making it equally attractive to end-users and long-term investors.\n\nWith possession scheduled for 31 March 2029 and full RERA registration (TN/11/BLG/0114/2026), Nivasan Vakulam offers buyers the transparency and track record of Nivasan Homes' 15-year legacy in Coimbatore real estate.\n\nIdeal for: Working professionals near Tidel Park, first-time home buyers, investors seeking rental yield in the IT corridor, and NRIs looking for a long-term appreciation asset.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.208151475735!2d77.0223594!3d11.0134062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859d3df061803%3A0x1c8b36873f272a2e!2sTIDEL%20Park%20Coimbatore!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "/ongoing/p2/image1.png",
      "/ongoing/p2/image2.png",
      "/ongoing/p2/image3.png",
      "/ongoing/p2/image4.png",
      "/ongoing/p2/image5.png",
      "/ongoing/p2/image6.png"
    ],
    specs: [
      { label: "Configuration", value: "2 & 3 BHK Apartments" },
      { label: "2 BHK Size", value: "1,090 sq.ft." },
      { label: "3 BHK Size", value: "Up to 1,989 sq.ft." },
      { label: "Possession", value: "31 March 2029" },
      { label: "Parking", value: "Covered Parking Included" },
      { label: "Status", value: "Ongoing Bookings Open" },
      { label: "RERA", value: "TN/11/BLG/0114/2026" }
    ],
    amenities: [
      "Clubhouse",
      "CCTV Surveillance",
      "Rooftop Access",
      "Children's Play Area",
      "RO Water Plant",
      "Solar Water Heating",
      "Covered Parking",
      "DG Power Backup",
      "Lift Access"
    ],
    locationAdvantages: [
      "Tidel Park — walk-to-work convenience for IT/business professionals",
      "Strong rental demand micro-market — attractive for investors",
      "Well-connected to Coimbatore's key commercial and residential corridors"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010. With 10+ projects delivered and 500+ happy families housed, Nivasan Homes is a CREDAI-affiliated, fully RERA-registered developer known for customer-first values, eco-conscious design, uncompromising build quality, complete transparency, and a consistent record of on-time delivery. Every Nivasan Vakulam home is backed by this same legacy of trust."
    },
    faqs: [
      {
        question: "What is the RERA registration number for Nivasan Vakulam?",
        answer: "TN/11/BLG/0114/2026."
      },
      {
        question: "Where exactly is Nivasan Vakulam located?",
        answer: "Near Tidel Park, Coimbatore."
      },
      {
        question: "What configurations are available?",
        answer: "2 BHK (1,090 sq.ft) and 3 BHK (up to 1,989 sq.ft) apartments."
      },
      {
        question: "When is possession?",
        answer: "31 March 2029."
      },
      {
        question: "Is home loan assistance available?",
        answer: "(To be confirmed by Nivasan Homes sales team.)"
      },
      {
        question: "Can I schedule a site visit?",
        answer: "Yes — call +91 99422 23013 to schedule a site visit, or +91 98423 23071 for general advisory."
      },
      {
        question: "Is Nivasan Vakulam a good investment for NRIs or working professionals near Tidel Park?",
        answer: "Yes — its proximity to Tidel Park makes it attractive for both end-use by IT professionals and rental-yield-focused investors."
      }
    ],
    metaTitle: "Nivasan Vakulam | Premium 2 & 3 BHK Apartments near Tidel Park",
    metaDescription: "Premium 2 & 3 BHK apartments near Tidel Park, Coimbatore. RERA TN/11/BLG/0114/2026. Possession March 2029. Bookings open.",
    keywords: ["Nivasan Vakulam", "apartments near Tidel Park Coimbatore", "2 BHK 3 BHK apartments Coimbatore", "apartments IT corridor Coimbatore"]
  },
  "nivasan-udhyana": {
    id: "nivasan-udhyana",
    name: "Nivasan Udhyana",
    status: "Completed",
    location: "Near CODISSIA, Coimbatore",
    aioSentence: "Nivasan Udhyana by Nivasan Homes is a completed flagship luxury independent villa community located near CODISSIA, Coimbatore.",
    description: "Nivasan Udhyana is a flagship residential development offering ultra-luxury independent villas and apartments with private gardens. Architecturally brilliant and set against lush landscaped greenery near CODISSIA, Udhyana is situated just minutes from the Coimbatore International Airport, perfectly meeting modern human aspirations.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.096338575024!2d77.0189151!3d11.0216262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85775c0000001%3A0x6b80cd9b9c1d6ffb!2sCODISSIA%20Trade%20Fair%20Complex!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "/completed/p1/image.png"
    ],
    specs: [
      { label: "Type", value: "Luxury Independent Villas" },
      { label: "Feature", value: "Private Garden per Unit" },
      { label: "Location", value: "Near CODISSIA, Coimbatore" },
      { label: "Airport", value: "Minutes Away" },
      { label: "Greenery", value: "Lush Landscaped Surroundings" },
      { label: "Lifestyle", value: "Bespoke & Exclusive" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [
      "Private Garden per Unit",
      "Lush Landscaped Surroundings",
      "Covered Parking",
      "CCTV Surveillance",
      "24h Water Supply",
      "Bespoke Gated Entrance"
    ],
    locationAdvantages: [
      "CODISSIA Trade Fair Complex — minutes away, prime commercial hub",
      "Coimbatore International Airport — quick connectivity for frequent flyers",
      "Near leading educational institutions and healthcare centers"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010. With 10+ projects delivered and 500+ happy families housed, Nivasan Homes is a CREDAI-affiliated, fully RERA-registered developer known for customer-first values, eco-conscious design, uncompromising build quality, complete transparency, and a consistent record of on-time delivery. Every Nivasan Udhyana villa is backed by this same legacy of trust."
    },
    metaTitle: "Nivasan Udhyana | Luxury Independent Villas near CODISSIA",
    metaDescription: "Completed ultra-luxury independent villas by Nivasan Homes near CODISSIA, Coimbatore. Discover private gardens and bespoke gated living minutes from Coimbatore Airport.",
    keywords: ["Nivasan Udhyana", "luxury villas Coimbatore", "villas near CODISSIA", "independent villas Coimbatore"]
  },
  "nivasan-bliss": {
    id: "nivasan-bliss",
    name: "Nivasan Bliss",
    status: "Completed",
    location: "Avinashi Road Corridor, Coimbatore",
    aioSentence: "Nivasan Bliss by Nivasan Homes is a completed luxury residential apartment development situated along the Avinashi Road Corridor, Coimbatore.",
    description: "Luxurious residences offering a modern lifestyle with extreme proximity to Coimbatore International Airport and leading IT parks. Perfectly crafted for urban families desiring connectivity and comfort.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.273181829035!2d76.994234!3d11.002683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859d3df061803%3A0x1c8b36873f272a2e!2sAvinashi%20Rd%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "/completed/p2/image.png"
    ],
    specs: [
      { label: "Type", value: "Luxury Apartments" },
      { label: "Location", value: "Avinashi Road Corridor" },
      { label: "Proximity", value: "Coimbatore Airport & IT Parks" },
      { label: "Lifestyle", value: "Modern & Convenient" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [
      "Lift Access",
      "Covered Parking",
      "CCTV Surveillance",
      "24h Water Supply",
      "DG Power Backup"
    ],
    locationAdvantages: [
      "Coimbatore International Airport — minutes away, quick connectivity",
      "CHIL SEZ & Tidel Park — proximity to major employment hubs",
      "Located in the prestigious Avinashi Road residential corridor"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010. With 10+ projects delivered and 500+ happy families housed, Nivasan Homes is a CREDAI-affiliated, fully RERA-registered developer known for customer-first values, eco-conscious design, uncompromising build quality, complete transparency, and a consistent record of on-time delivery. Every Nivasan Bliss apartment is backed by this same legacy of trust."
    },
    metaTitle: "Nivasan Bliss | Luxury Apartments in Avinashi Road Corridor",
    metaDescription: "Completed premium luxury apartments at Nivasan Bliss on Avinashi Road, Coimbatore. Meticulously designed for connected modern family living near the airport.",
    keywords: ["Nivasan Bliss", "luxury apartments Coimbatore", "apartments Avinashi Road", "flats near Coimbatore airport"]
  },
  "nivasan-ramaas": {
    id: "nivasan-ramaas",
    name: "Nivasan Ramaas",
    status: "Completed",
    location: "Peelamedu, Coimbatore",
    aioSentence: "Nivasan Ramaas by Nivasan Homes is a completed premium flagship residential apartment community located in Peelamedu, Coimbatore.",
    description: "A flagship development by Nivasan Homes where architectural brilliance meets human aspirations in a prestigious residential community. Combining robust structural engineering with timeless layout designs.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3262694119957!2d76.9849178!3d11.0092523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ab93a151b7%3A0x6b80cd9b9c1d6ffb!2sPeelamedu%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "/completed/p3/image.png"
    ],
    specs: [
      { label: "Type", value: "Premium Apartments" },
      { label: "Focus", value: "Flagship Development" },
      { label: "Location", value: "Peelamedu, Coimbatore" },
      { label: "Community", value: "Prestigious & Elite" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [
      "Covered Parking",
      "CCTV Surveillance",
      "24h Water Supply",
      "Landscaped Garden",
      "Lift Access"
    ],
    locationAdvantages: [
      "Located in Peelamedu — one of Coimbatore's most sought-after residential hubs",
      "Close proximity to top schools, universities, and multi-specialty hospitals",
      "Excellent connectivity to Avinashi Road and other prime transit corridors"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010. With 10+ projects delivered and 500+ happy families housed, Nivasan Homes is a CREDAI-affiliated, fully RERA-registered developer known for customer-first values, eco-conscious design, uncompromising build quality, complete transparency, and a consistent record of on-time delivery. Every Nivasan Ramaas apartment is backed by this same legacy of trust."
    },
    metaTitle: "Nivasan Ramaas | Premium Flagship Apartments in Peelamedu",
    metaDescription: "Completed premium flagship residential apartments at Nivasan Ramaas in Peelamedu, Coimbatore. Combining architectural brilliance with prestigious community living.",
    keywords: ["Nivasan Ramaas", "flats in Peelamedu Coimbatore", "apartments in Peelamedu", "Nivasan Homes Peelamedu"]
  },
  "echo-point-plaza": {
    id: "echo-point-plaza",
    name: "Echo Point Plaza",
    status: "Completed",
    location: "Opp. KMCH, Avinashi Rd, Coimbatore",
    aioSentence: "Echo Point Plaza by Nivasan Homes is a completed premium commercial retail and office development located directly opposite KMCH on Avinashi Road, Coimbatore.",
    description: "Premium commercial space situated directly opposite Kovai Medical Center and Hospital (KMCH) on Avinashi Road. Offers highly flexible layouts optimized for premium retail and executive office configurations.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.12351829035!2d77.034234!3d11.022683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859d3df061803%3A0x1c8b36873f272a2e!2sKovai%20Medical%20Center%20and%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "/completed/p4/image.png"
    ],
    specs: [
      { label: "Type", value: "Commercial Space" },
      { label: "Location", value: "Opp. KMCH, Avinashi Rd" },
      { label: "Layouts", value: "Flexible Retail & Office" },
      { label: "Corridor", value: "High-Traffic Business Corridor" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [
      "Covered Parking",
      "DG Power Backup",
      "Fire Safety Systems",
      "High-speed Lift Access",
      "24h Security Cameras"
    ],
    locationAdvantages: [
      "Located directly opposite Kovai Medical Center and Hospital (KMCH) on Avinashi Road",
      "High visibility and footfalls within a high-traffic premium business corridor",
      "Excellent connectivity to Coimbatore Airport and city center hubs"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010. With 10+ projects delivered and 500+ happy families housed, Nivasan Homes is a CREDAI-affiliated, fully RERA-registered developer known for customer-first values, eco-conscious design, uncompromising build quality, complete transparency, and a consistent record of on-time delivery. Every project by Nivasan Homes is backed by this same legacy of trust."
    },
    metaTitle: "Echo Point Plaza | Premium Commercial Space on Avinashi Road",
    metaDescription: "Completed premium commercial office & retail space at Echo Point Plaza, opposite KMCH, Coimbatore. Offers flexible layouts and high-speed amenities in a high-traffic business corridor.",
    keywords: ["Echo Point Plaza", "commercial space Avinashi Road", "office spaces Coimbatore", "retail spaces near KMCH"]
  },
  "echo-point-aavaas": {
    id: "echo-point-aavaas",
    name: "Echo Point Aavaas",
    status: "Completed",
    location: "Avinashi Road, Coimbatore",
    aioSentence: "Echo Point Aavaas by Nivasan Homes is a completed designer premium residential apartment development situated along the prime Avinashi Road corridor, Coimbatore.",
    description: "Designer and premium apartments situated along the prime Avinashi Road corridor. Offers upscale layouts, natural ventilation, and immediate accessibility to all key city center points.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.273181829035!2d76.994234!3d11.002683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859d3df061803%3A0x1c8b36873f272a2e!2sAvinashi%20Rd%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "/completed/p5/image.png"
    ],
    specs: [
      { label: "Type", value: "Designer Apartments" },
      { label: "Location", value: "Avinashi Road, Coimbatore" },
      { label: "Design", value: "Premium & Contemporary" },
      { label: "Access", value: "Prime Road Corridor" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [
      "Covered Parking",
      "Lift Access",
      "CCTV Surveillance",
      "RO Water Plant",
      "DG Power Backup"
    ],
    locationAdvantages: [
      "Situated directly on the highly connected Avinashi Road corridor",
      "Immediate accessibility to key business hubs, shopping, and dining",
      "Minutes away from Coimbatore International Airport and major IT corridors"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010. With 10+ projects delivered and 500+ happy families housed, Nivasan Homes is a CREDAI-affiliated, fully RERA-registered developer known for customer-first values, eco-conscious design, uncompromising build quality, complete transparency, and a consistent record of on-time delivery. Every project by Nivasan Homes is backed by this same legacy of trust."
    },
    metaTitle: "Echo Point Aavaas | Designer Apartments on Avinashi Road",
    metaDescription: "Completed designer premium apartments at Echo Point Aavaas on Avinashi Road, Coimbatore. Boasts contemporary layouts, natural ventilation, and prime city center accessibility.",
    keywords: ["Echo Point Aavaas", "designer apartments Coimbatore", "premium flats Avinashi Road", "apartments in Avinashi Road Coimbatore"]
  },
  "saradha-greens": {
    id: "saradha-greens",
    name: "Saradha Greens",
    status: "Completed",
    location: "Peelamedu, Coimbatore",
    aioSentence: "Saradha Greens by Nivasan Homes is a completed ultra-luxury gated villa community located in Peelamedu, Coimbatore.",
    description: "Ultra-luxury villas in Peelamedu, handcrafting a tranquil habitat. Offering refined living, unmatched privacy, and green surroundings in one of Coimbatore's most sought-after residential neighborhoods.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3262694119957!2d76.9849178!3d11.0092523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ab93a151b7%3A0x6b80cd9b9c1d6ffb!2sPeelamedu%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "/completed/p6/image.png"
    ],
    specs: [
      { label: "Type", value: "Ultra Luxury Villas" },
      { label: "Location", value: "Peelamedu, Coimbatore" },
      { label: "Living", value: "Refined & Exclusive" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [
      "Private Landscaped Gardens",
      "CCTV Surveillance",
      "24h Water Supply",
      "Covered Parking",
      "Compound Enclosure"
    ],
    locationAdvantages: [
      "Located in Peelamedu — a prime and highly sought-after residential enclave",
      "Close proximity to top schools, universities, and multi-specialty hospitals",
      "Minutes away from Avinashi Road and prime transport linkages"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010. With 10+ projects delivered and 500+ happy families housed, Nivasan Homes is a CREDAI-affiliated, fully RERA-registered developer known for customer-first values, eco-conscious design, uncompromising build quality, complete transparency, and a consistent record of on-time delivery. Every project by Nivasan Homes is backed by this same legacy of trust."
    },
    metaTitle: "Saradha Greens | Ultra Luxury Villas in Peelamedu",
    metaDescription: "Completed ultra-luxury gated villas at Saradha Greens in Peelamedu, Coimbatore. Discover refined living, private landscaped gardens, and unmatched privacy.",
    keywords: ["Saradha Greens", "luxury villas Peelamedu", "gated villas Peelamedu", "luxury independent villas Coimbatore"]
  },
  "nivasan-springs": {
    id: "nivasan-springs",
    name: "Nivasan Springs",
    status: "Completed",
    location: "Peelamedu, Coimbatore",
    aioSentence: "Nivasan Springs by Nivasan Homes is a completed premium residential apartment community situated in Peelamedu, Coimbatore.",
    description: "Premium residences in Peelamedu offering a tranquil, well-connected address. Meticulously designed units featuring generous natural ventilation, premium fixtures, and a family-focused community environment.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3262694119957!2d76.9849178!3d11.0092523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ab93a151b7%3A0x6b80cd9b9c1d6ffb!2sPeelamedu%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "/completed/p7/image.png"
    ],
    specs: [
      { label: "Type", value: "Premium Apartments" },
      { label: "Location", value: "Peelamedu, Coimbatore" },
      { label: "Address", value: "Tranquil & Connected" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [
      "Lift Access",
      "CCTV Surveillance",
      "RO Water Plant",
      "Covered Parking",
      "DG Power Backup"
    ],
    locationAdvantages: [
      "Located in Peelamedu — one of Coimbatore's most established residential neighborhoods",
      "Close proximity to top schools, universities, healthcare centers, and shopping",
      "Tranquil and calm setting while maintaining direct connectivity to Avinashi Road"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010. With 10+ projects delivered and 500+ happy families housed, Nivasan Homes is a CREDAI-affiliated, fully RERA-registered developer known for customer-first values, eco-conscious design, uncompromising build quality, complete transparency, and a consistent record of on-time delivery. Every project by Nivasan Homes is backed by this same legacy of trust."
    },
    metaTitle: "Nivasan Springs | Premium Apartments in Peelamedu",
    metaDescription: "Completed premium residential apartments at Nivasan Springs in Peelamedu, Coimbatore. Features generous natural ventilation, premium fixtures, and a tranquil connected address.",
    keywords: ["Nivasan Springs", "apartments in Peelamedu Coimbatore", "premium flats Peelamedu", "Nivasan Homes Peelamedu"]
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const project = projectsData[id];

  if (!project) {
    return {
      title: "Project Not Found | Nivasan Homes",
      description: "The requested residential project could not be found.",
    };
  }

  return {
    title: project.metaTitle || `${project.name} | Luxury Property in Coimbatore | Nivasan Homes`,
    description: project.metaDescription || `${project.description.slice(0, 155)}... Discover gated community specs, premium location, and luxury amenities.`,
    keywords: project.keywords || [project.name, "Nivasan Homes", project.location, "Luxury Real Estate Coimbatore"],
  };
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((id) => ({
    id,
  }));
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  const project = projectsData[id];

  if (!project) {
    return (
      <main className="bg-background-luxury min-h-screen pt-32 pb-24 font-sans flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Project Not Found</h2>
          <Link
            href="/projects"
            className="text-accent font-bold hover:underline cursor-pointer"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  // JSON-LD Structured Data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.nivasanhomes.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "https://www.nivasanhomes.com/projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.name,
        "item": `https://www.nivasanhomes.com/projects/${project.id}`
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Nivasan Homes",
    "url": "https://www.nivasanhomes.com",
    "logo": "https://www.nivasanhomes.com/logo.png",
    "description": "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avinashi Rd, next to PSG Tech, Peelamedu",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "postalCode": "641004",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91 99422 23013",
        "contactType": "sales"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91 98423 23071",
        "contactType": "customer service"
      }
    ]
  };

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": project.name,
    "description": project.description.replace(/\n/g, ' '),
    "url": `https://www.nivasanhomes.com/projects/${project.id}`,
    "about": {
      "@type": "SingleFamilyResidence",
      "name": project.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": project.location,
        "addressCountry": "IN"
      },
      "amenityFeature": project.amenities.map(amenity => ({
        "@type": "LocationFeatureSpecification",
        "name": amenity,
        "value": true
      }))
    }
  };

  const faqSchema = project.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": project.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="bg-background-luxury min-h-screen pt-32 pb-24 font-sans text-text-onyx">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          
          {/* HEADER HERO SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-black-luxury/10 pb-12">
            {/* Left Header Content */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Premium Breadcrumb */}
              <div>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-extrabold text-accent hover:text-primary transition-all duration-300 group"
                >
                  <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-300" /> 
                  Back to Projects
                </Link>
              </div>

              {/* Title & Badges */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black tracking-widest uppercase px-3 py-1 bg-accent text-white rounded-full">
                    {project.status}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-text-onyx/50 flex items-center gap-1">
                    <MapPin size={11} className="text-accent" /> {project.location.split(',')[0]}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-onyx tracking-tight leading-none uppercase">
                  {project.name}
                </h1>
              </div>

              {/* Quick Specs Highlight Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-black-luxury/5 mt-2">
                {project.specs.slice(0, 3).map((spec, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-text-onyx/45 font-bold">
                      {spec.label}
                    </span>
                    <span className="text-sm text-text-onyx font-black mt-1">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Showcase Image */}
            <div className="lg:col-span-6 h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-2xl relative group bg-black-luxury border border-[#eae7e3]">
              <div className="absolute -inset-[2px] overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={`${project.name} Hero Elevation`}
                  className="w-full h-full object-cover scale-[1.03] group-hover:scale-[1.07] transition-transform duration-750 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black-luxury/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* MAIN CONTENT LAYOUT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: Narrative & Details */}
            <div className="lg:col-span-7 flex flex-col gap-12">
              
              {/* Project Overview */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xs uppercase tracking-[0.25em] text-accent font-extrabold border-b border-black-luxury/5 pb-2">
                  Project Overview
                </h2>
                {project.aioSentence && (
                  <div className="border-l-4 border-accent pl-4 my-2">
                    <p className="text-text-onyx font-extrabold text-base leading-relaxed italic">
                      "{project.aioSentence}"
                    </p>
                  </div>
                )}
                <p className="text-text-onyx/80 text-base leading-relaxed whitespace-pre-line font-sans">
                  {project.description}
                </p>
              </div>

              {/* Full Specs List */}
              <div className="flex flex-col gap-6 bg-white border border-[#eae7e3] p-8 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-text-onyx border-b border-black-luxury/5 pb-3 uppercase tracking-wider">
                  Specifications & Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {project.specs.map((spec, index) => (
                    <div key={index} className="flex flex-col border-b border-black-luxury/5 pb-2">
                      <span className="text-[9px] uppercase tracking-widest text-text-onyx/45 font-bold">
                        {spec.label}
                      </span>
                      <span className="text-sm text-text-onyx font-extrabold mt-1">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Section */}
              {project.amenities && project.amenities.length > 0 && (
                <div className="flex flex-col gap-6 bg-white border border-[#eae7e3] p-8 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold text-text-onyx border-b border-black-luxury/5 pb-3 uppercase tracking-wider">
                    Amenities Include
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm font-extrabold text-text-onyx">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Sticky Sidebar Actions (Map, Advantages, Inquiry Form) */}
            <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-28">
              
              {/* Location advantages */}
              {project.locationAdvantages && (
                <div className="bg-white border border-[#eae7e3] p-6 md:p-8 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold text-text-onyx mb-5 border-b border-black-luxury/5 pb-3 uppercase tracking-wider">
                    Location Advantages
                  </h3>
                  <ul className="space-y-4">
                    {project.locationAdvantages.map((adv, idx) => {
                      const parts = adv.split(" — ");
                      if (parts.length > 1) {
                        return (
                          <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-text-onyx/75">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                            <span>
                              <strong className="text-text-onyx font-bold">{parts[0]}</strong> — {parts.slice(1).join(" — ")}
                            </span>
                          </li>
                        );
                      }
                      return (
                        <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-text-onyx/75">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          <span>{adv}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Map */}
              <div className="bg-white border border-[#eae7e3] rounded-xl overflow-hidden p-3 flex flex-col h-[320px] shadow-sm">
                <h3 className="text-xs uppercase tracking-widest font-extrabold text-text-onyx px-3 pt-2 pb-3 flex items-center gap-2">
                  <MapPin size={14} className="text-accent" /> Location Map
                </h3>
                <div className="flex-1 rounded-lg overflow-hidden border border-[#eae7e3]">
                  <iframe
                    src={project.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${project.name} Location Map`}
                  />
                </div>
              </div>

              {/* Inquiry Form */}
              <ProjectInquiryForm projectName={project.name} />
            </div>
          </div>

          {/* DEVELOPER BANNER SECTION (Sophisticated Dark Block) */}
          {project.aboutDeveloper && (
            <div className="bg-primary text-white p-8 md:p-12 rounded-2xl relative overflow-hidden group shadow-xl flex flex-col items-center justify-center text-center">
              <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-y-1/4 translate-x-1/4 select-none">
                <span className="font-serif text-[18rem] text-white">N</span>
              </div>
              <div className="max-w-4xl relative z-10 flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-black block mb-3">
                  The Builder
                </span>
                <h2 className="text-3xl font-extrabold mb-6 uppercase tracking-tight">
                  {project.aboutDeveloper.title}
                </h2>
                <p className="text-white/85 text-sm md:text-base leading-relaxed mb-10 font-sans max-w-3xl">
                  {project.aboutDeveloper.content}
                </p>
                {/* Stats grid - Forced 4 columns on single line with vertical alignment inside */}
                <div className="grid grid-cols-4 gap-2 md:gap-8 pt-8 border-t border-white/10 w-full text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm sm:text-lg md:text-xl font-black text-accent leading-none whitespace-nowrap">15+ Years</span>
                    <span className="text-[7.5px] sm:text-[9px] uppercase tracking-wider text-white/50 font-bold block mt-1.5 whitespace-nowrap">Coimbatore Legacy</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm sm:text-lg md:text-xl font-black text-accent leading-none whitespace-nowrap">10+ Projects</span>
                    <span className="text-[7.5px] sm:text-[9px] uppercase tracking-wider text-white/50 font-bold block mt-1.5 whitespace-nowrap">Delivered</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm sm:text-lg md:text-xl font-black text-accent leading-none whitespace-nowrap">500+ Housed</span>
                    <span className="text-[7.5px] sm:text-[9px] uppercase tracking-wider text-white/50 font-bold block mt-1.5 whitespace-nowrap">Happy Families</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm sm:text-lg md:text-xl font-black text-accent leading-none whitespace-nowrap">CREDAI Member</span>
                    <span className="text-[7.5px] sm:text-[9px] uppercase tracking-wider text-white/50 font-bold block mt-1.5 whitespace-nowrap">RERA Registered</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ SECTION */}
          {project.faqs && project.faqs.length > 0 && (
            <div className="flex flex-col items-center max-w-4xl mx-auto w-full border-t border-black-luxury/10 pt-16">
              <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-black block">
                  Information Guide
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-text-onyx tracking-tight uppercase">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs md:text-sm text-text-onyx/65 max-w-xl">
                  Explore answers to common questions about {project.name}, specifications, utilities, and location advantages.
                </p>
              </div>
              <div className="w-full">
                <FAQAccordion faqs={project.faqs} />
              </div>
            </div>
          )}

          {/* PROJECT SHOWCASE GALLERY */}
          <ProjectGallery
            projectId={project.id}
            projectName={project.name}
            images={project.images}
          />

        </div>
      </main>
    </>
  );
}
