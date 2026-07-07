"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../ui/Reveal";

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate luxury API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
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
    <section id="contact" className="py-16 md:py-24 bg-background-luxury text-primary relative overflow-hidden border-t border-[#eae7e3]">
      {/* Interactive grayscale map backdrop for office location */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3262694119957!2d76.9849178!3d11.0092523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ab93a151b7%3A0x6b80cd9b9c1d6ffb!2sPeelamedu%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(100%) opacity(35%) contrast(100%)" }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Nivasan Homes Office Location Map Background"
          className="w-full h-full object-cover scale-105 pointer-events-none"
        />
        {/* Blending overlay to ensure text readability while keeping map details visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-luxury/80 via-background-luxury/60 to-background-luxury/80 pointer-events-none" />
      </div>

      {/* Subtle grid pattern backdrop design */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <Reveal delay={0.1} width="full">
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent font-semibold block text-center w-full">
              Start Your Journey With Us
            </span>
          </Reveal>
          <Reveal delay={0.2} width="full">
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-black-luxury leading-tight text-center w-full">
              Premium homes await. <br />
              <span className="text-accent">Book your site visit today.</span>
            </h2>
          </Reveal>
        </div>

        {/* 2-Column Responsive Layout: Contact Info & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-[1500px] mx-auto mb-16">
          
          {/* Left Column: Essential Contacts */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            
            {/* Card 1: Call Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-[#eae7e3] p-5 rounded-xl shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="p-3 bg-primary/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-primary/45 font-bold mb-0.5 select-none">
                  Customer Advisory
                </h3>
                <a href="tel:+919842323071" className="text-base font-extrabold text-black-luxury hover:text-accent transition-colors duration-300 block">
                  +91 98423 23071
                </a>
                <p className="text-[11px] text-primary/60 font-medium mt-1 leading-normal">
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
              className="bg-white border border-[#eae7e3] p-5 rounded-xl shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="p-3 bg-primary/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-primary/45 font-bold mb-0.5 select-none">
                  Schedule Site Visit
                </h3>
                <a href="tel:+919942223013" className="text-base font-extrabold text-black-luxury hover:text-accent transition-colors duration-300 block">
                  +91 99422 23013
                </a>
                <p className="text-[11px] text-primary/60 font-medium mt-1 leading-normal">
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
              className="bg-white border border-[#eae7e3] p-5 rounded-xl shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="p-3 bg-primary/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-primary/45 font-bold mb-0.5 select-none">
                  Email Advisory
                </h3>
                <a href="mailto:info@nivasanhomes.com" className="text-sm font-extrabold text-black-luxury hover:text-accent transition-colors duration-300 block break-all">
                  info@nivasanhomes.com
                </a>
                <p className="text-[11px] text-primary/60 font-medium mt-1 leading-normal">
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
              className="bg-white border border-[#eae7e3] p-5 rounded-xl shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="p-3 bg-primary/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-primary/45 font-bold mb-0.5 select-none">
                  Experience Center
                </h3>
                <address className="text-[12px] text-black-luxury font-extrabold not-italic leading-relaxed">
                  Avinashi Rd, next to PSG Tech, Peelamedu, Coimbatore, TN 641004
                </address>
                <a
                  href="https://maps.google.com/?q=Avinashi+Rd+next+to+PSG+Tech+Peelamedu+Coimbatore+Tamil+Nadu+641004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-accent hover:text-primary transition-colors mt-2"
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
                  className="bg-white border border-[#eae7e3] p-7 md:p-8 rounded-xl shadow-lg relative flex flex-col gap-4"
                >
                  <div>
                    <h3 className="font-sans text-lg font-extrabold text-black-luxury">
                      Request Callback & Brochure
                    </h3>
                    <p className="text-[11px] text-black-luxury/50 font-bold uppercase tracking-wider mt-0.5">
                      Submit details below for direct consultant advice
                    </p>
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black-luxury/90">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#eae7e3] focus:border-primary focus:outline-none rounded-lg px-4 py-2.5 text-sm text-black-luxury font-bold placeholder-primary/30 transition-colors"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-black-luxury/90">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-[#eae7e3] focus:border-primary focus:outline-none rounded-lg px-4 py-2.5 text-sm text-black-luxury font-bold placeholder-primary/30 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-black-luxury/90">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="98423 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-[#eae7e3] focus:border-primary focus:outline-none rounded-lg px-4 py-2.5 text-sm text-black-luxury font-bold placeholder-primary/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Dropdown */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black-luxury/90">
                      Project of Interest
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        className={`w-full bg-white border border-[#eae7e3] focus:border-primary focus:outline-none rounded-lg px-4 py-2.5 pr-10 text-sm font-bold transition-colors appearance-none cursor-pointer ${
                          formData.project === "" ? "text-primary/40" : "text-black-luxury"
                        }`}
                      >
                        <option value="" disabled className="text-primary/40">Select a project layout...</option>
                        {projectsOptions.map((proj) => (
                          <option key={proj} value={proj} className="text-black-luxury">{proj}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black-luxury/40">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black-luxury/90">
                      Detailed Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your unit configurations, requirements or site visit timeline preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-[#eae7e3] focus:border-primary focus:outline-none rounded-lg px-4 py-2.5 text-sm text-black-luxury font-bold placeholder-primary/30 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white font-extrabold text-xs uppercase tracking-widest py-3.5 px-6 rounded-lg transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
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
                  className="bg-white border border-emerald-600/30 p-8 rounded-xl shadow-lg relative flex flex-col items-center justify-center text-center gap-4 min-h-[440px]"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                    <CheckCircle size={30} />
                  </div>
                  <h3 className="font-sans text-xl font-extrabold text-primary">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-primary/70 max-w-sm leading-relaxed">
                    Thank you, <span className="font-extrabold text-black-luxury">{formData.name}</span>! Your request for <span className="font-extrabold text-black-luxury">{formData.project}</span> has been successfully logged. One of our dedicated sales representatives will contact you shortly at <span className="font-extrabold text-black-luxury">{formData.phone}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setFormData({ name: "", email: "", phone: "", project: "", message: "" });
                      setIsSubmitted(false);
                    }}
                    className="text-[10px] uppercase font-extrabold tracking-widest text-accent hover:text-primary transition-colors cursor-pointer mt-4 border border-[#eae7e3] px-5 py-2 rounded-full hover:border-accent"
                  >
                    Submit New Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Footer Trust Bar - Centered via width="full" on Reveal */}
        <div className="border-t border-[#eae7e3] pt-8 text-center w-full">
          <Reveal delay={0.9} width="full">
            <p className="text-xs md:text-sm font-extrabold text-primary/80 uppercase tracking-widest leading-relaxed text-center w-full block select-none">
              RERA Approved <span className="text-accent mx-2">|</span> CREDAI Affiliated <span className="text-accent mx-2">|</span> Trusted Since 2010 <span className="text-accent mx-2">|</span> Coimbatore, Tamil Nadu
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
