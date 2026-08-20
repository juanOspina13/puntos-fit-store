import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import {
  getFeaturedProducts,
  getCategories,
} from "@/data/products";
import Header from "@/components/layout/Header";
import { getServerUser } from "@/lib/server-auth";
import { featureFlags } from "@/config/featureFlags";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  let token: string | undefined;
  if (searchParams) {
    const params = await searchParams;
    const tkParam = params.tk;
    token = typeof tkParam === "string" ? tkParam : undefined;
  }

  const userData = await getServerUser(token);

  return (
    <div>
      <Header userData={userData} />
      <main>

        {/* ── Hero ── */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0b1119]">
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400"
              alt="Fitness"
              fill
              className="object-cover object-center opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1119] via-[#0b1119]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1119] via-transparent to-transparent" />
          </div>

          {/* Accent line */}
          <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 w-full">
            <div className="max-w-3xl">
              <p className="text-eyebrow mb-6 animate-fade-in">
                Sistema de puntos &mdash; Gym Connect
              </p>

              <h1 className="font-display text-[clamp(4rem,12vw,9rem)] leading-[0.92] tracking-heading text-white uppercase mb-8 animate-slide-up">
                Convierte
                <br />
                tu esfuerzo
                <br />
                en{" "}
                <span className="text-gradient-primary">resultados</span>
              </h1>

              <p className="text-gray-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
                Canjea tus Puntos Fit por suplementos de calidad que impulsen
                tu transformación. Sin complicaciones.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {featureFlags.packages && (
                  <Link
                    href="/paquetes"
                    className="btn-primary-reveal inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] tracking-cta uppercase font-medium border border-primary"
                  >
                    Ver paquetes
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] tracking-cta uppercase font-medium border border-white/15 text-gray-300 hover:border-white/30 hover:text-white transition-all duration-300"
                >
                  {featureFlags.packages ? "Suplementos individuales" : "Ver suplementos"}
                </Link>
              </div>

              {/* App badges */}
              <div className="mt-14 pt-8 border-t border-white/8">
                <p className="text-[11px] tracking-eyebrow uppercase text-gray-600 mb-4">
                  Parte del ecosistema{" "}
                  <span className="text-primary/80">Gym Connect</span>
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.juanospina.gymconnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                    </svg>
                    <span className="text-[11px] tracking-wide">Google Play</span>
                  </a>
                  <a
                    href="https://apps.apple.com/us/app/gym-connect/id1616589369"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span className="text-[11px] tracking-wide">App Store</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Marquee ticker ── */}
        <div className="border-y border-white/5 bg-[#0d1520] py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="text-[10px] tracking-eyebrow uppercase text-gray-600 px-8">
                Suplementos de calidad&nbsp;&nbsp;·&nbsp;&nbsp;Puntos Fit&nbsp;&nbsp;·&nbsp;&nbsp;Gym Connect&nbsp;&nbsp;·&nbsp;&nbsp;Resultados reales
              </span>
            ))}
          </div>
        </div>

        {/* ── Categories ── */}
        <section className="py-24 bg-[#0d1520]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-eyebrow mb-3">Catálogo</p>
                <h2 className="section-title text-3xl md:text-4xl text-white">
                  {featureFlags.packages ? "Complementa tu plan" : "Explora nuestros productos"}
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-white/5">
              {categories.map((category: any) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group relative h-80 overflow-hidden bg-[#0d1520]"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.04] transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 border border-white/0 group-hover:border-primary/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-eyebrow mb-2">{category.name}</p>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {category.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-cta uppercase text-white group-hover:text-primary transition-colors duration-300">
                      Explorar
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured products ── */}
        <section className="py-24 bg-[#0b1119]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-eyebrow mb-3">Selección</p>
                <h2 className="section-title text-3xl md:text-4xl text-white">
                  Productos destacados
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-cta uppercase text-gray-500 hover:text-primary transition-colors duration-200"
              >
                Ver todos
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <ProductGrid products={featuredProducts} />

            <div className="text-center mt-10 sm:hidden">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-[11px] tracking-cta uppercase text-gray-500 hover:text-primary transition-colors duration-200"
              >
                Ver todos los productos
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Packages CTA ── */}
        {featureFlags.packages && (
          <section className="py-24 bg-[#0d1520] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div>
                  <p className="text-eyebrow mb-3">Paquetes</p>
                  <h2 className="section-title text-3xl md:text-4xl text-white mb-4">
                    Paquetes mensuales
                    <br />
                    por objetivo
                  </h2>
                  <p className="text-gray-500 text-sm max-w-md leading-relaxed">
                    Elige tu meta y recibe los suplementos correctos cada mes.
                    Resultados en 90 días.
                  </p>
                </div>
                <Link
                  href="/paquetes"
                  className="btn-primary-reveal self-start md:self-auto inline-flex items-center gap-2 px-8 py-4 text-[11px] tracking-cta uppercase font-medium border border-primary"
                >
                  Ver paquetes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
