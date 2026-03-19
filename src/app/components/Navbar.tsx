import { Link, useLocation } from 'react-router';
import { ShoppingCart, User, Shield } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import logoImg from '@/assets/logo.svg'; // Using @ alias for absolute path

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { isAdminAuthenticated } = useAdminAuth();
  const cartItemCount = getTotalItems();
  const location = useLocation();

  // Helper function to check if link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="border-b sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="DivineGifts3D" className="h-10 w-auto object-contain drop-shadow-sm" />
            <span className="text-xl font-semibold">DivineGifts3D</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`hover:text-primary transition-colors ${isActive('/') ? 'text-primary' : ''}`}>
              Home
            </Link>
            <Link to="/products" className={`hover:text-primary transition-colors ${isActive('/products') ? 'text-primary' : ''}`}>
              Shop
            </Link>
            <Link to="/custom-order" className={`hover:text-primary transition-colors ${isActive('/custom-order') ? 'text-primary' : ''}`}>
              Custom Order
            </Link>
            <Link to="/about" className={`hover:text-primary transition-colors ${isActive('/about') ? 'text-primary' : ''}`}>
              About
            </Link>
            <Link to="/contact" className={`hover:text-primary transition-colors ${isActive('/contact') ? 'text-primary' : ''}`}>
              Contact
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative hover:text-primary transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Account Icon */}
            <Link
              to={isAuthenticated ? "/account" : "/login"}
              className="hover:text-primary transition-colors"
              title={isAuthenticated ? user?.name : "Login"}
            >
              <User className="w-6 h-6" />
            </Link>

            {/* Admin Icon */}
            {isAdminAuthenticated && (
              <Link
                to="/admin"
                className="relative hover:text-primary transition-colors"
                title="Back to Admin Panel"
              >
                <Shield className="w-6 h-6 text-pink-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-600 rounded-full"></span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-foreground transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-foreground transition-all ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-foreground transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link to="/" className={`hover:text-primary transition-colors ${isActive('/') ? 'text-primary font-semibold' : ''}`} onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/products" className={`hover:text-primary transition-colors ${isActive('/products') ? 'text-primary font-semibold' : ''}`} onClick={() => setIsOpen(false)}>
                Shop
              </Link>
              <Link to="/custom-order" className={`hover:text-primary transition-colors ${isActive('/custom-order') ? 'text-primary font-semibold' : ''}`} onClick={() => setIsOpen(false)}>
                Custom Order
              </Link>
              <Link to="/about" className={`hover:text-primary transition-colors ${isActive('/about') ? 'text-primary font-semibold' : ''}`} onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link to="/contact" className={`hover:text-primary transition-colors ${isActive('/contact') ? 'text-primary font-semibold' : ''}`} onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              <Link to="/cart" className={`flex items-center gap-2 hover:text-primary transition-colors ${isActive('/cart') ? 'text-primary font-semibold' : ''}`} onClick={() => setIsOpen(false)}>
                <ShoppingCart className="w-5 h-5" />
                Cart {cartItemCount > 0 && `(${cartItemCount})`}
              </Link>
              <Link to={isAuthenticated ? "/account" : "/login"} className={`flex items-center gap-2 hover:text-primary transition-colors ${isActive(isAuthenticated ? '/account' : '/login') ? 'text-primary font-semibold' : ''}`} onClick={() => setIsOpen(false)}>
                <User className="w-5 h-5" />
                {isAuthenticated ? user?.name : "Login"}
              </Link>
              {isAdminAuthenticated && (
                <Link to="/admin" className={`flex items-center gap-2 hover:text-pink-700 transition-colors ${isActive('/admin') ? 'text-pink-700 font-bold' : 'text-pink-600 font-semibold'}`} onClick={() => setIsOpen(false)}>
                  <Shield className="w-5 h-5" />
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}