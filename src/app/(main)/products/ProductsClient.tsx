"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Grid, SlidersHorizontal, X, Zap } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import PuntosBalanceBanner from "@/components/layout/PuntosBalanceBanner";
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

  useEffect(() => {
    async function loadData() {
      const [prods, cats] = await Promise.all([
        getProducts(categoryParam ?? undefined),
        getCategories(),
      ]);
      setAllProducts(prods);
      setCategories(cats);
      setIsLoading(false);
    }
    loadData();
  }, [categoryParam]);

  useEffect(() => {
    if (allProducts.length === 0) return;
    async function applyFilters() {
      let result = allProducts;
      if (searchQuery) result = await searchProducts(searchQuery);
      if (categoryParam && categoryParam !== "all") {
        result = result.filter((p: Product) => p.category === categoryParam);
        setSelectedCategory(categoryParam);
      } else if (selectedCategory && selectedCategory !== "all") {
        result = await getProductsByCategory(selectedCategory);
      }
      result = result.filter(
        (p: Product) => p.puntosFit >= priceRange[0] && p.puntosFit <= priceRange[1]
      );
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
          result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        default:
          result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }
      setFilteredProducts(result);
    }
    applyFilters();
  }, [allProducts, searchQuery, categoryParam, selectedCategory, sortBy, priceRange]);

  const getCategoryTitle = () => {
    if (searchQuery) return `"${searchQuery}"`;
    if (selectedCategory === "supplements") return "Suplementos";
    if (selectedCategory === "clothing") return "Ropa y accesorios";
    if (selectedCategory === "accessories") return "Accesorios";
    return "Todos los productos";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b1119] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-[11px] tracking-cta uppercase text-gray-600">Cargando</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1119]">
      {/* Page header */}
      <div className="border-b border-white/5 bg-[#0d1520]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <p className="text-eyebrow mb-2">
            {searchQuery ? "Búsqueda" : "Catálogo"}
          </p>
          <h1 className="section-title text-3xl md:text-4xl text-white">
            {getCategoryTitle()}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <PuntosBalanceBanner size="lg" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Mobile filter button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 border border-white/10 px-4 py-3 text-[11px] tracking-cta uppercase text-gray-400 hover:text-white hover:border-white/20 transition-colors self-start"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filtros
          </button>

          {/* Sidebar */}
          <aside
            className={`${
              isFilterOpen ? "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" : "hidden"
            } lg:block lg:relative lg:bg-transparent`}
          >
            <div
              className={`${
                isFilterOpen
                  ? "fixed right-0 top-0 h-full w-72 bg-[#0d1520] border-l border-white/5 overflow-y-auto animate-slide-in-right"
                  : ""
              } lg:relative lg:w-56 lg:flex-shrink-0`}
            >
              {/* Mobile close */}
              {isFilterOpen && (
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                  <span className="text-[11px] tracking-cta uppercase text-white">Filtros</span>
                  <button onClick={() => setIsFilterOpen(false)} className="text-gray-600 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="p-6 lg:p-0 space-y-8">
                {/* Categories */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-3 h-3 text-gray-600" />
                    <span className="text-label text-gray-600">Categorías</span>
                  </div>
                  <div className="space-y-px">
                    {[{ id: "all", name: "Todos", slug: "all" }, ...categories].map((cat: any) => (
                      <button
                        key={cat.id}
                        onClick={() => { setSelectedCategory(cat.slug); if (isFilterOpen) setIsFilterOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 text-[12px] transition-all duration-200 ${
                          selectedCategory === cat.slug
                            ? "text-primary border-l-2 border-primary pl-4 bg-primary/5"
                            : "text-gray-500 hover:text-gray-300 border-l-2 border-transparent hover:border-white/10"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Points range */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-3 h-3 text-gray-600" />
                    <span className="text-label text-gray-600">Puntos máx.</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="flex items-center justify-between mt-2 text-[11px] text-gray-600">
                    <span>{priceRange[0]}</span>
                    <span className="text-primary font-medium">{priceRange[1]} pts</span>
                  </div>
                </div>

                {isFilterOpen && (
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full btn-primary-reveal py-3 text-[11px] tracking-cta uppercase font-medium border border-primary lg:hidden"
                  >
                    Aplicar
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <p className="text-[11px] text-gray-600">
                <span className="text-white font-medium">{filteredProducts.length}</span> productos
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-eyebrow uppercase text-gray-700">Ordenar</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border border-white/10 text-gray-400 text-[11px] px-3 py-2 focus:outline-none focus:border-primary/40 transition-colors appearance-none cursor-pointer"
                >
                  <option value="featured">Destacados</option>
                  <option value="newest">Más nuevos</option>
                  <option value="price-low">Puntos: menor primero</option>
                  <option value="price-high">Puntos: mayor primero</option>
                  <option value="rating">Mejor valorados</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="py-24 text-center border border-white/5">
                <p className="text-[11px] tracking-cta uppercase text-gray-700 mb-2">
                  Sin resultados
                </p>
                <p className="text-sm text-gray-600">
                  Intenta ajustar los filtros
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
        <div className="min-h-screen bg-[#0b1119] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
