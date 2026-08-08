import React, { useState } from "react";
import { Sparkles, Heart, ShoppingBag, Eye, Tag, Instagram } from "lucide-react";
import { StyleLook, Product, ColorVariant } from "../types";
import { STYLE_LOOKS, PRODUCTS } from "../data/catalog";

interface StyleGalleryProps {
  onQuickView: (product: Product, color: ColorVariant) => void;
  onAddToCart: (product: Product, color: ColorVariant) => void;
}

export const StyleGallery: React.FC<StyleGalleryProps> = ({ onQuickView, onAddToCart }) => {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [activeLookModal, setActiveLookModal] = useState<StyleLook | null>(null);

  const filteredLooks = STYLE_LOOKS.filter((look) => {
    if (selectedTag === "all") return true;
    return look.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
  });

  const handleShopLook = (look: StyleLook) => {
    const matchedProduct = PRODUCTS.find((p) =>
      p.name.toLowerCase().includes(look.headphoneModel.toLowerCase())
    ) || PRODUCTS[0];

    const matchedColor = matchedProduct.colorVariants.find((c) =>
      c.name.toLowerCase().includes(look.colorName.toLowerCase())
    ) || matchedProduct.colorVariants[0];

    onAddToCart(matchedProduct, matchedColor);
  };

  return (
    <section id="style-gallery" className="py-12 md:py-20 px-4 sm:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#F4ECE1] text-[#735A42] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Instagram className="w-3.5 h-3.5 text-[#B89468]" />
              <span>Shop The Look — UGC & Editorial Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1E22]">
              Tech Styled as an <span className="italic font-light text-[#8D765E]">Accessory</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6154] max-w-xl">
              Discover how real women pair Champagne Gold, Sage Green, and Deep Lavender headphones with blazers, loungewear, and activewear.
            </p>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedTag === "all"
                  ? "bg-[#1E1E22] text-[#FDFBF7] shadow"
                  : "bg-[#F4ECE1] text-[#38322B] hover:bg-[#E8D8C8]"
              }`}
            >
              All Outfits
            </button>
            <button
              onClick={() => setSelectedTag("Workwear")}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedTag === "Workwear"
                  ? "bg-[#1E1E22] text-[#FDFBF7] shadow"
                  : "bg-[#F4ECE1] text-[#38322B] hover:bg-[#E8D8C8]"
              }`}
            >
              Workwear & Blazers
            </button>
            <button
              onClick={() => setSelectedTag("Streetwear")}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedTag === "Streetwear"
                  ? "bg-[#1E1E22] text-[#FDFBF7] shadow"
                  : "bg-[#F4ECE1] text-[#38322B] hover:bg-[#E8D8C8]"
              }`}
            >
              Off-Duty Hoodies
            </button>
            <button
              onClick={() => setSelectedTag("Pilates")}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedTag === "Pilates"
                  ? "bg-[#1E1E22] text-[#FDFBF7] shadow"
                  : "bg-[#F4ECE1] text-[#38322B] hover:bg-[#E8D8C8]"
              }`}
            >
              Pilates & Active
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLooks.map((look) => (
            <div
              key={look.id}
              className="group bg-[#F8F4EE] rounded-3xl overflow-hidden border border-[#E6D8C6] hover:border-[#8D765E] transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] bg-[#EADFCF] overflow-hidden">
                <img
                  src={look.imageUrl}
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Creator Handle Overlay */}
                <div className="absolute top-3 left-3 bg-[#1E1E22]/80 backdrop-blur-md text-[#FDFBF7] text-[11px] px-3 py-1 rounded-full font-medium">
                  {look.creator}
                </div>

                {/* Hover Quick Action */}
                <div className="absolute inset-0 bg-[#1E1E22]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                  <button
                    onClick={() => setActiveLookModal(look)}
                    className="bg-[#FDFBF7] text-[#1E1E22] px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Outfit Details</span>
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8D765E] font-semibold">
                  <span>{look.headphoneModel}</span>
                  <span className="flex items-center gap-1 text-[#C25B4E]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{look.likes}</span>
                  </span>
                </div>

                <h3 className="text-base font-serif text-[#1E1E22]">{look.title}</h3>
                <p className="text-xs text-[#6B6154] line-clamp-2 italic">
                  "{look.outfitPairing}"
                </p>

                <button
                  onClick={() => handleShopLook(look)}
                  className="w-full mt-2 bg-[#F4ECE1] hover:bg-[#1E1E22] hover:text-[#FDFBF7] text-[#1E1E22] border border-[#D8C7B2] py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shop This Look</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Look Details */}
        {activeLookModal && (
          <div className="fixed inset-0 z-50 bg-[#1E1E22]/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FDFBF7] rounded-3xl border border-[#EADFCF] max-w-lg w-full p-6 space-y-4 relative shadow-2xl animate-in fade-in duration-150">
              <button
                onClick={() => setActiveLookModal(null)}
                className="absolute top-4 right-4 text-[#1E1E22] hover:bg-[#F4ECE1] p-2 rounded-full"
              >
                ✕
              </button>

              <div className="aspect-video rounded-2xl overflow-hidden border border-[#EADFCF]">
                <img
                  src={activeLookModal.imageUrl}
                  alt={activeLookModal.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <span className="text-xs text-[#8D765E] font-semibold uppercase tracking-wider">
                  Styled by {activeLookModal.creator}
                </span>
                <h3 className="text-xl font-serif text-[#1E1E22] mt-0.5">{activeLookModal.title}</h3>
              </div>

              <div className="bg-[#F8F4EE] p-3.5 rounded-2xl border border-[#E6D8C6] space-y-1 text-xs">
                <strong className="text-[#1E1E22] block">Outfit Breakdown:</strong>
                <p className="text-[#524B42]">{activeLookModal.outfitPairing}</p>
                <div className="pt-2 text-[#8D765E] font-medium flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Featured Product: {activeLookModal.headphoneModel} ({activeLookModal.colorName})</span>
                </div>
              </div>

              <button
                onClick={() => {
                  handleShopLook(activeLookModal);
                  setActiveLookModal(null);
                }}
                className="w-full bg-[#1E1E22] hover:bg-[#38322B] text-[#FDFBF7] py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {activeLookModal.headphoneModel} to Bag</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
