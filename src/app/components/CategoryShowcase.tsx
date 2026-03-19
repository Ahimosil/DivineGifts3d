import { Link } from 'react-router';
import { Sparkles, Home, Key, Gift, Gem, Palette } from 'lucide-react';

export function CategoryShowcase() {
  const categories = [
    {
      name: 'Personalized Gifts',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      link: '/products?category=Personalized Gifts',
      description: 'Custom & unique items'
    },
    {
      name: 'Jewelry & Wearables',
      icon: Gem,
      color: 'from-amber-500 to-orange-500',
      link: '/products?category=Jewelry & Wearables',
      description: 'Elegant accessories'
    },
    {
      name: 'Home & Desk Décor',
      icon: Home,
      color: 'from-green-500 to-teal-500',
      link: '/products?category=Home & Desk Décor',
      description: 'Beautiful decorations'
    },
    {
      name: 'Keychains & Mini Gifts',
      icon: Key,
      color: 'from-blue-500 to-indigo-500',
      link: '/products?category=Keychains & Mini Gifts',
      description: 'Perfect pocket gifts'
    },
    {
      name: 'Custom Designs',
      icon: Palette,
      color: 'from-cyan-500 to-blue-500',
      link: '/custom-order',
      description: 'Your imagination'
    },
    {
      name: 'Special Occasions',
      icon: Gift,
      color: 'from-pink-500 to-rose-500',
      link: '/products',
      description: 'Celebrate moments'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse Categories</h2>
          <p className="text-xl text-muted-foreground">
            Explore our wide range of 3D printed products
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.name}
                to={category.link}
                className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${category.color} text-white rounded-full mb-3 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1 text-sm">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
