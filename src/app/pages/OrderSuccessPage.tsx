import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { CheckCircle, Package, ShoppingBag, Home, Clock, Truck, CheckCheck, Heart, MessageCircle } from 'lucide-react';

export function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [showConfetti, setShowConfetti] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Show content with animation
    setTimeout(() => setShowContent(true), 100);
    
    // Hide confetti after 4 seconds
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    
    // Load order details from localStorage
    if (orderId) {
      const ordersData = localStorage.getItem('divineGifts3D_orders');
      if (ordersData) {
        const orders = JSON.parse(ordersData);
        const foundOrder = orders.find((o: any) => o.id === orderId);
        setOrder(foundOrder);
      }
    }
    
    return () => clearTimeout(timer);
  }, [orderId]);

  const sendWhatsAppMessage = () => {
    if (!order) return;

    // Create order details message
    const itemsList = order.items.map((item: any, index: number) => 
      `${index + 1}. ${item.name} - Qty: ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}${item.color ? ` (${item.color})` : ''}`
    ).join('%0A');

    const message = `*New Order - DivineGifts3D* 🎉%0A%0A` +
      `*Order ID:* ${order.id}%0A` +
      `*Customer:* ${order.userName}%0A` +
      `*Phone:* ${order.userPhone}%0A%0A` +
      `*Order Details:*%0A${itemsList}%0A%0A` +
      `*Subtotal:* ₹${order.subtotal.toFixed(2)}%0A` +
      `*Delivery:* ${order.delivery === 0 ? 'FREE' : '₹' + order.delivery.toFixed(2)}%0A` +
      `*Total Amount:* ₹${order.total.toFixed(2)}%0A%0A` +
      `*Payment Method:* ${order.paymentMethod}%0A%0A` +
      `_I have completed the payment and will send the payment screenshot now._`;

    // WhatsApp number
    const whatsappNumber = '919791939527';
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-primary/5 py-8 md:py-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(60)].map((_, i) => {
            const emoji = ['💝', '💖', '✨', '🎉', '💕'][i % 5];
            return (
              <div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animation: `fall ${3 + Math.random() * 2}s ease-in-out`,
                  opacity: 0.8,
                }}
              >
                {emoji}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>

      <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Success Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-primary to-accent rounded-full shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Order Confirmed! 🎉
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Thank you for choosing DivineGifts3D! Your order has been successfully placed and we're excited to create something special for you.
          </p>
        </div>

        {/* Order Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Order Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-primary/10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-sm text-muted-foreground">Order Number</h2>
                <p className="text-xl font-bold text-primary">{orderId}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-muted-foreground">Order Date</span>
                <span className="font-semibold">{new Date().toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span className="font-semibold text-primary">5-7 Business Days</span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  <CheckCheck className="w-4 h-4" />
                  Confirmed
                </span>
              </div>
            </div>
          </div>

          {/* Order Journey Card */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl shadow-lg p-6 md:p-8 border border-primary/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Your Order Journey
            </h2>
            
            <div className="space-y-5">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    ✓
                  </div>
                  <div className="w-0.5 h-full bg-gradient-to-b from-primary to-accent opacity-30 mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <h3 className="font-semibold mb-1">Order Confirmed</h3>
                  <p className="text-sm text-muted-foreground">Your order has been received and confirmed</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-white border-2 border-primary rounded-full flex items-center justify-center shadow">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <h3 className="font-semibold mb-1">3D Printing in Progress</h3>
                  <p className="text-sm text-muted-foreground">We'll start creating your items soon</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 text-gray-400">Out for Delivery</h3>
                  <p className="text-sm text-gray-400">Your order will be on its way!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Info Banner */}
        <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-col gap-4">
            <div className="flex items-start md:items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">📧 Email Confirmation Sent!</h3>
                <p className="text-white/90 text-sm md:text-base mb-2">
                  We've sent an order confirmation email to <span className="font-semibold">{order?.userId}</span> with all your order details.
                </p>
                <p className="text-white/90 text-sm">
                  You'll also receive WhatsApp updates at your registered number for order status, shipping details, and delivery timeline.
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/90">
                  <p className="font-semibold mb-1">What's Next?</p>
                  <ul className="space-y-1 text-xs">
                    <li>✓ Payment verification in progress</li>
                    <li>✓ Order confirmation email sent</li>
                    <li>✓ WhatsApp updates enabled</li>
                    <li>✓ 3D printing will start once payment is verified</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Link
            to="/account"
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white py-4 px-6 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Package className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Track Order
          </Link>
          
          <Link
            to="/products"
            className="group flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary py-4 px-6 rounded-xl hover:bg-primary hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Continue Shopping
          </Link>
          
          <Link
            to="/"
            className="group flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Support Section */}
        <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-primary/10 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <p className="text-muted-foreground mb-3">Need help with your order or have questions?</p>
          <a
            href="https://wa.me/919791939527"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold text-lg hover:scale-105 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}