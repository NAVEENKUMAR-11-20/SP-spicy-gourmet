import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Receipt, Truck, Check } from 'lucide-react';
import { pb, Order, Invoice } from '../../api/pocketbase';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);

  const fetchOrder = async () => {
    if (!id) return;
    try {
      const record = await pb.collection('orders').getOne<Order>(id);
      setOrder(record);
      if (record.invoiceGenerated) {
        // Attempt to load invoice
        const invoices = await pb.collection('invoices').getList<Invoice>(1, 1, {
          filter: `orderId = "${record.id}"`
        });
        if (invoices.items.length > 0) {
          setInvoiceId(invoices.items[0].id);
        }
      }
    } catch (e) {
      // Offline fallback
      const offlineOrders = JSON.parse(localStorage.getItem('sp_offline_orders') || '[]');
      const found = offlineOrders.find((o: any) => o.id === id || o.orderId === id);
      if (found) {
        setOrder(found);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleStatusChange = async (newStatus: Order['status']) => {
    if (!order) return;
    setUpdating(true);

    const isDelivered = newStatus === 'Delivered';
    const deliveredAt = isDelivered ? new Date().toISOString() : undefined;
    const invoiceGenerated = isDelivered ? true : order.invoiceGenerated;

    try {
      // Update order in PocketBase
      const updatedRecord = await pb.collection('orders').update<Order>(order.id, {
        status: newStatus,
        deliveredAt,
        invoiceGenerated
      });

      // If transition to Delivered: generate Invoice record
      if (isDelivered) {
        const invNum = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
        const invoicePayload = {
          invoiceNumber: invNum,
          orderId: order.id,
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          items: order.items,
          totalAmount: order.totalAmount,
          deliveredAt: deliveredAt!
        };
        const invoiceRecord = await pb.collection('invoices').create<Invoice>(invoicePayload);
        setInvoiceId(invoiceRecord.id);
      }

      setOrder(updatedRecord);
    } catch (e) {
      console.warn('PocketBase status update failed. Emulating offline status update.', e);
      // Fallback offline handler
      const offlineOrders = JSON.parse(localStorage.getItem('sp_offline_orders') || '[]');
      const updated = offlineOrders.map((o: any) => {
        if (o.id === order.id || o.orderId === order.id) {
          const res = { ...o, status: newStatus, deliveredAt, invoiceGenerated };
          if (isDelivered) {
            // Emulate offline invoices
            const offlineInvoices = JSON.parse(localStorage.getItem('sp_offline_invoices') || '[]');
            const invId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
            offlineInvoices.push({
              id: invId,
              invoiceNumber: invId,
              orderId: o.id,
              customerName: o.customerName,
              customerPhone: o.customerPhone,
              items: o.items,
              totalAmount: o.totalAmount,
              deliveredAt: new Date().toISOString()
            });
            localStorage.setItem('sp_offline_invoices', JSON.stringify(offlineInvoices));
            setInvoiceId(invId);
          }
          return res;
        }
        return o;
      });
      localStorage.setItem('sp_offline_orders', JSON.stringify(updated));
      const found = updated.find((o: any) => o.id === order.id || o.orderId === order.id);
      if (found) setOrder(found);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading order info...</div>;
  }

  if (!order) {
    return <div className="p-8 text-center text-red-500">Order not found.</div>;
  }

  const isDineIn = order.orderType === 'Dine In';
  const showCancel = order.status === 'Pending' || order.status === 'Preparing';

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/admin/orders')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-semibold"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Orders
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h1 className="text-2xl font-serif font-black text-gray-900">
                  Order Details
                </h1>
                <span className="font-mono text-xs text-gray-400 font-bold uppercase tracking-wider">
                  System ID: {order.id}
                </span>
              </div>
              <span className="bg-emerald-50 text-emerald-700 font-bold font-mono text-lg px-4 py-2 rounded-xl">
                {order.orderId}
              </span>
            </div>

            {/* Customer info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="text-gray-400 block text-xs font-bold uppercase mb-1">Customer Name</span>
                <span className="font-bold text-gray-900">{order.customerName}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs font-bold uppercase mb-1">Mobile Phone</span>
                <span className="font-bold text-gray-900">{order.customerPhone}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs font-bold uppercase mb-1">Order Mode</span>
                <span className="font-bold text-gray-900 uppercase">{order.orderType}</span>
              </div>
              {order.addressOrTable && (
                <div>
                  <span className="text-gray-400 block text-xs font-bold uppercase mb-1">
                    {isDineIn ? 'Table Number' : 'Delivery Address'}
                  </span>
                  <span className="font-bold text-gray-900">{order.addressOrTable}</span>
                </div>
              )}
            </div>

            {order.notes && (
              <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-sm text-yellow-800">
                <strong>Instructions:</strong> {order.notes}
              </div>
            )}
          </div>

          {/* Items breakdown */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">Ordered Items</h3>
            <div className="divide-y divide-gray-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex justify-between items-center text-sm">
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <span className="text-gray-400">Quantity: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-gray-900">₹{item.total}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 text-lg font-bold text-gray-900">
                <span>Total Amount Due</span>
                <span className="text-emerald-600">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Actions Sidebar */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm self-start space-y-6">
          <h3 className="font-serif text-xl font-bold text-gray-900">Order Management</h3>

          {/* Current Status Badge */}
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-2">Current Status</span>
            <span className="bg-emerald-50 text-emerald-700 font-bold px-4 py-2 rounded-xl border border-emerald-100 inline-block capitalize">
              {order.status}
            </span>
          </div>

          {/* Action Step flow buttons */}
          <div className="space-y-3">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Advance State</span>
            
            {order.status === 'Pending' && (
              <button
                onClick={() => handleStatusChange('Preparing')}
                disabled={updating}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Mark as Preparing
              </button>
            )}

            {order.status === 'Preparing' && (
              <button
                onClick={() => handleStatusChange('Ready')}
                disabled={updating}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Mark as Ready
              </button>
            )}

            {order.status === 'Ready' && order.orderType === 'Delivery' && (
              <button
                onClick={() => handleStatusChange('Out for Delivery')}
                disabled={updating}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-5 h-5" /> Mark Out for Delivery
              </button>
            )}

            {((order.status === 'Ready' && order.orderType !== 'Delivery') || order.status === 'Out for Delivery') && (
              <button
                onClick={() => handleStatusChange('Delivered')}
                disabled={updating}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" /> Confirm Delivery / Handover
              </button>
            )}

            {showCancel && (
              <button
                onClick={() => handleStatusChange('Cancelled')}
                disabled={updating}
                className="w-full border border-red-200 hover:bg-red-50 text-red-600 font-bold py-3 px-4 rounded-xl transition-all text-center block"
              >
                Cancel Order
              </button>
            )}
          </div>

          {/* Invoice generated action */}
          {order.invoiceGenerated && invoiceId && (
            <div className="border-t border-gray-100 pt-6">
              <button
                onClick={() => navigate(`/admin/invoices/${invoiceId}`)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Receipt className="w-5 h-5" /> View Invoice
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
