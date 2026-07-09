"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4 w-full">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
              isOpen
                ? "border-accent shadow-md shadow-accent/5"
                : "border-[#eae7e3] hover:border-primary/30 shadow-sm"
            }`}
          >
            {/* Header/Question Trigger */}
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full p-5 md:p-6 flex items-center justify-between text-left cursor-pointer group select-none outline-none"
            >
              <span className="text-base font-bold text-text-onyx group-hover:text-primary transition-colors duration-300 pr-4">
                {faq.question}
              </span>
              <span
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border transition-all duration-300 ${
                  isOpen
                    ? "bg-accent border-accent text-white rotate-180"
                    : "bg-background-luxury border-[#eae7e3] text-accent group-hover:border-accent/40"
                }`}
              >
                <ChevronDown size={16} />
              </span>
            </button>

            {/* Answer Content Panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 text-sm text-text-onyx/75 leading-relaxed font-sans font-medium border-t border-black-luxury/5 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
