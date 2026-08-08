import React, { useState } from "react";
import { Star, Sparkles, Check, Eye, ShoppingBag, ShieldCheck } from "lucide-react";
import { Product, ColorVariant } from "../types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product, color: ColorVariant) => void;
  onAddToCart: (product: Product, color: ColorVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(product.colorVariants[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-[#FDFBF7] border border-[#EADFCF] hover:border-[#8D765E] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-[#F7F2EB] overflow-hidden">
        {/* Hair-Friendly Badge */}
        {product.isHairFriendly && (
          <div className="absolute top-3 left-3 z-10 bg-[#FDFBF7]/90 backdrop-blur-md border border-[#D8C7B2] text-[#524131] text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#B89468]" />
            <span>Hair-Friendly Hinge</span>
          </div>
        )}

        {/* Product Image with selected color */}
        <img
          src={selectedColor.image}
          alt={`${product.name} in ${selectedColor.name}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Quick View Button Overlay */}
        <div className="absolute inset-0 bg-[#1E1E22]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => onQuickView(product, selectedColor)}
            className="bg-[#FDFBF7] text-[#1E1E22] hover:bg-[#1E1E22] hover:text-[#FDFBF7] px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View & Specs</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating & Tagline */}
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-1 text-[#C48B28]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-[#1E1E22]">{product.rating}</span>
              <span className="text-[#8D8276]">({product.reviewCount})</span>
            </div>
            <span className="text-[11px] font-medium text-[#8D765E] uppercase tracking-wider">
              {product.weightGrams > 0 ? `${product.weightGrams}g Ultra-Light` : "Ergonomic"}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-xl font-serif text-[#1E1E22] group-hover:text-[#8D765E] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-[#6B6154] mt-1 line-clamp-2 leading-relaxed">
            {product.humanDescription}
          </p>

          {/* Color Swatches Selection */}
          <div className="mt-4 pt-3 border-t border-[#EADFCF]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-[#7A6E62]">
                Color: <strong className="text-[#1E1E22]">{selectedColor.name}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              {product.colorVariants.map((color) => {
                const isSelected = selectedColor.id === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full ${color.bgClass} border ${
                      isSelected ? "ring-2 ring-offset-2 ring-[#1E1E22] scale-110" : "hover:scale-105"
                    } transition-all relative flex items-center justify-center shadow-inner`}
                    title={color.name}
                  >
                    {isSelected && <Check className="w-3 h-3 text-[#1E1E22] drop-shadow-sm" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-3 border-t border-[#EADFCF] flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#1E1E22]">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E9285] line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product, selectedColor)}
            className="bg-[#1E1E22] hover:bg-[#38322B] text-[#FDFBF7] px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm hover:shadow"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
