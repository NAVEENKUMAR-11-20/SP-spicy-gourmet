import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AddEditFoodItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [dishName, setDishName] = useState('');
  const [category, setCategory] = useState('Starters');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [vegetarianType, setVegetarianType] = useState('Veg');
  const [spiceLevel, setSpiceLevel] = useState('Mild');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEdit = !!id;

  useEffect(() => {
    if (!isEdit) return;

    const fetchItem = async () => {
      try {
        const { data, error } = await supabase
          .from('MENUITEMs')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setDishName(data['Dish Name'] || '');
          setCategory(data['Category'] || 'Starters');
          setDescription(data['Description'] || '');
          setPrice(data['Price (INR)']?.toString() || '');
          setPhotoUrl(data['Photo URL'] || '');
          setVegetarianType(data['Vegetarian Type'] || 'Veg');
          setSpiceLevel(data['Spice Level'] || 'Mild');
        }
      } catch (err) {
        console.error('Failed to load item:', err);
      }
    };
    fetchItem();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim() || !price.trim()) {
      setError('Please fill in name and price.');
      return;
    }

    setLoading(true);
    setError('');

    const payload = {
      'Dish Name': dishName,
      'Category': category,
      'Price (INR)': Number(price),
      'Description': description,
      'Photo URL': photoUrl,
      'Vegetarian Type': vegetarianType,
      'Spice Level': spiceLevel
    };

    try {
      if (isEdit) {
        const { error: updateError } = await supabase
          .from('MENUITEMs')
          .update(payload)
          .eq('id', id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('MENUITEMs')
          .insert([payload]);
        if (insertError) throw insertError;
      }
      alert('Item saved successfully!');
      navigate('/admin/menu');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/admin/menu')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-semibold"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Menu Items
      </button>

      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <h1 className="text-2xl font-serif font-black text-gray-900 mb-6">
          {isEdit ? 'Edit Menu Dish' : 'Create New Menu Dish'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dish Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Paneer Butter Masala"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              >
                <option value="Starters">Starters</option>
                <option value="Main Course">Main Course</option>
                <option value="Biryani &amp; Rice">Biryani &amp; Rice</option>
                <option value="Breads">Breads</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (INR)</label>
              <input
                type="number"
                required
                placeholder="₹"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="List spices, cooking techniques, side items..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vegetarian Type</label>
              <select
                value={vegetarianType}
                onChange={(e) => setVegetarianType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              >
                <option value="Veg">Vegetarian</option>
                <option value="Non-Veg">Non-Vegetarian</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Spice Level</label>
              <select
                value={spiceLevel}
                onChange={(e) => setSpiceLevel(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              >
                <option value="Mild">Mild</option>
                <option value="Medium">Medium</option>
                <option value="Spicy">Spicy</option>
              </select>
            </div>
          </div>

          {error && <p className="text-red-600 font-bold text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-75"
          >
            <Save className="w-5 h-5" /> {loading ? 'Saving Item...' : 'Save Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditFoodItem;
