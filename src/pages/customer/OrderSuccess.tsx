import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ShoppingCart } from 'lucide-react';
import { pb } from '../../api/pocketbase';

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [displayId, setDisplayId] = useState(orderId || '');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        const order = await pb.collection('orders').getOne(orderId);
        setDisplayId(order.orderId || order.id);
      } catch (err) {
        // Fallback for offline/local simulation
        const offlineOrders = JSON.parse(localStorage.getItem('sp_offline_orders') || '[]');
        const found = offlineOrders.find((o: any) => o.id === orderId || o.orderId === orderId);
        if (found) {
          setDisplayId(found.orderId || found.id);
        }
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="max-w-md mx-auto text-center py-16 flex flex-col items-center gap-6">
      <div className="bg-green-500/10 p-6 rounded-full border border-green-500/20 text-green-500 animate-bounce">
        <CheckCircle2 className="w-16 h-16" />
      </div>

      <div className="space-y-2">
        <h1 className="font-serif font-black text-4xl text-white">Order Confirmed!</h1>
        <p className="text-brand-offwhite/80">
          Your gourmet dining order has been received by the kitchen.
        </p>
      </div>

      <div className="w-full bg-brand-maroon-800/20 border border-brand-maroon-800 p-6 rounded-2xl space-y-2">
        <span className="text-xs uppercase tracking-wider text-brand-gold font-bold">Order ID</span>
        <div className="text-2xl font-black text-white font-mono">{displayId}</div>
      </div>

      <div className="w-full flex flex-col gap-4 mt-4">
        <button
          onClick={() => navigate(`/track/${orderId}`)}
          className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-serif font-black text-lg py-4 px-6 rounded-full transition-all flex items-center justify-center gap-2 group shadow-lg"
        >
          Track My Order
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => navigate('/menu')}
          className="w-full bg-brand-maroon-800/40 hover:bg-brand-maroon-800/60 border border-brand-maroon-800 text-brand-gold font-serif font-bold text-base py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" /> Order More Items
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
