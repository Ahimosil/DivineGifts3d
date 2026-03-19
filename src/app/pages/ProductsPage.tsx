import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Heart, Search, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../data/products';
import { useProducts } from '../contexts/ProductsContext';
import { SearchBar } from '../components/SearchBar';

export function ProductsPage() {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const searchFromUrl = searchParams.get('search');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || 'All Gifts');
  const [priceRange, setPriceRange] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(searchFromUrl || '');

  // Update selected category when URL changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Update search query when URL changes
  useEffect(() => {
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
      setSelectedCategory('All Gifts'); // Reset category when searching
    }
  }, [searchFromUrl]);

  const categories = [
    'All',
    'Personalized Gifts',
    'Home & Desk Décor',
    'Keychains & Mini Gifts',
    'Jewelry & Wearables'
  ];
  
  const priceRanges = ['All', 'Under ₹200', '₹200 - ₹300', 'Above ₹300'];

  const getCategoryMatch = (product: Product, category: string): boolean => {
    if (category === 'All') return true;
    
    // Map old categories to new ones
    if (category === 'Jewelry & Wearables') {
      return product.category === 'Jewellery';
    }
    if (category === 'Personalized Gifts') {
      return product.category === 'Custom Gifts';
    }
    if (category === 'Home & Desk Décor') {
      return product.category === 'Home & Desk decor';
    }
    if (category === 'Keychains & Mini Gifts') {
      return product.category === 'keychains';
    }
    
    return false;
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = getCategoryMatch(product, selectedCategory);
    
    let priceMatch = true;
    if (priceRange === 'Under ₹200') {
      priceMatch = product.price < 200;
    } else if (priceRange === '₹200 - ₹300') {
      priceMatch = product.price >= 200 && product.price <= 300;
    } else if (priceRange === 'Above ₹300') {
      priceMatch = product.price > 300;
    }

    // Search in product name, description, category, and colors
    let searchMatch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      searchMatch = 
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.colors.some(c => c.toLowerCase().includes(query));
    }

    return categoryMatch && priceMatch && searchMatch;
  });

  return (
    <div className="py-12 bg-gradient-to-br from-pink-50/30 via-white to-red-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Shop Products</h1>
          <p className="text-xl text-muted-foreground">
            Browse our collection of beautiful 3D-printed items
          </p>
        </div>

        {/* Search Bar at Top */}
        <div className="mb-8">
          <SearchBar variant="hero" />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-72 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24 border border-primary/10">
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm ${ 
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                          : 'hover:bg-pink-50 border border-transparent hover:border-primary/20'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setPriceRange(range)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        priceRange === range
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-muted-foreground">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}