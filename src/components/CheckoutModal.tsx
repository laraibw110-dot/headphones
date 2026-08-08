import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Lock, Sparkles, ArrowRight } from "lucide-react";
import { CartItem } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  onClearCart,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [email, setEmail] = useState("laraibw110@gmail.com");
  const [fullName, setFullName] = useState("Laraib Khan");
  const [address, setAddress] = useState("124 Fashion Way, Suite 400");
  const [city, setCity] = useState("San Francisco");
  const [zip, setZip] = useState("94107");

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const total = subtotal - discountAmount;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1E1E22]/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl border border-[#EADFCF] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EADFCF] pb-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#8D765E]" />
            <h2 className="text-xl font-serif text-[#1E1E22]">AURA Express Checkout</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#1E1E22] hover:bg-[#F4ECE1] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State 1: Order Form */}
        {!isCompleted ? (
          <form onSubmit={handleCompleteOrder} className="space-y-6">
            
            {/* Express Pay Banner */}
            <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#E6D8C6] text-center space-y-2">
              <span className="text-xs font-bold text-[#8D765E] uppercase tracking-wider block">
                Instant Express Payment
              </span>
              <button
                type="button"
                onClick={() => handleCompleteOrder({ preventDefault: () => {} } as any)}
                className="w-full bg-[#1E1E22] text-[#FDFBF7] py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow hover:bg-[#38322B]"
              >
                <span>Pay with Apple Pay / Shop Pay (${total.toFixed(2)})</span>
              </button>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#EADFCF]"></div>
              <span className="flex-shrink mx-4 text-xs text-[#8D8276] uppercase tracking-wider font-semibold">
                Or Shipping Details
              </span>
              <div className="flex-grow border-t border-[#EADFCF]"></div>
            </div>

            {/* Inputs */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#38322B] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8F4EE] border border-[#D8C7B2] rounded-xl px-3.5 py-2.5 text-[#1E1E22] focus:outline-none focus:ring-1 focus:ring-[#8D765E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#38322B] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#F8F4EE] border border-[#D8C7B2] rounded-xl px-3.5 py-2.5 text-[#1E1E22] focus:outline-none focus:ring-1 focus:ring-[#8D765E]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block font-bold text-[#38322B] mb-1">Shipping Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#F8F4EE] border border-[#D8C7B2] rounded-xl px-3.5 py-2.5 text-[#1E1E22] focus:outline-none focus:ring-1 focus:ring-[#8D765E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#38322B] mb-1">Zip Code</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full bg-[#F8F4EE] border border-[#D8C7B2] rounded-xl px-3.5 py-2.5 text-[#1E1E22] focus:outline-none focus:ring-1 focus:ring-[#8D765E]"
                  />
                </div>
              </div>
            </div>

            {/* Order Review */}
            <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#E6D8C6] space-y-2 text-xs">
              <strong className="block text-[#1E1E22] font-bold">Order Breakdown:</strong>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-[#524B42]">
                  <span>
                    {item.product.name} ({item.selectedColor.name}) x{item.quantity}
                  </span>
                  <span className="font-semibold">${item.product.price * item.quantity}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#EADFCF] flex justify-between font-bold text-sm text-[#1E1E22]">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#1E1E22] hover:bg-[#38322B] text-[#FDFBF7] py-4 rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-xl transition-all"
            >
              {isProcessing ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Place Order — ${total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* State 2: Order Confirmation */
          <div className="py-8 text-center space-y-6 animate-in fade-in duration-200">
            <div className="w-16 h-16 bg-[#E2E8DD] text-[#3D522B] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs text-[#8D765E] font-bold uppercase tracking-wider block">
                Order #AURA-89421 Confirmed
              </span>
              <h3 className="text-2xl font-serif text-[#1E1E22] mt-1">Thank You, {fullName}!</h3>
              <p className="text-xs text-[#6B6154] mt-1 max-w-sm mx-auto">
                Your headphones are being hand-inspected for ergonomic headband tension and custom laser engraving. A tracking email has been sent to <strong>{email}</strong>.
              </p>
            </div>

            <div className="bg-[#F8F4EE] p-4 rounded-2xl border border-[#E6D8C6] text-xs space-y-2 max-w-md mx-auto text-left">
              <div className="flex items-center gap-2 text-[#3D522B] font-bold">
                <Truck className="w-4 h-4" />
                <span>Estimated Express Delivery: 2 Business Days</span>
              </div>
              <p className="text-[#6B6154]">
                Includes complimentary Mulberry Silk cushion covers & 60-day Risk-Free Fit Guarantee.
              </p>
            </div>

            <button
              onClick={onClose}
              className="bg-[#1E1E22] text-[#FDFBF7] px-8 py-3.5 rounded-full text-xs font-semibold shadow hover:bg-[#38322B]"
            >
              Return to Store
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
