"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Instagram, Heart } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import { getProductById } from "@/data/products";
import { LOCAL_COMPANIES } from "./companies";
import type { Product } from "@/types";

export default function PereiraClient() {
  const [productsByCompany, setProductsByCompany] = useState<Record<string, Product[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const entries = await Promise.all(
        LOCAL_COMPANIES.map(async (company) => {
          const products = (
            await Promise.all(company.productIds.map((id) => getProductById(id)))
          ).filter((p): p is Product => Boolean(p));
          return [company.id, products] as const;
        })
      );
      setProductsByCompany(Object.fromEntries(entries));
      setIsLoading(false);
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#0b1119]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="bg-[#0b1119]">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#0b1119] border-b border-white/5">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1489516408517-0c0a15662682?w=1600"
            alt="Pereira"
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1119] via-[#0b1119]/85 to-[#0b1119]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-eyebrow mb-6 inline-flex items-center gap-2 justify-center text-primary">
            <Heart className="w-3.5 h-3.5 fill-primary" />
            Comercio local
          </p>
          <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-heading text-white uppercase mb-6">
            Pereira,
            <br />
            con el <span className="text-gradient-primary">corazón</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Un espacio para las marcas y emprendimientos que hacen ciudad.Pide en línea, apoya lo nuestro y haz crecer a las marcas de Pereira. ❤️
          </p>
        </div>
      </section>

      {/* Companies */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {LOCAL_COMPANIES.map((company) => {
          const products = productsByCompany[company.id] ?? [];
          return (
            <section key={company.id} className="py-20 border-b border-white/5 last:border-b-0">
              <div className="grid md:grid-cols-[1fr,1.4fr] gap-10 items-center mb-12">
                <div className="relative h-64 md:h-80 overflow-hidden rounded-sm">
                  <Image
                    src={company.image}
                    alt={company.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div>
                  <p className="text-eyebrow mb-3">{company.tagline}</p>
                  <h2 className="section-title text-3xl md:text-4xl text-white mb-4">
                    {company.name}
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
                    {company.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-5">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-cta uppercase text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {company.location}
                    </span>
                    {company.instagram && (
                      <a
                        href={company.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[11px] tracking-cta uppercase text-gray-500 hover:text-primary transition-colors duration-200"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {products.length > 0 ? (
                <ProductGrid products={products} />
              ) : (
                <p className="text-gray-500 text-sm">
                  Pronto disponible: los productos de {company.name}.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
