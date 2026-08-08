import React, { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductCard } from "./components/ProductCard";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { FitGuideSection } from "./components/FitGuideSection";
import { StyleGallery } from "./components/StyleGallery";
import { AiStylistModal } from "./components/AiStylistModal";
import { BlogSection } from "./components/BlogSection";
import { OurStorySection } from "./components/OurStorySection";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { Footer } from "./components/Footer";

import { Product, ColorVariant, CartItem } from "./types";
import { PRODUCTS } from "./data/catalog";
import { Sparkles, Sliders, Filter } from "lucide-react";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isBgVideoActive, setIsBgVideoActive] = useState<boolean>(true);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "init-cart-1",
      product: PRODUCTS[0],
      selectedColor: PRODUCTS[0].colorVariants[0],
      engraving: "A.M.",
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Quick View / Detail Modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewColor, setQuickViewColor] = useState<ColorVariant | undefined>(undefined);

  // AI Concierge Modal state
  const [isAiStylistOpen, setIsAiStylistOpen] = useState<boolean>(false);

  // Checkout Modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Filtered Products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  const handleAddToCart = (product: Product, color: ColorVariant, engraving?: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.id === color.id && item.engraving === engraving
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          product,
          selectedColor: color,
          engraving,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = (discount: number) => {
    setDiscountAmount(discount);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#1E1E22] font-sans selection:bg-[#E8D8C8] selection:text-[#1E1E22] relative overflow-x-hidden">
      
      {/* Fullsite Prominent Background Video Layer */}
      {isBgVideoActive && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=i8rj3jul&public_id=make_a_d_vid_of_it_biw9ev&profile=cld-default&autoplay=true&loop=true&muted=true"
            title="Website Background Video"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220vw] h-[220vh] sm:w-[160vw] sm:h-[160vh] min-w-[100%] min-h-[100%] border-0 opacity-100 filter contrast-110 brightness-105 pointer-events-none scale-100 object-cover"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          />
          {/* Subtle vignette layer to ensure maximum video clarity while preserving legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
        </div>
      )}

      {/* Main Relative Content Container */}
      <div className="relative z-10">
        {/* Navigation Header */}
        <Header
          cartItems={cartItems}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAiStylist={() => setIsAiStylistOpen(true)}
          onOpenFitGuide={() => scrollToSection("fit-guide")}
          onSelectCategory={setSelectedCategory}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Floating Ambient Video Toggle Floating Badge */}
        <div className="fixed bottom-6 left-6 z-30 hidden lg:block">
          <button
            onClick={() => setIsBgVideoActive(!isBgVideoActive)}
            className="bg-[#1E1E22]/90 hover:bg-[#1E1E22] text-[#FDFBF7] backdrop-blur-md text-xs font-medium px-4 py-2.5 rounded-full shadow-2xl border border-[#403B35] flex items-center gap-2 transition-all hover:scale-105"
            title="Toggle background ambient cinematic video"
          >
            <span className={`w-2 h-2 rounded-full ${isBgVideoActive ? 'bg-[#9CAF88] animate-pulse' : 'bg-gray-500'}`} />
            <span>{isBgVideoActive ? "Background Video: ACTIVE" : "Background Video: OFF"}</span>
          </button>
        </div>

        {/* Main Content Sections */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-12 md:space-y-16">
          {/* Editorial Hero */}
          <div className="bg-[#FAF8F5]/60 backdrop-blur-md rounded-3xl border border-[#E8DFD1]/70 shadow-2xl overflow-hidden">
            <Hero
              onShopClick={() => scrollToSection("products")}
              onFitGuideClick={() => scrollToSection("fit-guide")}
              onAiStylistClick={() => setIsAiStylistOpen(true)}
            />
          </div>

        {/* Product Catalog Section */}
        <section id="products" className="bg-[#FAF8F5]/60 backdrop-blur-md rounded-3xl border border-[#E8DFD1]/70 p-6 sm:p-10 shadow-2xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EADFCF]/80">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#F4ECE1]/90 text-[#735A42] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#D8C7B2]">
                <Sparkles className="w-3.5 h-3.5 text-[#B89468]" />
                <span>The AURA Collection</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1E1E22] tracking-tight">
                Ergonomic & Fashion-Forward <br />
                <span className="italic font-light text-[#8D765E]">Acoustic Luxury</span>
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {[
                { id: "all", label: "All Products" },
                { id: "over-ear", label: "Over-Ear ANC" },
                { id: "on-ear", label: "Featherweight On-Ear" },
                { id: "earbuds", label: "Jewelry Earbuds" },
                { id: "accessories", label: "Silk Accessories" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#1E1E22] text-[#FDFBF7] shadow-md"
                      : "bg-[#F4ECE1]/80 text-[#38322B] hover:bg-[#E8D8C8]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(prod, col) => {
                  setQuickViewProduct(prod);
                  setQuickViewColor(col);
                }}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* Interactive Fit Guide Section */}
        <div className="bg-[#FAF8F5]/60 backdrop-blur-md rounded-3xl border border-[#E8DFD1]/70 shadow-2xl overflow-hidden">
          <FitGuideSection onAiStylistClick={() => setIsAiStylistOpen(true)} />
        </div>

        {/* Style Gallery & UGC Section */}
        <div className="bg-[#FAF8F5]/60 backdrop-blur-md rounded-3xl border border-[#E8DFD1]/70 shadow-2xl overflow-hidden">
          <StyleGallery
            onQuickView={(prod, col) => {
              setQuickViewProduct(prod);
              setQuickViewColor(col);
            }}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Hair & Style Guide Journal */}
        <div className="bg-[#FAF8F5]/60 backdrop-blur-md rounded-3xl border border-[#E8DFD1]/70 shadow-2xl overflow-hidden">
          <BlogSection />
        </div>

        {/* Brand Philosophy & Story Section */}
        <div className="bg-[#FAF8F5]/60 backdrop-blur-md rounded-3xl border border-[#E8DFD1]/70 shadow-2xl overflow-hidden">
          <OurStorySection />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenFitGuide={() => scrollToSection("fit-guide")}
        onOpenAiStylist={() => setIsAiStylistOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToSection("products");
        }}
      />

      {/* Modals & Overlays */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          initialColor={quickViewColor}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {isAiStylistOpen && (
        <AiStylistModal
          onClose={() => setIsAiStylistOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountAmount={discountAmount}
        onClearCart={() => setCartItems([])}
      />
      </div>
    </div>
  );
}
