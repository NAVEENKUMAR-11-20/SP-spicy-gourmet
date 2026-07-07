import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const MenuManagement: React.FC = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('MENUITEMS')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error(error);
        setError('Unable to load menu items');
      } else {
        setFoodItems(data || []);
      }
    } catch (err) {
      console.error(err);
      setError('Unable to load menu items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;

    try {
      const { error } = await supabase.from('MENUITEMS').delete().eq('id', id);
      if (error) throw error;
      await fetchItems();
    } catch (e) {
      console.error(e);
      alert('Delete failed.');
    }
  };

  const filteredItems = foodItems.filter((item) => {
    const name = item['Dish Name'] || '';
    const category = item['Category'] || '';
    return name.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-gray-900">Menu Items</h1>
          <p className="text-gray-500 text-sm">Add, edit, or toggle the availability of SP Spicy Gourmet dishes.</p>
        </div>
        
        <button
          onClick={() => navigate('/admin/menu/new')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add New Item
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 items-center shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-500 text-sm text-center py-12">Loading menu...</p>
        ) : error ? (
          <p className="text-red-500 text-sm text-center py-12">{error}</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-12">No menu items available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold uppercase">
                  <th className="py-3 px-4">Dish</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Spice</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 text-sm text-gray-800 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {item['Photo URL'] && (
                          <img
                            src={item['Photo URL']}
                            alt={item['Dish Name']}
                            className="w-12 h-12 object-cover rounded-xl shrink-0"
                          />
                        )}
                        <div>
                          <h4 className="font-bold text-gray-900 leading-snug">{item['Dish Name']}</h4>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-600">{item['Category']}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">₹{item['Price (INR)']}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item['Vegetarian Type'] === 'Veg' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {item['Vegetarian Type']}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-500">{item['Spice Level']}</td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => navigate(`/admin/menu/edit/${item.id}`)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold p-2.5 rounded-xl text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 font-bold p-2.5 rounded-xl text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
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

export default MenuManagement;
