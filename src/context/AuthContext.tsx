"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { UserProfile } from "@/types/auth";
import { logoutUser } from "@/services/auth-service";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, profile: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Hidratar sesión desde localStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("user-profile");
      const savedToken = localStorage.getItem("user-token");
      const loggedIn = sessionStorage.getItem("loggedIn");

      if (savedProfile && savedToken && loggedIn === "true") {
        setUser(JSON.parse(savedProfile));
        setIsAuthenticated(true);
      }
    } catch {
      // Si hay datos corruptos, limpiar
      logoutUser();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((token: string, profile: UserProfile) => {
    localStorage.setItem("user-token", JSON.stringify(token));
    localStorage.setItem("user-profile", JSON.stringify(profile));
    sessionStorage.setItem("loggedIn", "true");
    setUser(profile);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
