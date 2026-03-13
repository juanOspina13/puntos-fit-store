import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#cee741] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Página no encontrada</h2>
        <p className="text-gray-400 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#cee741] hover:bg-[#b8d134] text-gray-900 font-bold py-3 px-6 rounded-xl transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
