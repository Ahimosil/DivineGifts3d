import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, MapPin, Package, LogOut, Edit, Trash2, Plus, Heart, X, Save, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  customizations?: any;
}

interface Order {
  id: string;
  userId?: string;
  userName?: string;
  userPhone?: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
  status: string;
  paymentMethod: string;
  paymentScreenshot?: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  
  // Address form states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Load orders from localStorage
  useEffect(() => {
    const ordersData = localStorage.getItem('divineGifts3D_orders');
    if (ordersData) {
      const allOrders = JSON.parse(ordersData);
      // Filter orders for current user if needed
      const userOrders = user?.email 
        ? allOrders.filter((order: Order) => order.userId === user.email)
        : allOrders;
      setOrders(userOrders);
    }
  }, [user]);

  // Load addresses from localStorage
  useEffect(() => {
    const addressesData = localStorage.getItem('divineGifts3D_addresses');
    if (addressesData) {
      const allAddresses = JSON.parse(addressesData);
      // Filter addresses for current user
      const userAddresses = user?.email 
        ? allAddresses.filter((addr: Address & { userId?: string }) => addr.userId === user.email)
        : allAddresses;
      setAddresses(userAddresses);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Address name is required (e.g., Home, Office)';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Address name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    // Address Line 1 validation
    if (!formData.addressLine1.trim()) {
      errors.addressLine1 = 'Address line is required';
    } else if (formData.addressLine1.trim().length < 5) {
      errors.addressLine1 = 'Please enter a complete address';
    }

    // City validation
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.city.trim())) {
      errors.city = 'City name should contain only letters';
    }

    // State validation
    if (!formData.state.trim()) {
      errors.state = 'State is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.state.trim())) {
      errors.state = 'State name should contain only letters';
    }

    // Pincode validation
    if (!formData.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^[1-9][0-9]{5}$/.test(formData.pincode.trim())) {
      errors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const openAddressForm = (address?: Address) => {
    if (address) {
      setEditingAddressId(address.id);
      setFormData({
        name: address.name,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || '',
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        isDefault: address.isDefault,
      });
    } else {
      setEditingAddressId(null);
      setFormData({
        name: '',
        phone: user?.phone || '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: addresses.length === 0, // First address is default
      });
    }
    setFormErrors({});
    setShowAddressForm(true);
  };

  const closeAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddressId(null);
    setFormData({
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
    setFormErrors({});
  };

  const saveAddress = () => {
    if (!validateForm()) {
      return;
    }

    const addressesData = localStorage.getItem('divineGifts3D_addresses');
    let allAddresses = addressesData ? JSON.parse(addressesData) : [];

    if (editingAddressId) {
      // Edit existing address
      allAddresses = allAddresses.map((addr: Address & { userId?: string }) => {
        if (addr.id === editingAddressId) {
          return {
            ...addr,
            ...formData,
          };
        }
        // If this address is being set as default, unset others for this user
        if (formData.isDefault && addr.userId === user?.email) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });
    } else {
      // Add new address
      const newAddress = {
        id: `addr_${Date.now()}`,
        userId: user?.email,
        ...formData,
      };

      // If this is default, unset other default addresses for this user
      if (formData.isDefault) {
        allAddresses = allAddresses.map((addr: Address & { userId?: string }) => {
          if (addr.userId === user?.email) {
            return { ...addr, isDefault: false };
          }
          return addr;
        });
      }

      allAddresses.push(newAddress);
    }

    localStorage.setItem('divineGifts3D_addresses', JSON.stringify(allAddresses));
    
    // Update local state
    const userAddresses = allAddresses.filter((addr: Address & { userId?: string }) => addr.userId === user?.email);
    setAddresses(userAddresses);
    
    closeAddressForm();
  };

  const deleteAddress = (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }

    const addressesData = localStorage.getItem('divineGifts3D_addresses');
    if (addressesData) {
      let allAddresses = JSON.parse(addressesData);
      allAddresses = allAddresses.filter((addr: Address) => addr.id !== id);
      localStorage.setItem('divineGifts3D_addresses', JSON.stringify(allAddresses));
      
      // Update local state
      const userAddresses = allAddresses.filter((addr: Address & { userId?: string }) => addr.userId === user?.email);
      setAddresses(userAddresses);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      case 'Shipped':
        return 'bg-purple-100 text-purple-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent text-white rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.name || 'Guest User'}</h1>
                <p className="text-pink-100">{user?.email || 'guest@example.com'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-4 px-6 font-semibold transition-colors ${
              activeTab === 'profile'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            <User className="w-5 h-5 inline-block mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-6 font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            <Package className="w-5 h-5 inline-block mr-2" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-4 px-6 font-semibold transition-colors ${
              activeTab === 'addresses'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            <MapPin className="w-5 h-5 inline-block mr-2" />
            Addresses
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  To update your profile information, please contact us at{' '}
                  <a href="mailto:divinegifts3d@gmail.com" className="text-primary hover:underline">
                    divinegifts3d@gmail.com
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
              </div>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No orders yet</p>
                  <Link
                    to="/products"
                    className="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-primary transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg">Order #{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                            order.status === 'confirmed' 
                              ? 'bg-green-100 text-green-700'
                              : getStatusColor(order.status)
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      
                      {/* Order Items Preview */}
                      <div className="mb-4 space-y-2">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity} {item.color ? `• ${item.color}` : ''}
                              </p>
                            </div>
                            <p className="text-sm font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs text-gray-500 pl-15">
                            +{order.items.length - 2} more item(s)
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
                          <p className="text-lg font-bold text-primary">₹{order.total.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{order.paymentMethod}</p>
                          {order.paymentScreenshot && (
                            <p className="text-xs text-green-600 mt-1">✓ Payment Verified</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                <button 
                  onClick={() => openAddressForm()}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add New Address
                </button>
              </div>
              {addresses.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No saved addresses</p>
                  <button 
                    onClick={() => openAddressForm()}
                    className="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                  >
                    Add Your First Address
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-primary transition-colors relative"
                    >
                      {address.isDefault && (
                        <span className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <h3 className="font-bold text-lg mb-2">{address.name}</h3>
                      <p className="text-gray-600 text-sm mb-1">{address.addressLine1}</p>
                      {address.addressLine2 && (
                        <p className="text-gray-600 text-sm mb-1">{address.addressLine2}</p>
                      )}
                      <p className="text-gray-600 text-sm mb-1">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-gray-600 text-sm mb-4">Phone: {address.phone}</p>
                      <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button 
                          onClick={() => openAddressForm(address)}
                          className="flex items-center gap-2 text-primary hover:underline text-sm font-semibold"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAddress(address.id)}
                          className="flex items-center gap-2 text-red-600 hover:underline text-sm font-semibold"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Address Form Modal */}
        {showAddressForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-primary to-accent text-white p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">
                    {editingAddressId ? 'Edit Address' : 'Add New Address'}
                  </h2>
                </div>
                <button
                  onClick={closeAddressForm}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Address Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Home, Office, Mom's Place"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      formErrors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-primary focus:border-transparent'
                    }`}
                  />
                  {formErrors.name && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{formErrors.name}</span>
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      formErrors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-primary focus:border-transparent'
                    }`}
                  />
                  {formErrors.phone && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{formErrors.phone}</span>
                    </div>
                  )}
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine1}
                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    placeholder="House No., Building Name, Street"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      formErrors.addressLine1
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-primary focus:border-transparent'
                    }`}
                  />
                  {formErrors.addressLine1 && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{formErrors.addressLine1}</span>
                    </div>
                  )}
                </div>

                {/* Address Line 2 (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Line 2 <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    placeholder="Landmark, Area"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* City, State, Pincode - 3 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="City"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        formErrors.city
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-primary focus:border-transparent'
                      }`}
                    />
                    {formErrors.city && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.city}</span>
                      </div>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="State"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        formErrors.state
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-primary focus:border-transparent'
                      }`}
                    />
                    {formErrors.state && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.state}</span>
                      </div>
                    )}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="6 digits"
                      maxLength={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        formErrors.pincode
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-primary focus:border-transparent'
                      }`}
                    />
                    {formErrors.pincode && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.pincode}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Set as Default Checkbox */}
                <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="isDefault" className="flex-1 text-sm font-medium text-gray-700 cursor-pointer">
                    Set as default address
                    <p className="text-xs text-gray-500 mt-1">This address will be selected by default during checkout</p>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={saveAddress}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <Save className="w-5 h-5" />
                    {editingAddressId ? 'Update Address' : 'Save Address'}
                  </button>
                  <button
                    onClick={closeAddressForm}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Promotional Section */}
        <div className="mt-8 bg-gradient-to-r from-primary to-accent text-white rounded-xl p-8 text-center">
          <Package className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Free Shipping Available</h3>
          <p className="mb-4">Get free shipping on all orders above ₹500</p>
          <Link
            to="/products"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}