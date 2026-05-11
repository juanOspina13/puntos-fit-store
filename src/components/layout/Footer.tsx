import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { featureFlags } from "@/config/featureFlags";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#cee741] rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xl">PF</span>
              </div>
              <span className="text-xl font-bold text-white">Puntos Fit Store</span>
            </Link>
            <p className="text-gray-400 mb-6">
              {featureFlags.packages 
                ? "Paquetes mensuales de suplementos por objetivo. Resultados reales en 90 días, sin adivinar que tomar."
                : "Canjea tus puntos de Gym Connect por suplementos de calidad que impulsen tu transformación."
              }
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {featureFlags.packages && (
                <li>
                  <Link href="/paquetes" className="text-gray-400 hover:text-white transition-colors">
                    Paquetes mensuales
                  </Link>
                </li>
              )}
              <li>
                <Link href="/products?category=supplements" className="text-gray-400 hover:text-white transition-colors">
                  Suplementos individuales
                </Link>
              </li>
              <li>
                <Link href="/products?category=clothing" className="text-gray-400 hover:text-white transition-colors">
                  Ropa Deportiva
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Como funciona el sistema
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Atención al Cliente</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Mi Cuenta
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Seguir Pedido
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Guía de Tallas
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#cee741]" />
                <span className="text-gray-400">Balcones de Villa Verde, Pereira</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#cee741]" />
                <span className="text-gray-400">+57 316 9847703</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#cee741]" />
                <span className="text-gray-400">gymconnect20@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Puntos Fit Store. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
