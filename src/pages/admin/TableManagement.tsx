import React, { useEffect, useState } from 'react';
import { pb, Table } from '../../api/pocketbase';
import { TableProperties, Plus, Link, Trash2, ArrowRight } from 'lucide-react';

const TableManagement: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [error, setError] = useState('');

  const fetchTables = async () => {
    try {
      const records = await pb.collection('tables').getFullList<Table>({
        sort: 'tableNumber'
      });
      setTables(records);
    } catch (e) {
      // offline tables simulation
      const offlineTables = JSON.parse(localStorage.getItem('sp_offline_tables') || '[]');
      if (offlineTables.length === 0) {
        // seed mock
        const mock = [
          { id: '1', tableNumber: '1', status: 'Available' },
          { id: '2', tableNumber: '2', status: 'Occupied' },
          { id: '3', tableNumber: '3', status: 'Needs Cleaning' },
          { id: '4', tableNumber: '4', status: 'Available' },
        ] as Table[];
        localStorage.setItem('sp_offline_tables', JSON.stringify(mock));
        setTables(mock);
      } else {
        setTables(offlineTables);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleAddTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNumber.trim()) return;
    setError('');

    const exists = tables.some(t => t.tableNumber === newTableNumber);
    if (exists) {
      setError('Table already exists.');
      return;
    }

    try {
      await pb.collection('tables').create({
        tableNumber: newTableNumber,
        status: 'Available'
      });
      setNewTableNumber('');
      fetchTables();
    } catch (err) {
      // offline fallback add
      const offline = JSON.parse(localStorage.getItem('sp_offline_tables') || '[]');
      offline.push({
        id: `table-${Date.now()}`,
        tableNumber: newTableNumber,
        status: 'Available'
      });
      localStorage.setItem('sp_offline_tables', JSON.stringify(offline));
      setNewTableNumber('');
      fetchTables();
    }
  };

  const handleUpdateStatus = async (tableId: string, newStatus: Table['status']) => {
    try {
      await pb.collection('tables').update(tableId, { status: newStatus });
      fetchTables();
    } catch (err) {
      // offline update status
      const offline = JSON.parse(localStorage.getItem('sp_offline_tables') || '[]');
      const updated = offline.map((t: any) => t.id === tableId ? { ...t, status: newStatus } : t);
      localStorage.setItem('sp_offline_tables', JSON.stringify(updated));
      fetchTables();
    }
  };

  const handleDeleteTable = async (tableId: string) => {
    try {
      await pb.collection('tables').delete(tableId);
      fetchTables();
    } catch (err) {
      // offline delete
      const offline = JSON.parse(localStorage.getItem('sp_offline_tables') || '[]');
      const filtered = offline.filter((t: any) => t.id !== tableId);
      localStorage.setItem('sp_offline_tables', JSON.stringify(filtered));
      fetchTables();
    }
  };

  const getQRLink = (tableNumber: string) => {
    const origin = window.location.origin;
    return `${origin}/?table=${tableNumber}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-black text-gray-900 flex items-center gap-2">
          <TableProperties className="text-emerald-600" /> Table Management
        </h1>
        <p className="text-gray-500 text-sm">
          Track dining status (Occupied, Needs Cleaning, Available) and copy QR Code URLs per table.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table layout grid */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Interactive Floor Layout</h2>
          {tables.length === 0 ? (
            <p className="text-gray-500 text-sm py-12 text-center">No tables configured.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {tables.map((table) => {
                let statusBg = 'bg-gray-50 border-gray-200 text-gray-700';
                if (table.status === 'Available') statusBg = 'bg-green-50 border-green-200 text-green-700';
                if (table.status === 'Occupied') statusBg = 'bg-amber-50 border-amber-200 text-amber-700';
                if (table.status === 'Needs Cleaning') statusBg = 'bg-red-50 border-red-200 text-red-700';

                return (
                  <div
                    key={table.id}
                    className={`border rounded-2xl p-5 flex flex-col justify-between items-center text-center gap-4 ${statusBg}`}
                  >
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-65">Table</span>
                      <h4 className="text-3xl font-black">{table.tableNumber}</h4>
                    </div>

                    <div className="space-y-2 w-full">
                      <select
                        value={table.status}
                        onChange={(e) => handleUpdateStatus(table.id, e.target.value as any)}
                        className="w-full bg-white border border-gray-200 text-xs font-semibold px-2 py-1.5 rounded-lg focus:outline-none focus:border-emerald-500 text-gray-700 text-center"
                      >
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Needs Cleaning">Needs Cleaning</option>
                      </select>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(getQRLink(table.tableNumber));
                          alert(`Copied QR link to clipboard: Table ${table.tableNumber}`);
                        }}
                        className="w-full bg-white border hover:bg-gray-50 text-gray-500 transition-colors text-[10px] font-bold py-1 px-2 rounded-lg flex items-center justify-center gap-1"
                      >
                        <Link className="w-3 h-3" /> Copy QR URL
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteTable(table.id)}
                      className="text-red-500 hover:text-red-700 text-xs transition-colors mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add Table control panel */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm self-start space-y-6">
          <h3 className="font-serif text-xl font-bold text-gray-900">Configure New Table</h3>
          
          <form onSubmit={handleAddTable} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Table Number/Identifier</label>
              <input
                type="text"
                required
                placeholder="e.g. 5 or Bar-2"
                value={newTableNumber}
                onChange={(e) => setNewTableNumber(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            {error && <p className="text-red-600 font-bold text-xs">{error}</p>}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Table
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TableManagement;
