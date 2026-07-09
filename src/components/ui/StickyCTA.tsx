"use client";

import React from "react";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function StickyCTA() {
  const whatsappUrl = "https://wa.me/919842323071?text=Hi!%20I%20am%20interested%20in%20learning%20more%20about%20Nivasan%20Homes%20projects.";
  const callUrl = "tel:+919842323071";

  const WhatsAppIcon = () => (
    <svg
      className="w-3.5 h-3.5 fill-current"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.556 0 10.08-4.512 10.083-10.05.002-2.683-1.038-5.207-2.93-7.097-1.892-1.891-4.407-2.931-7.094-2.933-5.557 0-10.08 4.513-10.083 10.051-.002 1.837.493 3.633 1.42 5.248l-.993 3.63 3.738-.979zm11.087-7.425c-.29-.145-1.716-.848-1.98-.943-.266-.096-.46-.145-.654.145-.193.291-.748.944-.919 1.138-.17.194-.341.218-.63.073-.29-.145-1.229-.453-2.34-1.444-.863-.77-1.447-1.722-1.616-2.013-.17-.29-.018-.448.126-.591.13-.13.29-.34.436-.51.145-.17.193-.291.29-.485.097-.194.049-.364-.025-.51-.073-.145-.654-1.577-.896-2.158-.236-.569-.475-.492-.654-.501-.17-.008-.364-.01-.557-.01-.194 0-.51.073-.777.364-.266.291-1.02 1.018-1.02 2.483 0 1.465 1.066 2.879 1.213 3.073.145.194 2.098 3.2 5.08 4.494.71.308 1.264.492 1.696.63.713.226 1.362.194 1.874.118.571-.085 1.716-.703 1.96-1.382.243-.679.243-1.261.17-1.382-.073-.121-.266-.194-.557-.34z" />
    </svg>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 select-none items-end">
      
      {/* WhatsApp Floating Capsule */}
      <motion.a
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/20 px-4 py-2.5 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <WhatsAppIcon />
        <span className="text-[10px] uppercase tracking-[0.15em] font-extrabold">
          WhatsApp Chat
        </span>
      </motion.a>

      {/* Call Floating Capsule */}
      <motion.a
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        href={callUrl}
        className="bg-white hover:bg-[#fcfbfa] text-primary border border-black-luxury/10 px-4 py-2.5 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <Phone size={13} className="text-accent" strokeWidth={2.5} />
        <span className="text-[10px] uppercase tracking-[0.15em] font-extrabold">
          Call Advisory
        </span>
      </motion.a>

    </div>
  );
}
