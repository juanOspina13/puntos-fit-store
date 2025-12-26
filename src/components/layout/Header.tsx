import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsCartOpen } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Banner 
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 text-center text-sm">
        <p>🔥 Envío gratis en pedidos mayores a $50 | Usa código <strong>FIT20</strong> para 20% de descuento</p>
      </div>
*/}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">PF</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">PuntosFit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Inicio
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Todos los Productos
            </Link>
            <Link to="/products?category=supplements" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Suplementos
            </Link>
            <Link to="/products?category=clothing" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Ropa
            </Link>
            <Link to="/products?category=accessories" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Accesorios
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex text-gray-700 hover:text-indigo-600 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="hidden md:flex text-gray-700 hover:text-indigo-600 transition-colors">
              <User className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Todos los Productos
              </Link>
              <Link 
                to="/products?category=supplements" 
                className="text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Suplementos
              </Link>
              <Link 
                to="/products?category=clothing" 
                className="text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Ropa
              </Link>
              <Link 
                to="/products?category=accessories" 
                className="text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Accesorios
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
