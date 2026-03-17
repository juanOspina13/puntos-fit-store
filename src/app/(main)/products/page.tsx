"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Grid, List, SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import { getProducts, getCategories, searchProducts, getProductsByCategory } from "@/data/products";
import type { Product, Category } from "@/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
      setAllProducts(prods);
      setCategories(cats);
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Apply filters
  useEffect(() => {
    if (allProducts.length === 0) return;

    async function applyFilters() {
      let result = allProducts;

      // Apply search
      if (searchQuery) {
        result = await searchProducts(searchQuery);
      }

      // Apply category filter
      if (categoryParam && categoryParam !== "all") {
        result = result.filter((p: Product) => p.category === categoryParam);
        setSelectedCategory(categoryParam);
      } else if (selectedCategory && selectedCategory !== "all") {
        result = await getProductsByCategory(selectedCategory);
      }

      // Apply price filter
      result = result.filter(
        (p: Product) => p.puntosFit >= priceRange[0] && p.puntosFit <= priceRange[1]
      );

      // Apply sorting
      switch (sortBy) {
        case "price-low":
          result = [...result].sort((a, b) => a.puntosFit - b.puntosFit);
          break;
        case "price-high":
          result = [...result].sort((a, b) => b.puntosFit - a.puntosFit);
          break;
        case "rating":
          result = [...result].sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          result = [...result].sort(
            (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
          );
          break;
        default:
          result = [...result].sort(
            (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
          );
      }

      setFilteredProducts(result);
    }
    applyFilters();
  }, [allProducts, searchQuery, categoryParam, selectedCategory, sortBy, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const getCategoryTitle = () => {
    if (searchQuery) return `Resultados para "${searchQuery}"`;
    if (selectedCategory === "supplements") return "Suplementos";
    if (selectedCategory === "clothing") return "Ropa Deportiva";
    if (selectedCategory === "accessories") return "Accesorios";
    return "Todos los Productos";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-[#cee741] text-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {getCategoryTitle()}
          </h1>
          <p className="text-gray-800">
            {filteredProducts.length} productos encontrados para complementar tu plan
          </p>
          <p className="text-gray-800/80 mt-2 text-sm">
            ¿Buscas un plan completo por objetivo? Mira nuestros paquetes mensuales y ten resultados en 90 días.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 font-medium text-gray-300"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtros
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`
            ${isFilterOpen ? "fixed inset-0 z-50 bg-black/50" : "hidden"} lg:block lg:relative lg:bg-transparent
          `}
          >
            <div
              className={`
              ${isFilterOpen ? "fixed right-0 top-0 h-full w-80 bg-gray-900 shadow-xl overflow-y-auto" : ""}
              lg:relative lg:w-64 lg:flex-shrink-0
            `}
            >
              {/* Mobile Filter Header */}
              {isFilterOpen && (
                <div className="flex items-center justify-between p-4 border-b border-gray-800 lg:hidden">
                  <h3 className="font-semibold text-lg text-white">Filtros</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-400"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}

              <div className="p-4 lg:p-0 space-y-6">
                {/* Categories */}
                <div className="bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-700">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Categorías
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategoryChange("all")}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === "all"
                          ? "bg-[#cee741]/20 text-[#cee741] font-medium"
                          : "text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      Todos los productos
                    </button>
                    {categories.map((category: Category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.slug)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.slug
                            ? "bg-[#cee741]/20 text-[#cee741] font-medium"
                            : "text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-700">
                  <h3 className="font-semibold text-white mb-4">Puntos</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full accent-[#cee741]"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{priceRange[0]}</span>
                      <span className="text-gray-400">{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Apply Button (Mobile) */}
                {isFilterOpen && (
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full bg-[#cee741] text-gray-900 py-3 rounded-lg font-semibold lg:hidden"
                  >
                    Aplicar Filtros
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-sm border border-gray-700 flex items-center justify-between">
              <div className="hidden sm:flex items-center gap-2">
                <button className="p-2 rounded-lg bg-[#cee741]/20 text-[#cee741]">
                  <Grid className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-700">
                  <List className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">Ordenar por:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cee741]"
                >
                  <option value="featured">Destacados</option>
                  <option value="newest">Más nuevos</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor valorados</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-16 bg-gray-800 rounded-xl border border-gray-700">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-400">
                  Intenta ajustar los filtros o busca algo diferente
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-white">Cargando...</div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
