import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import { getFeaturedProducts, getCategories } from "@/data/products";
import { Suspense } from "react";
import AutoLoginHandler from "@/components/auth/AutoLoginHandler";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Auto-login si llega ?userToken=xxx */}
      <Suspense fallback={null}>
        <AutoLoginHandler />
      </Suspense>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <span className="inline-block bg-[#cee741]/20 text-[#cee741] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                🎉 Nuevos productos disponibles
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Usa tus
                <span className="text-[#cee741]"> Puntos Fit</span>
                <br />
                para transformar tu
                <span className="text-[#cee741]"> vida</span>
                <br />y superar tus
                <span className="text-[#cee741]"> límites</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Canjea tus puntos por suplementos de alta calidad y ropa
                deportiva. Tu esfuerzo tiene recompensa, cada entrenamiento
                cuenta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center bg-[#cee741] text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-[#b5cc1a] transition-all shadow-lg shadow-[#cee741]/30 hover:shadow-[#cee741]/50"
                >
                  Explorar Productos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/products?category=supplements"
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                >
                  Ver Suplementos
                </Link>
              </div>
              
              {/* Gym Connect App Banner */}
              <div className="mt-10 pt-8 border-t border-gray-700/50">
                <p className="text-gray-400 text-sm mb-3 text-center md:text-left">
                  La tienda de puntos fit hace parte del ecosistema <span className="font-semibold text-[#cee741]">Gym Connect</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.juanospina.gymconnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg transition-colors border border-gray-700"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                    </svg>
                    <span className="text-sm font-medium">Google Play</span>
                  </a>
                  <a
                    href="https://apps.apple.com/us/app/gym-connect/id1616589369"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg transition-colors border border-gray-700"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
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
                  alt="Fitness"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💪</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Clientes activos</p>
                    <p className="text-xl font-bold text-white">10,000+</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-900/50 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Valoración</p>
                    <p className="text-xl font-bold text-white">4.9/5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              Explora por Categoría
            </h2>
            <p className="text-gray-400">
              Encuentra exactamente lo que necesitas
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
                    Ver productos
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Productos Destacados
              </h2>
              <p className="text-gray-400">
                Los más vendidos de nuestra tienda
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

      {/* Banner Section 
      <section className="py-16 bg-[#cee741]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-gray-900">
              <span className="inline-block bg-gray-900/20 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                ⚡ Oferta Especial
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Obtén 10% de descuento en toda la ropa deportiva
              </h2>
              <p className="text-gray-800 mb-6">
                Usa el código{" "}
                <span className="font-bold text-gray-900">FITSTORE_GYMCO</span>{" "}
                al finalizar tu compra. Oferta válida hasta agotar existencias.
              </p>
              <Link
                href="/products?category=clothing"
                className="inline-flex items-center bg-gray-900 text-[#cee741] px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Comprar Ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500"
                alt="Ropa deportiva"
                width={500}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
*/}
      {/* Testimonials 
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-gray-400">
              Miles de atletas confían en nosotros
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos M.",
                role: "Atleta CrossFit",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                text: "La mejor proteína que he probado. Excelente sabor y resultados visibles en pocas semanas.",
                rating: 5,
              },
              {
                name: "María L.",
                role: "Instructora de Fitness",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
                text: "La ropa deportiva es de altísima calidad. Perfecta para entrenamientos intensos.",
                rating: 5,
              },
              {
                name: "Jorge R.",
                role: "Powerlifter",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
                text: "El cinturón de levantamiento es increíble. Gran soporte y muy duradero.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-700"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
*/}
      {/* CTA Section 
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para alcanzar tus metas fitness?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Únete a miles de atletas que ya confían en PuntosFit para sus
            entrenamientos. Calidad premium, precios accesibles.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center bg-[#cee741] text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-[#b5cc1a] transition-all"
          >
            Explorar Tienda
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
      */}
    </div>
  );
}
