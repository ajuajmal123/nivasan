"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "The Pavilion",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate premium submit transition
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 md:py-40 bg-black-luxury text-white relative overflow-hidden">
      {/* Background architectural details */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_bottom_right,rgba(198,168,106,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Reveal delay={0.1}>
                <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent font-semibold mb-6 block">
                  Registry
                </span>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light leading-tight mb-8">
                  Begin Your <br />
                  <span className="italic text-accent">Journey Home.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-white/60 text-sm leading-relaxed tracking-wide font-light max-w-sm mb-12">
                  Schedule a private architectural walk-through or consult with our advisory team to discover custom residential opportunities.
                </p>
              </Reveal>
            </div>

            {/* Direct details */}
            <div className="space-y-8 border-t border-white/10 pt-8">
              <Reveal delay={0.4}>
                <div className="flex items-start space-x-4">
                  <Phone size={18} className="text-accent mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase block mb-1">
                      Call Inquiries
                    </span>
                    <a
                      href="tel:+914222456789"
                      className="text-sm font-light hover:text-accent transition-colors duration-300"
                    >
                      +91 422 245 6789
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="flex items-start space-x-4">
                  <Mail size={18} className="text-accent mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase block mb-1">
                      Email Advisory
                    </span>
                    <a
                      href="mailto:advisory@nivasanhomes.com"
                      className="text-sm font-light hover:text-accent transition-colors duration-300"
                    >
                      advisory@nivasanhomes.com
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.6}>
                <div className="flex items-start space-x-4">
                  <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase block mb-1">
                      Office Gallery
                    </span>
                    <address className="not-italic text-sm text-white/70 font-light leading-relaxed">
                      Avinashi Rd, next to PSG Tech, Peelamedu, Coimbatore, Tamil Nadu 641004
                    </address>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Mini form */}
          <div className="lg:col-span-7 lg:pl-8">
            <div className="p-8 md:p-12 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-sm relative">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name field */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className="w-full bg-transparent border-b border-white/20 focus:border-accent py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none transition-colors duration-500"
                    />
                  </div>

                  {/* Email & Phone fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full bg-transparent border-b border-white/20 focus:border-accent py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none transition-colors duration-500"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full bg-transparent border-b border-white/20 focus:border-accent py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none transition-colors duration-500"
                      />
                    </div>
                  </div>

                  {/* Project Selector dropdown */}
                  <div className="relative">
                    <label className="text-[9px] uppercase tracking-[0.25em] text-white/40 block mb-2">
                      Project of Interest
                    </label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      className="w-full bg-black-luxury border-b border-white/20 focus:border-accent py-3 text-sm font-light text-white focus:outline-none transition-colors duration-500 cursor-pointer"
                    >
                      <option value="The Pavilion">The Pavilion Residence</option>
                      <option value="Aether Penthouse">Aether Penthouse</option>
                      <option value="Oasis Coastal">Oasis Coastal Retreat</option>
                    </select>
                  </div>

                  {/* Message field */}
                  <div className="relative">
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your requirements or preferred viewing schedule..."
                      className="w-full bg-transparent border-b border-white/20 focus:border-accent py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none transition-colors duration-500 resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <div>
                    <Button type="submit" variant="accent" className="w-full !py-4">
                      Submit Private Inquiry
                    </Button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <CheckCircle size={48} className="text-accent mb-6 animate-pulse" />
                  <h3 className="font-serif text-2xl text-white font-light mb-4">
                    Inquiry Registered
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed tracking-wide font-light max-w-sm">
                    Thank you, <span className="text-accent font-semibold">{formData.name}</span>. An architectural consultant from our private registry will reach out to you within 24 hours.
                  </p>
                </motion.div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
