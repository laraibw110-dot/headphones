import React, { useState } from "react";
import { Sparkles, ShieldCheck, Feather, Heart, ArrowRight, Instagram, Youtube, Twitter } from "lucide-react";

interface FooterProps {
  onOpenFitGuide: () => void;
  onOpenAiStylist: () => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenFitGuide,
  onOpenAiStylist,
  onSelectCategory,
}) => {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1E1E22]/80 backdrop-blur-md text-[#FDFBF7] pt-16 pb-12 border-t border-[#38322B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Newsletter Callout Section */}
        <div className="bg-[#2B2B30] border border-[#404048] p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-2 text-[#E8D8C8] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join The AURA Club</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#FDFBF7]">
              Get 10% Off Your First Pair
            </h3>
            <p className="text-xs text-[#A8A096] leading-relaxed">
              Plus receive our exclusive "Hairdresser's Guide to Headphones" and early access to new aesthetic colorway drops.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            {subscribed ? (
              <div className="bg-[#3D522B] text-[#E2E8DD] px-6 py-3 rounded-full text-xs font-bold">
                ✨ Thank you! Welcome to AURA.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1E1E22] border border-[#524B42] text-[#FDFBF7] px-5 py-3 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-[#E8D8C8] w-full sm:w-72"
                />
                <button
                  type="submit"
                  className="bg-[#E8D8C8] hover:bg-[#D4C3B2] text-[#1E1E22] px-6 py-3 rounded-full text-xs font-bold transition-all shadow"
                >
                  Join & Get 10% Off
                </button>
              </>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-[#38322B] text-xs text-[#A8A096]">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div>
              <span className="text-2xl font-serif tracking-widest text-[#FDFBF7] font-semibold block">
                AURA
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#E8D8C8] uppercase font-sans">
                Tech as Accessory
              </span>
            </div>
            <p className="leading-relaxed">
              Ergonomic, fashion-forward noise-canceling headphones crafted specifically for women's anatomy, hairstyles, and daily lifestyle integration.
            </p>
            <div className="flex items-center gap-3 text-[#E8D8C8]">
              <a href="#" className="hover:text-[#FDFBF7] transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#FDFBF7] transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#FDFBF7] transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Column 2: Shop Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#FDFBF7] uppercase tracking-wider">The Collection</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectCategory("over-ear")} className="hover:text-[#FDFBF7] transition-colors">
                  AURA One ANC (Flagship Over-Ear)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory("on-ear")} className="hover:text-[#FDFBF7] transition-colors">
                  AURA Studio Lite (Featherweight)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory("earbuds")} className="hover:text-[#FDFBF7] transition-colors">
                  AURA Gem Pods (Jewelry Case Earbuds)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory("accessories")} className="hover:text-[#FDFBF7] transition-colors">
                  Mulberry Silk Pad Covers & Sleeves
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Fit & Ergonomics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#FDFBF7] uppercase tracking-wider">Ergonomics & Fit</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenFitGuide} className="hover:text-[#FDFBF7] transition-colors">
                  3.2N Clamping Force Science
                </button>
              </li>
              <li>
                <button onClick={onOpenFitGuide} className="hover:text-[#FDFBF7] transition-colors">
                  High Bun & Braid Clearance
                </button>
              </li>
              <li>
                <button onClick={onOpenFitGuide} className="hover:text-[#FDFBF7] transition-colors">
                  Glasses Relief Cushion Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenAiStylist} className="text-[#E8D8C8] hover:text-[#FDFBF7] font-semibold transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Take 30s AI Fit Quiz</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Guarantee & Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#FDFBF7] uppercase tracking-wider">Our Guarantee</h4>
            <div className="bg-[#2B2B30] p-4 rounded-2xl border border-[#404048] space-y-2">
              <div className="flex items-center gap-2 text-[#E8D8C8]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-bold text-[#FDFBF7]">60-Day Risk-Free Trial</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Test AURA on your commute, at the gym, or with your favorite hairstyles. If it's not the most comfortable headphone you've ever worn, return it free.
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#38322B] text-[11px] text-[#73685A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AURA Audio Inc. All Rights Reserved. Engineered for Her.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Shipping & Returns</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
