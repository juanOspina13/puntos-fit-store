import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import ProductGrid from "../components/product/ProductGrid";
import { getFeaturedProducts, categories } from "../data/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  return (
    <div>
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
                <span className="text-[#cee741]"> cuerpo</span>
                <br />y superar tus
                <span className="text-[#cee741]"> límites</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Canjea tus puntos por suplementos de alta calidad y ropa
                deportiva premium. Tu esfuerzo tiene recompensa, cada
                entrenamiento cuenta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center bg-[#cee741] text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-[#b5cc1a] transition-all shadow-lg shadow-[#cee741]/30 hover:shadow-[#cee741]/50"
                >
                  Explorar Productos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/products?category=supplements"
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                >
                  Ver Suplementos
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600"
                  alt="Fitness"
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

      {/* Features Bar 
      <section className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#cee741]/20 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-[#cee741]" />
              </div>
              <div>
                <p className="font-semibold text-white">Envío Gratis</p>
                <p className="text-sm text-gray-400">En pedidos +$50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-900/50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Pago Seguro</p>
                <p className="text-sm text-gray-400">100% protegido</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-900/50 rounded-xl flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Devoluciones</p>
                <p className="text-sm text-gray-400">30 días garantía</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-900/50 rounded-xl flex items-center justify-center">
                <Headphones className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Soporte 24/7</p>
                <p className="text-sm text-gray-400">Ayuda siempre</p>
              </div>
            </div>
          </div>
        </div>
      </section>
*/}
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
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="group relative h-72 rounded-2xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
              to="/products"
              className="hidden sm:inline-flex items-center text-[#cee741] font-medium hover:text-[#b5cc1a]"
            >
              Ver todos
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center text-[#cee741] font-medium"
            >
              Ver todos los productos
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Section */}
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
                to="/products?category=clothing"
                className="inline-flex items-center bg-gray-900 text-[#cee741] px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Comprar Ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500"
                alt="Ropa deportiva"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals 
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Nuevos Productos</h2>
              <p className="text-gray-400">Las últimas novedades en nuestra tienda</p>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center text-[#cee741] font-medium hover:text-[#b5cc1a]"
            >
              Ver todos
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <ProductGrid products={newProducts} />
        </div>
      </section>

      {/* Testimonials */}
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
                <p className="text-gray-300 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
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

      {/* CTA Section */}
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
            to="/products"
            className="inline-flex items-center bg-[#cee741] text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-[#b5cc1a] transition-all"
          >
            Explorar Tienda
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
