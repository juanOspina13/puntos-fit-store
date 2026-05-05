"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error boundary que captura errores en el root layout.
 * Este archivo debe incluir las etiquetas <html> y <body>.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log crítico del error global
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <html lang="es">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-red-600 rounded-full mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Error Crítico
              </h1>
              <p className="text-gray-300 text-lg mb-6">
                Ha ocurrido un error crítico en la aplicación. Por favor, recarga la página.
              </p>
              {error.digest && (
                <p className="text-sm text-gray-400 mb-6 font-mono">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Intentar de nuevo
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="w-full px-6 py-3 bg-transparent text-white font-medium rounded-lg border border-white hover:bg-white hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Recargar aplicación
              </button>
            </div>

            {process.env.NODE_ENV === "development" && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-200 mb-2">
                  Detalles técnicos del error
                </summary>
                <div className="bg-red-950 border border-red-800 rounded-lg p-4 text-xs">
                  <p className="font-semibold text-red-300 mb-2">
                    {error.name}: {error.message}
                  </p>
                  {error.stack && (
                    <pre className="text-red-400 overflow-x-auto whitespace-pre-wrap break-words">
                      {error.stack}
                    </pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
