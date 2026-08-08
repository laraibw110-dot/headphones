import React, { useState } from "react";
import { X, Sparkles, ArrowRight, Check, ShoppingBag, Loader2, Heart, RefreshCw } from "lucide-react";
import { Product, ColorVariant } from "../types";
import { PRODUCTS } from "../data/catalog";

interface AiStylistModalProps {
  onClose: () => void;
  onAddToCart: (product: Product, color: ColorVariant) => void;
}

export const AiStylistModal: React.FC<AiStylistModalProps> = ({ onClose, onAddToCart }) => {
  const [step, setStep] = useState<number>(1);
  const [headSize, setHeadSize] = useState<string>("Petite / Small");
  const [hairType, setHairType] = useState<string>("High Bun / Top Knot");
  const [glasses, setGlasses] = useState<boolean>(true);
  const [dailyStyle, setDailyStyle] = useState<string>("Commuter & Cafe");
  const [priority, setPriority] = useState<string>("Zero Headaches & Low Pressure");

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any | null>(null);

  const handleGenerateRecommendation = async () => {
    setLoading(true);
    setStep(3);

    try {
      const response = await fetch("/api/fit-stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headSize,
          hairType,
          glasses,
          dailyStyle,
          priority,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("AI Concierge request error:", err);
      setResult({
        recommendedModel: "AURA One ANC",
        recommendedColor: "Champagne Gold",
        fitTip: "Adjust headband 2 notches for petite head frame. High bun flex hinge relieves crown tension.",
        styleAdvice: "Pair Champagne Gold with warm neutrals like linen blazers, cashmere hoodies, and delicate gold accessories.",
        acousticNote: "Smart 35dB ANC blocks coffee shop chatter and jet engine hum while keeping voice clarity crystal clear.",
        reasoning: "Based on your preferences, the AURA One ANC in Champagne Gold provides optimal clamping balance and effortless aesthetic integration."
      });
    } finally {
      setLoading(false);
    }
  };

  const getMatchedProductAndColor = () => {
    if (!result) return { product: PRODUCTS[0], color: PRODUCTS[0].colorVariants[0] };

    const product = PRODUCTS.find((p) =>
      p.name.toLowerCase().includes(result.recommendedModel.toLowerCase())
    ) || PRODUCTS[0];

    const color = product.colorVariants.find((c) =>
      c.name.toLowerCase().includes(result.recommendedColor.toLowerCase())
    ) || product.colorVariants[0];

    return { product, color };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1E1E22]/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl border border-[#EADFCF] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EADFCF] pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B89468] animate-pulse" />
            <h2 className="text-xl font-serif text-[#1E1E22]">AI Fit & Style Concierge</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#1E1E22] hover:bg-[#F4ECE1] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Headframe & Hair Type */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-bold text-[#8D765E] uppercase tracking-wider block mb-1">
                Question 1 of 2
              </span>
              <h3 className="text-lg font-serif text-[#1E1E22]">Your Head Frame & Hairstyle</h3>
            </div>

            {/* Head Size */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#38322B] uppercase tracking-wider block">
                How do standard headphones usually fit you?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  "Petite / Small Frame",
                  "Average Size",
                  "Feels Too Loose / Slipped"
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setHeadSize(option)}
                    className={`p-3 rounded-2xl border text-xs font-medium text-left transition-all ${
                      headSize === option
                        ? "border-[#1E1E22] bg-[#F4ECE1] text-[#1E1E22] ring-1 ring-[#8D765E]"
                        : "border-[#EADFCF] bg-[#FDFBF7] text-[#524B42] hover:bg-[#F8F4EE]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Style */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#38322B] uppercase tracking-wider block">
                Your Go-To Hairstyle:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "High Bun / Top Knot",
                  "Thick Curly / Afro Volume",
                  "Ponytail & Braids",
                  "Fine Straight / Bob"
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setHairType(option)}
                    className={`p-3 rounded-2xl border text-xs font-medium text-left transition-all ${
                      hairType === option
                        ? "border-[#1E1E22] bg-[#F4ECE1] text-[#1E1E22] ring-1 ring-[#8D765E]"
                        : "border-[#EADFCF] bg-[#FDFBF7] text-[#524B42] hover:bg-[#F8F4EE]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Glasses Toggle */}
            <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#E6D8C6] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1E1E22] block">Do you wear glasses or blue-light specs?</span>
                <span className="text-[11px] text-[#73685A]">We will calculate dual-density cushion pressure relief.</span>
              </div>
              <button
                onClick={() => setGlasses(!glasses)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  glasses ? "bg-[#1E1E22] text-[#FDFBF7]" : "bg-[#EADFCF] text-[#524B42]"
                }`}
              >
                {glasses ? "Yes (Glasses)" : "No Glasses"}
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#1E1E22] hover:bg-[#38322B] text-[#FDFBF7] py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow"
            >
              <span>Next: Style & Routine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Daily Routine & Style */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-bold text-[#8D765E] uppercase tracking-wider block mb-1">
                Question 2 of 2
              </span>
              <h3 className="text-lg font-serif text-[#1E1E22]">Your Lifestyle & Aesthetic</h3>
            </div>

            {/* Daily Routine */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#38322B] uppercase tracking-wider block">
                Primary Daily Context:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Commuter & Cafe",
                  "WFH Focus & Calls",
                  "Fitness & Pilates",
                  "Travel & Flights"
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setDailyStyle(option)}
                    className={`p-3 rounded-2xl border text-xs font-medium text-left transition-all ${
                      dailyStyle === option
                        ? "border-[#1E1E22] bg-[#F4ECE1] text-[#1E1E22] ring-1 ring-[#8D765E]"
                        : "border-[#EADFCF] bg-[#FDFBF7] text-[#524B42] hover:bg-[#F8F4EE]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Priority */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#38322B] uppercase tracking-wider block">
                Your #1 Priority:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Zero Headaches & Low Pressure",
                  "Doesn't Flatten Hair Volume",
                  "Ultra Light Weight",
                  "Maximum ANC Noise Isolation"
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setPriority(option)}
                    className={`p-3 rounded-2xl border text-xs font-medium text-left transition-all ${
                      priority === option
                        ? "border-[#1E1E22] bg-[#F4ECE1] text-[#1E1E22] ring-1 ring-[#8D765E]"
                        : "border-[#EADFCF] bg-[#FDFBF7] text-[#524B42] hover:bg-[#F8F4EE]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-full border border-[#D8C7B2] text-xs font-medium text-[#524B42] hover:bg-[#F4ECE1]"
              >
                Back
              </button>
              <button
                onClick={handleGenerateRecommendation}
                className="flex-1 bg-[#1E1E22] hover:bg-[#38322B] text-[#FDFBF7] py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow"
              >
                <Sparkles className="w-4 h-4 text-[#E8D8C8]" />
                <span>Generate AI Recommendation</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Loading or AI Recommendation Result */}
        {step === 3 && (
          <div>
            {loading ? (
              <div className="py-12 text-center space-y-4">
                <Loader2 className="w-8 h-8 text-[#8D765E] animate-spin mx-auto" />
                <p className="text-sm font-serif text-[#1E1E22]">
                  Consulting AURA Ergonomics & Fashion Model...
                </p>
                <p className="text-xs text-[#73685A]">
                  Calculating head frame tension, bun clearance, and outfit color balance.
                </p>
              </div>
            ) : result ? (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Result Hero Banner */}
                <div className="bg-[#F4ECE1] p-6 rounded-3xl border border-[#D8C7B2] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#8D765E] uppercase tracking-wider">
                      ✨ Custom Matched For You
                    </span>
                    <span className="text-xs bg-[#E2E8DD] text-[#3D522B] px-3 py-1 rounded-full font-semibold">
                      100% Fit Compatibility
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <img
                      src={getMatchedProductAndColor().color.image}
                      alt={result.recommendedModel}
                      className="w-20 h-20 object-cover rounded-2xl border border-[#D8C7B2]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="text-xl font-serif text-[#1E1E22]">
                        {result.recommendedModel}
                      </h3>
                      <p className="text-xs text-[#8D765E] font-semibold">
                        In {result.recommendedColor}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A433B] italic leading-relaxed">
                    "{result.reasoning}"
                  </p>
                </div>

                {/* AI Advice Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#F8F4EE] p-3.5 rounded-2xl border border-[#E6D8C6] space-y-1">
                    <strong className="text-[#1E1E22] block font-bold">Ergonomic Fit Tip:</strong>
                    <p className="text-[#6B6154]">{result.fitTip}</p>
                  </div>
                  <div className="bg-[#F8F4EE] p-3.5 rounded-2xl border border-[#E6D8C6] space-y-1">
                    <strong className="text-[#1E1E22] block font-bold">Style Pairing Advice:</strong>
                    <p className="text-[#6B6154]">{result.styleAdvice}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const { product, color } = getMatchedProductAndColor();
                      onAddToCart(product, color);
                      onClose();
                    }}
                    className="w-full sm:flex-1 bg-[#1E1E22] hover:bg-[#38322B] text-[#FDFBF7] py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {result.recommendedModel} to Bag</span>
                  </button>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-[#D8C7B2] text-xs font-medium text-[#524B42] hover:bg-[#F4ECE1] flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

      </div>
    </div>
  );
};
