import React from "react";
import { Heart, Sparkles, ShieldCheck, Feather } from "lucide-react";
import heroImg from "../assets/images/aura_hero_lifestyle_1786196417362.jpg";

export const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="py-12 md:py-20 px-4 sm:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-[#F8F4EE] shadow-xl">
              <img
                src={heroImg}
                alt="AURA Founder testing ergonomic headphones"
                className="w-full h-[450px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E22]/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-[#FDFBF7]">
                  <span className="text-xs text-[#E8D8C8] uppercase font-bold tracking-wider">
                    Our Mission
                  </span>
                  <h3 className="text-xl font-serif">Tech Designed for Her Body & Lifestyle</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#F4ECE1] text-[#735A42] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#8D765E]" />
              <span>Beyond "Pink-Washing"</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1E22] leading-tight">
              We Refused to Just Paint it Pink <br />
              <span className="italic font-light text-[#8D765E]">and Call it a Day.</span>
            </h2>

            <p className="text-sm text-[#524B42] leading-relaxed">
              For decades, tech companies committed the classic "Bic for Her" mistake: taking heavy male-sized headphones, dipping them in hot pink paint, and marketing them to women. But painting a 300g head-squeezing device pink doesn't fix tension headaches or hair tangling.
            </p>

            <p className="text-sm text-[#524B42] leading-relaxed">
              AURA was founded by female industrial designers who knew women deserved real ergonomic innovation. We started with anatomical head scans, tested clamping spring forces down to 3.2 Newtons, and engineered flush hinges that treat tech like fine jewelry or a luxury handbag.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#E6D8C6] space-y-1">
                <span className="text-xs font-bold text-[#1E1E22] block">Aesthetic palette</span>
                <p className="text-xs text-[#6B6154]">Champagne Gold, Sage Green, and Deep Lavender in matte satin finishes.</p>
              </div>
              <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#E6D8C6] space-y-1">
                <span className="text-xs font-bold text-[#1E1E22]">Zero Hair Snagging</span>
                <p className="text-xs text-[#6B6154]">Seamless flush extension arms that never pull braids, curls, or buns.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
