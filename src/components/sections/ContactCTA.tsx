"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../ui/Reveal";
import LogoMark from "../ui/LogoMark";

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
    website: "", // Honeypot field
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project: formData.project,
          message: formData.message,
          website: formData.website, // Submit honeypot
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setIsSubmitted(true);
      } else {
        setErrorMessage(result.message || "Failed to submit inquiry. Please try again.");
      }
    } catch {
      setErrorMessage("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectsOptions = [
    "Nivasan Swarnapuraa",
    "Nivasan Vakulam",
    "Nivasan Udhyana",
    "Nivasan Bliss",
    "Nivasan Ramaas",
    "Echo Point Plaza",
    "Echo Point Aavaas",
    "Saradha Greens",
    "Nivasan Springs",
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-linear-to-br from-bg-cream to-bg-green-soft text-primary relative overflow-hidden border-t border-accent/30">
      {/* Premium backdrop: fine gold blueprint grid (masked away from the centre) + faint logo-mark watermark */}
      <div className="contact-blueprint absolute inset-0 pointer-events-none" aria-hidden="true" />
      <LogoMark className="hidden md:block absolute top-1/2 -right-40 lg:-right-32 w-105 lg:w-130 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none" />

      <div className="max-w-400 mx-auto px-6 md:px-12 relative z-10">

        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 flex flex-col items-center gap-3">
          <Reveal delay={0.1} width="full">
            <span className="text-xs tracking-[0.3em] uppercase font-display text-accent-text font-semibold block text-center w-full">
              Start Your Journey With Us
            </span>
          </Reveal>
          <Reveal delay={0.2} width="full">
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-heading leading-tight text-center w-full">
              Premium homes await. <br />
              <span className="text-accent-text">Book your site visit today.</span>
            </h2>
          </Reveal>
        </div>

        {/* 2-Column Responsive Layout: Contact Info & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-375 mx-auto mb-16">

          {/* Left Column: Essential Contacts */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* Card 1: Call Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-border p-5 rounded-xl shadow-sm card-interactive flex items-start gap-4 group"
            >
              <div className="p-3 bg-primary/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h3 className="label-caps! text-text-muted mb-0.5 select-none">
                  Customer Advisory
                </h3>
                <a href="tel:+919842323071" className="text-base font-extrabold text-primary hover:text-primary-hover transition-colors duration-300 block">
                  +91 98423 23071
                </a>
                <p className="text-[11px] text-text-muted font-normal mt-1 leading-normal">
                  General inquiries & virtual site consultations.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Call Sales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-border p-5 rounded-xl shadow-sm card-interactive flex items-start gap-4 group"
            >
              <div className="p-3 bg-primary/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h3 className="label-caps! text-text-muted mb-0.5 select-none">
                  Schedule Site Visit
                </h3>
                <a href="tel:+919942223013" className="text-base font-extrabold text-primary hover:text-primary-hover transition-colors duration-300 block">
                  +91 99422 23013
                </a>
                <p className="text-[11px] text-text-muted font-normal mt-1 leading-normal">
                  Connect with our on-site sales consultants.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Email & Brochure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-border p-5 rounded-xl shadow-sm card-interactive flex items-start gap-4 group"
            >
              <div className="p-3 bg-primary/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <h3 className="label-caps! text-text-muted mb-0.5 select-none">
                  Email Advisory
                </h3>
                <a href="mailto:info@nivasanhomes.com" className="text-sm font-extrabold text-primary hover:text-primary-hover transition-colors duration-300 block break-all">
                  info@nivasanhomes.com
                </a>
                <p className="text-[11px] text-text-muted font-normal mt-1 leading-normal">
                  For e-brochures and corporate queries.
                </p>
              </div>
            </motion.div>

            {/* Card 4: Office Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white border border-border p-5 rounded-xl shadow-sm card-interactive flex items-start gap-4 group"
            >
              <div className="p-3 bg-primary/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="label-caps! text-text-muted mb-0.5 select-none">
                  Experience Center
                </h3>
                <address className="text-[12px] text-heading font-extrabold not-italic leading-relaxed">
                  No. 252, Avinashi Road (Opp: Varadharaja Mills), Peelamedu, Coimbatore - 641 004
                </address>
                <a
                  href="https://maps.google.com/?q=No.+252,+Avinashi+Road+(Opp:+Varadharaja+Mills),+Peelamedu,+Coimbatore+-+641+004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-text mt-2"
                >
                  View on Google Maps &rarr;
                </a>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Premium Inquiry Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="inquiry-form"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  onSubmit={handleSubmit}
                  className="bg-white border border-border p-7 md:p-8 rounded-xl shadow-lg relative flex flex-col gap-4"
                >
                  {/* Honeypot field to prevent spam bots. Its id/name deliberately avoid words like
                      "website"/"url" so browser and password-manager autofill don't fill it for real users. */}
                  <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="nv-hp-contact">Leave this field blank if you are human</label>
                    <input
                      id="nv-hp-contact"
                      type="text"
                      name="nv_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>

                  <div>
                    <h3 className="font-sans text-lg font-extrabold text-heading">
                      Request Callback & Brochure
                    </h3>
                    <p className="text-[11px] text-text-muted font-bold uppercase tracking-wider mt-0.5">
                      Submit details below for direct consultant advice
                    </p>
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="label-caps text-text">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-border focus:border-primary rounded-lg px-4 py-2.5 text-sm text-heading font-bold placeholder:text-text-muted transition-colors"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="label-caps text-text">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-border focus:border-primary rounded-lg px-4 py-2.5 text-sm text-heading font-bold placeholder:text-text-muted transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="label-caps text-text">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="98423 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-border focus:border-primary rounded-lg px-4 py-2.5 text-sm text-heading font-bold placeholder:text-text-muted transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Dropdown */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label className="label-caps text-text">
                      Project of Interest
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        className={`w-full bg-white border border-border focus:border-primary rounded-lg px-4 py-2.5 pr-10 text-sm font-bold transition-colors appearance-none cursor-pointer ${formData.project === "" ? "text-text-muted" : "text-heading"
                          }`}
                      >
                        <option value="" disabled className="text-text-muted">Select a project layout...</option>
                        {projectsOptions.map((proj) => (
                          <option key={proj} value={proj} className="text-heading">{proj}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="label-caps text-text">
                      Detailed Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your unit configurations, requirements or site visit timeline preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-border focus:border-primary rounded-lg px-4 py-2.5 text-sm text-heading font-bold placeholder:text-text-muted transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-rose-600 text-xs font-bold text-center mt-1">
                      {errorMessage}
                    </p>
                  )}

                  <div className="flex items-start gap-2.5 mt-2">
                    <input
                      type="checkbox"
                      id="terms-contact"
                      required
                      className="mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary bg-white border-border rounded focus:ring-primary focus:ring-1 cursor-pointer shrink-0"
                    />
                    <label htmlFor="terms-contact" className="text-[10px] sm:text-xs text-text font-normal leading-relaxed">
                      I agree to the <a href="/Nivasan_Homes_Terms_and_Conditions.pdf" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:text-primary-hover transition-colors duration-300">Terms & Conditions</a> and <a href="/Nivasan_Homes_Privacy_Policy.pdf" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:text-primary-hover transition-colors duration-300">Privacy Policy</a>.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-md w-full mt-2"
                  >
                    {isSubmitting ? "Processing Request..." : "Submit Inquiry"}
                    <Send size={13} className="ml-1" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="inquiry-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-primary/20 p-8 rounded-xl shadow-lg relative flex flex-col items-center justify-center text-center gap-4 min-h-110"
                >
                  <div className="w-14 h-14 rounded-full bg-bg-green-soft text-primary flex items-center justify-center shadow-inner">
                    <CheckCircle size={30} />
                  </div>
                  <h3 className="font-sans text-xl font-extrabold text-primary">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-text max-w-sm leading-relaxed">
                    Thank you, <span className="font-extrabold text-heading">{formData.name}</span>! Your request for <span className="font-extrabold text-heading">{formData.project}</span> has been successfully logged. One of our dedicated sales representatives will contact you shortly at <span className="font-extrabold text-heading">{formData.phone}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setFormData({ name: "", email: "", phone: "", project: "", message: "", website: "" });
                      setIsSubmitted(false);
                      setErrorMessage(null);
                    }}
                    className="btn btn-secondary btn-sm mt-4"
                  >
                    Submit New Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Footer Trust Bar - Centered via width="full" on Reveal */}
        <div className="border-t border-border pt-8 text-center w-full">
          <Reveal delay={0.9} width="full">
            <p className="text-xs md:text-sm font-extrabold text-primary uppercase tracking-widest leading-relaxed text-center w-full block select-none">
              RERA Approved <span className="text-accent mx-2">|</span> CREDAI Affiliated <span className="text-accent mx-2">|</span> Trusted Since 2010 <span className="text-accent mx-2">|</span> Coimbatore, Tamil Nadu
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
