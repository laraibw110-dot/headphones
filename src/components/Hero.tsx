import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Feather, Heart, Volume2 } from "lucide-react";
import heroImg from "../assets/images/aura_hero_lifestyle_1786196417362.jpg";

interface HeroProps {
  onShopClick: () => void;
  onFitGuideClick: () => void;
  onAiStylistClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onFitGuideClick,
  onAiStylistClick,
}) => {
  return (
    <section id="hero" className="relative bg-transparent overflow-hidden p-6 sm:p-10 md:p-14">
      {/* Background Decorative Ambient Circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8D8C8]/40 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#9CAF88]/20 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-[#F4ECE1] border border-[#D8C7B2] px-4 py-1.5 rounded-full text-xs font-semibold text-[#735A42] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B89468] animate-spin" style={{ animationDuration: '6s' }} />
              <span>Next-Gen Ergonomic Acoustic Engineering</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1E1E22] leading-[1.12] tracking-tight">
              Engineered for Her. <br />
              <span className="italic font-light text-[#8D765E]">Styled as an Accessory.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#524B42] font-sans leading-relaxed max-w-xl">
              Re-engineered from the ground up for smaller head frames, hair-friendly zero-snag hinges, and weightless all-day focus. Experience luxury acoustic power without the traditional tech headache.
            </p>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[#F4ECE1]/60 border border-[#E6D8C6] p-3.5 rounded-2xl text-center shadow-sm">
                <span className="block text-xl font-bold text-[#1E1E22] font-serif">3.2N</span>
                <span className="text-[11px] text-[#73685A] font-medium uppercase tracking-wider">Gentle Clamping</span>
              </div>
              <div className="bg-[#F4ECE1]/60 border border-[#E6D8C6] p-3.5 rounded-2xl text-center shadow-sm">
                <span className="block text-xl font-bold text-[#1E1E22] font-serif">185g</span>
                <span className="text-[11px] text-[#73685A] font-medium uppercase tracking-wider">Ultra-Light Frame</span>
              </div>
              <div className="bg-[#F4ECE1]/60 border border-[#E6D8C6] p-3.5 rounded-2xl text-center shadow-sm">
                <span className="block text-xl font-bold text-[#1E1E22] font-serif">35dB</span>
                <span className="text-[11px] text-[#73685A] font-medium uppercase tracking-wider">Smart ANC</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onShopClick}
                className="bg-[#1E1E22] hover:bg-[#38322B] text-[#FDFBF7] px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 text-[#E8D8C8]" />
              </button>

              <button
                onClick={onAiStylistClick}
                className="bg-[#F4ECE1] hover:bg-[#E8D8C8] text-[#1E1E22] border border-[#D8C7B2] px-6 py-4 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow"
              >
                <Sparkles className="w-4 h-4 text-[#B89468]" />
                <span>AI Style Matcher</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-[#EADFCF] flex flex-wrap items-center gap-6 text-xs font-medium text-[#6B6154]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8D765E]" />
                <span>60-Day Fit Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-[#8D765E]" />
                <span>Hair & Bun Clearance</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#8D765E]" />
                <span>Glasses Pressure Relief</span>
              </div>
            </div>
          </div>

          {/* Right Visual Studio Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FDFBF7] bg-[#1E1E22] group">
              
              {/* Image Display Container */}
              <div className="relative w-full h-[460px] sm:h-[520px] bg-[#1E1E22]">
                <img
                  src={heroImg}
                  alt="AURA One Headphones in Champagne Gold"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Live Status Badge */}
                <div className="absolute top-4 left-4 bg-[#1E1E22]/85 backdrop-blur-md text-[#FDFBF7] text-[11px] px-3.5 py-1.5 rounded-full font-medium flex items-center gap-2 border border-[#404048] pointer-events-none z-10 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#8FAD78] animate-ping" />
                  <span>AURA Studio Lookbook</span>
                </div>
              </div>

              {/* Floating Bottom Glass Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#FAF8F5]/90 backdrop-blur-md p-4 rounded-2xl border border-[#EADFCF] shadow-xl flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1E1E22] text-[#E8D8C8] flex items-center justify-center shrink-0 shadow">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1E1E22] uppercase tracking-wider">
                        AURA One Champagne Gold
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6154] mt-0.5">
                      "Acoustic luxury meets zero-snag silk comfort."
                    </p>
                  </div>
                </div>

                <button
                  onClick={onShopClick}
                  className="bg-[#1E1E22] hover:bg-[#38322B] text-[#FDFBF7] px-3.5 py-2 rounded-xl text-xs font-medium shadow transition-all hover:scale-105 shrink-0"
                >
                  View Details
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

