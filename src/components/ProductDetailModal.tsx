import React, { useState } from "react";
import {
  X,
  Star,
  Sparkles,
  ShieldAlert,
  Volume2,
  Glasses,
  Zap,
  ShoppingBag,
  Check,
  Feather,
  Smile,
  ShieldCheck,
  Heart,
  Edit3,
  ThumbsUp,
  UserCheck
} from "lucide-react";
import { Product, ColorVariant, Review } from "../types";
import { REVIEWS } from "../data/catalog";

interface ProductDetailModalProps {
  product: Product;
  initialColor?: ColorVariant;
  onClose: () => void;
  onAddToCart: (product: Product, color: ColorVariant, engraving?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialColor,
  onClose,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    initialColor || product.colorVariants[0]
  );
  const [activeContext, setActiveContext] = useState<number>(0);
  const [engravingText, setEngravingText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"specs" | "lifestyle" | "reviews">("specs");
  const [selectedReviewFilter, setSelectedReviewFilter] = useState<string>("all");

  const filteredReviews = REVIEWS.filter((rev) => {
    if (selectedReviewFilter === "all") return true;
    if (selectedReviewFilter === "glasses") return rev.glassesTag;
    if (selectedReviewFilter === "small-head") return rev.headSizeTag.toLowerCase().includes("petite") || rev.headSizeTag.toLowerCase().includes("small");
    if (selectedReviewFilter === "bun") return rev.hairTypeTag.toLowerCase().includes("bun") || rev.hairTypeTag.toLowerCase().includes("knot");
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1E1E22]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#FDFBF7] rounded-3xl border border-[#EADFCF] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-[#FDFBF7]/90 backdrop-blur-md px-6 py-4 border-b border-[#EADFCF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif tracking-wider text-[#8D765E] uppercase font-semibold">
              AURA Product Detail
            </span>
            <span className="text-[#C4B29F]">•</span>
            <span className="text-xs text-[#6B6154] font-medium">{product.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#1E1E22] hover:bg-[#F4ECE1] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Gallery & Engraving Previewer */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Display */}
              <div className="relative aspect-[4/3] bg-[#F7F2EB] rounded-2xl overflow-hidden border border-[#EADFCF] shadow-inner group">
                <img
                  src={
                    activeContext < product.lifestyleImages.length
                      ? product.lifestyleImages[activeContext].url
                      : selectedColor.image
                  }
                  alt={`${product.name} lifestyle context`}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Optional Custom Monogram Engraving Visual Overlay */}
                {engravingText.trim() && (
                  <div className="absolute bottom-4 right-4 bg-[#1E1E22]/80 backdrop-blur-md text-[#E8D8C8] px-3 py-1.5 rounded-lg border border-[#E8D8C8]/40 text-xs font-serif tracking-widest uppercase shadow-lg">
                    <span>Engraving: </span>
                    <strong className="text-[#FDFBF7]">{engravingText.toUpperCase()}</strong>
                  </div>
                )}

                {/* Caption Badge */}
                <div className="absolute top-4 left-4 bg-[#FDFBF7]/90 backdrop-blur-md text-[#38322B] text-xs px-3 py-1.5 rounded-full border border-[#EADFCF] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89468]" />
                  <span>
                    {product.lifestyleImages[activeContext]?.context || "Studio Finish"} View
                  </span>
                </div>
              </div>

              {/* Lifestyle Context Gallery Thumbnails */}
              <div>
                <span className="text-xs font-semibold text-[#6B6154] uppercase tracking-wider block mb-2">
                  Lifestyle Context Shots:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {product.lifestyleImages.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveContext(idx)}
                      className={`relative aspect-video rounded-xl overflow-hidden border-2 ${
                        activeContext === idx ? "border-[#1E1E22] ring-2 ring-[#E8D8C8]" : "border-[#EADFCF] opacity-70 hover:opacity-100"
                      } transition-all`}
                    >
                      <img
                        src={item.url}
                        alt={item.caption}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-[#1E1E22]/80 text-[#FDFBF7] text-[9px] py-0.5 text-center font-medium">
                        {item.context}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Free Custom Engraving Box */}
              <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#E6D8C6] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E1E22] flex items-center gap-1.5">
                    <Edit3 className="w-4 h-4 text-[#8D765E]" />
                    <span>Complimentary Laser Engraving</span>
                  </span>
                  <span className="text-[10px] bg-[#E2E8DD] text-[#3D522B] px-2 py-0.5 rounded-full font-semibold">
                    FREE
                  </span>
                </div>
                <p className="text-xs text-[#6B6154]">
                  Personalize the champagne metal earcap with your initials or a word of focus.
                </p>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. A.M. or FOCUS (Max 6 chars)"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#D8C7B2] rounded-xl px-3 py-2 text-xs text-[#1E1E22] uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#8D765E]"
                />
              </div>
            </div>

            {/* Right Column: Product Options, Specs & Cart Action */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 text-xs text-[#8D765E] font-semibold uppercase tracking-wider mb-1">
                  <span>{product.tagline}</span>
                </div>
                <h2 className="text-3xl font-serif text-[#1E1E22]">{product.name}</h2>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-[#C48B28]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#1E1E22]">{product.rating}</span>
                  <span className="text-xs text-[#8D8276]">({product.reviewCount} verified reviews)</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-[#F4ECE1] p-4 rounded-2xl border border-[#D8C7B2] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#736453] uppercase tracking-wider font-semibold block">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#1E1E22]">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#8D8276] line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#3D522B] bg-[#E2E8DD] px-3 py-1 rounded-full font-semibold inline-block">
                    In Stock & Ready to Ship
                  </span>
                </div>
              </div>

              {/* Color Swatch Selection */}
              <div>
                <label className="block text-xs font-bold text-[#1E1E22] uppercase tracking-wider mb-2">
                  Select Aesthetic Shade: <span className="text-[#8D765E] font-normal">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colorVariants.map((color) => {
                    const isSelected = selectedColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
                          isSelected
                            ? "border-[#1E1E22] bg-[#F4ECE1] ring-2 ring-[#8D765E]"
                            : "border-[#EADFCF] bg-[#FDFBF7] hover:bg-[#F8F4EE]"
                        } transition-all`}
                      >
                        <span className={`w-4 h-4 rounded-full ${color.bgClass} border border-[#1E1E22]/20`} />
                        <span className="text-xs font-medium text-[#1E1E22]">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onAddToCart(product, selectedColor, engravingText);
                    onClose();
                  }}
                  className="w-full bg-[#1E1E22] hover:bg-[#38322B] text-[#FDFBF7] py-4 rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag — ${product.price}</span>
                </button>
                <p className="text-[11px] text-center text-[#7A6E62]">
                  Includes Free Shipping, Mulberry Silk Accessories, & 60-Day Risk-Free Guarantee
                </p>
              </div>

              {/* Navigation Tabs for Specs vs Lifestyle vs Reviews */}
              <div className="pt-4 border-t border-[#EADFCF]">
                <div className="flex border-b border-[#EADFCF] gap-6 text-xs font-semibold uppercase tracking-wider">
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`pb-2 transition-colors ${
                      activeTab === "specs"
                        ? "border-b-2 border-[#1E1E22] text-[#1E1E22]"
                        : "text-[#8D8276] hover:text-[#1E1E22]"
                    }`}
                  >
                    Specs for Humans
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`pb-2 transition-colors ${
                      activeTab === "reviews"
                        ? "border-b-2 border-[#1E1E22] text-[#1E1E22]"
                        : "text-[#8D8276] hover:text-[#1E1E22]"
                    }`}
                  >
                    Verified Fit Reviews ({REVIEWS.length})
                  </button>
                </div>

                {/* Specs Tab Content */}
                {activeTab === "specs" && (
                  <div className="pt-4 space-y-3 animate-in fade-in duration-150">
                    {product.specsForHumans.map((spec, i) => (
                      <div key={i} className="bg-[#F8F4EE] p-3 rounded-xl border border-[#E6D8C6] flex items-start gap-3">
                        <div className="p-2 bg-[#E8D8C8] rounded-lg text-[#1E1E22] mt-0.5">
                          <Sparkles className="w-4 h-4 text-[#8D765E]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1E1E22]">{spec.humanText}</span>
                            <span className="text-[10px] text-[#8D765E] font-medium bg-[#FDFBF7] px-2 py-0.5 rounded border border-[#EADFCF]">
                              {spec.label}
                            </span>
                          </div>
                          <p className="text-xs text-[#6B6154] mt-0.5">{spec.techDetail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab Content */}
                {activeTab === "reviews" && (
                  <div className="pt-4 space-y-4 animate-in fade-in duration-150">
                    {/* Review Filter Buttons */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-[#8D8276] font-medium">Filter by:</span>
                      <button
                        onClick={() => setSelectedReviewFilter("all")}
                        className={`px-2.5 py-1 rounded-full ${
                          selectedReviewFilter === "all" ? "bg-[#1E1E22] text-[#FDFBF7]" : "bg-[#F4ECE1] text-[#38322B]"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSelectedReviewFilter("glasses")}
                        className={`px-2.5 py-1 rounded-full ${
                          selectedReviewFilter === "glasses" ? "bg-[#1E1E22] text-[#FDFBF7]" : "bg-[#F4ECE1] text-[#38322B]"
                        }`}
                      >
                        Glasses Wearers
                      </button>
                      <button
                        onClick={() => setSelectedReviewFilter("small-head")}
                        className={`px-2.5 py-1 rounded-full ${
                          selectedReviewFilter === "small-head" ? "bg-[#1E1E22] text-[#FDFBF7]" : "bg-[#F4ECE1] text-[#38322B]"
                        }`}
                      >
                        Petite Frame
                      </button>
                      <button
                        onClick={() => setSelectedReviewFilter("bun")}
                        className={`px-2.5 py-1 rounded-full ${
                          selectedReviewFilter === "bun" ? "bg-[#1E1E22] text-[#FDFBF7]" : "bg-[#F4ECE1] text-[#38322B]"
                        }`}
                      >
                        High Bun / Topknot
                      </button>
                    </div>

                    {/* Review Cards List */}
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {filteredReviews.map((rev) => (
                        <div key={rev.id} className="bg-[#F8F4EE] p-3.5 rounded-xl border border-[#E6D8C6] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#1E1E22]">{rev.author}</span>
                              {rev.verified && (
                                <span className="text-[10px] text-[#3D522B] bg-[#E2E8DD] px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold">
                                  <UserCheck className="w-3 h-3" />
                                  Verified
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-[#8D8276]">{rev.date}</span>
                          </div>

                          {/* Fit Tags */}
                          <div className="flex flex-wrap gap-1 text-[10px]">
                            <span className="bg-[#E8D8C8] text-[#524131] px-2 py-0.5 rounded">
                              {rev.headSizeTag}
                            </span>
                            <span className="bg-[#E8D8C8] text-[#524131] px-2 py-0.5 rounded">
                              {rev.hairTypeTag}
                            </span>
                          </div>

                          <p className="text-xs text-[#4A433B] italic">"{rev.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
