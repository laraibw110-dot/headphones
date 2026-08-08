import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (discountAmount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const finalTotal = subtotal - discountAmount;

  const freeShippingThreshold = 200;
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "AURA10") {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#1E1E22]/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between border-l border-[#EADFCF] animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#EADFCF] flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1E1E22]" />
            <h2 className="text-lg font-serif text-[#1E1E22]">Your Shopping Bag</h2>
            <span className="text-xs bg-[#E8D8C8] text-[#524131] px-2 py-0.5 rounded-full font-bold">
              {cartItems.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#1E1E22] hover:bg-[#F4ECE1] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Gift & Free Express Shipping Progress Bar */}
        <div className="bg-[#F8F4EE] px-6 py-3 border-b border-[#E6D8C6] space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#38322B]">
              {subtotal >= freeShippingThreshold
                ? "✨ Free Shipping & Silk Covers Unlocked!"
                : `Add $${freeShippingThreshold - subtotal} for Free Shipping`}
            </span>
            <span className="text-[#8D765E]">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#EADFCF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8D765E] transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#C4B29F] mx-auto opacity-50" />
              <p className="text-sm font-serif text-[#1E1E22]">Your bag is currently empty</p>
              <p className="text-xs text-[#8D8276]">
                Explore our ergonomic headphones crafted for zero headaches and hair comfort.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#E6D8C6] flex items-center gap-4 relative"
              >
                {/* Product Image */}
                <img
                  src={item.selectedColor.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-xl border border-[#D8C7B2]"
                  referrerPolicy="no-referrer"
                />

                {/* Details */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-serif text-[#1E1E22]">{item.product.name}</h4>
                      <p className="text-xs text-[#8D765E] font-medium">
                        Shade: {item.selectedColor.name}
                      </p>
                      {item.engraving && (
                        <p className="text-[10px] text-[#3D522B] font-mono bg-[#E2E8DD] px-1.5 py-0.5 rounded inline-block mt-0.5">
                          Engraving: "{item.engraving.toUpperCase()}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#9E9285] hover:text-[#C25B4E] transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 bg-[#FDFBF7] border border-[#D8C7B2] rounded-lg px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-[#1E1E22] p-1 hover:text-[#8D765E]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-[#1E1E22] p-1 hover:text-[#8D765E]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#1E1E22]">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-[#FDFBF7] border-t border-[#EADFCF] space-y-4">
            {/* Promo Code Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Promo code (e.g. AURA10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-[#F8F4EE] border border-[#D8C7B2] rounded-xl px-3 py-2 text-xs text-[#1E1E22] uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#8D765E]"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-[#1E1E22] text-[#FDFBF7] px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#38322B]"
              >
                Apply
              </button>
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#6B6154]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-[#3D522B] font-semibold">
                  <span>AURA10 Discount (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-bold text-[#1E1E22] pt-2 border-t border-[#EADFCF]">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => onCheckout(discountAmount)}
              className="w-full bg-[#1E1E22] hover:bg-[#38322B] text-[#FDFBF7] py-4 rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-xl transition-all"
            >
              <span>Proceed to Express Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A6E62]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8D765E]" />
              <span>Includes 60-Day Risk Free Fit Guarantee & Warranty</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
