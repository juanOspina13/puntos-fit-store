"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const COLOR_MAP: Record<string, string> = {
  Negro: "#111",
  Blanco: "#f5f5f5",
  Azul: "#3B82F6",
  Rojo: "#EF4444",
  Gris: "#9CA3AF",
  Morado: "#8B5CF6",
  Verde: "#10B981",
  Rosa: "#EC4899",
  "Azul Marino": "#1E3A8A",
  Marrón: "#92400E",
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#161f2e] rounded-sm mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="text-eyebrow bg-primary text-gray-900 px-2 py-0.5">
              Nuevo
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] uppercase tracking-eyebrow font-medium bg-white/90 text-gray-900 px-2 py-0.5">
              -{discount}%
            </span>
          )}
        </div>

        {/* Slide-up Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-primary text-gray-900 py-3 text-[10px] tracking-cta uppercase font-medium hover:bg-primary-hover transition-colors duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-0.5">
        <p className="text-eyebrow mb-1">
          {product.subcategory || product.category}
        </p>
        <h3 className="text-[13px] text-white leading-snug tracking-wide2 mb-2 line-clamp-2 group-hover:text-primary/90 transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-white">
              {product.puntosFit}{" "}
              <span className="text-primary text-[11px] font-medium">pts</span>
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">{formatCurrency(product.price)}</p>
          </div>

          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 4).map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: COLOR_MAP[color] ?? "#888" }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-gray-600">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
