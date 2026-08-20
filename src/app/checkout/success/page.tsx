"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const paymentId = params.get("payment_id");
  const status = params.get("status");

  const isPending = status === "pending" || status === "in_process";

  return (
    <div className="min-h-screen bg-[#0b1119] flex items-center justify-center p-6">
      <div className="bg-[#161f2e] border border-white/8 p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-primary" />
        </div>

        <p className="text-eyebrow mb-3">
          {isPending ? "Pago en proceso" : "Pedido confirmado"}
        </p>
        <h1 className="section-title text-2xl md:text-3xl text-white mb-4">
          {isPending ? "¡Gracias por tu compra!" : "¡Pago exitoso!"}
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-2">
          {isPending
            ? "Tu pago está siendo procesado. Te notificaremos cuando se confirme."
            : "Tu pago fue aprobado. Pronto recibirás un mensaje de WhatsApp con los detalles de tu pedido."}
        </p>

        {paymentId && (
          <p className="text-[11px] text-gray-700 mt-2 mb-8">
            Referencia: <span className="text-gray-500">{paymentId}</span>
          </p>
        )}

        <Link
          href="/"
          className="btn-primary-reveal inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-cta uppercase font-medium border border-primary w-full"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b1119]" />}>
      <SuccessContent />
    </Suspense>
  );
}
