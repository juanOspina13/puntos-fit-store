import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import {
  getFeaturedProducts,
  getCategories,
  getSubscriptions,
} from "@/data/products";
import AutoLoginHandler from "@/components/auth/AutoLoginHandler";
import Header from "@/components/layout/Header";
import { getServerUser } from "@/lib/server-auth";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [featuredProducts, categories, subscriptions] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getSubscriptions(),
  ]);

  let token: string | undefined;

  // Extract token from searchParams if provided
  if (searchParams) {
    const params = await searchParams;
    const tkParam = params.tk;
    token = typeof tkParam === "string" ? tkParam : undefined;
  }

  // Get authenticated user from server (cached across request)
  const userData = await getServerUser(token);
  console.log(userData);

  const packsTop = subscriptions.slice(0, 6);
  const totalSubscribers = subscriptions.reduce(
    (acc, sub) => acc + sub.subscribers,
    0,
  );
  const maxDiscount = subscriptions.reduce(
    (acc, sub) => Math.max(acc, sub.discount),
    0,
  );

  return (
    <div>
      <Header userData={userData} />
      <main className="flex-1">
        <div>
          <AutoLoginHandler />

          <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                  <span className="inline-block bg-[#cee741]/20 text-[#cee741] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                    Sistema de suplementos inteligentes
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                    Transforma tu cuerpo
                    <br />
                    y tu energia con
                    <br />
                    <span className="text-[#cee741]">
                      resultados en 90 días
                    </span>
                  </h1>
                  <p className="text-lg text-gray-300 mb-8 max-w-lg">
                    Paquetes mensuales de suplementos por objetivo. Recibe
                    exactamente lo que tu cuerpo necesita para ganar musculo,
                    quemar grasa, dormir mejor y reducir el estres, sin adivinar
                    que tomar.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link
                      href="/paquetes"
                      className="inline-flex items-center justify-center bg-[#cee741] text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-[#b5cc1a] transition-all shadow-lg shadow-[#cee741]/30 hover:shadow-[#cee741]/50"
                    >
                      Ver paquetes
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                    >
                      Suplementos individuales
                    </Link>
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-700/50">
                    <p className="text-gray-400 text-sm mb-3 text-center md:text-left">
                      Puntos Fit Store hace parte del ecosistema{" "}
                      <span className="font-semibold text-[#cee741]">
                        Gym Connect
                      </span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.juanospina.gymconnect"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg transition-colors border border-gray-700"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                        </svg>
                        <span className="text-sm font-medium">Google Play</span>
                      </a>
                      <a
                        href="https://apps.apple.com/us/app/gym-connect/id1616589369"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg transition-colors border border-gray-700"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        <span className="text-sm font-medium">App Store</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative hidden md:block">
                  <div className="relative z-10">
                    <Image
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600"
                      alt="Transformacion fitness"
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center">
                        <span className="text-2xl">💪</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">
                          Clientes activos
                        </p>
                        <p className="text-xl font-bold text-white">
                          {totalSubscribers.toLocaleString()}+
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-6 -right-6 bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-yellow-900/50 rounded-full flex items-center justify-center">
                        <span className="text-2xl">⭐</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Ahorro en packs</p>
                        <p className="text-xl font-bold text-white">
                          Hasta {maxDiscount}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Paquetes mensuales por objetivo
                  </h2>
                  <p className="text-gray-400">
                    Elige tu meta y recibe los suplementos correctos cada mes.
                    Resultados en 90 días.
                  </p>
                </div>
                <Link
                  href="/paquetes"
                  className="hidden sm:inline-flex items-center text-[#cee741] font-medium hover:text-[#b5cc1a]"
                >
                  Ver todos los paquetes
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packsTop.map((pack) => (
                  <Link
                    key={pack.id}
                    href="/paquetes"
                    className="group rounded-2xl border border-gray-700 bg-gray-800/60 overflow-hidden hover:border-[#cee741]/60 transition-all"
                  >
                    <div className="relative h-44">
                      <Image
                        src={pack.image}
                        alt={pack.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span className="absolute top-3 left-3 bg-[#cee741] text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full">
                        -{pack.discount}%
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-[#cee741] mb-2">
                        {pack.objetivoLabel}
                      </p>
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {pack.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {pack.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#cee741] font-bold">
                          ${pack.monthlyPrice.toLocaleString("es-CO")}/mes
                        </span>
                        <span className="text-gray-400 text-sm">
                          {pack.puntosFit} pts/mes
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8 sm:hidden">
                <Link
                  href="/paquetes"
                  className="inline-flex items-center text-[#cee741] font-medium"
                >
                  Ver todos los paquetes
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Complementa tu plan
                </h2>
                <p className="text-gray-400">
                  Tambien puedes comprar productos individuales segun tus
                  necesidades
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {categories.map((category: any) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className="group relative h-72 rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        {category.description}
                      </p>
                      <span className="inline-flex items-center text-white font-medium group-hover:gap-3 gap-2 transition-all">
                        Ver categoria
                        <ChevronRight className="w-5 h-5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Productos individuales destacados
                  </h2>
                  <p className="text-gray-400">
                    Para ajustar tu plan con suplementos puntuales
                  </p>
                </div>
                <Link
                  href="/products"
                  className="hidden sm:inline-flex items-center text-[#cee741] font-medium hover:text-[#b5cc1a]"
                >
                  Ver todos
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
              <ProductGrid products={featuredProducts} />
              <div className="text-center mt-8 sm:hidden">
                <Link
                  href="/products"
                  className="inline-flex items-center text-[#cee741] font-medium"
                >
                  Ver todos los productos
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
