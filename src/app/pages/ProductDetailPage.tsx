import { useParams, Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useProducts } from '../contexts/ProductsContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft, Package, Ruler, Play, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export function ProductDetailPage() {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const product = getProductById(id || '');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [selectedMediaType, setSelectedMediaType] = useState<'image' | 'video'>('image');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Get all images and videos
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];
  
  const productVideos = product.videos || [];
  
  // Create unified media array for display logic
  const allMediaItems = [
    ...productImages.map((img, idx) => ({ type: 'image' as const, src: img, index: idx })),
    ...productVideos.map((vid, idx) => ({ type: 'video' as const, src: vid, index: idx }))
  ];

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in ordering the ${product.name} (₹${product.price})\nColor: ${selectedColor}\nSize: ${selectedSize}`
  );

  const handleMediaSelect = (type: 'image' | 'video', index: number) => {
    setSelectedMediaType(type);
    setSelectedMediaIndex(index);
    setIsVideoPlaying(false);
  };

  // Get current media source
  const currentMediaSrc = selectedMediaType === 'image' 
    ? productImages[selectedMediaIndex] 
    : productVideos[selectedMediaIndex];

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedColor, customization || undefined);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity, selectedColor, customization || undefined);
      navigate('/cart');
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Media Gallery */}
          <div>
            {/* Main Image/Video Display */}
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
              {selectedMediaType === 'video' ? (
                <div className="relative w-full h-full">
                  <video
                    key={currentMediaSrc}
                    src={currentMediaSrc}
                    className="w-full h-full object-cover"
                    controls={isVideoPlaying}
                    autoPlay={isVideoPlaying}
                    muted
                    loop
                    onClick={() => setIsVideoPlaying(true)}
                  />
                  {!isVideoPlaying && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <ImageWithFallback
                  src={currentMediaSrc || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Unified Thumbnail Gallery (Images + Videos) */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {/* Image Thumbnails */}
              {productImages.map((img, index) => (
                <button
                  key={`img-${index}`}
                  onClick={() => handleMediaSelect('image', index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedMediaType === 'image' && selectedMediaIndex === index
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              
              {/* Video Thumbnails */}
              {productVideos.map((vid, index) => (
                <button
                  key={`vid-${index}`}
                  onClick={() => handleMediaSelect('video', index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all relative ${
                    selectedMediaType === 'video' && selectedMediaIndex === index
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <video
                    src={vid}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-6 h-6 text-white" fill="white" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mb-4">
              {product.category}
            </div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-6">₹{product.price}</p>
            <p className="text-lg text-muted-foreground mb-8">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="mb-3">Color Options</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedColor === color
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary transition-colors flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary transition-colors flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Customization Input */}
            <div className="mb-8">
              <h3 className="mb-3">Customization (Optional)</h3>
              <input
                type="text"
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
                placeholder="Add custom text, initials, or special requests..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Add personalization requests here. We'll confirm details via WhatsApp.
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Buy Now
              </button>

              <a
                href={`https://wa.me/919791939527?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 text-white text-center px-8 py-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                Order via WhatsApp
              </a>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              ✨ Free shipping on orders above ₹500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}