"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Zap, 
  Check, 
  Star, 
  Package,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { getSubscriptions, getObjetivos, getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import type { Subscription, Product } from "@/types";

const objetivoDescriptions: Record<string, string> = {
  "ganar-musculo": "Construye masa muscular y fuerza con un sistema claro de suplementacion en ciclos de 90 días.",
  "bajar-peso": "Acelera la quema de grasa sin perder rendimiento con combinaciones enfocadas en definicion.",
  "dormir-bien": "Mejora tu descanso y recuperacion nocturna para entrenar con mas energía durante el dia.",
  "energia": "Sostiene tu energía diaria con vitaminas y adaptogenos para rendir sin altibajos.",
  "salud-general": "Refuerza tu bienestar integral y reduce el estres con suplementos inteligentes."
};

const objetivoColors: Record<string, string> = {
  "ganar-musculo": "from-blue-600 to-purple-600",
  "bajar-peso": "from-orange-500 to-red-500",
  "dormir-bien": "from-indigo-500 to-purple-500",
  "energia": "from-yellow-500 to-orange-500",
  "salud-general": "from-green-500 to-teal-500"
};

const PESOS_POR_PUNTO = 1300;


export default function PaquetesPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [objetivos, setObjetivos] = useState<{ id: string; label: string; icon: string; count: number }[]>([]);
  const [selectedObjetivo, setSelectedObjetivo] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [productsMap, setProductsMap] = useState<Record<string, Product>>({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function loadData() {
      const [subs, objs] = await Promise.all([getSubscriptions(), getObjetivos()]);
      setSubscriptions(subs);
      setObjetivos(objs);
      
      // Load all products referenced in subscriptions
      const productIds = new Set<string>();
      subs.forEach(sub => sub.includedProducts.forEach(id => productIds.add(id)));
      
      const products: Record<string, Product> = {};
      await Promise.all(
        Array.from(productIds).map(async (id) => {
          const product = await getProductById(id);
          if (product) products[id] = product;
        })
      );
      setProductsMap(products);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const filteredSubscriptions = selectedObjetivo
    ? subscriptions.filter(s => s.objetivo === selectedObjetivo)
    : subscriptions;

  const groupedSubscriptions = objetivos.map(obj => ({
    ...obj,
    subscriptions: subscriptions.filter(s => s.objetivo === obj.id)
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cee741]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-950 py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-950"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#cee741]/10 border border-[#cee741]/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#cee741]" />
            <span className="text-[#cee741] text-sm font-medium">Paquetes por objetivo · Resultados en 90 días</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transforma tu cuerpo y tu energía <span className="text-[#cee741]">con resultados en 90 días</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Paquetes de suplementos por objetivo. Recibe exactamente lo que tu cuerpo necesita
            para ganar musculo, quemar grasa, dormir mejor o reducir el estres, sin adivinar que tomar.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#cee741]">12</div>
              <div className="text-gray-400 text-sm">Paquetes disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#cee741]">5</div>
              <div className="text-gray-400 text-sm">Objetivos </div>
            </div>
            {/*}
            <div className="text-center">
              <div className="text-3xl font-bold text-[#cee741]">15%</div>
              <div className="text-gray-400 text-sm">Ahorro promedio mensual</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#cee741]">7K+</div>
              <div className="text-gray-400 text-sm">Suscriptores activos</div>
            </div>
            */}
          </div>
        </div>
      </section>

      {/* Objetivos Filter */}
      <section className="sticky top-16 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setSelectedObjetivo(null)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                selectedObjetivo === null
                  ? "bg-[#cee741] text-gray-900"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Todos ({subscriptions.length})
            </button>
            {objetivos.map((obj) => (
              <button
                key={obj.id}
                onClick={() => setSelectedObjetivo(obj.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedObjetivo === obj.id
                    ? "bg-[#cee741] text-gray-900"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span>{obj.icon}</span>
                <span>{obj.label}</span>
                <span className="text-xs opacity-70">({obj.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Subscriptions Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {selectedObjetivo ? (
            // Filtered view - simple grid
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl">{objetivos.find(o => o.id === selectedObjetivo)?.icon}</span>
                  {objetivos.find(o => o.id === selectedObjetivo)?.label}
                </h2>
                <p className="text-gray-400 mt-2">{objetivoDescriptions[selectedObjetivo]}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubscriptions.map((sub) => (
                  <SubscriptionCard 
                    key={sub.id} 
                    subscription={sub} 
                    productsMap={productsMap}
                    isExpanded={expandedCard === sub.id}
                    onToggleExpand={() => setExpandedCard(expandedCard === sub.id ? null : sub.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Grouped view by objetivo
            <div className="space-y-16">
              {groupedSubscriptions.map((group) => (
                <div key={group.id}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${objetivoColors[group.id]} flex items-center justify-center text-2xl`}>
                      {group.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{group.label}</h2>
                      <p className="text-gray-400">{objetivoDescriptions[group.id]}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.subscriptions.map((sub) => (
                      <SubscriptionCard 
                        key={sub.id} 
                        subscription={sub} 
                        productsMap={productsMap}
                        isExpanded={expandedCard === sub.id}
                        onToggleExpand={() => setExpandedCard(expandedCard === sub.id ? null : sub.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Por que elegir paquetes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-[#cee741]/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Package className="w-6 h-6 text-[#cee741]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Envío Gratis</h3>
              <p className="text-gray-400 text-sm">Recibe tus suplementos sin costo de envio.</p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-[#cee741]/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-[#cee741]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Combinaciones ideales</h3>
              <p className="text-gray-400 text-sm">Productos seleccionados por expertos para maximizar tus resultados.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Subscription Card Component
function SubscriptionCard({ 
  subscription, 
  productsMap,
  isExpanded,
  onToggleExpand
}: { 
  subscription: Subscription; 
  productsMap: Record<string, Product>;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const includedProducts = subscription.includedProducts
    .map(id => productsMap[id])
    .filter(Boolean);

  const { addToCart } = useCart();
  const router = useRouter();

  const handleSolicitar = () => {
    includedProducts.forEach((product) => {
      addToCart(product, 1);
    });
    router.push("/checkout");
  };

  return (
    <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-[#cee741]/50 transition-all group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={subscription.image}
          alt={subscription.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        

        
        {/* Icon */}
        <div className="absolute top-4 right-4 text-2xl">
          {subscription.icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{subscription.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{subscription.description}</p>

        {/* Rating & Subscribers */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm font-medium">{subscription.rating}</span>
          </div>

        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-2xl font-bold text-[#cee741]">
            ${subscription.monthlyPrice.toLocaleString()}
          </span>
        </div>

        {/* Costo en Puntos Fit */}
        <div className="flex items-center gap-2 bg-[#cee741]/10 border border-[#cee741]/30 rounded-lg px-3 py-2 mb-4">
          <Zap className="w-4 h-4 text-[#cee741] fill-[#cee741]" />
          <span className="text-[#cee741] text-sm font-medium">
            {Math.ceil(subscription.monthlyPrice / PESOS_POR_PUNTO)} puntos Fit
          </span>
        </div>

        {/* Expandable Section */}
        <button 
          onClick={onToggleExpand}
          className="w-full flex items-center justify-between text-gray-400 hover:text-white transition-colors py-2"
        >
          <span className="text-sm">Ver productos incluidos</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {isExpanded && (
          <div className="mt-3 space-y-3 border-t border-gray-700 pt-4">
            {/* Included Products */}
            <div className="space-y-2">
              {includedProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3 bg-gray-900/50 rounded-lg p-2">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{product.name}</p>
                    <p className="text-gray-400 text-xs">${product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Beneficios</p>
              {subscription.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-[#cee741]" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Request Button */}
        <button 
          onClick={handleSolicitar}
          className="w-full mt-4 bg-[#cee741] hover:bg-[#ddf752] text-gray-900 font-bold py-3 px-6 rounded-xl transition-colors"
        >
          Solicitar paquete
        </button>
      </div>
    </div>
  );
}
