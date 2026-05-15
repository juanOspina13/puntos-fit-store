"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Minus, Plus, ChevronRight } from "lucide-react";
import { getProductById, getProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductGrid from "@/components/product/ProductGrid";
import PuntosBalanceBanner from "@/components/layout/PuntosBalanceBanner";
import type { Product } from "@/types";

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const prod = await getProductById(productId);
      setProduct(prod ?? null);
      setSelectedSize(prod?.sizes?.[0]);
      setSelectedColor(prod?.colors?.[0]);
      if (prod) {
        const all = await getProducts();
        setRelatedProducts(
          all.filter((p) => p.category === prod.category && p.id !== prod.id).slice(0, 4)
        );
      }
    }
    fetchData();
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Producto no encontrado
          </h2>
          <Link href="/products" className="text-[#cee741] hover:underline">
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const getColorStyle = (color: string) => {
    const colorMap: { [key: string]: string } = {
      Negro: "#000",
      Blanco: "#fff",
      Azul: "#3B82F6",
      Rojo: "#EF4444",
      Gris: "#9CA3AF",
      Morado: "#8B5CF6",
      Verde: "#10B981",
      Rosa: "#EC4899",
      "Azul Marino": "#1E3A8A",
      Marrón: "#92400E",
      "Negro/Rojo": "linear-gradient(135deg, #000 50%, #EF4444 50%)",
    };
    return colorMap[color] || "#ccc";
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-[#cee741]">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/products" className="hover:text-[#cee741]">
              Productos
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-[#cee741] capitalize"
            >
              {product.category === "supplements"
                ? "Suplementos"
                : product.category === "clothing"
                  ? "Ropa"
                  : "Accesorios"}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Big, prominent Puntos Fit balance — helps the user decide if
            they can already redeem this product. */}
        <PuntosBalanceBanner size="lg" className="mb-8" />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-700">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-[#cee741]"
                        : "border-gray-700"
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-2">
              {product.isNew && (
                <span className="bg-green-900/50 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                  Nuevo
                </span>
              )}
              {discount > 0 && (
                <span className="bg-red-900/50 text-red-400 text-xs font-semibold px-3 py-1 rounded-full">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* Title & Category */}
            <div>
              <p className="text-sm text-[#cee741] font-medium uppercase tracking-wide mb-2">
                {product.subcategory || product.category}
              </p>
              <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">
                {product.puntosFit} Puntos Fit /{" "}
                {product.price.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Talla: <span className="text-[#cee741]">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                        selectedSize === size
                          ? "border-[#cee741] bg-[#cee741]/20 text-[#cee741]"
                          : "border-gray-700 text-gray-300 hover:border-gray-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Color:{" "}
                  <span className="text-[#cee741]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-[#cee741] ring-2 ring-[#cee741]/50"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                      style={{
                        background: getColorStyle(color),
                        boxShadow:
                          color === "Blanco"
                            ? "inset 0 0 0 1px #374151"
                            : undefined,
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Cantidad
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center hover:bg-gray-800 text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-lg text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center hover:bg-gray-800 text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#cee741] text-gray-900 py-4 rounded-xl font-semibold hover:bg-[#b5cc1a] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </button>
              <button className="w-14 h-14 border border-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Heart className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">
              Productos Relacionados
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
}
