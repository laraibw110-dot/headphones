export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
  bgClass: string;
  image: string;
  borderClass: string;
  textColorClass: string;
}

export interface ProductSpec {
  icon: string;
  label: string;
  humanText: string;
  techDetail: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: "over-ear" | "on-ear" | "earbuds" | "accessories";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  humanDescription: string;
  fitBadges: string[];
  specsForHumans: ProductSpec[];
  colorVariants: ColorVariant[];
  lifestyleImages: {
    context: "Professional" | "Casual" | "Fitness" | "Travel";
    url: string;
    caption: string;
  }[];
  features: string[];
  weightGrams: number;
  clampingForceN: number;
  batteryHours: number;
  ancLevelDb: number;
  isHairFriendly: boolean;
  isGlassesFriendly: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ColorVariant;
  engraving?: string;
  quantity: number;
}

export interface FitProfile {
  headSize: "Petite / Small" | "Average" | "Flexible";
  hairType: "High Bun / Top Knot" | "Thick Curly / Afro" | "Ponytail & Braids" | "Fine Straight / Bob";
  glasses: boolean;
  dailyStyle: "Commuter & Cafe" | "WFH Focus" | "Fitness & Pilates" | "Travel & Flights";
  priority: "Zero Headaches & Low Pressure" | "Doesn't Flatten Hair" | "Ultra Light Weight" | "Maximum ANC Noise Isolation";
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  headSizeTag: string;
  hairTypeTag: string;
  glassesTag: boolean;
  modelBought: string;
  colorBought: string;
  comment: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
  tips: string[];
}

export interface StyleLook {
  id: string;
  title: string;
  creator: string;
  headphoneModel: string;
  colorName: string;
  outfitPairing: string;
  imageUrl: string;
  likes: number;
  tags: string[];
}
