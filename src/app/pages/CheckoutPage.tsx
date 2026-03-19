import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Plus, Check, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import type { Address } from '../contexts/AuthContext';

export function CheckoutPage() {
  const { user, addAddress } = useAuth();
  const { items, getSubtotal, getDeliveryCharge, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState(
    user?.addresses?.find(a => a.isDefault)?.id || user?.addresses?.[0]?.id || ''
  );
  const [showAddressForm, setShowAddressForm] = useState(!user?.addresses || user.addresses.length === 0);
  
  // New address form state
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: user?.name || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  // Validation errors state
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    pincode?: string;
  }>({});

  // Redirect to cart if no items
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  const handleInputChange = (field: keyof typeof newAddress, value: string | boolean) => {
    setNewAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = () => {
    const validationErrors: typeof errors = {};
    
    // Name validation
    if (!newAddress.name || newAddress.name.trim() === '') {
      validationErrors.name = 'Full name is required';
    } else if (newAddress.name.trim().length < 3) {
      validationErrors.name = 'Name must be at least 3 characters';
    }
    
    // Phone validation
    if (!newAddress.phone || newAddress.phone.trim() === '') {
      validationErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(newAddress.phone.replace(/\s/g, ''))) {
      validationErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Address Line 1 validation
    if (!newAddress.addressLine1 || newAddress.addressLine1.trim() === '') {
      validationErrors.addressLine1 = 'Address is required';
    } else if (newAddress.addressLine1.trim().length < 5) {
      validationErrors.addressLine1 = 'Address must be at least 5 characters';
    }
    
    // City validation
    if (!newAddress.city || newAddress.city.trim() === '') {
      validationErrors.city = 'City is required';
    } else if (newAddress.city.trim().length < 2) {
      validationErrors.city = 'Please enter a valid city name';
    }
    
    // State validation
    if (!newAddress.state || newAddress.state.trim() === '') {
      validationErrors.state = 'State is required';
    } else if (newAddress.state.trim().length < 2) {
      validationErrors.state = 'Please enter a valid state name';
    }
    
    // Pincode validation
    if (!newAddress.pincode || newAddress.pincode.trim() === '') {
      validationErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(newAddress.pincode.replace(/\s/g, ''))) {
      validationErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});
    
    addAddress(newAddress);
    setShowAddressForm(false);
    
    // Reset form
    setNewAddress({
      name: user?.name || '',
      phone: user?.phone || '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
    
    // Set this as selected address after saving
    setTimeout(() => {
      if (user?.addresses) {
        const lastAddress = user.addresses[user.addresses.length - 1];
        if (lastAddress) {
          setSelectedAddressId(lastAddress.id);
        }
      }
    }, 100);
  };

  const handleContinueToPayment = () => {
    if (!selectedAddressId && !showAddressForm) {
      alert('Please select a delivery address');
      return;
    }
    navigate('/payment');
  };

  // Don't render if no items (will redirect via useEffect)
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-primary hover:text-accent mb-6 font-semibold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </button>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <span className="ml-2 text-sm font-medium">Cart</span>
            </div>
            <div className="w-16 h-1 bg-primary"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-primary">Address</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-muted-foreground">Payment</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8">Delivery Address</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Address Selection */}
          <div className="lg:col-span-2">
            {/* Saved Addresses */}
            {user?.addresses && user.addresses.length > 0 && !showAddressForm && (
              <div className="space-y-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
                {user.addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddressId(address.id)}
                    className={`bg-white p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedAddressId === address.id
                        ? 'border-primary shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold">{address.name}</h3>
                          {address.isDefault && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground">{address.phone}</p>
                        <p className="text-muted-foreground mt-2">
                          {address.addressLine1}
                          {address.addressLine2 && `, ${address.addressLine2}`}
                        </p>
                        <p className="text-muted-foreground">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                      </div>
                      {selectedAddressId === address.id && (
                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Address Button */}
            {!showAddressForm && (
              <button
                onClick={() => setShowAddressForm(true)}
                className="w-full border-2 border-dashed border-primary text-primary py-4 rounded-xl hover:bg-primary/5 transition-all flex items-center justify-center gap-2 mb-6"
              >
                <Plus className="w-5 h-5" />
                Add New Address
              </button>
            )}

            {/* New Address Form */}
            {showAddressForm && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/10">
                <h2 className="text-xl font-semibold mb-6">
                  {user?.addresses && user.addresses.length > 0 ? 'Add New Address' : 'Enter Delivery Address'}
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={newAddress.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                        required
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">⚠️ {errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={newAddress.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="9876543210"
                        required
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">⚠️ {errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Address Line 1 *</label>
                    <input
                      type="text"
                      value={newAddress.addressLine1}
                      onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="House no., Building name"
                      required
                    />
                    {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">⚠️ {errors.addressLine1}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={newAddress.addressLine2}
                      onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Road name, Area, Colony"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Chennai"
                        required
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">⚠️ {errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input
                        type="text"
                        value={newAddress.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Tamil Nadu"
                        required
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">⚠️ {errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Pincode *</label>
                      <input
                        type="text"
                        value={newAddress.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.pincode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="600001"
                        required
                      />
                      {errors.pincode && <p className="text-red-500 text-sm mt-1">⚠️ {errors.pincode}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="defaultAddress"
                      checked={newAddress.isDefault || false}
                      onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="defaultAddress" className="text-sm text-muted-foreground">
                      Save as default address
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveAddress}
                      className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Save Address
                    </button>
                    {user?.addresses && user.addresses.length > 0 && (
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="px-6 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className={getDeliveryCharge() === 0 ? 'text-green-600' : ''}>
                    {getDeliveryCharge() === 0 ? 'FREE' : `₹${getDeliveryCharge().toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total</span>
                  <span className="text-primary">₹{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleContinueToPayment}
                disabled={!selectedAddressId && !showAddressForm}
                className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}