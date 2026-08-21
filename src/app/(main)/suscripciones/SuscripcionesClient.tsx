"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  Zap, 
  Check, 
  Star, 
  Users, 
  Package,
  ChevronDown,
  Sparkles,
  Calculator,
  Wallet
} from "lucide-react";
import { getSubscriptions, getObjetivos, getProductById } from "@/data/products";
import { formatCurrency } from "@/lib/format";
import type { Subscription, Product } from "@/types";
import { featureFlags } from "@/config/featureFlags";
import { Skeleton } from "@/components/ui/Skeleton";

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

// Conversión: 1 punto = 1200 pesos
const PESOS_POR_PUNTO = 1200;
const MONTOS_SUGERIDOS = [50000, 100000, 150000, 200000, 300000, 500000];

export default function SuscripcionesPage() {
  // Feature flag check
  if (!featureFlags.subscriptions) {
    notFound();
  }

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [objetivos, setObjetivos] = useState<{ id: string; label: string; icon: string; count: number }[]>([]);
  const [selectedObjetivo, setSelectedObjetivo] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [productsMap, setProductsMap] = useState<Record<string, Product>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para suscripción personalizada
  const [montoPersonalizado, setMontoPersonalizado] = useState<number>(100000);
  const [inputValue, setInputValue] = useState<string>("100,000");

  // Cálculo de puntos generados
  const puntosGenerados = useMemo(() => {
    return Math.floor(montoPersonalizado / PESOS_POR_PUNTO);
  }, [montoPersonalizado]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleMontoChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const numValue = parseInt(numericValue, 10) || 0;
    setMontoPersonalizado(numValue);
    setInputValue(formatCurrency(numValue));
  };

  const handleMontoSugerido = (monto: number) => {
    setMontoPersonalizado(monto);
    setInputValue(formatCurrency(monto));
  };

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
      <div className="min-h-screen bg-gray-950 px-6 lg:px-10 py-16 max-w-7xl mx-auto">
        <Skeleton className="h-3 w-24 mb-4" />
        <Skeleton className="h-10 w-80 mb-2" />
        <Skeleton className="h-4 w-96 mb-10" />
        <div className="flex gap-3 mb-10 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="h-48 rounded-none" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-8 w-full mt-2" />
            </div>
          ))}
        </div>
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
            <span className="text-[#cee741] text-sm font-medium">Suscripciones mensuales · Resultados en 90 días</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Convierte tu esfuerzo en <span className="text-[#cee741]">resultados</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Canjea tus puntos de Gym Connect por suplementos que impulsen tu transformación.
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Suscripciones mensuales de suplementos por objetivo. Recibe exactamente lo que tu cuerpo necesita
            para ganar musculo, quemar grasa, dormir mejor o reducir el estres, sin adivinar que tomar.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#cee741]">12</div>
              <div className="text-gray-400 text-sm">Suscripciones disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#cee741]">5</div>
              <div className="text-gray-400 text-sm">Objetivos fitness</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#cee741]">15%</div>
              <div className="text-gray-400 text-sm">Ahorro promedio mensual</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#cee741]">7K+</div>
              <div className="text-gray-400 text-sm">Suscriptores activos</div>
            </div>
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

      {/* Suscripción Personalizada - Puntos */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-[#cee741]/40 rounded-3xl p-8 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#cee741]/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#cee741]/5 rounded-full blur-[80px]"></div>
            
            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-[#cee741] to-[#a8c030] rounded-2xl flex items-center justify-center">
                  <Wallet className="w-7 h-7 text-gray-900" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Suscripción Personalizada</h2>
                  <p className="text-gray-400">Si prefieres flexibilidad total, elige cuanto invertir y acumula puntos cada mes</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    ¿Cuánto quieres invertir mensualmente?
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">$</span>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => handleMontoChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-gray-900 border-2 border-gray-700 rounded-xl text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[#cee741] focus:border-[#cee741] transition-all"
                      placeholder="100,000"
                    />
                  </div>

                  {/* Montos sugeridos */}
                  <div className="mt-4">
                    <span className="text-xs text-gray-500 mb-2 block">Montos sugeridos:</span>
                    <div className="flex flex-wrap gap-2">
                      {MONTOS_SUGERIDOS.map((monto) => (
                        <button
                          key={monto}
                          onClick={() => handleMontoSugerido(monto)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            montoPersonalizado === monto
                              ? "bg-[#cee741] text-gray-900"
                              : "bg-gray-700/50 text-gray-300 hover:bg-gray-600 border border-gray-600"
                          }`}
                        >
                          ${formatCurrency(monto)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nota de conversión */}
                  <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                    <Calculator className="w-4 h-4" />
                    <span>1 Punto Fit = ${formatCurrency(PESOS_POR_PUNTO)} COP</span>
                  </div>
                </div>

                {/* Resultado Section */}
                <div className="bg-gray-900/80 rounded-2xl p-6 border border-gray-700">
                  <div className="text-center mb-6">
                    <p className="text-gray-400 text-sm mb-3">Recibiras mensualmente</p>
                    <div className="flex items-center justify-center gap-3">
                      <Zap className="w-12 h-12 text-[#cee741] fill-[#cee741]" />
                      <span className="text-6xl font-bold text-[#cee741]">{puntosGenerados.toLocaleString()}</span>
                    </div>
                    <p className="text-xl text-white font-semibold mt-2">Puntos Fit</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-[#cee741] flex-shrink-0" />
                      <span>Cobro automatico mensual</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-[#cee741] flex-shrink-0" />
                      <span>Cancela cuando quieras</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-[#cee741] flex-shrink-0" />
                      <span>Usa tus puntos en cualquier producto</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-[#cee741] flex-shrink-0" />
                      <span>Sin productos fijos, libertad total</span>
                    </div>
                  </div>

                  <button 
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                      montoPersonalizado >= PESOS_POR_PUNTO
                        ? "bg-[#cee741] hover:bg-[#ddf752] text-gray-900"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={montoPersonalizado < PESOS_POR_PUNTO}
                  >
                    <Zap className="w-5 h-5" />
                    Activar suscripcion por ${formatCurrency(montoPersonalizado)}/mes
                  </button>
                  
                  {montoPersonalizado < PESOS_POR_PUNTO && (
                    <p className="text-xs text-red-400 text-center mt-3">
                      El monto minimo es ${formatCurrency(PESOS_POR_PUNTO)} para obtener al menos 1 punto
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Por que suscribirte?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-[#cee741]/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Package className="w-6 h-6 text-[#cee741]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Envío Gratis</h3>
              <p className="text-gray-400 text-sm">Recibe tus suplementos cada mes sin costo de envio.</p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-[#cee741]/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-[#cee741]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Puntos Fit x2</h3>
              <p className="text-gray-400 text-sm">Gana mas valor en cada entrega mensual y acelera tu progreso.</p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-[#cee741]/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-[#cee741]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Cancela cuando quieras</h3>
              <p className="text-gray-400 text-sm">Sin permanencia minima. Flexibilidad total para ajustar tu estrategia.</p>
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
        
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-[#cee741] text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
          -{subscription.discount}%
        </div>
        
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
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Users className="w-4 h-4" />
            <span>{subscription.subscribers.toLocaleString()} suscriptores</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-2xl font-bold text-[#cee741]">
            {formatCurrency(subscription.monthlyPrice)}
          </span>
          <span className="text-gray-500 line-through text-sm">
            {formatCurrency(subscription.originalPrice)}
          </span>
          <span className="text-gray-400 text-sm">/mes</span>
        </div>

        {/* Puntos Fit */}
        <div className="flex items-center gap-2 bg-[#cee741]/10 border border-[#cee741]/30 rounded-lg px-3 py-2 mb-4">
          <Zap className="w-4 h-4 text-[#cee741] fill-[#cee741]" />
          <span className="text-[#cee741] text-sm font-medium">
            Gana {subscription.puntosFit} puntos Fit /mes
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
                    <p className="text-gray-400 text-xs">{formatCurrency(product.price)}</p>
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

        {/* Subscribe Button */}
        <button className="w-full mt-4 bg-[#cee741] hover:bg-[#ddf752] text-gray-900 font-bold py-3 px-6 rounded-xl transition-colors">
          Iniciar plan
        </button>
      </div>
    </div>
  );
}
