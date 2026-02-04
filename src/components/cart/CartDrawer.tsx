"use client";

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
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

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-[#cee741]" />
            <h2 className="text-lg font-semibold text-white">Tu Carrito</h2>
            <span className="bg-[#cee741]/20 text-[#cee741] text-sm px-2 py-0.5 rounded-full">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-700 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500 mb-6">
                ¡Agrega algunos productos increíbles!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#cee741] text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-[#b5cc1a] transition-colors"
              >
                Explorar Productos
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 bg-gray-800 p-3 rounded-lg"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">
                      {item.product.name}
                    </h4>
                    {(item.selectedSize || item.selectedColor) && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.selectedSize && `Talla: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && " | "}
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                      </p>
                    )}
                    <p className="text-[#cee741] font-semibold mt-1">
                      {item.product.puntosFit} Puntos Fit /{" "}
                      {item.product.price.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
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
          <div className="border-t border-gray-800 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Vaciar carrito
              </button>
              <div className="text-right">
                <p className="text-sm text-gray-500">Subtotal</p>
                {paymentMethod === "puntos" && (
                  <p className="text-xl font-bold text-white">
                    {totalPrice} Puntos Fit
                  </p>
                )}
                {paymentMethod === "dinero" && (
                  <p className="text-xl font-bold text-white">
                    {cashToUse.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white font-medium mb-1">
                ¿Cómo quieres pagar?
              </label>
              <div className="flex gap-2">
                <button
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${paymentMethod === "puntos" ? "bg-[#cee741] text-gray-900" : "bg-gray-800 text-gray-200 border border-gray-700"}`}
                  onClick={() => setPaymentMethod("puntos")}
                >
                  Todo con Puntos Fit
                </button>
                <button
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${paymentMethod === "dinero" ? "bg-[#cee741] text-gray-900" : "bg-gray-800 text-gray-200 border border-gray-700"}`}
                  onClick={() => setPaymentMethod("dinero")}
                >
                  Todo con Dinero
                </button>
                <button
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${paymentMethod === "mixto" ? "bg-[#cee741] text-gray-900" : "bg-gray-800 text-gray-200 border border-gray-700"}`}
                  onClick={() => setPaymentMethod("mixto")}
                >
                  Mixto
                </button>
              </div>
              {paymentMethod === "mixto" && (
                <div className="mt-2">
                  <label className="text-xs text-gray-400">
                    ¿Cuántos Puntos Fit quieres usar?
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={totalPrice}
                    className="w-full mt-1 px-2 py-1 rounded bg-gray-800 text-white border border-gray-700"
                    value={fitPointsToUse}
                    onChange={(e) => {
                      setFitPointsToUse(
                        Math.max(
                          0,
                          Math.min(Number(e.target.value), totalPrice),
                        ),
                      );
                      setTokensToUse(Number(e.target.value));
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Puntos Fit: {fitPointsToUse}</span>
                    <span>
                      Dinero:
                      {partialPriceCash.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full bg-[#cee741] text-gray-900 text-center py-3 rounded-lg font-semibold hover:bg-[#b5cc1a] transition-all"
            >
              Proceder al Pedido
            </Link>
            <button
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center text-gray-400 hover:text-white transition-colors"
            >
              Continuar añadiendo
            </button>
          </div>
        )}
      </div>
    </>
  );
}
