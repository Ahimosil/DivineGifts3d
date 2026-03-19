import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { products as initialProducts, Product } from '../data/products';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  resetProducts: () => void;
  publishProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'divineGifts3D_products';

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    // Load products from localStorage or use initial products
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (storedProducts) {
      try {
        return JSON.parse(storedProducts);
      } catch (error) {
        console.error('Error parsing stored products:', error);
        return initialProducts;
      }
    }
    return initialProducts;
  });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts(products.map(p => p.id === id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  const resetProducts = () => {
    setProducts(initialProducts);
  };

  const publishProduct = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: 'published' } : p));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById, resetProducts, publishProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}