import { useState } from 'react';
import { Upload, Palette, Ruler, Send } from 'lucide-react';

export function CustomOrderPage() {
  const [formData, setFormData] = useState({
    size: 'Small',
    color: 'White',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hi! I'd like to request a custom 3D print:\\n\\nSize: ${formData.size}\\nColor: ${formData.color}\\nNotes: ${formData.notes}`
    );
    window.open(`https://wa.me/919791939527?text=${message}`, '_blank');
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Custom Order</h1>
          <p className="text-xl text-muted-foreground">
            Bring your ideas to life with our custom 3D printing service
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="mb-2">1. Share Your Idea</h3>
            <p className="text-muted-foreground">
              Upload a reference image or describe what you want
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-full mb-4">
              <Palette className="w-8 h-8" />
            </div>
            <h3 className="mb-2">2. Choose Details</h3>
            <p className="text-muted-foreground">
              Select your preferred size and color options
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
              <Send className="w-8 h-8" />
            </div>
            <h3 className="mb-2">3. We Print & Deliver</h3>
            <p className="text-muted-foreground">
              We'll create your custom piece and deliver it to you
            </p>
          </div>
        </div>

        {/* Custom Order Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload Section */}
            <div>
              <label className="block mb-2">
                Upload Reference Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG up to 10MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Or share via WhatsApp when submitting your order
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block mb-2">
                <Ruler className="w-5 h-5 inline mr-2" />
                Select Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Small', 'Medium', 'Large'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData({ ...formData, size })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.size === size
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block mb-2">
                <Palette className="w-5 h-5 inline mr-2" />
                Select Color
              </label>
              <div className="grid grid-cols-4 gap-3">
                {['White', 'Black', 'Blue', 'Red', 'Green', 'Yellow', 'Teal', 'Orange'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.color === color
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="notes" className="block mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={5}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Tell us more about your custom print idea..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Request Custom Print (WhatsApp)
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="mb-3">Need Help?</h3>
          <p className="text-muted-foreground">
            Not sure what's possible? Contact us on WhatsApp and we'll help you bring your vision to life. 
            We can work with STL files, images, or even just your description!
          </p>
        </div>
      </div>
    </div>
  );
}