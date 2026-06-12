"use client";

import React from "react";
import Reveal from "../ui/Reveal";
import { 
  Award, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Leaf, 
  Clock, 
  Heart, 
  TrendingUp, 
  Building2, 
  Calendar 
} from "lucide-react";

export default function BrandStory() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-background-luxury overflow-hidden border-b border-[#eae7e3]"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Intro Section - Expanded & Centered */}
        <div className="text-center max-w-4xl mx-auto mb-12 flex flex-col items-center gap-3">
          <Reveal delay={0.1}>
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent font-semibold block text-center">
              The Nivasan Legacy
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase text-black-luxury leading-tight text-center mt-1">
              About Nivasan Homes
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-black-luxury/90 text-sm sm:text-base md:text-lg leading-relaxed font-normal mt-4 max-w-3xl mx-auto text-center">
              Nivasan Homes is one of the finest real estate brands in Coimbatore handcrafting unique luxury villas and premium apartments with an emphasis on customer-centricity, scrupulous ethics, and a dedication to evolving environment-friendly technology.
            </p>
          </Reveal>
        </div>

        {/* Horizontal Stats highlight bar - Full width ribbon */}
        <div className="border-y border-accent/20 py-8 my-12 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-[1500px] mx-auto text-center items-start">
            
            {/* Stat 1 */}
            <Reveal delay={0.1}>
              <div className="flex flex-col items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Calendar size={14} />
                </div>
                <div>
                  <h4 className="text-[11px] font-extrabold text-black-luxury uppercase tracking-wider">Trusted Since 2010</h4>
                  <p className="text-[10px] text-black-luxury/60 mt-0.5 font-medium">Coimbatore, Tamil Nadu</p>
                </div>
              </div>
            </Reveal>

            {/* Stat 2 */}
            <Reveal delay={0.15}>
              <div className="flex flex-col items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Building2 size={14} />
                </div>
                <div>
                  <h4 className="text-[11px] font-extrabold text-black-luxury uppercase tracking-wider">10+ Projects Delivered</h4>
                  <p className="text-[10px] text-black-luxury/60 mt-0.5 font-medium">Across Coimbatore</p>
                </div>
              </div>
            </Reveal>

            {/* Stat 3 */}
            <Reveal delay={0.2}>
              <div className="flex flex-col items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Users size={14} />
                </div>
                <div>
                  <h4 className="text-[11px] font-extrabold text-black-luxury uppercase tracking-wider">500+ Happy Families</h4>
                  <p className="text-[10px] text-black-luxury/60 mt-0.5 font-medium">Who call it home</p>
                </div>
              </div>
            </Reveal>

            {/* Stat 4 */}
            <Reveal delay={0.25}>
              <div className="flex flex-col items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <ShieldCheck size={14} className="text-primary group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-[11px] font-extrabold text-black-luxury uppercase tracking-wider">RERA Registered</h4>
                  <p className="text-[10px] text-black-luxury/60 mt-0.5 font-medium">All Projects | Full Transparency</p>
                </div>
              </div>
            </Reveal>

            {/* Stat 5 */}
            <Reveal delay={0.3}>
              <div className="flex flex-col items-center gap-2.5 group col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <CheckCircle2 size={14} className="text-primary group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-[11px] font-extrabold text-black-luxury uppercase tracking-wider">CREDAI Member</h4>
                  <p className="text-[10px] text-black-luxury/60 mt-0.5 font-medium">Affiliated Member</p>
                </div>
              </div>
            </Reveal>
            
          </div>
        </div>

        {/* Vision & Values Section */}
        <div className="mt-16 w-full">
          <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-3">
            <Reveal delay={0.1}>
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight uppercase text-black-luxury leading-tight text-center">
                Our Vision & Values
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-black-luxury/90 text-sm leading-relaxed font-normal max-w-2xl mx-auto text-center mt-2">
                All our projects are known for unique ideas, innovative concepts, cutting-edge technologies all of which culminate in achieving total customer satisfaction, which is the primary goal of our organisation.
              </p>
            </Reveal>
          </div>

          {/* 3-Column Values Grid - Beautiful & Expansive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1500px] mx-auto">
            
            {/* Value 1 */}
            <Reveal delay={0.15}>
              <div className="bg-white border border-[#eae7e3] hover:border-accent/50 p-5 rounded-xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full group">
                <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Heart size={15} />
                </div>
                <h4 className="font-extrabold text-sm text-black-luxury uppercase tracking-wider mb-1.5 group-hover:text-primary transition-colors duration-300">
                  Customer First
                </h4>
                <p className="text-[11px] text-black-luxury/80 leading-relaxed font-normal">
                  Every decision is made with the homeowner's wellbeing, budget, and lifestyle at the centre.
                </p>
              </div>
            </Reveal>

            {/* Value 2 */}
            <Reveal delay={0.2}>
              <div className="bg-white border border-[#eae7e3] hover:border-accent/50 p-5 rounded-xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full group">
                <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Leaf size={15} />
                </div>
                <h4 className="font-extrabold text-sm text-black-luxury uppercase tracking-wider mb-1.5 group-hover:text-primary transition-colors duration-300">
                  Eco-Conscious Design
                </h4>
                <p className="text-[11px] text-black-luxury/80 leading-relaxed font-normal">
                  Environment-friendly technologies integrated into every project for sustainable living.
                </p>
              </div>
            </Reveal>

            {/* Value 3 */}
            <Reveal delay={0.25}>
              <div className="bg-white border border-[#eae7e3] hover:border-accent/50 p-5 rounded-xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full group">
                <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Award size={15} />
                </div>
                <h4 className="font-extrabold text-sm text-black-luxury uppercase tracking-wider mb-1.5 group-hover:text-primary transition-colors duration-300">
                  Uncompromising Build
                </h4>
                <p className="text-[11px] text-black-luxury/80 leading-relaxed font-normal">
                  Premium materials, branded fittings, and master craftsmanship — no shortcuts, ever.
                </p>
              </div>
            </Reveal>

            {/* Value 4 */}
            <Reveal delay={0.3}>
              <div className="bg-white border border-[#eae7e3] hover:border-accent/50 p-5 rounded-xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full group">
                <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <ShieldCheck size={15} />
                </div>
                <h4 className="font-extrabold text-sm text-black-luxury uppercase tracking-wider mb-1.5 group-hover:text-primary transition-colors duration-300">
                  Complete Transparency
                </h4>
                <p className="text-[11px] text-black-luxury/80 leading-relaxed font-normal">
                  RERA-registered projects with clear documentation from booking to possession.
                </p>
              </div>
            </Reveal>

            {/* Value 5 */}
            <Reveal delay={0.35}>
              <div className="bg-white border border-[#eae7e3] hover:border-accent/50 p-5 rounded-xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full group">
                <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Clock size={15} />
                </div>
                <h4 className="font-extrabold text-sm text-black-luxury uppercase tracking-wider mb-1.5 group-hover:text-primary transition-colors duration-300">
                  On-Time Delivery
                </h4>
                <p className="text-[11px] text-black-luxury/80 leading-relaxed font-normal">
                  A consistent track record of honouring possession timelines across all projects.
                </p>
              </div>
            </Reveal>

            {/* Value 6 */}
            <Reveal delay={0.4}>
              <div className="bg-white border border-[#eae7e3] hover:border-accent/50 p-5 rounded-xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full group">
                <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <TrendingUp size={15} />
                </div>
                <h4 className="font-extrabold text-sm text-black-luxury uppercase tracking-wider mb-1.5 group-hover:text-primary transition-colors duration-300">
                  Long-Term Value
                </h4>
                <p className="text-[11px] text-black-luxury/80 leading-relaxed font-normal">
                  Location choices and design excellence that ensure strong investment appreciation.
                </p>
              </div>
            </Reveal>
            
          </div>
        </div>

      </div>
    </section>
  );
}
