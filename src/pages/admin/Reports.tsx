import React, { useEffect, useState } from 'react';
import { pb, Order } from '../../api/pocketbase';
import { BarChart3, TrendingUp, DollarSign, RefreshCw } from 'lucide-react';

const Reports: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveredOrders = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('orders').getFullList<Order>({
        filter: 'status = "Delivered"',
        sort: '-deliveredAt'
      });
      setOrders(records);
    } catch (e) {
      const offlineOrders = JSON.parse(localStorage.getItem('sp_offline_orders') || '[]');
      setOrders(offlineOrders.filter((o: any) => o.status === 'Delivered'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveredOrders();
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

  // Breakdown by type
  const typeCounts = orders.reduce((acc, o) => {
    acc[o.orderType] = (acc[o.orderType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top Selling Items calculations
  const itemQuantities = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      acc[item.name] = (acc[item.name] || 0) + item.quantity;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedItems = Object.entries(itemQuantities)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-gray-900 flex items-center gap-2">
            <BarChart3 className="text-emerald-600" /> Reports & Analytics
          </h1>
          <p className="text-gray-500 text-sm">Review total revenue, dining channels, and item rankings (Delivered orders only).</p>
        </div>
        <button
          onClick={fetchDeliveredOrders}
          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold p-3 rounded-xl transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl shrink-0">
            <DollarSign className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">Gross Revenue</span>
            <h4 className="text-3xl font-black text-gray-900">₹{totalSales.toLocaleString()}</h4>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl shrink-0">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">Delivered Orders</span>
            <h4 className="text-3xl font-black text-gray-900">{totalOrders}</h4>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl shrink-0">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">Average Ticket</span>
            <h4 className="text-3xl font-black text-gray-900">₹{avgOrderValue.toLocaleString()}</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dining channels summary */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">Sales by Dining Type</h3>
          
          <div className="space-y-4">
            {['Dine In', 'Take Away', 'Delivery'].map((type) => {
              const count = typeCounts[type] || 0;
              const pct = totalOrders > 0 ? (count / totalOrders) * 100 : 0;
              
              return (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-gray-700">{type}</span>
                    <span className="text-gray-900">{count} orders ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top-Selling Items rank list */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">Top-Selling Dishes</h3>
          
          {sortedItems.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-12">No items ordered yet.</p>
          ) : (
            <div className="space-y-4">
              {sortedItems.map(([name, qty], idx) => (
                <div key={name} className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-800 text-sm font-medium">{name}</span>
                  </div>
                  <span className="text-gray-900 font-bold text-sm bg-gray-100 px-3 py-1 rounded-full">{qty} units</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
