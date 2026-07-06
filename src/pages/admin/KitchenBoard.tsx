import React, { useEffect, useState } from 'react';
import { pb, Order } from '../../api/pocketbase';
import { ChefHat, Flame, ArrowRight, Check } from 'lucide-react';

const KitchenBoard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveOrders = async () => {
    try {
      const records = await pb.collection('orders').getFullList<Order>({
        filter: 'status != "Delivered" && status != "Cancelled"',
        sort: 'created'
      });
      setOrders(records);
    } catch (e) {
      const offlineOrders = JSON.parse(localStorage.getItem('sp_offline_orders') || '[]');
      setOrders(offlineOrders.filter((o: any) => o.status !== 'Delivered' && o.status !== 'Cancelled'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveOrders();

    // Live sync
    let unsubscribeFn: (() => void) | undefined;
    pb.collection('orders').subscribe<Order>('*', () => {
      fetchActiveOrders();
    }).then(unsub => {
      unsubscribeFn = unsub;
    });

    return () => {
      if (unsubscribeFn) unsubscribeFn();
    };
  }, []);

  const handleAdvance = async (orderId: string, currentStatus: Order['status'], orderType: Order['orderType']) => {
    let nextStatus: Order['status'] = currentStatus;
    if (currentStatus === 'Pending') nextStatus = 'Preparing';
    else if (currentStatus === 'Preparing') nextStatus = 'Ready';
    else if (currentStatus === 'Ready') {
      if (orderType === 'Delivery') nextStatus = 'Out for Delivery';
      else nextStatus = 'Delivered';
    } else if (currentStatus === 'Out for Delivery') nextStatus = 'Delivered';

    const isDelivered = nextStatus === 'Delivered';
    const deliveredAt = isDelivered ? new Date().toISOString() : undefined;
    const invoiceGenerated = isDelivered ? true : false; // simplifies for local

    try {
      await pb.collection('orders').update(orderId, {
        status: nextStatus,
        deliveredAt,
        invoiceGenerated
      });

      if (isDelivered) {
        // Trigger invoice
        const invNum = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
        const order = orders.find(o => o.id === orderId);
        if (order) {
          await pb.collection('invoices').create({
            invoiceNumber: invNum,
            orderId: order.id,
            customerName: order.customerName,
            customerPhone: order.customerPhone,
            items: order.items,
            totalAmount: order.totalAmount,
            deliveredAt: deliveredAt!
          });
        }
      }
      fetchActiveOrders();
    } catch (err) {
      console.warn('Kitchen state advance offline fallback', err);
      // offline fallback update
      const offlineOrders = JSON.parse(localStorage.getItem('sp_offline_orders') || '[]');
      const updated = offlineOrders.map((o: any) => {
        if (o.id === orderId) {
          const res = { ...o, status: nextStatus, deliveredAt, invoiceGenerated };
          if (isDelivered) {
            const offlineInvoices = JSON.parse(localStorage.getItem('sp_offline_invoices') || '[]');
            offlineInvoices.push({
              id: `INV-${Date.now()}`,
              invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
              orderId: o.id,
              customerName: o.customerName,
              customerPhone: o.customerPhone,
              items: o.items,
              totalAmount: o.totalAmount,
              deliveredAt: new Date().toISOString()
            });
            localStorage.setItem('sp_offline_invoices', JSON.stringify(offlineInvoices));
          }
          return res;
        }
        return o;
      });
      localStorage.setItem('sp_offline_orders', JSON.stringify(updated));
      fetchActiveOrders();
    }
  };

  const columns: { title: string; status: Order['status']; bg: string }[] = [
    { title: 'Pending', status: 'Pending', bg: 'bg-gray-100 border-gray-200' },
    { title: 'Preparing', status: 'Preparing', bg: 'bg-yellow-50/50 border-yellow-200' },
    { title: 'Ready', status: 'Ready', bg: 'bg-blue-50/50 border-blue-200' }
  ];

  return (
    <div className="h-[80vh] flex flex-col space-y-6">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-serif font-black text-gray-900 flex items-center gap-2">
            <ChefHat className="text-emerald-600" /> Kitchen Live Display
          </h1>
          <p className="text-gray-500 text-sm">Tap cards to advance order processing stages instantly.</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0 overflow-y-auto">
        {columns.map((col) => {
          const colOrders = orders.filter(o => o.status === col.status);

          return (
            <div key={col.title} className="flex flex-col bg-white border border-gray-200 rounded-3xl p-4 min-h-[300px]">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4 shrink-0">
                <span className="font-bold text-gray-800 text-base">{col.title}</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-bold">
                  {colOrders.length}
                </span>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                {colOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`border rounded-2xl p-4 shadow-sm space-y-4 transition-all hover:scale-[1.02] ${col.bg}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-gray-900 text-sm">{order.orderId}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white border capitalize">
                        {order.orderType}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-gray-800 text-sm">
                        {order.orderType === 'Dine In' ? `Table ${order.addressOrTable}` : order.customerName}
                      </div>
                      {order.notes && (
                        <div className="text-xs text-red-600 font-medium">
                          Note: {order.notes}
                        </div>
                      )}
                    </div>

                    {/* Ordered items summary */}
                    <div className="border-t border-gray-100 pt-3 space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-xs text-gray-600 flex justify-between">
                          <span>{item.name}</span>
                          <strong className="text-gray-900 font-bold">× {item.quantity}</strong>
                        </div>
                      ))}
                    </div>

                    {/* Tap to Advance button */}
                    <button
                      onClick={() => handleAdvance(order.id, order.status, order.orderType)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      {order.status === 'Ready' && order.orderType !== 'Delivery' ? (
                        <><Check className="w-3.5 h-3.5" /> Serve Order</>
                      ) : (
                        <><ArrowRight className="w-3.5 h-3.5" /> Advance State</>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KitchenBoard;
