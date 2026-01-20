import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[#cee741]/10 transition-all duration-300 overflow-hidden border border-gray-700">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-900">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Nuevo
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-3 right-3 w-9 h-9 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
          >
            <Heart className="w-4 h-4 text-gray-300" />
          </button>

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-[#cee741] text-gray-900 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 hover:bg-[#b5cc1a]"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-[#cee741] font-medium uppercase tracking-wide mb-1">
            {product.subcategory || product.category}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-white group-hover:text-[#cee741] transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating


          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
                
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
           */}
          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg font-bold text-white">
              {product.puntosFit} Puntos Fit / {product.price .toLocaleString("es-CO", { style: "currency", currency: "COP" })}
            </span>
          </div>

          {/* Colors/Sizes Preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 mt-3">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-600"
                  style={{
                    backgroundColor:
                      color === "Negro"
                        ? "#000"
                        : color === "Blanco"
                        ? "#fff"
                        : color === "Azul"
                        ? "#3B82F6"
                        : color === "Rojo"
                        ? "#EF4444"
                        : color === "Gris"
                        ? "#9CA3AF"
                        : color === "Morado"
                        ? "#8B5CF6"
                        : color === "Verde"
                        ? "#10B981"
                        : color === "Rosa"
                        ? "#EC4899"
                        : color === "Azul Marino"
                        ? "#1E3A8A"
                        : color === "Marrón"
                        ? "#92400E"
                        : "#ccc",
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
