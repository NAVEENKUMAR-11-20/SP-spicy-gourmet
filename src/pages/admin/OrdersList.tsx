import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import { pb, Order } from '../../api/pocketbase';

const OrdersList: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const fetchOrders = async () => {
    try {
      const records = await pb.collection('orders').getFullList<Order>({
        sort: '-created'
      });
      setOrders(records);
    } catch (e) {
      const offlineOrders = JSON.parse(localStorage.getItem('sp_offline_orders') || '[]');
      setOrders(offlineOrders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // Listen for live updates
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerPhone.includes(search) ||
      (order.orderId || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesType = typeFilter === 'All' || order.orderType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-gray-900">All Orders</h1>
          <p className="text-gray-500 text-sm">Monitor, filter, and drill down into all guest orders.</p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Order ID, name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-emerald-500 w-full md:w-auto"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-emerald-500 w-full md:w-auto"
        >
          <option value="All">All Dining Types</option>
          <option value="Dine In">Dine In</option>
          <option value="Take Away">Take Away</option>
        </select>
      </div>

      {/* Orders Grid/Table */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-bold text-gray-700 text-lg">No orders match filters</h3>
            <p className="text-gray-500 text-sm">Try broadening your search or filter tags.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold uppercase">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Table / Destination</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => {
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
                      <td className="py-4 px-4 font-medium">{order.customerName}</td>
                      <td className="py-4 px-4 text-gray-500">{order.customerPhone}</td>
                      <td className="py-4 px-4 capitalize font-semibold">{order.orderType}</td>
                      <td className="py-4 px-4">{order.addressOrTable || '-'}</td>
                      <td className="py-4 px-4 font-bold text-gray-900">₹{order.totalAmount}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => navigate(`/admin/orders/${order.id}`)}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                        >
                          Manage
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

export default OrdersList;
