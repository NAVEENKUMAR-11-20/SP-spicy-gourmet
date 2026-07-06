import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Receipt, ArrowRight } from 'lucide-react';
import { pb, Invoice } from '../../api/pocketbase';

const InvoicesList: React.FC = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchInvoices = async () => {
    try {
      const records = await pb.collection('invoices').getFullList<Invoice>({
        sort: '-deliveredAt'
      });
      setInvoices(records);
    } catch (e) {
      const offlineInvoices = JSON.parse(localStorage.getItem('sp_offline_invoices') || '[]');
      setInvoices(offlineInvoices);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const filteredInvoices = invoices.filter((invoice) => {
    return (
      invoice.customerName.toLowerCase().includes(search.toLowerCase()) ||
      invoice.customerPhone.includes(search) ||
      invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase())
    );
  });

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-black text-gray-900">Invoices Directory</h1>
        <p className="text-gray-500 text-sm">
          Browse and print invoices. Invoices are automatically generated only when orders are marked Delivered.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 items-center shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoice #, name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        {filteredInvoices.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-bold text-gray-700 text-lg">No invoices found</h3>
            <p className="text-gray-500 text-sm">Delivered orders will appear here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold uppercase">
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Delivered Time</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 text-sm text-gray-800 transition-colors">
                    <td className="py-4 px-4 font-bold font-mono text-gray-900">{invoice.invoiceNumber}</td>
                    <td className="py-4 px-4 font-medium">{invoice.customerName}</td>
                    <td className="py-4 px-4 text-gray-500">{invoice.customerPhone}</td>
                    <td className="py-4 px-4 font-bold text-emerald-600">₹{invoice.totalAmount}</td>
                    <td className="py-4 px-4 text-gray-500">{formatDate(invoice.deliveredAt)}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => navigate(`/admin/invoices/${invoice.id}`)}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 ml-auto"
                      >
                        Print View <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicesList;
