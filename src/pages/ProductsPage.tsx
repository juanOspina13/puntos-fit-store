import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import { products, categories, searchProducts, getProductsByCategory } from '../data/products';
import type { Product } from '../types';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let result = products;

    // Apply search
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    // Apply category filter
    if (categoryParam && categoryParam !== 'all') {
      result = result.filter(p => p.category === categoryParam);
      setSelectedCategory(categoryParam);
    } else if (selectedCategory && selectedCategory !== 'all') {
      result = getProductsByCategory(selectedCategory);
    }

    // Apply price filter
    result = result.filter(p => p.puntosFit >= priceRange[0] && p.puntosFit <= priceRange[1]);
    console.log('Filtered by price:', result.length);
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.puntosFit - b.puntosFit);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.puntosFit - a.puntosFit);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [searchQuery, categoryParam, selectedCategory, sortBy, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const getCategoryTitle = () => {
    if (searchQuery) return `Resultados para "${searchQuery}"`;
    if (selectedCategory === 'supplements') return 'Suplementos';
    if (selectedCategory === 'clothing') return 'Ropa Deportiva';
    if (selectedCategory === 'accessories') return 'Accesorios';
    return 'Todos los Productos';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{getCategoryTitle()}</h1>
          <p className="text-indigo-100">
            {filteredProducts.length} productos encontrados
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 font-medium text-gray-700"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtros
          </button>

          {/* Sidebar Filters */}
          <aside className={`
            ${isFilterOpen ? 'fixed inset-0 z-50 bg-black/50' : 'hidden'} lg:block lg:relative lg:bg-transparent
          `}>
            <div className={`
              ${isFilterOpen ? 'fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto' : ''}
              lg:relative lg:w-64 lg:flex-shrink-0
            `}>
              {/* Mobile Filter Header */}
              {isFilterOpen && (
                <div className="flex items-center justify-between p-4 border-b lg:hidden">
                  <h3 className="font-semibold text-lg">Filtros</h3>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}

              <div className="p-4 lg:p-0 space-y-6">
                {/* Categories */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Categorías
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === 'all' 
                          ? 'bg-indigo-100 text-indigo-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Todos los productos
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.slug)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.slug 
                            ? 'bg-indigo-100 text-indigo-700 font-medium' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Precio</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-indigo-600"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">${priceRange[0]}</span>
                      <span className="text-gray-600">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Apply Button (Mobile) */}
                {isFilterOpen && (
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold lg:hidden"
                  >
                    Aplicar Filtros
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="hidden sm:flex items-center gap-2">
                <button className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                  <Grid className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100">
                  <List className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Ordenar por:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="featured">Destacados</option>
                  <option value="newest">Más nuevos</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor valorados</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-16 bg-white rounded-xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-500">
                  Intenta ajustar los filtros o busca algo diferente
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
