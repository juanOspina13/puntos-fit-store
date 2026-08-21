"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Filter,
  SlidersHorizontal,
  X,
  Zap,
  MapPin,
  Instagram,
} from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import PuntosBalanceBanner from "@/components/layout/PuntosBalanceBanner";
import { getCompanyBySlug } from "@/services/companies";
import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";
import type { Company, Product, Category } from "@/types";

const COMPANY_SLUG = "pereira-running-culture";

export default function RunningCultureClient() {
  const [company, setCompany] = useState<Company | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPoints, setMaxPoints] = useState<number>(500);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [comp, prods, cats] = await Promise.all([
        getCompanyBySlug(COMPANY_SLUG),
        getProducts({ companyId: COMPANY_SLUG }),
        getCategories(),
      ]);
      setCompany(comp);
      setAllProducts(prods);
      setCategories(cats);
      setIsLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    let result = [...allProducts];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter((p) => p.puntosFit <= maxPoints);

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.puntosFit - b.puntosFit);
        break;
      case "price-high":
        result.sort((a, b) => b.puntosFit - a.puntosFit);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [allProducts, selectedCategory, sortBy, maxPoints]);

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

  const displayName = company?.nombre ?? "Pereira Running Culture";
  const displayImage =
    company?.imagen ??
    "https://images.unsplash.com/photo-1502224562085-639556652f33?w=1600";

  return (
    <div className="min-h-screen bg-[#0b1119]">
      {/* Back link */}
      <div className="border-b border-white/5 bg-[#0d1520]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <Link
            href="/pereira"
            className="inline-flex items-center gap-2 text-[11px] tracking-cta uppercase text-gray-500 hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a Pereira
          </Link>
        </div>
      </div>

      {/* Company hero */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <Image
            src={displayImage}
            alt={displayName}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1119] via-[#0b1119]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1119] via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-eyebrow uppercase text-gray-500">
                <MapPin className="w-3 h-3 text-primary" />
                Pereira, Risaralda
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-heading text-white uppercase mb-6">
              {displayName}
            </h1>

            {company && (
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                {company.descripcionLarga}
              </p>
            )}

            <div className="flex items-center gap-5 flex-wrap">
              <a
                href="https://instagram.com/pereirarunningculture"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] tracking-cta uppercase text-gray-500 hover:text-primary transition-colors duration-200"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Store section */}
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
                  ? "fixed right-0 top-0 h-full w-72 bg-[#0d1520] border-l border-white/5 overflow-y-auto"
                  : ""
              } lg:relative lg:w-56 lg:flex-shrink-0`}
            >
              {isFilterOpen && (
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                  <span className="text-[11px] tracking-cta uppercase text-white">Filtros</span>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-600 hover:text-white"
                  >
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
                    {[{ id: "all", name: "Todos", slug: "all" }, ...categories].map(
                      (cat: any) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.slug);
                            if (isFilterOpen) setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-[12px] transition-all duration-200 ${
                            selectedCategory === cat.slug
                              ? "text-primary border-l-2 border-primary pl-4 bg-primary/5"
                              : "text-gray-500 hover:text-gray-300 border-l-2 border-transparent hover:border-white/10"
                          }`}
                        >
                          {cat.name}
                        </button>
                      )
                    )}
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
                    value={maxPoints}
                    onChange={(e) => setMaxPoints(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex items-center justify-between mt-2 text-[11px] text-gray-600">
                    <span>0</span>
                    <span className="text-primary font-medium">{maxPoints} pts</span>
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

          {/* Main content */}
          <div className="flex-1">
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
                  Sin productos
                </p>
                <p className="text-sm text-gray-600">
                  {allProducts.length === 0
                    ? "Pronto disponibles los productos de esta tienda."
                    : "Intenta ajustar los filtros."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
