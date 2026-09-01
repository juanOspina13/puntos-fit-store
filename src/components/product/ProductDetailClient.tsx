"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Minus, Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { getProductById, getProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductGrid from "@/components/product/ProductGrid";
import PuntosBalanceBanner from "@/components/layout/PuntosBalanceBanner";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrency } from "@/lib/format";
import type { Product, ProductSizeVariant, ProductFlavorVariant } from "@/types";

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSizeVariant | undefined>(undefined);
  const [selectedFlavor, setSelectedFlavor] = useState<ProductFlavorVariant | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const prod = await getProductById(productId);
      setProduct(prod ?? null);
      if (prod) {
        const activeSizes = prod.tallas?.filter((t) => t.enabled && t.cantidad > 0) ?? [];
        const activeFlavors = prod.sabores?.filter((f) => f.enabled && f.cantidad > 0) ?? [];
        setSelectedSize(activeSizes[0]);
        setSelectedFlavor(activeFlavors[0]);
        setSelectedColor(prod.colors?.[0]);
        const all = await getProducts();
        setRelatedProducts(
          all.filter((p) => p.category === prod.category && p.id !== prod.id).slice(0, 4)
        );
      }
      setIsLoading(false);
    }
    fetchData();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-12 w-full mb-8" />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="w-20 h-20 rounded-lg" />)}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-72" />
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-14" />)}
              </div>
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Producto no encontrado</h2>
          <Link href="/products" className="text-[#cee741] hover:underline">Volver a productos</Link>
        </div>
      </div>
    );
  }

  // Build image list: fotos (sorted by orden) → fallback to product.image
  const sortedFotos = [...(product.fotos ?? [])].sort((a, b) => a.orden - b.orden).filter((f) => f.enabled);
  const images = sortedFotos.length > 0 ? sortedFotos.map((f) => f.url) : (product.images ?? [product.image]);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isClothing = product.category === "clothing";
  const isSupplement = product.category === "supplements";

  const activeTallas = (product.tallas ?? []).filter((t) => t.enabled);
  const activeSabores = (product.sabores ?? []).filter((f) => f.enabled);

  const maxStock = isClothing
    ? selectedSize?.cantidad ?? 0
    : isSupplement
      ? selectedFlavor?.cantidad ?? 0
      : Infinity;

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedSize?.talla.nombre,
      selectedColor,
      selectedFlavor?.sabor.nombre,
    );
  };

  const getColorStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      Negro: "#000", Blanco: "#fff", Azul: "#3B82F6", Rojo: "#EF4444",
      Gris: "#9CA3AF", Morado: "#8B5CF6", Verde: "#10B981", Rosa: "#EC4899",
      "Azul Marino": "#1E3A8A", Marrón: "#92400E",
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
            <Link href="/" className="hover:text-[#cee741]">Inicio</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/products" className="hover:text-[#cee741]">Productos</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href={`/products?category=${product.category}`} className="hover:text-[#cee741] capitalize">
              {product.category === "supplements" ? "Suplementos" : product.category === "clothing" ? "Ropa" : "Accesorios"}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PuntosBalanceBanner size="lg" className="mb-8" />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
              <Image src={images[selectedImage]} alt={product.name} fill className="object-cover" priority />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-3 right-3 text-[11px] bg-black/50 text-white px-2 py-0.5 rounded-full">
                    {selectedImage + 1} / {images.length}
                  </span>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${
                      selectedImage === i ? "border-[#cee741]" : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {product.isNew && (
                <span className="bg-green-900/50 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">Nuevo</span>
              )}
              {discount > 0 && (
                <span className="bg-red-900/50 text-red-400 text-xs font-semibold px-3 py-1 rounded-full">-{discount}% OFF</span>
              )}
            </div>

            <div>
              <p className="text-sm text-[#cee741] font-medium uppercase tracking-wide mb-2">
                {product.subcategory || product.category}
              </p>
              <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">
                {product.puntosFit} Puntos Fit / {formatCurrency(product.price)}
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed">{product.description}</p>

            {/* Size selector — clothing */}
            {isClothing && activeTallas.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Talla:{" "}
                  <span className="text-[#cee741]">{selectedSize?.talla.nombre ?? "—"}</span>
                  {selectedSize && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({selectedSize.cantidad} disponibles)
                    </span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {activeTallas.map((t) => {
                    const outOfStock = t.cantidad === 0;
                    return (
                      <button
                        key={t.id}
                        onClick={() => !outOfStock && setSelectedSize(t)}
                        disabled={outOfStock}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors text-sm ${
                          selectedSize?.id === t.id
                            ? "border-[#cee741] bg-[#cee741]/20 text-[#cee741]"
                            : outOfStock
                              ? "border-gray-700 text-gray-600 line-through cursor-not-allowed"
                              : "border-gray-700 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        {t.talla.nombre}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Flavor + servings selector — supplements */}
            {isSupplement && activeSabores.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Sabor:{" "}
                  <span className="text-[#cee741]">{selectedFlavor?.sabor.nombre ?? "—"}</span>
                  {selectedFlavor && selectedFlavor.servings > 0 && (
                    <span className="ml-2 text-xs text-gray-500">
                      · {selectedFlavor.servings} servicios
                    </span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {activeSabores.map((f) => {
                    const outOfStock = f.cantidad === 0;
                    return (
                      <button
                        key={f.id}
                        onClick={() => !outOfStock && setSelectedFlavor(f)}
                        disabled={outOfStock}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors text-sm ${
                          selectedFlavor?.id === f.id
                            ? "border-[#cee741] bg-[#cee741]/20 text-[#cee741]"
                            : outOfStock
                              ? "border-gray-700 text-gray-600 line-through cursor-not-allowed"
                              : "border-gray-700 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        {f.sabor.nombre}
                        {f.servings > 0 && (
                          <span className="ml-1 text-[10px] text-gray-500">{f.servings}srv</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Color: <span className="text-[#cee741]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-[#cee741] ring-2 ring-[#cee741]/50"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                      style={{ background: getColorStyle(color) }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">Cantidad</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center hover:bg-gray-800 text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-lg text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(maxStock, quantity + 1))}
                  disabled={quantity >= maxStock}
                  className="w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center hover:bg-gray-800 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
                {maxStock < Infinity && (
                  <span className="text-xs text-gray-500">{maxStock} disponibles</span>
                )}
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={
                  (isClothing && !selectedSize) ||
                  (isSupplement && activeSabores.length > 0 && !selectedFlavor) ||
                  maxStock === 0
                }
                className="flex-1 bg-[#cee741] text-gray-900 py-4 rounded-xl font-semibold hover:bg-[#b5cc1a] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {maxStock === 0 ? "Sin stock" : "Agregar al carrito"}
              </button>
              <button className="w-14 h-14 border border-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Heart className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Productos relacionados</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
}
