import { Link } from 'react-router';
import { Sparkles, Palette, DollarSign, Printer, Gift, ShoppingBag, Zap, Package } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../contexts/ProductsContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CategoryShowcase } from '../components/CategoryShowcase';

export function HomePage() {
  const { products } = useProducts();
  
  const featuredProducts = products.slice(0, 4);
  const popularProducts = products.slice(0, 8);

  return (
    <div>
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-primary via-accent to-primary text-white py-3 text-center">
        <p className="text-sm md:text-base">
          ✨ New Products Added Weekly! Free Shipping on Orders Above ₹500 ✨
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 md:py-28 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Printer className="absolute top-10 left-10 text-primary/10 w-24 h-24" />
          <Sparkles className="absolute top-32 right-20 text-accent/10 w-16 h-16" />
          <Package className="absolute bottom-20 left-1/4 text-primary/10 w-20 h-20" />
          <Gift className="absolute bottom-32 right-1/3 text-accent/10 w-12 h-12" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 border border-primary/20">
                <span className="flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Professional 3D Printing
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Custom 3D Printed Creations
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Unique gifts, home décor, personalized items, and more. Professionally crafted with precision 3D printing technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Browse Products
                </Link>
                <Link
                  to="/custom-order"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Custom Order
                </Link>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              {/* DivineGifts3D Brand Logo */}
              <div className="relative z-10 rounded-3xl shadow-2xl border-4 border-white bg-gradient-to-br from-white via-indigo-50 to-purple-50 flex flex-col items-center justify-center py-16 px-10 gap-6">
                {/* Icon badge */}
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg">
                  <Printer className="w-12 h-12 text-white" />
                </div>
                {/* Brand name */}
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                    Divine<span className="text-accent">Gifts</span><span className="text-primary">3D</span>
                  </h2>
                  <p className="mt-2 text-muted-foreground tracking-widest uppercase text-xs">
                    Custom · Crafted · 3D Printed
                  </p>
                </div>
                {/* Divider */}
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-accent" />
                {/* Tag pills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {["Gifts", "Home Décor", "Keychains", "Personalized"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground">
              Discover our most popular 3D printed items
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-muted-foreground">
              Find the perfect item for any occasion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/products?category=Keychains & Mini Gifts"
              className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-primary/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent text-white rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Keychains & Mini Gifts</h3>
              <p className="text-muted-foreground mb-4">
                Compact and thoughtful gifts perfect for any occasion
              </p>
              <span className="text-primary font-semibold group-hover:underline">Shop Now →</span>
            </Link>

            <Link
              to="/products?category=Home & Desk Décor"
              className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-primary/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Palette className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Home & Desk Décor</h3>
              <p className="text-muted-foreground mb-4">
                Beautiful decorative items to enhance your space
              </p>
              <span className="text-primary font-semibold group-hover:underline">Shop Now →</span>
            </Link>

            <Link
              to="/products?category=Personalized Gifts"
              className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-primary/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Gifts</h3>
              <p className="text-muted-foreground mb-4">
                Custom items with names, dates, or special messages
              </p>
              <span className="text-primary font-semibold group-hover:underline">Shop Now →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DivineGifts3D</h2>
            <p className="text-xl text-muted-foreground">
              Quality craftsmanship meets innovative technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                <Printer className="w-8 h-8" />
              </div>
              <h3 className="mb-2">Professional Quality</h3>
              <p className="text-muted-foreground">
                High-precision 3D printing technology
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="mb-2">Custom Designs</h3>
              <p className="text-muted-foreground">
                Personalized to your specifications
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-full mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="mb-2">Fast Production</h3>
              <p className="text-muted-foreground">
                Quick turnaround times on all orders
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-full mb-4">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="mb-2">Affordable Pricing</h3>
              <p className="text-muted-foreground">
                Great value for premium quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Something Unique?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your custom order today or browse our ready-made collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/custom-order"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg hover:shadow-xl transition-all font-semibold"
            >
              <Sparkles className="w-5 h-5" />
              Custom Order
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-semibold"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}