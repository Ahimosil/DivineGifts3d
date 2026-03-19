import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './components/MainLayout';
import { AdminLayout } from './components/AdminLayout';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentPageSimplified } from './pages/PaymentPageSimplified';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AccountPage } from './pages/AccountPage';
import { AdminImageUploadPage } from './pages/AdminImageUploadPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminProductsPage } from './pages/AdminProductsPage';
import { AdminProductEditPage } from './pages/AdminProductEditPage';
import { AdminProductAddPage } from './pages/AdminProductAddPage';
import { AdminThemeSettingsPage } from './pages/AdminThemeSettingsPage';

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AdminAuthProvider>
              <ProductsProvider>
                <Routes>
                  {/* Main Website Routes */}
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/custom-order" element={<CustomOrderPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/payment" element={<PaymentPageSimplified />} />
                    <Route path="/order-success" element={<OrderSuccessPage />} />
                    <Route path="/account" element={<AccountPage />} />
                  </Route>

                  {/* Admin Routes - Completely Separate */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="login" element={<AdminLoginPage />} />
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route path="images" element={<AdminImageUploadPage />} />
                    <Route path="products" element={<AdminProductsPage />} />
                    <Route path="products/add" element={<AdminProductAddPage />} />
                    <Route path="products/edit/:id" element={<AdminProductEditPage />} />
                    <Route path="theme-settings" element={<AdminThemeSettingsPage />} />
                  </Route>
                </Routes>
              </ProductsProvider>
            </AdminAuthProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
