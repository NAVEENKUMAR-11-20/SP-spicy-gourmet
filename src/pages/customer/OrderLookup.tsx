import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ClipboardList } from 'lucide-react';
import { pb } from '../../api/pocketbase';

const OrderLookup: React.FC = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() && !phone.trim()) {
      setError('Please enter an Order ID or Phone Number to search.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let matchedId = '';
      
      if (orderId.trim()) {
        // Search by orderId or pocketbase id
        try {
          const records = await pb.collection('orders').getList(1, 1, {
            filter: `orderId = "${orderId}" || id = "${orderId}"`
          });
          if (records.items.length > 0) {
            matchedId = records.items[0].id;
          }
        } catch (e) {
          // ignore or let it try offline
        }
      }

      if (!matchedId && phone.trim()) {
        // Search by phone
        try {
          const records = await pb.collection('orders').getList(1, 1, {
            filter: `customerPhone = "${phone}"`,
            sort: '-created'
          });
          if (records.items.length > 0) {
            matchedId = records.items[0].id;
          }
        } catch (e) {
          // ignore
        }
      }

      // Check offline orders if matchedId is still empty
      if (!matchedId) {
        const offlineOrders = JSON.parse(localStorage.getItem('sp_offline_orders') || '[]');
        const found = offlineOrders.find((o: any) => 
          (orderId && (o.id === orderId || o.orderId === orderId)) || 
          (!orderId && phone && o.customerPhone === phone)
        );
        if (found) {
          matchedId = found.id;
        }
      }

      if (matchedId) {
        navigate(`/track/${matchedId}`);
      } else {
        setError('No matching orders found. Please check your credentials.');
      }
    } catch (err) {
      setError('Something went wrong during lookup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="text-center mb-10 space-y-3">
        <div className="bg-brand-maroon-800/40 p-4 rounded-full border border-brand-orange/20 text-brand-gold w-16 h-16 mx-auto flex items-center justify-center">
          <ClipboardList className="w-8 h-8" />
        </div>
        <h1 className="font-serif font-black text-4xl text-white">Find Your Order</h1>
        <p className="text-brand-offwhite/60 text-sm">
          Enter your Order ID or the Mobile Number used during checkout to track your meal.
        </p>
      </div>

      <div className="bg-card-dark border border-brand-maroon-800 rounded-3xl p-8 shadow-2xl">
        <form onSubmit={handleLookup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-offwhite/85 mb-2">Order ID</label>
            <input
              type="text"
              placeholder="e.g. ORD-1234"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-brand-maroon-900/60 border border-brand-maroon-800 rounded-2xl px-5 py-4 text-white uppercase focus:outline-none focus:border-brand-orange"
            />
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-brand-maroon-800/60"></div>
            <span className="flex-shrink mx-4 text-brand-offwhite/40 text-xs font-bold uppercase">OR</span>
            <div className="flex-grow border-t border-brand-maroon-800/60"></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-offwhite/85 mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="e.g. +91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-brand-maroon-900/60 border border-brand-maroon-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-orange"
            />
          </div>

          {error && <p className="text-red-500 font-bold text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-serif font-black text-lg py-4 px-6 rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-75"
          >
            <Search className="w-5 h-5" /> {loading ? 'Searching...' : 'Find Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderLookup;
