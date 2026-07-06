import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { pb } from '../../api/pocketbase';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    orderType,
    setOrderType,
    addressOrTable,
    setAddressOrTable,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    clearCart
  } = useCart();

  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setError('Please fill in your name and phone number.');
      return;
    }
    if ((orderType === 'Dine In' || orderType === 'Delivery') && !addressOrTable.trim()) {
      setError(`Please provide your ${orderType === 'Dine In' ? 'Table Number' : 'Delivery Address'}.`);
      return;
    }

    setLoading(true);
    setError('');

    const trackingId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderPayload = {
      orderId: trackingId,
      customerName,
      customerPhone,
      orderType,
      addressOrTable,
      notes,
      items: cartItems.map(item => ({
        foodId: item.foodId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.total
      })),
      subtotal,
      totalAmount: total,
      status: 'Pending',
      invoiceGenerated: false
    };

    try {
      // Save order to PocketBase
      const record = await pb.collection('orders').create(orderPayload);
      clearCart();
      navigate(`/order-success/${record.id}`);
    } catch (err) {
      console.warn('PocketBase save failed. Simulating offline order success.', err);
      // Fallback: save to localStorage for offline simulator
      const offlineOrders = JSON.parse(localStorage.getItem('sp_offline_orders') || '[]');
      const offlineRecord = { ...orderPayload, id: trackingId, created: new Date().toISOString() };
      offlineOrders.push(offlineRecord);
      localStorage.setItem('sp_offline_orders', JSON.stringify(offlineOrders));
      
      clearCart();
      navigate(`/order-success/${trackingId}`);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-brand-maroon-800/30 rounded-full flex items-center justify-center text-brand-gold">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl text-white font-bold">Your cart is empty</h2>
        <button
          onClick={() => navigate('/menu')}
          className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3 px-8 rounded-full transition-all"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-4">
      <button
        onClick={() => navigate('/menu')}
        className="flex items-center gap-2 text-brand-gold hover:text-brand-orange mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Menu
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div className="bg-card-dark border border-brand-maroon-800 rounded-3xl p-8">
          <h2 className="font-serif text-3xl text-white font-bold mb-6">Contact & Details</h2>
          
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-offwhite/80 mb-2">Name</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-brand-maroon-900/50 border border-brand-maroon-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-offwhite/80 mb-2">Mobile Number</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full bg-brand-maroon-900/50 border border-brand-maroon-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-offwhite/80 mb-2">Order Type</label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value as any)}
                  className="w-full bg-brand-maroon-900/50 border border-brand-maroon-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange"
                >
                  <option value="Dine In">Dine In</option>
                  <option value="Take Away">Take Away</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>

              {orderType !== 'Take Away' && (
                <div>
                  <label className="block text-sm font-medium text-brand-offwhite/80 mb-2">
                    {orderType === 'Dine In' ? 'Table Number' : 'Delivery Address'}
                  </label>
                  <input
                    type="text"
                    required
                    value={addressOrTable}
                    onChange={(e) => setAddressOrTable(e.target.value)}
                    placeholder={orderType === 'Dine In' ? 'e.g. 4' : 'Address'}
                    className="w-full bg-brand-maroon-900/50 border border-brand-maroon-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-offwhite/80 mb-2">Special Instructions / Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Allergies, extra spicy, contactless delivery, etc."
                rows={3}
                className="w-full bg-brand-maroon-900/50 border border-brand-maroon-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange resize-none"
              />
            </div>

            {error && <p className="text-red-500 font-bold text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-serif font-black text-lg py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {loading ? 'Placing Order...' : `Place Order (₹${total.toFixed(0)})`}
            </button>
          </form>
        </div>

        {/* Order Summary Recap */}
        <div className="bg-brand-maroon-800/20 border border-brand-maroon-800 p-8 rounded-3xl self-start">
          <h3 className="font-serif text-2xl text-white font-bold mb-6">Order Summary</h3>
          
          <div className="divide-y divide-brand-maroon-800/80 mb-6">
            {cartItems.map((item) => (
              <div key={item.foodId} className="py-4 flex justify-between items-center text-sm">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${item.vegType === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                    {item.name}
                  </div>
                  <span className="text-brand-offwhite/60">₹{item.price} × {item.quantity}</span>
                </div>
                <span className="font-bold text-brand-gold">₹{item.total}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm border-t border-brand-maroon-800 pt-6">
            <div className="flex justify-between text-brand-offwhite/80">
              <span>Subtotal</span>
              <span className="font-bold text-white">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-brand-offwhite/80">
              <span>Taxes (5% GST)</span>
              <span className="font-bold text-white">₹{tax.toFixed(0)}</span>
            </div>
            <div className="flex justify-between border-t border-brand-maroon-800 pt-3 text-lg text-white">
              <span className="font-serif font-bold">Total</span>
              <span className="font-bold text-brand-gold">₹{total.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
