import type { Product } from "../types";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Suplementos",
    slug: "supplements",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400",
    description: "Proteínas, aminoácidos, pre-entrenos y más",
  },
  {
    id: "2",
    name: "Ropa Deportiva",
    slug: "clothing",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
    description: "Ropa de entrenamiento de alta calidad",
  },
  {
    id: "3",
    name: "Accesorios",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
    description: "Guantes, cinturones, shakers y más",
  },
];

export const products: Product[] = [
  // Suplementos

  {
    id: '4',
    name: 'Monohidrato Creatina Platinum Muscletech',
    description: '100% monohidrato de creatina. Aumenta la fuerza, potencia y masa muscular magra.',
    price: 143000,
    image: "https://api.gymconnect.com.co/training-connect-services/web/img/suplementos/platinumCreatineMuscletech.jpg",
    category: 'supplements',
    subcategory: 'Creatina',
    rating: 4.9,
    reviews: 2100,
    inStock: true,
    tags: ['creatina', 'fuerza', 'bestseller'],
    puntosFit: 110,
  },

  {
    puntosFit: 242,
    id: "1",
    name: "Whey Protein Basic 5 lbs",
    description:
      "Proteína de suero de alta calidad con 24g de proteína por porción. Ideal para la recuperación muscular post-entrenamiento. Sabor delicioso y fácil digestión.",
    price: 295000,
    originalPrice: 295000,
    image:  "https://api.gymconnect.com.co/training-connect-services/web/img/suplementos/basic5lb.jpg",
    images: [
       "https://api.gymconnect.com.co/training-connect-services/web/img/suplementos/basic5lb.jpg",
      "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500",
    ],
    category: "supplements",
    subcategory: "Proteínas",
    rating: 4.8,
    reviews: 1250,
    inStock: true,
    tags: ["bestseller", "proteína", "whey"],
    featured: true,
  },
  {
    id: '5',
    name: 'Multi vitamínico platinum Muscletech',
    description: 'Complejo vitamínico completo diseñado especialmente para atletas. Con vitaminas, minerales y antioxidantes.',
    price: 75400,
    image:  "https://api.gymconnect.com.co/training-connect-services/web/img/suplementos/multivitaminPlatinumMuscletech.jpg",
    category: 'supplements',
    subcategory: 'Vitaminas',
    rating: 4.5,
    reviews: 445,
    inStock: true,
    tags: ['vitaminas', 'salud'],
    puntosFit: 58
  },
  {
    id: '6',
    name: 'Omega de Now',
    description: 'Aceite de pescado con EPA y DHA de alta concentración. Apoya la salud cardiovascular, cerebral y articular.',
    price: 98800,
    image:  "https://api.gymconnect.com.co/training-connect-services/web/img/suplementos/omega3Now.jpg",
    category: 'supplements',
    subcategory: 'Vitaminas',
    rating: 4.7,
    reviews: 632,
    inStock: true,
    tags: ['omega 3', 'salud', 'ácidos grasos'],
    puntosFit: 76,
  },
  {
    id: '7',
    name: 'Vitamina D3 Simpli',
    description: 'Vitamina D3 de alta potencia para apoyar la salud ósea, inmunológica y muscular. Fácil absorción.',
    price: 110500,
    image:  "https://api.gymconnect.com.co/training-connect-services/web/img/suplementos/simpli.jpg",
    category: 'supplements',
    subcategory: 'Vitaminas',
    rating: 4.6,
    reviews: 328,
    inStock: true,
    tags: ['vitamina d3', 'salud', 'inmunidad'],
    puntosFit: 85,
  },
  {
    id: '8',
    name: 'Lipodrene Quemador de Grasa',
    description: 'Potente quemador de grasa con ingredientes termogénicos para apoyar la pérdida de peso y energía durante el entrenamiento.',
    price: 149500,
    image: 'https://api.gymconnect.com.co/training-connect-services/web/img/suplementos/lipodrene1.jpg',
    category: 'supplements',
    subcategory: 'Quemadores',
    rating: 4.7,
    reviews: 512,
    inStock: true,
    tags: ['quemador', 'lipodrene', 'termogénico', 'energía'],
    puntosFit: 115,
  },
  /*
{
    id: '7',
    name: 'Vitamina D3 Simpli',
    description: 'Vitamina D3 de alta potencia para apoyar la salud ósea, inmunológica y muscular. Fácil absorción.',
    price: 15.99,
     image:  "https://api.gymconnect.com.co/training-connect-services/web/img/suplementos/simpli.jpg",
    category: 'supplements',
    subcategory: 'Vitaminas',
    rating: 4.6,
    reviews: 328,
    inStock: true,
    tags: ['vitamina d3', 'salud', 'inmunidad'],
    puntosFit: 85,
  }, 
  */
  // Ropa Deportiva
  /*{
    id: '6',
    name: 'Camiseta Dry-Fit Performance',
    description: 'Camiseta de entrenamiento con tecnología de secado rápido. Tejido transpirable y ligero para máximo confort.',
    price: 35.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'clothing',
    subcategory: 'Camisetas',
    rating: 4.6,
    reviews: 389,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Negro', 'Blanco', 'Azul', 'Rojo'],
    tags: ['dry-fit', 'entrenamiento'],
    featured: true,
    puntosFit: 85,

  },*/
  /*
  {
    id: '8',
    name: 'Shorts Nike mujer',
    description: 'Shorts de compresión de alto rendimiento. Reduce la fatiga muscular y mejora la circulación durante el ejercicio.',
    price: 42.99,
    originalPrice: 52.99,
      image:  "https://api.gymconnect.com.co/training-connect-services/web/img/suplementos/shortNike.jpg",

    category: 'clothing',
    subcategory: 'Shorts',
    rating: 4.7,
    reviews: 267,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris'],
    tags: ['compresión', 'rendimiento'],
    puntosFit: 150
  },*/
  /*
  {
    id: '8',
    name: 'Leggings Power Flex',
    description: 'Leggings de alta compresión con tejido elástico 4 direcciones. Perfectos para cualquier tipo de entrenamiento.',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500',
    category: 'clothing',
    subcategory: 'Leggings',
    rating: 4.8,
    reviews: 534,
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Morado', 'Verde'],
    tags: ['leggings', 'mujer', 'yoga'],
    isNew: true
  },
  {
    id: '9',
    name: 'Hoodie Training Essential',
    description: 'Sudadera con capucha perfecta para antes y después del entrenamiento. Bolsillo canguro y puños ajustados.',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    category: 'clothing',
    subcategory: 'Sudaderas',
    rating: 4.5,
    reviews: 178,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Negro', 'Gris', 'Azul Marino'],
    tags: ['hoodie', 'casual']
  },
  {
    id: '10',
    name: 'Tank Top Muscle Fit',
    description: 'Camiseta sin mangas ajustada al cuerpo. Ideal para mostrar tu progreso en el gym.',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500',
    category: 'clothing',
    subcategory: 'Tank Tops',
    rating: 4.4,
    reviews: 156,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Blanco', 'Rojo'],
    tags: ['tank top', 'gym']
  },
  // Accesorios
  {
    id: '11',
    name: 'Guantes de Entrenamiento Pro',
    description: 'Guantes de gimnasio con palma acolchada y muñequera integrada. Máximo agarre y protección.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500',
    category: 'accessories',
    subcategory: 'Guantes',
    rating: 4.6,
    reviews: 423,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Negro/Rojo'],
    tags: ['guantes', 'protección'],
    featured: true
  },
  {
    id: '12',
    name: 'Cinturón de Levantamiento',
    description: 'Cinturón de piel genuina para levantamiento de pesas. Soporte lumbar profesional para cargas pesadas.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
    category: 'accessories',
    subcategory: 'Cinturones',
    rating: 4.8,
    reviews: 312,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Marrón'],
    tags: ['cinturón', 'powerlifting']
  },
  {
    id: '13',
    name: 'Shaker Bottle Premium',
    description: 'Shaker de 700ml con compartimento para suplementos. Mezclador de acero inoxidable incluido.',
    price: 14.99,
    originalPrice: 19.99,
    image: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?w=500',
    category: 'accessories',
    subcategory: 'Shakers',
    rating: 4.5,
    reviews: 876,
    inStock: true,
    colors: ['Negro', 'Azul', 'Rosa', 'Verde'],
    tags: ['shaker', 'hidratación']
  },
  {
    id: '14',
    name: 'Bandas de Resistencia Set',
    description: 'Set de 5 bandas de resistencia con diferentes niveles. Ideal para calentamiento y entrenamiento en casa.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500',
    category: 'accessories',
    subcategory: 'Bandas',
    rating: 4.7,
    reviews: 534,
    inStock: true,
    tags: ['bandas', 'resistencia', 'home workout'],
    isNew: true
  },
  {
    id: '15',
    name: 'Foam Roller Masajeador',
    description: 'Rodillo de espuma para liberación miofascial y recuperación muscular. Textura profunda para masaje efectivo.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=500',
    category: 'accessories',
    subcategory: 'Recuperación',
    rating: 4.6,
    reviews: 267,
    inStock: true,
    colors: ['Negro', 'Azul'],
    tags: ['recuperación', 'masaje']
  }
    */
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};
