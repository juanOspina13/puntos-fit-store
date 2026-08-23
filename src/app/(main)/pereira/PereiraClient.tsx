"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Heart, Store } from "lucide-react";
import { getCompanies } from "@/services/companies";
import { Skeleton } from "@/components/ui/Skeleton";
import DonateButton from "@/components/company/DonateButton";
import type { Company } from "@/types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1502224562085-639556652f33?w=1200";

export default function PereiraClient() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCompanies().then((data) => {
      setCompanies(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#0b1119]">
        {/* Hero skeleton */}
        <div className="relative py-24 md:py-32 border-b border-white/5 flex flex-col items-center gap-4 px-6">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-12 w-72 md:w-96" />
          <Skeleton className="h-12 w-56 md:w-80" />
          <Skeleton className="h-4 w-80 md:w-[480px] mt-2" />
          <Skeleton className="h-4 w-64 md:w-96" />
        </div>
        {/* Cards skeleton */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <Skeleton className="h-3 w-20 mb-3" />
          <Skeleton className="h-8 w-48 mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[#0d1520] flex flex-col">
                <Skeleton className="h-56 rounded-none" />
                <div className="p-6 flex flex-col gap-3">
                  <Skeleton className="h-2 w-24" />
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-3/5 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b1119]">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/5">
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
            Descubre las marcas y emprendimientos que hacen ciudad. Pide en
            línea, apoya lo nuestro y haz crecer las marcas de Pereira.
          </p>
        </div>
      </section>

      {/* Companies grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-eyebrow mb-3">Directorio</p>
              <h2 className="section-title text-3xl md:text-4xl text-white">
                Marcas locales
              </h2>
            </div>
            <span className="text-[11px] text-gray-600">
              {companies.length} {companies.length === 1 ? "empresa" : "empresas"}
            </span>
          </div>

          {companies.length === 0 ? (
            <div className="py-24 text-center border border-white/5">
              <Store className="w-8 h-8 text-gray-700 mx-auto mb-4" />
              <p className="text-[11px] tracking-cta uppercase text-gray-700 mb-2">
                Próximamente
              </p>
              <p className="text-sm text-gray-600">
                Las marcas locales de Pereira estarán disponibles pronto.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {companies.map((company) => (
                <Link
                  key={company.id}
                  href={`/${company.slug}`}
                  className="group relative flex flex-col bg-[#0d1520] hover:bg-[#111c2b] transition-colors duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={company.imagen || FALLBACK_IMAGE}
                      alt={company.nombre}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1520] via-[#0d1520]/30 to-transparent" />
                    <div className="absolute inset-0 border border-white/0 group-hover:border-primary/20 transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                      <span className="text-[10px] tracking-eyebrow uppercase text-gray-500">
                        Pereira, Risaralda
                      </span>
                    </div>

                    <h3 className="section-title text-xl text-white mb-3 group-hover:text-primary transition-colors duration-300">
                      {company.nombre}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                      {company.descripcion}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-[11px] tracking-cta uppercase text-gray-500 group-hover:text-primary transition-colors duration-300">
                        Ver tienda
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <DonateButton company={company} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
