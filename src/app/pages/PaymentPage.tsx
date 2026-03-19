import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, Smartphone, Building, Wallet, Lock, Check, Loader, QrCode, CheckCircle, Upload, X, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export function PaymentPage() {
  const { items, getTotalPrice, getSubtotal, getDeliveryCharge, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

  // Redirect to cart if no items
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      
      setScreenshotFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = () => {
    setPaymentScreenshot(null);
    setScreenshotFile(null);
  };

  const handlePayment = async () => {
    if (!paymentScreenshot) {
      alert('Please upload your payment screenshot to confirm the payment');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Generate order ID
      const orderId = `DG3D${Date.now()}`;
      
      // Store order details
      const order = {
        id: orderId,
        userId: user?.email,
        userName: user?.name,
        userPhone: user?.phone || '9791939527',
        date: new Date().toISOString(),
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
          quantity: item.quantity,
          color: item.selectedColor,
          customizations: item.customizations,
        })),
        subtotal: getSubtotal(),
        delivery: getDeliveryCharge(),
        total: getTotalPrice(),
        status: 'confirmed',
        paymentMethod: 'UPI/QR Code',
        paymentScreenshot: paymentScreenshot,
      };

      // Save to user's orders
      const existingOrders = localStorage.getItem('divineGifts3D_orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(order);
      localStorage.setItem('divineGifts3D_orders', JSON.stringify(orders));

      // Create WhatsApp message with order details
      const itemsList = order.items.map((item: any, index: number) => 
        `${index + 1}. ${item.name} - Qty: ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}${item.color ? ` (${item.color})` : ''}`
      ).join('%0A');

      const whatsappMessage = `*New Order - DivineGifts3D* 🎉%0A%0A` +
        `*Order ID:* ${order.id}%0A` +
        `*Customer:* ${order.userName}%0A` +
        `*Phone:* ${order.userPhone}%0A` +
        `*Email:* ${order.userId}%0A%0A` +
        `*Order Details:*%0A${itemsList}%0A%0A` +
        `*Subtotal:* ₹${order.subtotal.toFixed(2)}%0A` +
        `*Delivery:* ${order.delivery === 0 ? 'FREE' : '₹' + order.delivery.toFixed(2)}%0A` +
        `*Total Amount:* ₹${order.total.toFixed(2)}%0A%0A` +
        `*Payment Method:* ${order.paymentMethod}%0A%0A` +
        `_I have completed the payment. Attaching payment screenshot below._`;

      const whatsappNumber = '919791939527';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      // Clear cart
      clearCart();

      // Navigate to success page in current tab (small delay to ensure WhatsApp opens first)
      setTimeout(() => {
        navigate(`/order-success?orderId=${orderId}`);
      }, 500);
    }, 2000);
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
          onClick={() => navigate('/checkout')}
          className="flex items-center gap-2 text-primary hover:text-accent mb-6 font-semibold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Checkout
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
            <div className="w-16 h-1 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <span className="ml-2 text-sm font-medium">Address</span>
            </div>
            <div className="w-16 h-1 bg-primary"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-primary">Payment</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">Complete Your Payment</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* QR Code Payment Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* QR Code Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Scan & Pay</h2>
                  <p className="text-muted-foreground">Pay using any UPI app</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* QR Code */}
                <div className="flex-shrink-0">
                  <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-primary/20">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=divinegifts3d@paytm&pn=DivineGifts3D&am=0&cu=INR"
                      alt="Payment QR Code"
                      className="w-64 h-64"
                    />
                  </div>
                  <p className="text-center mt-4 font-semibold text-primary">
                    Amount: ₹{getTotalPrice().toFixed(2)}
                  </p>
                </div>

                {/* Instructions */}
                <div className="flex-1">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Open Your UPI App</h3>
                        <p className="text-sm text-muted-foreground">
                          Google Pay, PhonePe, Paytm, or any UPI app
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Scan QR Code</h3>
                        <p className="text-sm text-muted-foreground">
                          Use the scanner in your UPI app to scan the QR code
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Complete Payment</h3>
                        <p className="text-sm text-muted-foreground">
                          Enter amount ₹{getTotalPrice().toFixed(2)} and complete payment
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Upload Screenshot</h3>
                        <p className="text-sm text-muted-foreground">
                          Take a screenshot of successful payment and upload below
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* UPI ID - Alternative */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/20">
                    <p className="text-sm font-semibold mb-2">Or pay directly to UPI ID:</p>
                    <div className="flex items-center gap-2">
                      <code className="bg-white px-3 py-2 rounded text-primary font-mono text-sm flex-1">
                        divinegifts3d@paytm
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('divinegifts3d@paytm');
                          alert('UPI ID copied!');
                        }}
                        className="px-3 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm font-semibold"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshot Upload Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Upload Payment Screenshot</h2>
                  <p className="text-muted-foreground">Required to confirm your order</p>
                </div>
              </div>

              {!paymentScreenshot ? (
                <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/60 transition-colors">
                  <Upload className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Upload Screenshot</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Take a screenshot of your successful payment and upload it here
                  </p>
                  <label className="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer">
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-muted-foreground mt-3">
                    PNG, JPG or JPEG (Max 5MB)
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={paymentScreenshot}
                    alt="Payment Screenshot"
                    className="w-full max-h-96 object-contain rounded-xl border border-gray-200"
                  />
                  <button
                    onClick={removeScreenshot}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="mt-4 flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Screenshot uploaded successfully!</span>
                  </div>
                </div>
              )}
            </div>

            {/* Important Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Important</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Make sure to complete the payment of exact amount ₹{getTotalPrice().toFixed(2)}</li>
                  <li>• Upload a clear screenshot showing successful payment</li>
                  <li>• Your order will be confirmed once we verify the payment</li>
                  <li>• You'll receive updates on WhatsApp at your registered number</li>
                </ul>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900 mb-1">Safe & Secure Payment</h4>
                <p className="text-sm text-green-700">
                  Your payment information is encrypted and secure. All UPI transactions are protected.
                </p>
              </div>
            </div>
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
                      {item.selectedColor && (
                        <p className="text-xs text-muted-foreground">Color: {item.selectedColor}</p>
                      )}
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
                onClick={handlePayment}
                disabled={isProcessing || !paymentScreenshot}
                className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {paymentScreenshot ? 'Confirm Order & Send to WhatsApp' : 'Upload Screenshot to Continue'}
                  </>
                )}
              </button>
              
              {!paymentScreenshot && (
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Please upload payment screenshot to confirm your order
                </p>
              )}
              
              {paymentScreenshot && (
                <p className="text-xs text-center text-muted-foreground mt-3">
                  ✓ WhatsApp will open in a new tab. Attach your payment screenshot there.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}