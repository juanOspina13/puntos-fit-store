"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, User, LogOut, Zap, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import type { UserProfile } from "@/types/auth";
import { featureFlags } from "@/config/featureFlags";

interface HeaderClientProps {
  serverUserData?: UserProfile | null;
  searchParams?: Record<string, string | string[] | undefined>;
}

const NAV_LINKS = [
  { href: "/", label: "Inicio", flag: true },
  { href: "/paquetes", label: "Paquetes", flag: featureFlags.packages, badge: "TOP" },
  { href: "/suscripciones", label: "Suscripciones", flag: featureFlags.subscriptions },
  { href: "/products?category=supplements", label: "Suplementos", flag: true },
  { href: "/products?category=clothing", label: "Ropa", flag: true },
];

export default function HeaderClient({ serverUserData }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const { totalItems, setIsCartOpen } = useCart();
  const { user: clientUser, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const user = serverUserData || clientUser;
  const isUserAuthenticated = !!user || isAuthenticated;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      if (y > lastScrollY.current && y > 80 && !isMenuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const visibleLinks = NAV_LINKS.filter((l) => l.flag);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled
            ? "bg-[#0d1520]/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30"
            : "bg-[#0d1520]/80 backdrop-blur-sm border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">

            {/* Left — desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {visibleLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center gap-1.5 text-[11px] tracking-cta uppercase text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  {link.badge && (
                    <span className="bg-primary text-gray-900 text-[9px] font-bold px-1.5 py-px tracking-wide rounded-sm">
                      {link.badge}
                    </span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Center — logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:left-auto"
            >
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="font-display text-gray-900 text-sm leading-none">PF</span>
              </div>
              <span className="font-display text-white tracking-widest text-base uppercase hidden sm:block">
                Puntos Fit
              </span>
            </Link>

            {/* Right — remaining nav + icons */}
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-8">
                {visibleLinks.slice(3).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-[11px] tracking-cta uppercase text-gray-400 hover:text-white transition-colors duration-200 group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </nav>

              {/* Points badge */}
              {isUserAuthenticated && (
                <div className="hidden sm:flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-sm">
                  <Zap className="w-3 h-3 text-primary fill-primary" />
                  <span className="text-[11px] font-bold text-primary tracking-wide">
                    {user?.billetera_id?.classes ?? 0}
                  </span>
                  <span className="text-[10px] text-primary/60 tracking-wide uppercase">pts</span>
                </div>
              )}

              {/* User */}
              {isUserAuthenticated ? (
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-[11px] text-gray-400 max-w-[100px] truncate tracking-wide">
                    {user?.nombre ?? user?.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:flex text-gray-500 hover:text-white transition-colors"
                >
                  <User className="w-4.5 h-4.5" />
                </Link>
              )}

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-400 hover:text-white transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-gray-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-400 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0d1520]/98 backdrop-blur-md animate-fade-in">
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
              {visibleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-3 border-b border-white/5 text-[11px] tracking-cta uppercase text-gray-400 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className="bg-primary text-gray-900 text-[9px] font-bold px-1.5 py-px rounded-sm">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              ))}

              <div className="pt-4 space-y-4">
                {isUserAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-3 rounded-sm">
                      <Zap className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-base font-bold text-primary">
                        {user?.billetera_id?.classes ?? 0}
                      </span>
                      <span className="text-[11px] text-primary/60 uppercase tracking-widest">
                        puntos disponibles
                      </span>
                    </div>
                    <button
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="flex items-center gap-2 text-[11px] tracking-cta uppercase text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-[11px] tracking-cta uppercase text-gray-400 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so content doesn't sit under fixed header */}
      <div className="h-[68px]" />
    </>
  );
}
