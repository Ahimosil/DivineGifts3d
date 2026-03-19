import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { Video, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Get images array or fallback to single image
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];
  
  // Show second image on hover if available
  const displayImage = isHovered && productImages.length > 1 
    ? productImages[1] 
    : productImages[0];
  
  // Check if product has videos
  const hasVideo = product.videos && product.videos.length > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors[0]);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors[0]);
    navigate('/cart');
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden relative">
          <ImageWithFallback
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Video Indicator */}
          {hasVideo && (
            <div className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full">
              <Video className="w-4 h-4" />
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="mb-2 hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-2xl font-semibold text-primary mb-2">₹{product.price}</p>
        <div className="flex gap-1 mb-3">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color}
              className="w-5 h-5 rounded-full border border-gray-200"
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
          {product.colors.length > 4 && (
            <div className="w-5 h-5 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center text-xs">
              +{product.colors.length - 4}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              addedToCart
                ? 'bg-green-500 text-white'
                : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white'
            }`}
          >
            {addedToCart ? (
              <>
                <Check className="w-4 h-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
          <Link
            to={`/product/${product.id}`}
            className="inline-block w-full text-center bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-lg hover:shadow-md transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}