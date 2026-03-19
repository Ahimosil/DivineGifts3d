import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { QrCode, Check, Loader, Lock, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export function PaymentPageSimplified() {
  const { items, getTotalPrice, getSubtotal, getDeliveryCharge, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);
  const [copiedUPI, setCopiedUPI] = useState(false);

  // Redirect to cart if no items
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  // Real UPI ID
  const realUPI = 'ahimsapriyad@okaxis';
  const totalAmount = getTotalPrice();

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(realUPI);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  const handleConfirmPayment = () => {
    if (!qrScanned) {
      alert('⚠️ Please scan the QR code or make the payment first');
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
        date: new Date().toISOString(),
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          color: item.selectedColor,
        })),
        subtotal: getSubtotal(),
        delivery: getDeliveryCharge(),
        total: getTotalPrice(),
        status: 'confirmed',
        paymentMethod: 'upi-qr',
      };

      // Save to user's orders
      const existingOrders = localStorage.getItem('divineGifts3D_orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(order);
      localStorage.setItem('divineGifts3D_orders', JSON.stringify(orders));

      // Clear cart
      clearCart();

      // Navigate to success page
      navigate(`/order-success?orderId=${orderId}`);
    }, 2000);
  };

  // Don't render if no items (will redirect via useEffect)
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <h1 className="text-4xl font-bold mb-8">Complete Your Payment</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* QR Code Payment */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Scan & Pay</h2>
                  <p className="text-muted-foreground">Pay using any UPI app</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* QR Code */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border-4 border-primary/20 shadow-xl">
                    {/* QR Code Placeholder */}
                    <div className="w-64 h-64 bg-white rounded-xl border-2 border-gray-200 flex items-center justify-center">
                      <div className="text-center p-4">
                        <QrCode className="w-20 h-20 mx-auto text-primary mb-4" />
                        <p className="font-bold text-gray-900 mb-2">UPI QR Code</p>
                        <p className="text-sm text-gray-600 mb-3">Pay to: Ahimsa Priya</p>
                        <code className="text-xs bg-gray-100 px-3 py-1 rounded font-mono block">
                          {realUPI}
                        </code>
                        <p className="text-xs text-gray-500 mt-3">
                          Amount: ₹{totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4 max-w-xs">
                    Scan this QR code with any UPI app like PhonePe, Google Pay, Paytm, or BHIM
                  </p>
                </div>

                {/* Instructions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4">How to Pay:</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <p className="font-semibold">Open any UPI app</p>
                          <p className="text-sm text-muted-foreground">PhonePe, Google Pay, Paytm, BHIM, etc.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <p className="font-semibold">Scan the QR code</p>
                          <p className="text-sm text-muted-foreground">Use the scanner in your UPI app</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <p className="font-semibold">Enter UPI PIN</p>
                          <p className="text-sm text-muted-foreground">Complete the payment of ₹{totalAmount.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                          4
                        </div>
                        <div>
                          <p className="font-semibold">Click "I've Paid" below</p>
                          <p className="text-sm text-muted-foreground">After successful payment</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UPI ID Option */}
                  <div className="border-t pt-6">
                    <p className="text-sm font-semibold mb-3">Or pay directly to UPI ID:</p>
                    <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <code className="flex-1 font-mono text-sm">{realUPI}</code>
                      <button
                        onClick={handleCopyUPI}
                        className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm"
                      >
                        {copiedUPI ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Confirmation Checkbox */}
              <div className="border-t pt-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={qrScanned}
                    onChange={(e) => setQrScanned(e.target.checked)}
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary mt-1"
                  />
                  <div>
                    <p className="font-semibold group-hover:text-primary transition-colors">
                      I have completed the payment
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Check this box after making the payment through your UPI app
                    </p>
                  </div>
                </label>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing || !qrScanned}
                className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  qrScanned
                    ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl transform hover:scale-[1.02]'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-6 h-6 animate-spin" />
                    Confirming Payment...
                  </>
                ) : qrScanned ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Confirm Payment & Place Order
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-6 h-6" />
                    Complete Payment First
                  </>
                )}
              </button>
            </div>

            {/* Important Notice */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">Payment Confirmation Required</h4>
                  <p className="text-sm text-amber-700">
                    After making the payment via UPI, please check the "I have completed the payment" box and click "Confirm Payment" to place your order. Your order will be processed after payment verification.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900 mb-1">Safe & Secure Payment</h4>
                <p className="text-sm text-green-700">
                  UPI payments are secure and instant. Your payment information is protected by bank-grade encryption.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}`} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedColor} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">₹{(item.product.price * item.quantity).toFixed(2)}</p>
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
                  <span className={getDeliveryCharge() === 0 ? 'text-green-600 font-semibold' : ''}>
                    {getDeliveryCharge() === 0 ? 'FREE' : `₹${getDeliveryCharge().toFixed(2)}`}
                  </span>
                </div>
                {getSubtotal() >= 500 && (
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    <span>Free delivery unlocked!</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold border-t pt-3">
                  <span>Total</span>
                  <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Promotional Banner */}
              <div className="mt-6 bg-gradient-to-r from-primary to-accent text-white p-4 rounded-xl text-center">
                <p className="text-sm font-semibold">✨ Special Offer</p>
                <p className="text-xs opacity-90">Free shipping on orders above ₹500!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}