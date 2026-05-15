"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, ChevronRight, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";
import HeaderClient from "@/components/layout/HeaderClient";
import PuntosBalanceBanner from "@/components/layout/PuntosBalanceBanner";

export default function CheckoutPage() {
  const {
    items,
    totalPrice,
    clearCart,
    totalPriceCash,
    paymentMethod,
    setPaymentMethod,
    tokensToUse,
    setTokensToUse,
    partialPriceCash,
  } = useCart();
  const [step, setStep] = useState(1);

  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
  });

  const [splitAmount, setSplitAmount] = useState({
    puntos: tokensToUse,
    dinero: partialPriceCash,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const shipping = totalPrice >= 50 ? 0 : 9.99;
  const tax = totalPrice * 0;
  const total = totalPrice + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      setOrderComplete(true);
      const encodedFormData = {
        nombre: encodeURIComponent(formData.nombre),
        apellido: encodeURIComponent(formData.apellido),
        email: encodeURIComponent(formData.email),
        telefono: encodeURIComponent(formData.telefono),
        direccion: encodeURIComponent(formData.direccion),
        ciudad: encodeURIComponent(formData.ciudad),
        codigoPostal: encodeURIComponent(formData.codigoPostal),
      };
      const orderDetails = `*Datos del cliente:*%0ANombre: ${encodedFormData.nombre} ${
        encodedFormData.apellido
      }%0ATeléfono: ${encodedFormData.telefono}%0A%0A*Dirección de envío:*%0A${
        encodedFormData.direccion
      }, ${encodedFormData.ciudad}, ${
        encodedFormData.codigoPostal
      }%0A%0A*Productos:*%0A${items
        .map(
          (item) =>
            `• ${item.product.name} x${item.quantity} - ${formatCurrency(
              item.product.price * item.quantity
            )} `
        )
        .join("%0A")}`;

      let pagoDetalle = "";
      if (paymentMethod === "puntos") {
        pagoDetalle = `*Pago:*%0A100% en Puntos Fit (${total} Puntos Fit)`;
      } else if (paymentMethod === "dinero") {
        pagoDetalle = `*Pago:*%0A100% en Dinero (${formatCurrency(totalPriceCash)})`;
      } else {
        pagoDetalle = `*Pago:*%0A${splitAmount.puntos} Puntos Fit y ${formatCurrency(splitAmount.dinero)} en Dinero`;
      }

      let message = `¡Hola! Acaban de realizar un pedido en PuntosFit Store:%0A%0A${orderDetails}%0A%0A${pagoDetalle}%0A%0APagará: ${tokensToUse} Puntos Fit y ${formatCurrency(splitAmount.dinero)} en Dinero.%0A%0A¡Gracias!`;

      if (paymentMethod === "puntos") {
        message = `¡Hola! Acaban de realizar un pedido en PuntosFit Store:%0A%0A${orderDetails}%0A%0A${pagoDetalle}%0A%0A¡Gracias!`;
      } else if (paymentMethod === "dinero") {
        message = `¡Hola! Acaban de realizar un pedido en PuntosFit Store:%0A%0A${orderDetails}%0A%0A${pagoDetalle}%0A%0A¡Gracias!`;
      }

      window.open(`https://wa.me/573169847703?text=${message}`, "_blank");
      clearCart();
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-700">
          <div className="w-20 h-20 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            ¡Pedido Completado!
          </h1>
          <p className="text-gray-400 mb-6">
            Gracias por tu pedido. Pronto recibirás un mensaje de WhatsApp con
            todos los detalles para confirmar tu compra.
          </p>
          <Link
            href="/"
            className="block w-full bg-[#cee741] text-gray-900 py-3 rounded-xl font-semibold hover:bg-[#b5cc1a] transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Tu carrito está vacío
          </h2>
          <Link href="/products" className="text-[#cee741] hover:underline">
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Global header so the user always sees their Puntos Fit balance */}
      <HeaderClient />

      {/* Secondary checkout strip with the secure-payment hint */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#cee741] rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xl">PF</span>
              </div>
              <span className="text-xl font-bold text-white">PuntosFit</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Lock className="w-4 h-4" />
              Pago seguro
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Big, prominent Puntos Fit balance — the user is about to pay,
            so this is one of the most relevant places to show it. */}
        <PuntosBalanceBanner
          size="lg"
          subtitle="puntos disponibles para tu pago"
          className="mb-8"
        />

        {/* Steps */}
        <div className="flex items-center justify-center mb-12">
          {["Información", "Envío", "Pago"].map((label, index) => (
            <div key={label} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
                  step > index + 1
                    ? "bg-green-500 text-white"
                    : step === index + 1
                      ? "bg-[#cee741] text-gray-900"
                      : "bg-gray-700 text-gray-400"
                }`}
              >
                {step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step >= index + 1 ? "text-white" : "text-gray-500"
                }`}
              >
                {label}
              </span>
              {index < 2 && (
                <ChevronRight className="w-5 h-5 text-gray-600 mx-4" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800 rounded-2xl shadow-sm p-6 space-y-6 border border-gray-700"
            >
              {step === 1 && (
                <>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Información de Contacto
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                      placeholder="3122038196"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Dirección de Envío
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                      placeholder="Calle y número"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                        placeholder="Tu ciudad"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      País
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741]">
                      <option>Colombia</option>
                    </select>
                  </div>
                </>
              )}

              {/* Selección de método de pago */}
              {step === 2 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Método de pago
                  </label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="puntos"
                        checked={paymentMethod === "puntos"}
                        onChange={() => setPaymentMethod("puntos")}
                        className="accent-[#cee741]"
                      />
                      <span>100% Puntos Fit</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="dinero"
                        checked={paymentMethod === "dinero"}
                        onChange={() => setPaymentMethod("dinero")}
                        className="accent-[#cee741]"
                      />
                      <span>100% Dinero</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mixto"
                        checked={paymentMethod === "mixto"}
                        onChange={() => {
                          setPaymentMethod("mixto");
                          setSplitAmount({
                            puntos: Math.round(total / 2),
                            dinero: +(total / 2).toFixed(2),
                          });
                        }}
                        className="accent-[#cee741]"
                      />
                      <span>Parte en Puntos y parte en Dinero</span>
                    </label>
                  </div>
                  {paymentMethod === "mixto" && (
                    <div className="mt-3 flex flex-col gap-2">
                      <label className="text-sm text-gray-300">
                        ¿Cuántos Puntos Fit quieres usar?
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={total}
                        value={tokensToUse}
                        onChange={(e) => {
                          const puntos = Number(e.target.value);
                          setTokensToUse(puntos);
                          setSplitAmount({
                            puntos,
                            dinero: +(totalPriceCash - puntos * 1300).toFixed(2),
                          });
                        }}
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741]"
                      />
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Puntos Fit: {splitAmount.puntos}</span>
                        <span>
                          Dinero: {formatCurrency(partialPriceCash)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 border border-gray-600 text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Atrás
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 bg-[#cee741] text-gray-900 py-3 rounded-xl font-semibold hover:bg-[#b5cc1a] transition-all"
                >
                  {step === 2 ? "Completar Pedido" : "Continuar"}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-24 border border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-4">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        Cant: {item.quantity}
                      </p>
                      {paymentMethod === "puntos" && (
                        <p className="text-sm font-semibold text-[#cee741]">
                          {item.product.puntosFit * item.quantity} Puntos Fit
                        </p>
                      )}
                      {paymentMethod === "dinero" && (
                        <p className="text-sm font-semibold text-[#cee741]">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>
                      )}
                      {paymentMethod === "mixto" && (
                        <p className="text-sm font-semibold text-[#cee741]">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  {paymentMethod === "puntos" && (
                    <span className="font-medium text-white">
                      {totalPrice} Puntos Fit
                    </span>
                  )}
                  {paymentMethod === "dinero" && (
                    <span className="font-medium text-white">
                      {formatCurrency(totalPriceCash)}
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-3">
                  <span className="text-white">Total</span>
                  {paymentMethod === "puntos" && (
                    <span className="text-[#cee741]">{total} Puntos Fit</span>
                  )}
                  {paymentMethod === "dinero" && (
                    <span className="text-[#cee741]">
                      {formatCurrency(totalPriceCash)}
                    </span>
                  )}
                </div>
              </div>

              {paymentMethod === "puntos" && (
                <div className="mt-4 text-sm text-gray-300">
                  <span className="font-semibold">Pago:</span> 100% en{" "}
                  <span className="text-[#cee741]">Puntos Fit</span> ({total}{" "}
                  Puntos Fit)
                </div>
              )}
              {paymentMethod === "dinero" && (
                <div className="mt-4 text-sm text-gray-300">
                  <span className="font-semibold">Pago:</span> 100% en{" "}
                  <span className="text-[#cee741]">Dinero</span> (
                  {formatCurrency(totalPriceCash)}
                  )
                </div>
              )}
              {paymentMethod === "mixto" && (
                <div className="mt-4 text-sm text-gray-300">
                  <span className="font-semibold">Pago:</span> {tokensToUse}{" "}
                  <span className="text-[#cee741]">Puntos Fit</span> y{" "}
                  {formatCurrency(splitAmount.dinero)}{" "}
                  <span className="text-[#cee741]">Dinero</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
