"use client";

import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface PuntosBalanceBannerProps {
  size?: "md" | "lg";
  subtitle?: string;
  className?: string;
}

export default function PuntosBalanceBanner({
  size = "lg",
  subtitle,
  className = "",
}: PuntosBalanceBannerProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated || !user) {
    return (
      <div
        className={`border border-white/8 bg-[#161f2e] px-5 py-4 flex items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-primary/60 fill-primary/30" />
          <div>
            <p className="text-[12px] text-white">Inicia sesión para ver tus Puntos Fit</p>
            <p className="text-[11px] text-gray-600">Canjéalos por suplementos y paquetes.</p>
          </div>
        </div>
        <Link
          href="/login"
          className="hidden sm:inline-flex items-center gap-1.5 text-[10px] tracking-cta uppercase text-primary hover:text-primary-hover transition-colors"
        >
          Iniciar sesión <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    );
  }

  const puntos = user?.billetera_id?.classes ?? 0;

  if (size === "md") {
    return (
      <div
        className={`border border-white/8 bg-[#161f2e] px-5 py-4 flex items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-primary fill-primary/60" />
          <div>
            <p className="text-eyebrow mb-0.5">Tus Puntos Fit</p>
            <p className="text-xl font-semibold text-white leading-none">
              {puntos}{" "}
              <span className="text-[11px] font-normal text-gray-600">
                {subtitle ?? "disponibles"}
              </span>
            </p>
          </div>
        </div>
        <span className="hidden sm:block text-[11px] text-gray-600 truncate max-w-[160px]">
          {user?.nombre ?? user?.email}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative border border-white/8 bg-[#161f2e] px-6 py-5 overflow-hidden ${className}`}
    >
      {/* Subtle accent glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/8 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 border border-primary/20 bg-primary/8 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-primary fill-primary/50" />
          </div>
          <div>
            <p className="text-eyebrow mb-1">Puntos Fit disponibles</p>
            <p className="font-display text-4xl sm:text-5xl text-white tracking-heading leading-none">
              {puntos}
            </p>
            <p className="text-[11px] text-gray-600 mt-1.5">
              {subtitle ?? "para canjear en tu próximo pedido"}
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[10px] tracking-eyebrow uppercase text-gray-700 mb-0.5">Cuenta</p>
          <p className="text-[13px] text-white max-w-[200px] truncate" title={user?.nombre ?? user?.email}>
            {user?.nombre ?? user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
