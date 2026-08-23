"use client";

import { useState } from "react";
import { Heart, X, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/format";

const DONATION_AMOUNTS = [10000, 20000, 50000, 100000, 200000, 500000];

interface DonateModalProps {
  company: {
    id: string;
    nombre: string;
    slug: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function DonateModal({ company, isOpen, onClose }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleDonate() {
    if (!selectedAmount) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/mercadopago/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              title: `Donación a ${company.nombre}`,
              description: "Donación para apoyar al establecimiento",
              unit_price: selectedAmount,
              quantity: 1,
              currency_id: "COP",
            },
          ],
          external_reference: `donation-${company.slug}-${Date.now()}`,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.init_point) {
        throw new Error(data.error || "No se pudo iniciar el pago");
      }

      window.location.href = data.init_point;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo iniciar la donación. Intenta de nuevo."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0d1520] border border-white/10 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="text-eyebrow mb-3 inline-flex items-center gap-2 text-primary">
          <Heart className="w-3.5 h-3.5 fill-primary" />
          Donar a {company.nombre}
        </p>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Si está en tus posibilidades, puedes hacer una donación para ayudar
          al establecimiento a recuperarse y seguir adelante. Cada aporte, sin
          importar su tamaño, suma muchísimo.
        </p>

        <div className="grid grid-cols-3 gap-px bg-white/5 mb-6">
          {DONATION_AMOUNTS.map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`py-3 text-center text-[13px] font-medium transition-colors duration-200 ${
                selectedAmount === amount
                  ? "bg-primary text-[#111827]"
                  : "bg-[#111c2b] text-gray-300 hover:bg-[#161f2e] hover:text-white"
              }`}
            >
              {formatCurrency(amount)}
            </button>
          ))}
        </div>

        {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

        <button
          onClick={handleDonate}
          disabled={!selectedAmount || isSubmitting}
          className="w-full btn-primary-reveal py-3.5 text-[11px] tracking-cta uppercase font-medium border border-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Redirigiendo a MercadoPago...
            </>
          ) : selectedAmount ? (
            `Donar ${formatCurrency(selectedAmount)}`
          ) : (
            "Selecciona un monto"
          )}
        </button>
      </div>
    </div>
  );
}
