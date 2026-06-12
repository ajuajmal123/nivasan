"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

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
}

const projectsData: Record<string, ProjectDetails> = {
  "nivasan-swarnapuraa": {
    id: "nivasan-swarnapuraa",
    name: "Nivasan Swarnapuraa",
    status: "Ongoing",
    location: "Kalapatti, Near Broadway Mall & Coimbatore Airport",
    description: "A sanctuary of tranquility and beacon of sophisticated living. Each villa combines the finest of modern design with the warmth of a family home. Large windows invite golden sunlight, bathing interiors in warmth while offering views of verdant landscapes.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1417086820515!2d77.0185984!3d11.0183141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857b28203f191%3A0xb3de2c270d4d4bb2!2sKalapatti%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "/ongoing/p1/image.png",
      "/ongoing/p1/image1.png",
      "/ongoing/p1/image2.png",
      "/ongoing/p1/image3.png",
      "/ongoing/p1/image4.png",
      "/ongoing/p1/image5.png"
    ],
    specs: [
      { label: "Configuration", value: "4 BHK Premium Villa" },
      { label: "Total Units", value: "19 Exclusive Villas" },
      { label: "Land Area", value: "2.01 Acres" },
      { label: "Villa Size", value: "2,800 sq.ft each" },
      { label: "Type", value: "Gated Community" },
      { label: "Status", value: "Final Units Available" },
      { label: "Launched", value: "Sep 2024" },
      { label: "RERA", value: "TN/11/BUILDING/0467/2024" }
    ],
    amenities: [
      "24h Water Supply",
      "CCTV Cameras",
      "Fire Safety",
      "Compound",
      "Covered Parking"
    ]
  },
  "nivasan-vakulam": {
    id: "nivasan-vakulam",
    name: "Nivasan Vakulam",
    status: "Ongoing",
    location: "Near Tidel Park, Coimbatore",
    description: "A thoughtfully designed residential apartment community crafted for families who deserve the best of calm living and city convenience. Spacious, well-ventilated homes with premium amenities at an address that grows in value year after year.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.208151475735!2d77.0223594!3d11.0134062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859d3df061803%3A0x1c8b36873f272a2e!2sTIDEL%20Park%20Coimbatore!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: [
      "/ongoing/p2/image2.png",
      "/ongoing/p2/image3.png",
      "/ongoing/p2/image1.png"
    ],
    specs: [
      { label: "Configuration", value: "2 BHK & 3 BHK" },
      { label: "Size Range", value: "1,090 - 1,989 sq.ft" },
      { label: "2 BHK Size", value: "1,090 sq.ft." },
      { label: "3 BHK Size", value: "Up to 1,989 sq.ft." },
      { label: "Possession", value: "31 March 2029" },
      { label: "Parking", value: "Covered Parking" },
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
    ]
  },
  "nivasan-udhyana": {
    id: "nivasan-udhyana",
    name: "Nivasan Udhyana",
    status: "Completed",
    location: "Near CODISSIA, Coimbatore",
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
    ]
  },
  "nivasan-bliss": {
    id: "nivasan-bliss",
    name: "Nivasan Bliss",
    status: "Completed",
    location: "Avinashi Road, Coimbatore",
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
    ]
  },
  "nivasan-ramaas": {
    id: "nivasan-ramaas",
    name: "Nivasan Ramaas",
    status: "Completed",
    location: "Peelamedu, Coimbatore",
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
    ]
  },
  "echo-point-plaza": {
    id: "echo-point-plaza",
    name: "Echo Point Plaza",
    status: "Completed",
    location: "Opp. KMCH, Avinashi Rd, Coimbatore",
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
    ]
  },
  "echo-point-aavaas": {
    id: "echo-point-aavaas",
    name: "Echo Point Aavaas",
    status: "Completed",
    location: "Avinashi Road, Coimbatore",
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
    ]
  },
  "saradha-greens": {
    id: "saradha-greens",
    name: "Saradha Greens",
    status: "Completed",
    location: "Peelamedu, Coimbatore",
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
    ]
  },
  "nivasan-springs": {
    id: "nivasan-springs",
    name: "Nivasan Springs",
    status: "Completed",
    location: "Peelamedu, Coimbatore",
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
    ]
  }
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const project = projectsData[id];

  if (!project) {
    return (
      <main className="bg-background-luxury min-h-screen pt-32 pb-24 font-sans flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Project Not Found</h2>
          <button
            onClick={() => router.push("/projects")}
            className="text-accent font-bold hover:underline cursor-pointer"
          >
            Back to Projects
          </button>
        </div>
      </main>
    );
  }

  const getStatusBadgeClass = (status: string) => {
    if (status === "Completed") {
      return "bg-emerald-600 text-white";
    }
    return "bg-primary text-white";
  };

  return (
    <main className="bg-background-luxury min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Navigation Breadcrumb */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => router.push("/projects")}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary/60 hover:text-primary transition-colors duration-300 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Projects
          </button>
        </div>

        {/* Title & Status */}
        <div className="flex flex-col items-center justify-center text-center gap-4 mb-12 border-b border-black-luxury/10 pb-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-3">

              <span className="text-xs text-primary/50 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                <MapPin size={12} className="text-accent" /> {project.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight">
              {project.name}
            </h1>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Main Details and Spec Sheet */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Description */}
            <div className="bg-white border border-[#eae7e3] p-8 rounded-xl">
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-black-luxury/5 pb-3">
                Project Overview
              </h3>
              <p className="text-primary/70 text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Spec sheet */}
            <div className="bg-white border border-[#eae7e3] p-8 rounded-xl">
              <h3 className="text-lg font-bold text-primary mb-6 border-b border-black-luxury/5 pb-3">
                Specifications & Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.specs.map((spec, index) => (
                  <div key={index} className="flex flex-col border-b border-black-luxury/5 pb-2">
                    <span className="text-[10px] uppercase tracking-wider text-primary/40 font-bold">
                      {spec.label}
                    </span>
                    <span className="text-sm text-primary font-bold mt-1">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Section */}
            {project.amenities && project.amenities.length > 0 && (
              <div className="bg-white border border-[#eae7e3] p-8 rounded-xl">
                <h3 className="text-lg font-bold text-primary mb-6 border-b border-black-luxury/5 pb-3">
                  Amenities Include
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2.5 text-sm font-bold text-primary">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Map Block */}
          <div className="lg:col-span-5 h-[350px] lg:h-full min-h-[350px] bg-white border border-[#eae7e3] rounded-xl overflow-hidden p-3 flex flex-col justify-between">
            <h3 className="text-sm font-bold text-primary px-3 pt-2 pb-3 flex items-center gap-2">
              <MapPin size={16} className="text-accent" /> Location Map
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
        </div>

        {/* Project Image Gallery Section */}
        <div className="border-t border-black-luxury/10 pt-16">
          <h3 className="text-2xl font-extrabold text-primary tracking-tight mb-8">
            Project Showcase Gallery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.images.map((img, index) => (
              <div key={index} className="h-64 rounded-xl overflow-hidden border border-[#eae7e3] group cursor-pointer bg-black-luxury relative">
                <img
                  src={img}
                  alt={`${project.name} Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
