export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: "supplements" | "clothing" | "accessories";
  subcategory?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  tags?: string[];
  featured?: boolean;
  isNew?: boolean;
  puntosFit: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  originalPrice: number;
  discount: number;
  image: string;
  objetivo: string;
  objetivoLabel: string;
  frequency: string;
  includedProducts: string[];
  benefits: string[];
  puntosFit: number;
  rating: number;
  subscribers: number;
  tags: string[];
  icon: string;
}

export interface Objetivo {
  id: string;
  label: string;
  icon: string;
  description: string;
}
