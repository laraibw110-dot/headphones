import { Product, ColorVariant, Review, BlogPost, StyleLook } from "../types";

// Generated images
import champagneImg from "../assets/images/aura_product_champagne_1786196432614.jpg";
import sageImg from "../assets/images/aura_product_sage_1786196444430.jpg";
import heroImg from "../assets/images/aura_hero_lifestyle_1786196417362.jpg";
import fitDetailImg from "../assets/images/aura_fit_detail_1786196459867.jpg";

export const COLOR_VARIANTS: Record<string, ColorVariant> = {
  champagne: {
    id: "champagne",
    name: "Champagne Gold",
    hex: "#E8D8C8",
    bgClass: "bg-[#E8D8C8]",
    image: champagneImg,
    borderClass: "border-[#D4B896]",
    textColorClass: "text-[#B89468]",
  },
  sage: {
    id: "sage",
    name: "Sage Green",
    hex: "#9CAF88",
    bgClass: "bg-[#9CAF88]",
    image: sageImg,
    borderClass: "border-[#7A8F68]",
    textColorClass: "text-[#6A7F58]",
  },
  lavender: {
    id: "lavender",
    name: "Deep Lavender",
    hex: "#A397C2",
    bgClass: "bg-[#A397C2]",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    borderClass: "border-[#8576A8]",
    textColorClass: "text-[#756698]",
  },
  cream: {
    id: "cream",
    name: "Matte Cream",
    hex: "#F5F0E6",
    bgClass: "bg-[#F5F0E6]",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    borderClass: "border-[#E2D6C3]",
    textColorClass: "text-[#A69578]",
  },
  obsidian: {
    id: "obsidian",
    name: "Obsidian Pearl",
    hex: "#2B2B30",
    bgClass: "bg-[#2B2B30]",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    borderClass: "border-[#404048]",
    textColorClass: "text-[#3D3D42]",
  },
};

export const PRODUCTS: Product[] = [
  {
    id: "aura-one-anc",
    name: "AURA One ANC",
    tagline: "Flagship Adaptive Noise Cancelling Over-Ear",
    category: "over-ear",
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviewCount: 384,
    description: "Architected for smaller head circumferences, zero-snag ponytails, and zero-squeeze glasses comfort.",
    humanDescription: "Engineered specifically to solve the 'heavy tech headache' and hair snagging. Features a 3.2N ultra-light clamping force, plush memory foam earcups with glasses recess, and smart 35dB noise cancellation.",
    fitBadges: ["Hair-Friendly Flex Crown", "3.2N Gentle Clamping", "Zero-Squeeze Glasses Recess", "Ultra-Light 185g"],
    weightGrams: 185,
    clampingForceN: 3.2,
    batteryHours: 40,
    ancLevelDb: 35,
    isHairFriendly: true,
    isGlassesFriendly: true,
    colorVariants: [
      COLOR_VARIANTS.champagne,
      COLOR_VARIANTS.sage,
      COLOR_VARIANTS.lavender,
      COLOR_VARIANTS.cream,
      COLOR_VARIANTS.obsidian,
    ],
    specsForHumans: [
      {
        icon: "ShieldAlert",
        label: "3.2N Low Clamping Force",
        humanText: "Goodbye Headaches",
        techDetail: "45% less pressure than male-average 5.8N standard headphones."
      },
      {
        icon: "Sparkles",
        label: "Flush Hinge Architecture",
        humanText: "Zero Hair Snagging",
        techDetail: "Sealed pivot joints ensure no stray strands get caught in headband extensions."
      },
      {
        icon: "Volume2",
        label: "35dB Smart ANC",
        humanText: "Total Commute Silence",
        techDetail: "Custom acoustic chamber eliminates low-frequency jet hum and cafe chatter."
      },
      {
        icon: "Glasses",
        label: "Dual-Density Cushion",
        humanText: "Glasses Relief Zone",
        techDetail: "Top earpad groove contours around glasses frame stems without seal breakdown."
      },
      {
        icon: "Zap",
        label: "Quick Charge USB-C",
        humanText: "40-Hour All-Week Battery",
        techDetail: "10-minute fast charge delivers 4 full hours of wireless playtime."
      }
    ],
    lifestyleImages: [
      {
        context: "Professional",
        url: heroImg,
        caption: "AURA One in Champagne Gold paired with a tailored linen blazer in a sunlit morning cafe."
      },
      {
        context: "Casual",
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
        caption: "Casual model-off-duty aesthetic with an oversized organic cotton hoodie."
      },
      {
        context: "Fitness",
        url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
        caption: "Non-slip headband stays steady during mat pilates and brisk morning walks."
      },
      {
        context: "Travel",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        caption: "Lightweight airport travel essential with matching magnetic travel sleeve."
      }
    ],
    features: [
      "Custom 40mm titanium drivers tuned for rich vocal intimacy and clear acoustic instrumentals",
      "Multipoint Bluetooth 5.4 — seamless automatic switching between phone and laptop",
      "Fold-flat architecture slips easily into compact luxury handbags",
      "Micro-woven protein leather cushions that resist makeup and skincare transfer",
      "Dual beamforming microphones for crystal-clear Zoom and phone calls"
    ]
  },
  {
    id: "aura-studio-lite",
    name: "AURA Studio Lite",
    tagline: "Compact Featherweight Wireless On-Ear",
    category: "on-ear",
    price: 199,
    originalPrice: 229,
    rating: 4.8,
    reviewCount: 219,
    description: "Weighs just 135 grams with a ultra-slim headband designed for high buns and sleek ponytails.",
    humanDescription: "The ultimate WFH and commute companion. Featherweight build eliminates neck fatigue, while soft ear-cushioning provides passive noise isolation without ear canal pressure.",
    fitBadges: ["135g Featherweight", "Slim Bun-Clearing Arc", "Makeup-Resistant Earpads"],
    weightGrams: 135,
    clampingForceN: 2.8,
    batteryHours: 32,
    ancLevelDb: 22,
    isHairFriendly: true,
    isGlassesFriendly: true,
    colorVariants: [
      COLOR_VARIANTS.cream,
      COLOR_VARIANTS.sage,
      COLOR_VARIANTS.champagne,
      COLOR_VARIANTS.lavender,
    ],
    specsForHumans: [
      {
        icon: "Feather",
        label: "135 Grams Total Weight",
        humanText: "Feels Like Nothing",
        techDetail: "Featherweight aerospace aluminum core eliminates neck tension."
      },
      {
        icon: "Smile",
        label: "Slim Arch Band",
        humanText: "High Bun Clearance",
        techDetail: "Narrow profile crown sits comfortably behind or around top-knot hairstyles."
      },
      {
        icon: "BatteryCharging",
        label: "32-Hour Battery",
        humanText: "Charge Once a Week",
        techDetail: "Long-lasting battery cell with standby power management."
      }
    ],
    lifestyleImages: [
      {
        context: "Casual",
        url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1200&q=80",
        caption: "Styling AURA Studio Lite with casual knits and hair tied in a relaxed claw-clip."
      },
      {
        context: "Professional",
        url: heroImg,
        caption: "Sleek look for remote video meetings with crystal clear voice capture."
      }
    ],
    features: [
      "Ultra-compact folding mechanism fits inside mini crossbody bags",
      "Breathable perforated protein leather earpads keep ears cool during long sessions",
      "Touch gesture side controls for track navigation and volume",
      "Includes plush microfiber carrying pouch and braided charging cable"
    ]
  },
  {
    id: "aura-gem-pods",
    name: "AURA Gem Pods",
    tagline: "Jewelry-Inspired Wireless Earbuds with Compact Mirror Case",
    category: "earbuds",
    price: 149,
    rating: 4.9,
    reviewCount: 412,
    description: "Compact ergonomic ear-fit with 5 silicone tip sizes (including XS and XXS for smaller ear canals).",
    humanDescription: "Designed to look like elegant ear jewelry while staying securely locked in place during workouts or daily errands. Features a weighted pebble charging case with an integrated compact touch-up mirror.",
    fitBadges: ["XS & XXS Tip Sizes", "Pebble Mirror Case", "IPX5 Sweat-Proof"],
    weightGrams: 38,
    clampingForceN: 0,
    batteryHours: 28,
    ancLevelDb: 30,
    isHairFriendly: true,
    isGlassesFriendly: true,
    colorVariants: [
      COLOR_VARIANTS.champagne,
      COLOR_VARIANTS.lavender,
      COLOR_VARIANTS.obsidian,
      COLOR_VARIANTS.cream,
    ],
    specsForHumans: [
      {
        icon: "Sparkles",
        label: "Integrated Case Mirror",
        humanText: "On-the-Go Touch Ups",
        techDetail: "Sleek magnetic opening reveals an HD glass cosmetic mirror inside the case."
      },
      {
        icon: "Shield",
        label: "5 Ear Tip Sizes",
        humanText: "Never Falls Out",
        techDetail: "Includes XS and XXS medical-grade silicone tips designed for petite ear canals."
      },
      {
        icon: "Droplets",
        label: "IPX5 Sweat & Rain Resistant",
        humanText: "Pilates & Rain Approved",
        techDetail: "Hydrophobic nanocoating protects internal acoustics from moisture."
      }
    ],
    lifestyleImages: [
      {
        context: "Fitness",
        url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
        caption: "Gem Pods remain locked in place during high-intensity pilates and jogging."
      }
    ],
    features: [
      "Subtle rose-gold and brushed metallic accents that match fine jewelry",
      "6 hours playback per charge, 28 total hours with mirror compact case",
      "In-ear wear detection automatically pauses music when an earbud is removed",
      "Low-latency game and video mode for sync-free movie watching"
    ]
  },
  {
    id: "aura-silk-accessory-kit",
    name: "AURA Silk Pad Cover & Luxury Case Kit",
    tagline: "Protective Washable Covers & Vegan Leather Bag",
    category: "accessories",
    price: 39,
    rating: 5.0,
    reviewCount: 95,
    description: "Keep your ear cushions makeup-free and pristine with stretch mulberry silk removable covers.",
    humanDescription: "Protects your headphones from foundation, sunscreen, and sweat transfer. Includes 2 pairs of machine-washable mulberry silk earcup sleeves and a tailored structured travel case.",
    fitBadges: ["Makeup-Proof", "100% Mulberry Silk", "Washable"],
    weightGrams: 90,
    clampingForceN: 0,
    batteryHours: 0,
    ancLevelDb: 0,
    isHairFriendly: true,
    isGlassesFriendly: true,
    colorVariants: [
      COLOR_VARIANTS.champagne,
      COLOR_VARIANTS.lavender,
      COLOR_VARIANTS.sage,
      COLOR_VARIANTS.cream,
    ],
    specsForHumans: [
      {
        icon: "ShieldCheck",
        label: "Mulberry Silk Barrier",
        humanText: "Protects Makeup & Skin",
        techDetail: "Hypoallergenic breathable silk sleeves slip over earpads in seconds."
      }
    ],
    lifestyleImages: [
      {
        context: "Travel",
        url: fitDetailImg,
        caption: "Plush silk covers fit seamlessly over AURA One ear cushions."
      }
    ],
    features: [
      "Machine-washable silk sleeves maintain cushion hygiene for months",
      "Tailored magnetic enclosure travel case with dedicated cable storage",
      "Resists discoloration from skincare oils and setting sprays"
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Sophia M.",
    rating: 5,
    date: "2 weeks ago",
    headSizeTag: "Petite Head Frame",
    hairTypeTag: "High Bun Daily",
    glassesTag: true,
    modelBought: "AURA One ANC",
    colorBought: "Champagne Gold",
    comment: "Finally headphones that don't give me a tension headache after 30 minutes! Every tech brand designs for male head sizes. AURA fits my smaller head frame securely without crushing my glasses stems, and my hair bun doesn't collide with the crown.",
    verified: true
  },
  {
    id: "rev-2",
    author: "Elena V.",
    rating: 5,
    date: "1 month ago",
    headSizeTag: "Small Circumference",
    hairTypeTag: "Thick Curly Hair",
    glassesTag: false,
    modelBought: "AURA One ANC",
    colorBought: "Sage Green",
    comment: "The zero-snag hinge is REAL. With my old headphones, my curls got ripped out every time I pulled them down around my neck. The AURA headband extensions are totally flush! Plus the Sage Green shade is so chic.",
    verified: true
  },
  {
    id: "rev-3",
    author: "Camilla R.",
    rating: 5,
    date: "3 weeks ago",
    headSizeTag: "Petite Frame",
    hairTypeTag: "Low Ponytail",
    glassesTag: true,
    modelBought: "AURA Studio Lite",
    colorBought: "Matte Cream",
    comment: "Super lightweight! I wear glasses for WFH and I was skeptical about on-ears, but these cushion pads are feather-soft. No pressure points behind my ears at all.",
    verified: true
  },
  {
    id: "rev-4",
    author: "Dr. Maya K.",
    rating: 5,
    date: "Just now",
    headSizeTag: "Average Head Size",
    hairTypeTag: "Braids & Extensions",
    glassesTag: false,
    modelBought: "AURA One ANC",
    colorBought: "Deep Lavender",
    comment: "I travel twice a week for work. The 35dB noise cancelling shuts down plane noise completely. The champagne/lavender aesthetic gets me compliments every single flight!",
    verified: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "How to Wear Over-Ear Headphones with a High Bun or Braids",
    category: "Hair & Ergonomics",
    readTime: "4 min read",
    date: "August 2, 2026",
    excerpt: "Discover how the flex-hinge angle and crown arch positioning allow you to rock your favorite high bun or protective braids without flattening your volume.",
    image: heroImg,
    content: [
      "For years, women have had to choose between wearing their hair up or listening to their favorite music comfortably. Traditional tech brands design rigid, straight headbands that press directly onto topknots or snag protective braid extensions.",
      "At AURA, our engineering team developed the Flex-Crown Arch — a subtle backward-canted headband geometry that sits comfortably around the crown while giving your hairstyle 2.5 inches of clearance.",
      "Step 1: Angle the headband slightly back past your hairline rather than straight vertical over the crown. Step 2: Utilize flush extension arms that click smoothly without open hinge gaps. Step 3: Enjoy 40 hours of uninterrupted audio!"
    ],
    tips: [
      "Tilt headband 15 degrees backward for high bun clearance",
      "Use our Mulberry Silk pad covers to avoid makeup transfer",
      "Adjust clamping notch to level 2 for petite frames"
    ]
  },
  {
    id: "post-2",
    title: "Say Goodbye to Tension Headaches: The Science of Clamping Force",
    category: "Ergonomics",
    readTime: "5 min read",
    date: "July 28, 2026",
    excerpt: "Why standard tech headphones press with 5.8 Newtons of force—and how AURA reduced pressure to 3.2N for weightless all-day wear.",
    image: fitDetailImg,
    content: [
      "Did you know that standard headphones are tested on male 50th-percentile mannequin heads? Because male heads average 2cm wider than female heads, manufacturers calibrate high clamping pressure (5.5N - 6.0N) to keep headphones from slipping off wider frames.",
      "When worn on smaller female head frames, this excessive inward pressure squeezes temporal arteries and ear cartilage, leading to tension headaches within 30 to 45 minutes.",
      "AURA re-engineered the headband tension spring using Japanese spring steel calibrated to 3.2 Newtons — providing non-slip stability tailored to female ergonomics."
    ],
    tips: [
      "Measure your temporal width to find your ideal clamping force",
      "Look for dual-density memory foam ear cushions",
      "Choose headphones weighed under 200g to eliminate neck strain"
    ]
  },
  {
    id: "post-3",
    title: "Styling Tech: 5 Ways to Pair Headphones with Your Daily Outfit",
    category: "Style & Fashion",
    readTime: "3 min read",
    date: "July 15, 2026",
    excerpt: "Treat your headphones like a handbag or fine jewelry. Here is our editorial guide on color matching Champagne Gold, Sage Green, and Deep Lavender.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Tech is no longer just functional gear tucked inside a backpack — it is a prominent fashion accessory worn around your neck and framing your face.",
      "Look 1: The WFH Power Blazer. Pair Champagne Gold AURA One with structured linen or ivory blazers for polished Zoom calls.",
      "Look 2: Model-Off-Duty Sweatset. Match Sage Green headphones with monochrome heather gray loungewear for effortless coffee runs.",
      "Look 3: Sunset Pilates Chic. Deep Lavender Gem Pods coordinate with muted pastel workout sets."
    ],
    tips: [
      "Match metal accents (earcap rings) with your daily rings and earrings",
      "Use neutral tone headphone bodies as grounding fashion accents",
      "Store headphones in a structured luxury sleeve to maintain finish"
    ]
  }
];

export const STYLE_LOOKS: StyleLook[] = [
  {
    id: "look-1",
    title: "Morning Cafe Power Blazer",
    creator: "@sophia.style",
    headphoneModel: "AURA One ANC",
    colorName: "Champagne Gold",
    outfitPairing: "Ivory Double-Breasted Linen Blazer + Gold Hoop Earrings",
    imageUrl: heroImg,
    likes: 1420,
    tags: ["Workwear", "Tailored", "ChampagneGold"]
  },
  {
    id: "look-2",
    title: "Monochrome Sage WFH Focus",
    creator: "@elena_designs",
    headphoneModel: "AURA One ANC",
    colorName: "Sage Green",
    outfitPairing: "Sage Cashmere Knit Sweater + High Waist Wide Leg Trousers",
    imageUrl: sageImg,
    likes: 980,
    tags: ["WFH", "SageGreen", "Aesthetic"]
  },
  {
    id: "look-3",
    title: "Model-Off-Duty Hoodie Chic",
    creator: "@camilla_nyc",
    headphoneModel: "AURA Studio Lite",
    colorName: "Matte Cream",
    outfitPairing: "Oversized Organic Hoodie + Leather Trench Coat",
    imageUrl: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1200&q=80",
    likes: 1250,
    tags: ["Streetwear", "OffDuty", "Featherweight"]
  },
  {
    id: "look-4",
    title: "Pilates & Smoothie Run",
    creator: "@maya_wellness",
    headphoneModel: "AURA Gem Pods",
    colorName: "Deep Lavender",
    outfitPairing: "Muted Lavender Ribbed Activewear Set + Tote Bag",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    likes: 890,
    tags: ["Pilates", "GemPods", "Activewear"]
  }
];
