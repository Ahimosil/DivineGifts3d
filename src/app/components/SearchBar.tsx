import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useProducts } from '../contexts/ProductsContext';
import type { Product } from '../types';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
}

export function SearchBar({ variant = 'hero' }: SearchBarProps) {
  const { products } = useProducts();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search products
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchQuery);
      const descMatch = product.description?.toLowerCase().includes(searchQuery);
      const categoryMatch = product.category.toLowerCase().includes(searchQuery);
      const colorMatch = product.colors.some(color => 
        color.toLowerCase().includes(searchQuery)
      );
      
      return nameMatch || descMatch || categoryMatch || colorMatch;
    });

    setResults(filtered.slice(0, 6)); // Show top 6 results
    setIsOpen(filtered.length > 0);
  }, [query, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  if (variant === 'compact') {
    return (
      <div ref={searchRef} className="relative w-full max-w-md">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </form>

        {/* Dropdown Results */}
        {isOpen && results.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
            <div className="p-2">
              <p className="text-xs text-gray-500 px-3 py-2 font-semibold uppercase">
                {results.length} Result{results.length !== 1 ? 's' : ''}
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 p-3 hover:bg-pink-50 rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate group-hover:text-primary">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{product.category}</p>
                  </div>
                  <span className="text-primary font-semibold">₹{product.price}</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 p-2">
              <Link
                to={`/products?search=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                className="flex items-center justify-center gap-2 w-full py-2 text-primary font-semibold hover:bg-pink-50 rounded-lg transition-colors"
              >
                View All Results
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Hero variant - Large search bar for home page
  return (
    <div ref={searchRef} className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for keychains, gifts, home décor, jewelry..."
            className="w-full pl-14 pr-14 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary shadow-lg transition-all group-hover:shadow-xl"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-primary transition-colors" />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-md"
        >
          Search
        </button>
      </form>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[500px] overflow-y-auto">
          <div className="p-4">
            <p className="text-sm text-gray-500 px-2 py-2 font-semibold uppercase tracking-wide">
              {results.length} Result{results.length !== 1 ? 's' : ''} Found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-4 p-3 hover:bg-pink-50 rounded-xl transition-all group border border-transparent hover:border-primary/20"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{product.category}</p>
                    <p className="text-primary font-bold mt-1">₹{product.price}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-2xl">
            <Link
              to={`/products?search=${encodeURIComponent(query)}`}
              onClick={handleResultClick}
              className="flex items-center justify-center gap-2 w-full py-3 text-primary font-bold hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              View All {results.length}+ Results
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}

      {/* Popular Searches - shown when empty */}
      {!query && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-gray-500">Popular:</span>
          {['Keychains', 'Custom Gifts', 'Home Décor', 'Personalized'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}