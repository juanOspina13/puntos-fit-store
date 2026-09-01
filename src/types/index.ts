export interface ProductPhoto {
  id: number;
  url: string;
  orden: number;
  enabled: boolean;
}

export interface ProductSizeVariant {
  id: number;
  talla: { id: number; nombre: string };
  cantidad: number;
  enabled: boolean;
}

export interface ProductFlavorVariant {
  id: number;
  sabor: { id: number; nombre: string };
  servings: number;
  cantidad: number;
  enabled: boolean;
}

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
  companyId?: string;
  fotos?: ProductPhoto[];
  tallas?: ProductSizeVariant[];
  sabores?: ProductFlavorVariant[];
}

export interface Company {
  id: string;
  nombre: string;
  descripcion: string;
  descripcionLarga: string;
  slug: string;
  imagen?: string;
  enabled: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedFlavor?: string;
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
