import React, { useState } from "react";
import { Sparkles, ShieldAlert, Glasses, Feather, Heart, Check, ArrowRight } from "lucide-react";
import fitDetailImg from "../assets/images/aura_fit_detail_1786196459867.jpg";

interface FitGuideSectionProps {
  onAiStylistClick: () => void;
}

export const FitGuideSection: React.FC<FitGuideSectionProps> = ({ onAiStylistClick }) => {
  const [clampingValue, setClampingValue] = useState<number>(3.2);

  return (
    <section id="fit-guide" className="py-12 md:py-20 px-4 sm:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E8D8C8] text-[#524131] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#8D765E]" />
            <span>Ergonomics Engineered For Her</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1E1E22]">
            Why Generic Headphones <br />
            <span className="italic text-[#8D765E] font-light">Give Women Headaches</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6B6154] leading-relaxed">
            Most audio brands test products on male 50th-percentile mannequin frames. When scaled to female anatomical averages, excessive clamping pressure and rigid headbands cause tension pain and snag hair. Here is how AURA solved it.
          </p>
        </div>

        {/* 3 Main Ergonomic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Clamping Force */}
          <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#EADFCF] shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F4ECE1] text-[#8D765E] flex items-center justify-center font-serif text-xl font-bold">
              01
            </div>
            <h3 className="text-xl font-serif text-[#1E1E22]">3.2N Low Clamping Force</h3>
            <p className="text-xs text-[#6B6154] leading-relaxed">
              Standard tech brands squeeze with 5.8 Newtons of force to prevent slipping on wide male frames. On female heads, this compresses temporal nerves. AURA calibrated Japanese spring steel to 3.2N for weightless stability without squeezing.
            </p>

            {/* Interactive Clamping Force Comparison Slider */}
            <div className="pt-4 border-t border-[#EADFCF] space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#6B6154]">Interactive Clamping Meter:</span>
                <span className={clampingValue <= 3.5 ? "text-[#3D522B]" : "text-[#B84032]"}>
                  {clampingValue} Newtons {clampingValue <= 3.5 ? "(AURA Gentle)" : "(Standard Headache)"}
                </span>
              </div>
              <input
                type="range"
                min={2.5}
                max={6.5}
                step={0.1}
                value={clampingValue}
                onChange={(e) => setClampingValue(parseFloat(e.target.value))}
                className="w-full accent-[#8D765E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8D8276] font-medium">
                <span>2.5N (Feather)</span>
                <span className="text-[#3D522B] font-bold">3.2N AURA Optimum</span>
                <span>5.8N Generic Brands</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Hair-Friendly Architecture */}
          <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#EADFCF] shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F4ECE1] text-[#8D765E] flex items-center justify-center font-serif text-xl font-bold">
              02
            </div>
            <h3 className="text-xl font-serif text-[#1E1E22]">Zero-Snag Flush Hinges</h3>
            <p className="text-xs text-[#6B6154] leading-relaxed">
              Stray hair strands and ponytail volume often get caught in exposed headband hinges and extension sliders. AURA features sealed, flush pivot joints and protein leather crown sleeves that glide over hair without pulling or tangling.
            </p>

            <ul className="pt-2 space-y-2 text-xs text-[#4A433B]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8D765E]" />
                <span>High bun & topknot crown clearance</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8D765E]" />
                <span>Zero open gaps on headband sliders</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8D765E]" />
                <span>Makeup-resistant mulberry silk options</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Glasses Pressure Relief */}
          <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#EADFCF] shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F4ECE1] text-[#8D765E] flex items-center justify-center font-serif text-xl font-bold">
              03
            </div>
            <h3 className="text-xl font-serif text-[#1E1E22]">Glasses Relief Recess</h3>
            <p className="text-xs text-[#6B6154] leading-relaxed">
              When over-ear pads press against glasses stems, they press hard against the back of your ears. Our ear cushions feature dual-density memory foam with a micro-channel that absorbs frame stems while maintaining a 100% acoustic seal.
            </p>

            <div className="bg-[#F8F4EE] p-3 rounded-2xl border border-[#E6D8C6] flex items-center gap-3">
              <Glasses className="w-6 h-6 text-[#8D765E] shrink-0" />
              <p className="text-[11px] text-[#524B42]">
                Tested with wireframes, thick acetate frames, and blue-light glasses with zero pressure breakdown.
              </p>
            </div>
          </div>

        </div>

        {/* Detailed Image & Specification Feature Bar */}
        <div className="bg-[#FDFBF7] rounded-3xl border border-[#EADFCF] p-8 md:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold text-[#8D765E] uppercase tracking-wider block">
              Precision Head Circumference Scale
            </span>
            <h3 className="text-2xl font-serif text-[#1E1E22]">
              Adjustable for 48cm to 58cm Head Frames
            </h3>
            <p className="text-xs text-[#6B6154] leading-relaxed">
              Generic headphones start at 54cm, meaning they sit too low and rest heavy on small ear tops. AURA headband extensions start at 48cm, allowing women with petite head frames to find their exact ergonomic balance point.
            </p>

            <button
              onClick={onAiStylistClick}
              className="bg-[#1E1E22] hover:bg-[#38322B] text-[#FDFBF7] px-6 py-3 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow"
            >
              <Sparkles className="w-4 h-4 text-[#E8D8C8]" />
              <span>Use AI Fit Assistant to Measure Your Frame</span>
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#EADFCF]">
              <img
                src={fitDetailImg}
                alt="Macro view of AURA hair friendly hinge and headband padding"
                className="w-full h-72 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E22]/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-[#FDFBF7] text-xs space-y-1">
                  <span className="font-serif text-sm font-bold block">Macro Hinge Engineering</span>
                  <p className="text-[#E8D8C8]">
                    Crafted with brushed anodized aluminum and soft-touch protein leather cushion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
