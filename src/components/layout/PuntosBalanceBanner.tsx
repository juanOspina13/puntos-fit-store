"use client";

import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface PuntosBalanceBannerProps {
  /**
   * Visual size of the banner.
   *  - `lg` (default): large hero-style banner suited for checkout / product detail.
   *  - `md`: compact banner suited for listing pages.
   */
  size?: "md" | "lg";
  /** Optional override label shown next to the points number. */
  subtitle?: string;
  className?: string;
}

export default function PuntosBalanceBanner({
  size = "lg",
  subtitle,
  className = "",
}: PuntosBalanceBannerProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Don't render anything while hydrating to avoid SSR flicker.
  if (isLoading) return null;

  // If the user is not logged in, invite them to log in to see / earn points.
  if (!isAuthenticated || !user) {
    return (
      <div
        className={`bg-gradient-to-r from-gray-800 to-gray-900 border border-[#cee741]/30 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#cee741]/15 flex items-center justify-center">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#cee741] fill-[#cee741]" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm sm:text-base">
              Inicia sesión para ver tus Puntos Fit
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Canjéalos por suplementos y paquetes.
            </p>
          </div>
        </div>
        <Link
          href="/login"
          className="hidden sm:inline-flex items-center gap-1 bg-[#cee741] text-gray-900 font-semibold px-4 py-2 rounded-full text-sm hover:bg-[#b5cc1a] transition-colors"
        >
          Iniciar sesión
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const puntos = user?.billetera_id?.classes ?? 0;

  if (size === "md") {
    return (
      <div
        className={`bg-gradient-to-r from-[#cee741]/15 to-[#cee741]/5 border border-[#cee741]/40 rounded-2xl p-4 flex items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#cee741]/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#cee741] fill-[#cee741]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#cee741]/80 font-semibold">
              Tus Puntos Fit
            </p>
            <p className="text-2xl font-extrabold text-white leading-tight">
              {puntos}{" "}
              <span className="text-sm font-medium text-gray-400">
                {subtitle ?? "puntos disponibles"}
              </span>
            </p>
          </div>
        </div>
        <span
          className="hidden sm:inline-block text-xs text-gray-400 max-w-[180px] text-right"
          title={user?.nombre ?? user?.email}
        >
          {user?.nombre ?? user?.email}
        </span>
      </div>
    );
  }

  // size === "lg"
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#cee741]/20 via-gray-800 to-gray-900 border border-[#cee741]/40 rounded-2xl p-5 sm:p-6 ${className}`}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#cee741]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#cee741]/20 border border-[#cee741]/40 flex items-center justify-center">
            <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-[#cee741] fill-[#cee741]" />
          </div>
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-wider text-[#cee741] font-semibold">
              Tus Puntos Fit
            </p>
            <p className="text-3xl sm:text-5xl font-extrabold text-white leading-none">
              {puntos}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {subtitle ?? "puntos disponibles para canjear"}
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-gray-400">Hola,</p>
          <p
            className="text-white font-semibold max-w-[220px] truncate"
            title={user?.nombre ?? user?.email}
          >
            {user?.nombre ?? user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
