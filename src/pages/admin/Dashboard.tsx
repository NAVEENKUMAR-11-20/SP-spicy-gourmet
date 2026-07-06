import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  XCircle,
  Play
} from 'lucide-react';
import { pb, Order } from '../../api/pocketbase';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial orders
  const fetchOrders = async () => {
    try {
      const records = await pb.collection('orders').getFullList<Order>({
        sort: '-created'
      });
      setOrders(records);
    } catch (e) {
      // Fallback load mock offline orders
      const offlineOrders = JSON.parse(localStorage.getItem('sp_offline_orders') || '[]');
      setOrders(offlineOrders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Realtime subscription
    let unsubscribeFn: (() => void) | undefined;
    pb.collection('orders').subscribe<Order>('*', () => {
      fetchOrders();
    }).then(unsub => {
      unsubscribeFn = unsub;
    });

    return () => {
      if (unsubscribeFn) unsubscribeFn();
    };
  }, []);

  // Compute metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const preparingOrders = orders.filter(o => o.status === 'Preparing').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;

  const totalSales = orders
    .filter(o => o.status === 'Delivered')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const formatCurrency = (val: number) => `₹${val.toLocaleString()}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm">Real-time overview of SP Spicy Gourmet ordering operations.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold uppercase text-gray-400">Total Orders</span>
          <div className="flex justify-between items-end mt-2">
            <span className="text-3xl font-bold text-gray-900">{totalOrders}</span>
            <ShoppingBag className="text-emerald-500 w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold uppercase text-gray-400">Pending</span>
          <div className="flex justify-between items-end mt-2">
            <span className="text-3xl font-bold text-yellow-600">{pendingOrders}</span>
            <Clock className="text-yellow-500 w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold uppercase text-gray-400">Preparing</span>
          <div className="flex justify-between items-end mt-2">
            <span className="text-3xl font-bold text-blue-600">{preparingOrders}</span>
            <Play className="text-blue-500 w-6 h-6 animate-pulse" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold uppercase text-gray-400">Delivered</span>
          <div className="flex justify-between items-end mt-2">
            <span className="text-3xl font-bold text-green-600">{deliveredOrders}</span>
            <CheckCircle className="text-green-500 w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold uppercase text-gray-400">Cancelled</span>
          <div className="flex justify-between items-end mt-2">
            <span className="text-3xl font-bold text-red-600">{cancelledOrders}</span>
            <XCircle className="text-red-500 w-6 h-6" />
          </div>
        </div>

        <div className="bg-emerald-600 p-6 rounded-2xl text-white flex flex-col justify-between shadow-md">
          <span className="text-xs font-semibold uppercase opacity-75">Total Sales</span>
          <div className="flex justify-between items-end mt-2">
            <span className="text-2xl font-bold">{formatCurrency(totalSales)}</span>
            <TrendingUp className="opacity-75 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders Feed (Live)</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-12">No orders placed yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold uppercase">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Dest / Table</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice(0, 10).map((order) => {
                  let badgeColor = 'bg-gray-100 text-gray-700';
                  if (order.status === 'Pending') badgeColor = 'bg-gray-100 text-gray-700';
                  if (order.status === 'Preparing') badgeColor = 'bg-amber-100 text-amber-700';
                  if (order.status === 'Ready') badgeColor = 'bg-blue-100 text-blue-700';
                  if (order.status === 'Out for Delivery') badgeColor = 'bg-purple-100 text-purple-700';
                  if (order.status === 'Delivered') badgeColor = 'bg-green-100 text-green-700';
                  if (order.status === 'Cancelled') badgeColor = 'bg-red-100 text-red-700';

                  return (
                    <tr key={order.id} className="hover:bg-gray-50 text-sm text-gray-800 transition-colors">
                      <td className="py-4 px-4 font-bold font-mono text-gray-900">{order.orderId || order.id}</td>
                      <td className="py-4 px-4">{order.customerName}</td>
                      <td className="py-4 px-4 capitalize font-semibold">{order.orderType}</td>
                      <td className="py-4 px-4">{order.addressOrTable || '-'}</td>
                      <td className="py-4 px-4 font-bold">{formatCurrency(order.totalAmount)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => navigate(`/admin/orders/${order.id}`)}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
