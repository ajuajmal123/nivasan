"use client";

import React from "react";
import FAQAccordion from "@/components/ui/FAQAccordion";

const homepageFAQs = [
  {
    question: "Who is Nivasan Homes and what is their legacy?",
    answer: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010. Over the past 15+ years, we have built a reputation for customer-first values, eco-conscious planning, uncompromising build quality, complete transparency, and on-time delivery, successfully housing 500+ happy families across 10+ completed projects."
  },
  {
    question: "Where are Nivasan Homes projects located in Coimbatore?",
    answer: "Our landmark residential and commercial developments are strategically positioned in Coimbatore's prime connected corridors—including Avinashi Road, CODISSIA, Peelamedu, and Kalapatti—ensuring proximity to major IT parks, leading healthcare institutions, top-tier schools, and the Coimbatore International Airport."
  },
  {
    question: "What types of properties do you offer?",
    answer: "We offer a diverse premium real estate portfolio, ranging from ultra-luxury independent gated community villas with private gardens (such as Nivasan Swarnapuraa and Nivasan Udhyana) to designer contemporary apartments (such as Nivasan Vakulam, Nivasan Bliss, and Nivasan Springs) and flexible retail or office commercial spaces (such as Echo Point Plaza)."
  },
  {
    question: "Are your ongoing projects fully RERA approved?",
    answer: "Yes, absolute transparency is core to our brand. All of our active and ongoing developments are fully registered and approved by the Tamil Nadu Real Estate Regulatory Authority (TNRERA). For example, Nivasan Swarnapuraa is registered under TN/11/BUILDING/0467/2024 and Nivasan Vakulam is registered under TN/11/BLG/0114/2026."
  },
  {
    question: "How do I schedule a site visit or contact the sales team?",
    answer: "You can schedule an exclusive site visit or contact our real estate advisory team directly at +91 99422 23013 or +91 98423 23071. Alternatively, you can click the sticky WhatsApp click-to-chat button on our website for instant advisory assistance."
  }
];

export default function FAQSection() {
  return (
    <section className="relative py-24 bg-background-luxury overflow-hidden border-b border-[#eae7e3]">
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-black block">
            Information Guide
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight uppercase text-black-luxury select-none">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-text-onyx/65 max-w-xl">
            Explore detailed information regarding our legacy, project locations, regulatory approvals, and home buying details.
          </p>
        </div>

        {/* FAQ Accordion Component */}
        <div className="w-full max-w-4xl">
          <FAQAccordion faqs={homepageFAQs} />
        </div>

      </div>
    </section>
  );
}
