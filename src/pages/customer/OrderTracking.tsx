import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, MapPin, CheckCircle, Flame, Check } from 'lucide-react';
import { pb, Order } from '../../api/pocketbase';

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Status mapping
  const statuses: Order['status'][] = ['Pending', 'Preparing', 'Ready', 'Delivered'];
  
  const getStatusIndex = (currentStatus: Order['status']) => {
    const idx = statuses.indexOf(currentStatus);
    return idx === -1 ? 0 : idx;
  };

  const getStatusExplanation = (currentStatus: Order['status']) => {
    switch (currentStatus) {
      case 'Pending':
        return 'Our kitchen is reviewing your order. Getting ready to heat up the tandoor!';
      case 'Preparing':
        return 'Master chefs are blending spices and preparing your gourmet dish right now.';
      case 'Ready':
        return 'Your food is cooked to perfection and packed/plated. Ready to serve!';
      case 'Delivered':
        return 'Order complete. Enjoy your meal! Please speak with us for any further requests.';
      case 'Cancelled':
        return 'This order was cancelled. Please speak with your server or call us.';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (!orderId) return;

    let isSubscribed = true;

    const fetchInitial = async () => {
      try {
        const record = await pb.collection('orders').getOne<Order>(orderId);
        if (isSubscribed) {
          setOrder(record);
          setLoading(false);
        }
      } catch (err) {
        console.warn('PocketBase fetch failed. Checking local mock orders.', err);
        const offlineOrders = JSON.parse(localStorage.getItem('sp_offline_orders') || '[]');
        const found = offlineOrders.find((o: any) => o.id === orderId || o.orderId === orderId);
        if (isSubscribed) {
          if (found) {
            setOrder(found);
          }
          setLoading(false);
        }
      }
    };

    fetchInitial();

    let unsubscribeFn: (() => void) | undefined;
    
    pb.collection('orders').subscribe<Order>(orderId, (e) => {
      if (isSubscribed && e.record) {
        setOrder(e.record);
      }
    }).then((unsub) => {
      unsubscribeFn = unsub;
    }).catch(err => {
      console.warn('Realtime subscription failed, falling back to polling/simulated updates.', err);
    });

    return () => {
      isSubscribed = false;
      if (unsubscribeFn) {
        unsubscribeFn();
      }
    };
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto text-center py-24 space-y-4">
        <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-brand-offwhite/60">Locating your gourmet order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto text-center py-16 flex flex-col items-center gap-6">
        <h2 className="font-serif text-2xl text-white font-bold">Order Not Found</h2>
        <p className="text-brand-offwhite/60">We could not find an order with the ID: {orderId}</p>
        <button
          onClick={() => navigate('/lookup')}
          className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3 px-8 rounded-full transition-all"
        >
          Look Up Another Order
        </button>
      </div>
    );
  }

  const currentIdx = getStatusIndex(order.status);
  const isCancelled = order.status === 'Cancelled';
  const activeStatuses = statuses;
  const currentActiveIdx = activeStatuses.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="text-center mb-10 space-y-2">
        <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Real-Time Tracker</span>
        <h1 className="font-serif font-black text-4xl text-brand-orange">Track Your Feast</h1>
        <div className="text-brand-offwhite/60 font-mono text-sm">Order ID: {order.orderId || order.id}</div>
      </div>

      <div className="bg-card-dark border border-brand-maroon-800 rounded-3xl p-8 space-y-10 mb-8 shadow-xl">
        {/* Status explanation header */}
        <div className="flex gap-4 items-start bg-brand-maroon-900/60 border border-brand-maroon-800 p-5 rounded-2xl">
          <div className="bg-brand-orange p-3 rounded-xl text-white shrink-0 shadow-md">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif text-brand-orange font-bold text-xl mb-1">
              {isCancelled ? 'Order Cancelled' : order.status}
            </h4>
            <p className="text-brand-offwhite/90 text-sm leading-relaxed">
              {getStatusExplanation(order.status)}
            </p>
          </div>
        </div>

        {/* Step-by-Step progress tracker */}
        {!isCancelled && (
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 py-6 md:px-4">
            {/* Connector Line - fixed vertical offset to top-5 aligning with circle centers */}
            <div className="absolute top-[38px] left-[50px] right-[50px] h-1 bg-brand-orange/20 -translate-y-1/2 hidden md:block z-0" />
            <div 
              className="absolute top-[38px] left-[50px] h-1 bg-brand-orange -translate-y-1/2 hidden md:block z-0 transition-all duration-500" 
              style={{ width: `${(currentActiveIdx / (activeStatuses.length - 1)) * 90}%` }}
            />

            {activeStatuses.map((step, index) => {
              const isCompleted = index <= currentActiveIdx;
              const isCurrent = index === currentActiveIdx;

              return (
                <div key={step} className="flex flex-col items-center relative z-10 flex-1 w-full text-center">
                  {/* Step Circle */}
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted 
                        ? 'bg-brand-orange border-brand-orange text-white shadow-md' 
                        : 'bg-brand-maroon-900 border-brand-orange/20 text-brand-offwhite'
                    } ${isCurrent ? 'ring-4 ring-brand-orange/25 animate-pulse scale-110' : ''}`}
                  >
                    {isCompleted ? <Check className="w-5 h-5 text-white" /> : <span>{index + 1}</span>}
                  </div>
                  
                  {/* Step Label */}
                  <div className="mt-3">
                    <div className={`font-serif text-sm font-bold ${isCompleted ? 'text-brand-orange' : 'text-brand-offwhite/50'}`}>
                      {step}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary Recap card */}
      <div className="bg-card-dark border border-brand-maroon-800 p-8 rounded-3xl space-y-6 shadow-xl">
        <h3 className="font-serif text-xl font-bold text-brand-orange mb-2">Dining Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-brand-offwhite">
          <div>
            <span className="block text-brand-gold font-bold mb-1">Customer</span>
            <span className="text-brand-offwhite font-bold">{order.customerName}</span>
          </div>
          <div>
            <span className="block text-brand-gold font-bold mb-1">Order Type</span>
            <span className="text-brand-offwhite font-bold uppercase">{order.orderType}</span>
          </div>
          {order.addressOrTable && (
            <div>
              <span className="block text-brand-gold font-bold mb-1">
                Table Number
              </span>
              <span className="text-brand-offwhite font-bold">{order.addressOrTable}</span>
            </div>
          )}
        </div>

        <div className="border-t border-brand-maroon-800/40 pt-4">
          <h4 className="font-bold text-brand-orange mb-3 text-sm">Items Ordered</h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <span className="text-brand-offwhite">{item.name} <strong className="text-brand-gold">× {item.quantity}</strong></span>
                <span className="text-brand-offwhite font-bold">₹{item.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-brand-maroon-800/40 pt-4 flex justify-between items-center">
          <span className="text-brand-orange font-serif font-bold">Total Amount paid/owing</span>
          <span className="text-xl font-bold text-brand-orange">₹{order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
