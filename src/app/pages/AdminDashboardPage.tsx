import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useProducts } from '../contexts/ProductsContext';
import { AdminNav } from '../components/AdminNav';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Tooltip } from '../components/Tooltip';
import { 
  LogOut, 
  Package, 
  Image, 
  ShoppingCart, 
  TrendingUp,
  BarChart3,
  Grid3x3,
  Edit,
  RefreshCw,
  AlertCircle,
  Palette
} from 'lucide-react';

export function AdminDashboardPage() {
  const { isAdminAuthenticated, adminLogout } = useAdminAuth();
  const { products, resetProducts } = useProducts();
  const navigate = useNavigate();
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const handleReset = () => {
    resetProducts();
    setShowResetModal(false);
    window.location.reload(); // Reload to sync with new products
  };

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      title: 'Categories',
      value: new Set(products.map(p => p.category)).size,
      icon: Grid3x3,
      color: 'bg-purple-500',
      link: '/admin/products'
    },
    {
      title: 'Image Gallery',
      value: 'Manage',
      icon: Image,
      color: 'bg-pink-500',
      link: '/admin/images'
    },
    {
      title: 'Total Revenue',
      value: '₹' + products.reduce((sum, p) => sum + p.price, 0).toLocaleString(),
      icon: TrendingUp,
      color: 'bg-green-500',
      link: '/admin/products'
    },
  ];

  const categories = Array.from(new Set(products.map(p => p.category)));
  const categoryStats = categories.map(cat => ({
    category: cat,
    count: products.filter(p => p.category === cat).length
  }));

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">DivineGifts3D Management Portal</p>
            </div>
            <AdminNav />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Admin' }, { label: 'Dashboard' }]} />
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/products/add"
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors group"
            >
              <div className="bg-pink-100 p-3 rounded-lg group-hover:bg-pink-200 transition-colors">
                <Package className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Add New Product</h3>
                <p className="text-sm text-gray-600">Create a new product</p>
              </div>
            </Link>

            <Link
              to="/admin/products"
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Edit className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Manage Products</h3>
                <p className="text-sm text-gray-600">Edit existing products</p>
              </div>
            </Link>

            <Link
              to="/admin/images"
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
            >
              <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Image className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Upload Images</h3>
                <p className="text-sm text-gray-600">Manage image assets</p>
              </div>
            </Link>

            <Link
              to="/admin/theme-settings"
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
            >
              <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200 transition-colors">
                <Palette className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Theme Settings</h3>
                <p className="text-sm text-gray-600">Customize appearance</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Products by Category</h2>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-400" />
              <Tooltip content="Reset to default products">
                <button
                  onClick={() => setShowResetModal(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </Tooltip>
            </div>
          </div>
          <div className="space-y-4">
            {categoryStats.map((stat, index) => {
              const percentage = (stat.count / products.length) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{stat.category}</span>
                    <span className="text-sm text-gray-600">{stat.count} products</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reset Products Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Reset Products Database?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This will restore all products to the default catalog, including the new keychain products. Any custom products you've added or modifications you've made will be lost.
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  This action cannot be undone.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Reset Products
                  </button>
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}