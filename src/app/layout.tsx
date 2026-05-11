import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/cart/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puntos Fit Store | Canjea tus puntos por suplementos de calidad",
  description:
    "Canjea tus puntos de Gym Connect por suplementos de calidad que impulsen tu transformación. Suplementos para ganar músculo, quemar grasa, dormir mejor y reducir el estrés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
