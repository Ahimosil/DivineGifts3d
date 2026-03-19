import { useState } from 'react';
import { X, ShoppingCart, Heart, Star, Play } from 'lucide-react';
import { Product } from '../data/products';

interface ProductPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function ProductPreview({ isOpen, onClose, product }: ProductPreviewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  // Extract color info from format "ColorName (#HEX)"
  const extractColorHex = (colorStr: string) => {
    const match = colorStr.match(/\(#([A-Fa-f0-9]{6})\)/);
    return match ? `#${match[1]}` : colorStr.toLowerCase();
  };

  const extractColorName = (colorStr: string) => {
    return colorStr.replace(/\s*\(#[A-Fa-f0-9]{6}\)\s*/, '').trim() || colorStr;
  };

  // Combine images and videos for gallery
  const mediaItems = [
    ...product.images.filter(img => img.trim()).map(img => ({ type: 'image' as const, url: img })),
    ...product.videos.filter(vid => vid.trim()).map(vid => ({ type: 'video' as const, url: vid }))
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-start justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl my-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Preview Label */}
        <div className="bg-pink-600 text-white text-center py-2 rounded-t-lg">
          <p className="text-sm font-medium">🔍 Product Preview - This is how customers will see it</p>
        </div>

        {/* Product Detail Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Images */}
            <div className="space-y-4">
              {/* Main Image/Video */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                {mediaItems.length > 0 ? (
                  mediaItems[selectedImage]?.type === 'image' ? (
                    <img
                      src={mediaItems[selectedImage].url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={mediaItems[selectedImage]?.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <p>No media available</p>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {mediaItems.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {mediaItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all relative ${
                        selectedImage === index ? 'border-pink-600' : 'border-gray-200'
                      }`}
                    >
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Play className="w-6 h-6 text-gray-600" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <div>
                <div className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-3">
                  {product.category}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name || 'Untitled Product'}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-600">(128 reviews)</span>
                </div>
                <p className="text-3xl font-bold text-pink-600">₹{product.price.toLocaleString() || '0'}</p>
                {product.price > 499 && (
                  <p className="text-sm text-green-600 mt-1">✨ Free shipping on this order!</p>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Material */}
              {product.material && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Material</h3>
                  <p className="text-gray-600">{product.material}</p>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.filter(c => c.trim()).length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Color: <span className="text-pink-600">{selectedColor}</span>
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.filter(c => c.trim()).map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color ? 'border-pink-600 scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: extractColorHex(color) }}
                        title={extractColorName(color)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes.filter(s => s.trim()).length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Size: <span className="text-pink-600">{selectedSize}</span>
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.filter(s => s.trim()).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border-2 rounded-lg transition-all ${
                          selectedSize === size
                            ? 'border-pink-600 bg-pink-50 text-pink-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-pink-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-pink-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="p-3 border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              {/* Features */}
              <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                <p>✓ Free Shipping on orders over ₹999</p>
                <p>✓ 30-day Return Policy</p>
                <p>✓ Secure Payment Options</p>
                <p>✓ Custom 3D Printing Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}