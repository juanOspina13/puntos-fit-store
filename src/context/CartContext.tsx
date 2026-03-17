"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/types";
import { useAuth } from "@/context/AuthContext";

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    size?: string,
    color?: string,
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalPriceCash: number;
  partialPriceCash: number;
  paymentMethod: "puntos" | "dinero" | "mixto";
  setPaymentMethod: (method: "puntos" | "dinero" | "mixto") => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  tokensToUse: number;
  setTokensToUse: (tokens: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tokensToUse, setTokensToUse] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<
    "puntos" | "dinero" | "mixto"
  >("puntos");
  const [isHydrated, setIsHydrated] = useState(false);

  // Puntos disponibles del usuario
  const availablePoints = isAuthenticated
    ? Number(user?.billetera_id?.classes) || 0
    : 0;

  // Hidratación del carrito desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setItems(JSON.parse(saved));
    }
    setIsHydrated(true);
  }, []);

  // Guardar el carrito en localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isHydrated]);

  // Auto-aplicar puntos disponibles cuando el carrito cambia
  useEffect(() => {
    if (!isHydrated) return;

    const currentTotalPrice = items.reduce(
      (sum, item) => sum + item.product.puntosFit * item.quantity,
      0,
    );

    if (currentTotalPrice === 0 || availablePoints === 0) {
      setTokensToUse(0);
      if (currentTotalPrice > 0) setPaymentMethod("dinero");
      return;
    }

    const pointsToApply = Math.min(availablePoints, currentTotalPrice);
    setTokensToUse(pointsToApply);

    if (pointsToApply >= currentTotalPrice) {
      setPaymentMethod("puntos");
    } else {
      setPaymentMethod("mixto");
    }
  }, [items, availablePoints, isHydrated]);

  const addToCart = (
    product: Product,
    quantity = 1,
    size?: string,
    color?: string,
  ) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...currentItems,
        { product, quantity, selectedSize: size, selectedColor: color },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.puntosFit * item.quantity,
    0,
  )
    ? items.reduce(
        (sum, item) => sum + item.product.puntosFit * item.quantity,
        0,
      )
    : 0;
  const totalPriceCash = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const partialPriceCash =
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) -
    tokensToUse * 1300;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalPriceCash,
        partialPriceCash,
        setTokensToUse,
        isCartOpen,
        setIsCartOpen,
        paymentMethod,
        setPaymentMethod,
        tokensToUse,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
