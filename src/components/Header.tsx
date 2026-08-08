import React, { useState } from "react";
import {
  ShoppingBag,
  Sparkles,
  Search,
  Menu,
  X,
  ChevronDown,
  Headphones,
  Heart,
  HelpCircle,
  Sliders
} from "lucide-react";
import { CartItem } from "../types";

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenAiStylist: () => void;
  onOpenFitGuide: () => void;
  onSelectCategory: (category: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  onOpenAiStylist,
  onOpenFitGuide,
  onSelectCategory,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xl border-b border-[#E8DFD1] shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-[#1E1E22] text-[#F5EBE1] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E8D8C8] animate-pulse"></span>
        <span>Complimentary Express Shipping & 60-Day "Hair & Fit Guarantee" — Try Risk Free</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => handleNavClick("hero")}
              className="text-left group focus:outline-none"
            >
              <span className="text-2xl font-serif tracking-widest text-[#1E1E22] font-semibold group-hover:text-[#8D765E] transition-colors">
                AURA
              </span>
              <span className="block text-[9px] tracking-[0.25em] text-[#8D765E] uppercase font-sans">
                Tech as Accessory
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A433B]">
              {/* Shop Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                  onMouseEnter={() => setShopDropdownOpen(true)}
                  className="flex items-center gap-1 hover:text-[#1E1E22] py-2 transition-colors"
                >
                  <span>Shop</span>
                  <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform" />
                </button>

                {shopDropdownOpen && (
                  <div
                    onMouseLeave={() => setShopDropdownOpen(false)}
                    className="absolute top-full left-0 w-64 bg-[#FDFBF7] border border-[#EADFCF] rounded-xl shadow-xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <button
                      onClick={() => {
                        onSelectCategory("all");
                        handleNavClick("products");
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-[#8D765E] uppercase tracking-wider hover:bg-[#F4ECE1] rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>All Products</span>
                      <span className="text-[10px] bg-[#E8D8C8] text-[#1E1E22] px-2 py-0.5 rounded-full">New</span>
                    </button>
                    <div className="my-1 border-t border-[#EADFCF]" />
                    <button
                      onClick={() => {
                        onSelectCategory("over-ear");
                        handleNavClick("products");
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-[#38322B] hover:bg-[#F4ECE1] rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Headphones className="w-4 h-4 text-[#8D765E]" />
                      <span>AURA One ANC (Over-Ear)</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectCategory("on-ear");
                        handleNavClick("products");
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-[#38322B] hover:bg-[#F4ECE1] rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Sliders className="w-4 h-4 text-[#8D765E]" />
                      <span>AURA Studio Lite (On-Ear)</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectCategory("earbuds");
                        handleNavClick("products");
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-[#38322B] hover:bg-[#F4ECE1] rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#8D765E]" />
                      <span>AURA Gem Pods (Earbuds)</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectCategory("accessories");
                        handleNavClick("products");
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-[#38322B] hover:bg-[#F4ECE1] rounded-lg transition-colors"
                    >
                      <span>Silk Earpad Covers & Cases</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  onOpenFitGuide();
                  handleNavClick("fit-guide");
                }}
                className={`hover:text-[#1E1E22] transition-colors py-2 ${
                  activeSection === "fit-guide" ? "text-[#1E1E22] font-semibold border-b-2 border-[#8D765E]" : ""
                }`}
              >
                The Fit Guide
              </button>

              <button
                onClick={() => handleNavClick("style-gallery")}
                className={`hover:text-[#1E1E22] transition-colors py-2 ${
                  activeSection === "style-gallery" ? "text-[#1E1E22] font-semibold border-b-2 border-[#8D765E]" : ""
                }`}
              >
                Style Gallery
              </button>

              <button
                onClick={() => handleNavClick("hair-guide")}
                className="hover:text-[#1E1E22] transition-colors py-2"
              >
                Hair & Style Guide
              </button>

              <button
                onClick={() => handleNavClick("our-story")}
                className="hover:text-[#1E1E22] transition-colors py-2"
              >
                Our Story
              </button>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* AI Fit Stylist Button */}
            <button
              onClick={onOpenAiStylist}
              className="hidden sm:flex items-center gap-2 bg-[#F4ECE1] border border-[#D8C7B2] hover:border-[#8D765E] text-[#1E1E22] px-3.5 py-2 rounded-full text-xs font-medium transition-all shadow-sm hover:shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89468] animate-pulse" />
              <span>AI Fit & Style Concierge</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-[#F4ECE1] transition-colors text-[#1E1E22]"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#1E1E22] text-[#FDFBF7] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FDFBF7]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1E1E22] hover:bg-[#F4ECE1] rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-[#EADFCF] px-4 pt-2 pb-6 space-y-3 animate-in fade-in duration-200">
          <button
            onClick={onOpenAiStylist}
            className="w-full flex items-center justify-center gap-2 bg-[#E8D8C8] text-[#1E1E22] py-2.5 rounded-xl text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 text-[#8D765E]" />
            <span>AI Fit & Style Concierge</span>
          </button>

          <div className="space-y-1 text-sm font-medium text-[#38322B]">
            <button
              onClick={() => {
                onSelectCategory("all");
                handleNavClick("products");
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#F4ECE1]"
            >
              Shop All Products
            </button>
            <button
              onClick={() => {
                onOpenFitGuide();
                handleNavClick("fit-guide");
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#F4ECE1]"
            >
              The Fit Guide (Ergonomics)
            </button>
            <button
              onClick={() => handleNavClick("style-gallery")}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#F4ECE1]"
            >
              Style Gallery & Outfit Pairings
            </button>
            <button
              onClick={() => handleNavClick("hair-guide")}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#F4ECE1]"
            >
              Hair & Style Guide Blog
            </button>
            <button
              onClick={() => handleNavClick("our-story")}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#F4ECE1]"
            >
              Our Story
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
