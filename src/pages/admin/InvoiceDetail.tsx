import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, Flame } from 'lucide-react';
import { pb, Invoice } from '../../api/pocketbase';

const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!id) return;
      try {
        const record = await pb.collection('invoices').getOne<Invoice>(id);
        setInvoice(record);
      } catch (e) {
        // offline fallback
        const offlineInvoices = JSON.parse(localStorage.getItem('sp_offline_invoices') || '[]');
        const found = offlineInvoices.find((inv: any) => inv.id === id || inv.invoiceNumber === id);
        if (found) setInvoice(found);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading invoice details...</div>;
  }

  if (!invoice) {
    return <div className="p-8 text-center text-red-500">Invoice not found.</div>;
  }

  const subtotal = invoice.items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.05;

  return (
    <div className="space-y-6">
      {/* Action buttons (hidden on print) */}
      <div className="flex justify-between items-center print:hidden">
        <button
          onClick={() => navigate('/admin/invoices')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Invoices
        </button>

        <div className="flex gap-4">
          <button
            onClick={handlePrint}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Printer className="w-5 h-5" /> Print Invoice
          </button>
        </div>
      </div>

      {/* Invoice Page Container */}
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-3xl p-8 shadow-md print:shadow-none print:border-none print:p-0">
        <div className="flex justify-between items-start border-b border-gray-100 pb-6">
          <div className="flex items-center gap-2">
            <Flame className="w-8 h-8 text-red-600" />
            <div>
              <h2 className="font-serif font-black text-2xl text-gray-900">SP SPICY GOURMET</h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Fine Indian Dining</p>
            </div>
          </div>
          
          <div className="text-right">
            <h1 className="font-serif font-black text-2xl text-gray-900 uppercase">Invoice</h1>
            <span className="font-mono text-sm font-bold text-gray-700">{invoice.invoiceNumber}</span>
          </div>
        </div>

        {/* Address and Bill To */}
        <div className="grid grid-cols-2 gap-8 py-6 text-sm text-gray-700">
          <div>
            <span className="text-gray-400 block text-xs font-bold uppercase mb-1">From</span>
            <strong className="text-gray-900">SP Spicy Gourmet Restaurant</strong>
            <p className="text-gray-500 mt-1">123 Culinary Avenue, Food District, New Delhi, 110001</p>
          </div>
          <div>
            <span className="text-gray-400 block text-xs font-bold uppercase mb-1">Bill To</span>
            <strong className="text-gray-900">{invoice.customerName}</strong>
            <p className="text-gray-500 mt-1">Phone: {invoice.customerPhone}</p>
          </div>
        </div>

        {/* Date and Order Ref */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 grid grid-cols-2 gap-4 text-xs font-semibold uppercase text-gray-500 mb-6">
          <div>
            <span>Date Generated</span>
            <span className="block text-gray-900 font-bold mt-1 font-mono">
              {new Date(invoice.deliveredAt).toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span>Ref Order ID</span>
            <span className="block text-gray-900 font-bold mt-1 font-mono">{invoice.orderId}</span>
          </div>
        </div>

        {/* Table of items */}
        <table className="w-full text-left border-collapse mb-8 text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
              <th className="py-3">Dish / Item</th>
              <th className="py-3 text-center">Qty</th>
              <th className="py-3 text-right">Price</th>
              <th className="py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoice.items.map((item, idx) => (
              <tr key={idx} className="text-gray-800">
                <td className="py-4 font-medium">{item.name}</td>
                <td className="py-4 text-center">{item.quantity}</td>
                <td className="py-4 text-right">₹{item.price}</td>
                <td className="py-4 text-right font-bold text-gray-900">₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals column */}
        <div className="border-t border-gray-100 pt-6 max-w-xs ml-auto space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes (5% GST)</span>
            <span>₹{tax.toFixed(0)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-3 text-lg font-bold text-gray-900">
            <span>Total Paid</span>
            <span className="text-emerald-600">₹{invoice.totalAmount}</span>
          </div>
        </div>

        {/* Invoice Footer note */}
        <div className="text-center text-xs text-gray-400 font-medium pt-12 border-t border-gray-100 mt-8">
          Thank you for dining with us! We hope to serve you again soon.
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
