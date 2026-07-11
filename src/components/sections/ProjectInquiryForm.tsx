"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectInquiryFormProps {
  projectName: string;
}

export default function ProjectInquiryForm({ projectName }: ProjectInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I would like to enquire about configurations and booking details for ${projectName}.`,
    website: "", // Honeypot spam blocker field
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
          project: projectName,
          message: formData.message,
          website: formData.website, // Submit honeypot field value
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setIsSubmitted(true);
      } else {
        setErrorMessage(result.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (error) {
      setErrorMessage("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="project-inquiry"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-white border border-[#eae7e3] p-6 md:p-8 rounded-xl shadow-lg relative flex flex-col gap-4"
          >
            {/* Honeypot field to prevent spam bots */}
            <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Leave this field blank if you are human</label>
              <input
                id="website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>

            <div>
              <h3 className="font-sans text-xl font-extrabold text-primary select-none">
                Direct Project Inquiry
              </h3>
              <p className="text-[10px] text-primary/50 font-bold uppercase tracking-widest mt-1">
                Enter your details to receive e-brochure & pricing details
              </p>
            </div>

            {/* Project Name (Prefilled / Readonly) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-primary/80">
                Selected Project
              </label>
              <input
                type="text"
                readOnly
                value={projectName}
                className="w-full bg-[#fcfbfa] border border-[#eae7e3] text-sm text-primary/60 font-bold rounded-lg px-4 py-2.5 outline-none select-none cursor-not-allowed"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-primary">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-[#eae7e3] focus:border-primary focus:outline-none rounded-lg px-4 py-2.5 text-sm text-primary font-semibold placeholder-primary/30 transition-colors"
              />
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-primary">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-[#eae7e3] focus:border-primary focus:outline-none rounded-lg px-4 py-2.5 text-sm text-primary font-semibold placeholder-primary/30 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-primary">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="98423 XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-[#eae7e3] focus:border-primary focus:outline-none rounded-lg px-4 py-2.5 text-sm text-primary font-semibold placeholder-primary/30 transition-colors"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-primary">
                Requirements Details
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-[#eae7e3] focus:border-primary focus:outline-none rounded-lg px-4 py-2.5 text-sm text-primary font-semibold placeholder-primary/30 transition-colors resize-none leading-relaxed"
              />
            </div>

            {errorMessage && (
              <p className="text-rose-600 text-xs font-bold text-center mt-1">
                {errorMessage}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white font-extrabold text-xs uppercase tracking-widest py-3.5 px-6 rounded-lg transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? "Sending Inquiry..." : "Submit Inquiry"}
              <Send size={13} className="ml-1" />
            </button>

            {/* GDPR Trust Badge */}
            <div className="flex items-center justify-center gap-1.5 text-[9px] text-primary/40 font-bold uppercase tracking-wider select-none mt-1">
              <Lock size={10} className="text-accent" /> Your details are secure and RERA protected.
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="project-inquiry-success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-emerald-600/30 p-8 rounded-xl shadow-lg relative flex flex-col items-center justify-center text-center gap-4 min-h-[440px]"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle size={30} />
            </div>
            <h3 className="font-sans text-xl font-extrabold text-primary">
              Inquiry Logged
            </h3>
            <p className="text-xs text-primary/70 max-w-sm leading-relaxed font-medium">
              Thank you, <span className="font-extrabold text-primary">{formData.name}</span>! Your request for <span className="font-extrabold text-primary">{projectName}</span> has been logged. One of our dedicated sales representatives will contact you shortly at <span className="font-extrabold text-primary">{formData.phone}</span>.
            </p>
            <button
              onClick={() => {
                setFormData({ name: "", email: "", phone: "", message: `I would like to enquire about configurations and booking details for ${projectName}.`, website: "" });
                setIsSubmitted(false);
                setErrorMessage(null);
              }}
              className="text-[10px] uppercase font-extrabold tracking-widest text-accent hover:text-primary transition-colors cursor-pointer mt-4 border border-[#eae7e3] px-5 py-2 rounded-full hover:border-accent"
            >
              Submit New Inquiry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
