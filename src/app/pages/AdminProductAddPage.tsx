import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useProducts } from '../contexts/ProductsContext';
import { AdminNav } from '../components/AdminNav';
import { GallerySelector } from '../components/GallerySelector';
import { ProductPreview } from '../components/ProductPreview';
import { ColorPicker } from '../components/ColorPicker';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Tooltip } from '../components/Tooltip';
import { Product } from '../data/products';
import { 
  LogOut, 
  Plus, 
  ArrowLeft, 
  X,
  Image as ImageIcon,
  Video,
  Package,
  FolderOpen,
  Eye,
  Sparkles,
  Upload,
  Save
} from 'lucide-react';

export function AdminProductAddPage() {
  const { isAdminAuthenticated, adminLogout } = useAdminAuth();
  const { products, addProduct } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    image: '',
    images: [''],
    videos: [''],
    colors: [''],
    category: 'Custom Gifts',
    description: '',
    material: '',
    sizes: ['']
  });

  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showVideoGallery, setShowVideoGallery] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const generateProductId = () => {
    const maxId = products.reduce((max, p) => {
      const numId = parseInt(p.id);
      return numId > max ? numId : max;
    }, 0);
    return String(maxId + 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.images.filter(img => img.trim()).length === 0) {
      alert('Please add at least 1 product image');
      return;
    }
    
    // Videos are now optional - no validation required

    // Clean up empty entries
    const cleanedData = {
      ...formData,
      id: generateProductId(),
      images: formData.images.filter(img => img.trim()),
      videos: formData.videos.filter(vid => vid.trim()),
      colors: formData.colors.filter(color => color.trim()),
      sizes: formData.sizes.filter(size => size.trim()),
      image: formData.images[0], // Set main image to first image
      status: 'published' as const // Add as published product
    };

    addProduct(cleanedData);
    alert('Product added successfully!');
    navigate('/admin/products');
  };

  const handleSaveAsDraft = () => {
    // Validation (only check for name - drafts can be incomplete)
    if (!formData.name.trim()) {
      alert('Please enter a product name to save as draft');
      return;
    }

    // Clean up empty entries
    const cleanedData = {
      ...formData,
      id: generateProductId(),
      images: formData.images.filter(img => img.trim()),
      videos: formData.videos.filter(vid => vid.trim()),
      colors: formData.colors.filter(color => color.trim()),
      sizes: formData.sizes.filter(size => size.trim()),
      image: formData.images.filter(img => img.trim())[0] || '', // Set main image to first image if available
      status: 'draft' as const // Save as draft
    };

    addProduct(cleanedData);
    alert('Product saved as draft successfully!');
    navigate('/admin/products');
  };

  const handleArrayChange = (
    field: 'images' | 'videos' | 'colors' | 'sizes',
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'images' | 'videos' | 'colors' | 'sizes') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field: 'images' | 'videos' | 'colors' | 'sizes', index: number) => {
    // Allow removing all videos since they're optional, but require at least 1 for other fields
    const minLength = field === 'videos' ? 0 : 1;
    if (formData[field].length > minLength) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData({ ...formData, [field]: newArray });
    }
  };

  // Handle file upload from local storage
  const handleFileUpload = (field: 'images' | 'videos', event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const nonEmptyItems = formData[field].filter(item => item.trim());
        const newItems = [...nonEmptyItems, result];
        setFormData({ ...formData, [field]: newItems });
      };
      reader.readAsDataURL(file);
    });

    // Clear the input
    event.target.value = '';
  };

  // AI Description Generator (Mock Implementation)
  const handleGenerateDescription = async () => {
    if (!formData.name.trim()) {
      alert('Please enter a product name first');
      return;
    }

    setIsGeneratingDescription(true);

    // Simulate AI API call with a 2-second delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate description based on product data
    const productName = formData.name;
    const category = formData.category;
    const material = formData.material || 'PLA (eco-friendly)';
    const hasImages = formData.images.filter(img => img.trim()).length > 0;

    // Mock AI-generated description templates
    const descriptions = [
      `Introducing our ${productName} - a beautifully crafted 3D-printed masterpiece that combines artistry with modern technology. Made from high-quality ${material}, this ${category.toLowerCase()} piece showcases intricate details and a smooth finish. Perfect for those who appreciate unique, personalized gifts that tell a story. Each piece is carefully printed and finished by hand, ensuring exceptional quality and attention to detail.`,
      
      `Discover the charm of our ${productName}, expertly crafted using state-of-the-art 3D printing technology. This stunning ${category.toLowerCase()} item is made from premium ${material}, offering durability and an eco-friendly choice. Ideal for gift-giving or adding a personal touch to your space, this piece reflects creativity and craftsmanship. Available in multiple colors and sizes to suit your preferences.`,
      
      `Experience the magic of personalized 3D printing with our ${productName}. Crafted with precision from ${material}, this delightful ${category.toLowerCase()} item brings joy and character to any setting. Whether you're looking for a unique gift or a decorative accent, this handcrafted piece stands out with its attention to detail and modern design aesthetic.`
    ];

    // Select a random description template
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    setFormData({ ...formData, description: randomDescription });
    setIsGeneratingDescription(false);
  };

  const handleInputChange = (field: keyof Product, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-sm text-gray-600">Create a new product listing</p>
            </div>
            <AdminNav />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-6 font-semibold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </button>

        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Admin', path: '/admin' },
          { label: 'Products', path: '/admin/products' },
          { label: 'Add New' }
        ]} />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-pink-600" />
              <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                  min="0"
                  placeholder="Enter price"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a category</option>
                  <option value="Custom Gifts">Custom Gifts</option>
                  <option value="keychains">Keychains</option>
                  <option value="Home & Desk decor">Home & Desk decor</option>
                  <option value="Jewellery">Jewellery</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                  placeholder="Enter product description"
                />
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={isGeneratingDescription}
                  className="mt-2 flex items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  {isGeneratingDescription ? 'Generating...' : 'Generate with AI'}
                </button>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material *
                </label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                  placeholder="e.g., PLA (eco-friendly)"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-6 h-6 text-pink-600" />
                <h2 className="text-lg font-semibold text-gray-900">Product Images *</h2>
              </div>
              <button
                type="button"
                onClick={() => addArrayItem('images')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">At least 1 image required (up to 5 recommended)</p>
            <div className="space-y-3">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleArrayChange('images', index, e.target.value)}
                    placeholder="Enter image URL"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  {formData.images.length > 1 && (
                    <Tooltip content="Remove image" position="left">
                      <button
                        type="button"
                        onClick={() => removeArrayItem('images', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowImageGallery(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                Select from Gallery
              </button>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileUpload('images', e)}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Upload from Device
              </label>
            </div>
          </div>

          {/* Videos */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 text-pink-600" />
                <h2 className="text-lg font-semibold text-gray-900">Product Videos (Optional)</h2>
              </div>
              <button
                type="button"
                onClick={() => addArrayItem('videos')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                <Plus className="w-4 h-4" />
                Add Video
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Videos are optional (up to 2 recommended)</p>
            <div className="space-y-3">
              {formData.videos.map((video, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
                  <input
                    type="url"
                    value={video}
                    onChange={(e) => handleArrayChange('videos', index, e.target.value)}
                    placeholder="Enter video URL"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <Tooltip content="Remove video" position="left">
                    <button
                      type="button"
                      onClick={() => removeArrayItem('videos', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowVideoGallery(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                Select from Gallery
              </button>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleFileUpload('videos', e)}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Upload from Device
              </label>
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Available Colors</h2>
              <button
                type="button"
                onClick={() => addArrayItem('colors')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                <Plus className="w-4 h-4" />
                Add Color
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formData.colors.map((color, index) => (
                <ColorPicker
                  key={index}
                  value={color}
                  onChange={(newColor) => handleArrayChange('colors', index, newColor)}
                  onRemove={() => removeArrayItem('colors', index)}
                  showRemove={formData.colors.length > 1}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Available Sizes</h2>
              <button
                type="button"
                onClick={() => addArrayItem('sizes')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                <Plus className="w-4 h-4" />
                Add Size
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formData.sizes.map((size, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => handleArrayChange('sizes', index, e.target.value)}
                    placeholder="Size (e.g., Small (5cm))"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  {formData.sizes.length > 1 && (
                    <Tooltip content="Remove size" position="left">
                      <button
                        type="button"
                        onClick={() => removeArrayItem('sizes', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <Link
              to="/admin/products"
              className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </Link>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-6 py-3 border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
              >
                <Eye className="w-5 h-5" />
                Preview
              </button>
              <button
                type="button"
                onClick={handleSaveAsDraft}
                className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Save className="w-5 h-5" />
                Save as Draft
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Image Gallery */}
      {showImageGallery && (
        <GallerySelector
          isOpen={showImageGallery}
          onClose={() => setShowImageGallery(false)}
          onSelect={(urls) => {
            const nonEmptyImages = formData.images.filter(img => img.trim());
            const newImages = [...nonEmptyImages, ...urls];
            setFormData({ ...formData, images: newImages });
          }}
          type="image"
        />
      )}

      {/* Video Gallery */}
      {showVideoGallery && (
        <GallerySelector
          isOpen={showVideoGallery}
          onClose={() => setShowVideoGallery(false)}
          onSelect={(urls) => {
            const nonEmptyVideos = formData.videos.filter(vid => vid.trim());
            const newVideos = [...nonEmptyVideos, ...urls];
            setFormData({ ...formData, videos: newVideos });
          }}
          type="video"
        />
      )}

      {/* Product Preview Modal */}
      <ProductPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        product={{
          id: 'preview',
          name: formData.name,
          price: formData.price,
          description: formData.description,
          category: formData.category,
          material: formData.material,
          images: formData.images.filter(img => img.trim()),
          videos: formData.videos.filter(vid => vid.trim()),
          colors: formData.colors.filter(col => col.trim()),
          sizes: formData.sizes.filter(sz => sz.trim())
        }}
      />
    </>
  );
}