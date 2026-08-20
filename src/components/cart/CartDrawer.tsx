"use client";

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalPriceCash,
    partialPriceCash,
    paymentMethod,
    setPaymentMethod,
    clearCart,
    setTokensToUse,
  } = useCart();

  const [fitPointsToUse, setFitPointsToUse] = useState(totalPrice);
  const [cashToUse, setCashToUse] = useState(totalPriceCash);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isCartOpen) setVisible(true);
  }, [isCartOpen]);

  useEffect(() => {
    if (paymentMethod === "mixto") {
      setFitPointsToUse(Math.min(fitPointsToUse, totalPrice));
    } else if (paymentMethod === "puntos") {
      setFitPointsToUse(totalPrice);
    } else {
      setCashToUse(totalPriceCash);
      setFitPointsToUse(0);
    }
  }, [totalPrice, paymentMethod, fitPointsToUse, totalPriceCash]);

  if (!visible && !isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-400 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-[420px] bg-[#0d1520] border-l border-white/5 shadow-2xl z-50 flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onTransitionEnd={() => { if (!isCartOpen) setVisible(false); }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="text-[11px] tracking-cta uppercase text-white font-medium">
              Carrito
            </span>
            <span className="text-[10px] tracking-wide text-gray-600">
              ({items.length} {items.length === 1 ? "ítem" : "ítems"})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-600 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag className="w-12 h-12 text-gray-800" />
              <div>
                <p className="text-[11px] tracking-cta uppercase text-gray-600 mb-1">
                  Tu carrito está vacío
                </p>
                <p className="text-xs text-gray-700">Agrega productos para comenzar</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 btn-primary-reveal px-6 py-3 text-[10px] tracking-cta uppercase font-medium border border-primary"
              >
                Explorar productos
              </button>
            </div>
          ) : (
            <div className="space-y-0 divide-y divide-white/5">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 py-4"
                >
                  <div className="relative w-16 h-20 flex-shrink-0 bg-[#161f2e] overflow-hidden rounded-sm">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[12px] text-white leading-snug mb-0.5 line-clamp-2">
                      {item.product.name}
                    </h4>
                    {(item.selectedSize || item.selectedColor) && (
                      <p className="text-[10px] text-gray-600 mb-1">
                        {item.selectedSize && `Talla: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && " · "}
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                      </p>
                    )}
                    <p className="text-[11px] text-primary font-medium">
                      {item.product.puntosFit} pts{" "}
                      <span className="text-gray-600">·</span>{" "}
                      {formatCurrency(item.product.price)}
                    </p>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-white/10 text-gray-400 hover:border-primary/40 hover:text-white transition-colors"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-[12px] text-white w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-white/10 text-gray-400 hover:border-primary/40 hover:text-white transition-colors"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-700 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/5 px-6 py-5 space-y-5">
            {/* Payment method */}
            <div>
              <p className="text-label text-gray-600 mb-3">Método de pago</p>
              <div className="flex gap-1.5">
                {(["puntos", "dinero", "mixto"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`flex-1 py-2 text-[10px] tracking-cta uppercase transition-all duration-200 border ${
                      paymentMethod === method
                        ? "bg-primary text-gray-900 border-primary"
                        : "bg-transparent text-gray-500 border-white/10 hover:border-white/20 hover:text-gray-300"
                    }`}
                  >
                    {method === "puntos" ? "Puntos" : method === "dinero" ? "Dinero" : "Mixto"}
                  </button>
                ))}
              </div>

              {paymentMethod === "mixto" && (
                <div className="mt-3">
                  <label className="text-[10px] tracking-eyebrow uppercase text-gray-600 block mb-1.5">
                    ¿Cuántos puntos usar?
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={totalPrice}
                    className="w-full px-3 py-2 bg-[#161f2e] border border-white/8 text-white text-sm focus:border-primary/40 focus:outline-none transition-colors"
                    value={fitPointsToUse}
                    onChange={(e) => {
                      const val = Math.max(0, Math.min(Number(e.target.value), totalPrice));
                      setFitPointsToUse(val);
                      setTokensToUse(val);
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 mt-1.5">
                    <span>{fitPointsToUse} pts</span>
                    <span>{formatCurrency(partialPriceCash)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-3 border-y border-white/5">
              <span className="text-label text-gray-600">Subtotal</span>
              <div className="text-right">
                {paymentMethod === "puntos" && (
                  <p className="text-sm font-semibold text-white">{totalPrice ?? 0} pts</p>
                )}
                {paymentMethod === "dinero" && (
                  <p className="text-sm font-semibold text-white">{formatCurrency(cashToUse)}</p>
                )}
                {paymentMethod === "mixto" && (
                  <p className="text-sm font-semibold text-white">
                    {fitPointsToUse} pts + {formatCurrency(partialPriceCash)}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="btn-primary-reveal block w-full text-center py-4 text-[11px] tracking-cta uppercase font-medium border border-primary"
              >
                Proceder al pedido
              </Link>
              <div className="flex items-center justify-between">
                <button
                  onClick={clearCart}
                  className="text-[10px] tracking-wide text-gray-700 hover:text-red-500 transition-colors uppercase"
                >
                  Vaciar carrito
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[10px] tracking-wide text-gray-600 hover:text-white transition-colors uppercase"
                >
                  Seguir añadiendo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
