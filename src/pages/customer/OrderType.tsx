import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, ShoppingBag, Hash, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const OrderType: React.FC = () => {
  const navigate = useNavigate();
  const { orderType, setOrderType, addressOrTable, setAddressOrTable } = useCart();
  
  const [tableNum, setTableNum] = useState(orderType === 'Dine In' ? addressOrTable : '');
  const [error, setError] = useState('');

  const handleSelect = (type: 'Dine In' | 'Take Away') => {
    setOrderType(type);
    setError('');
  };

  const handleProceed = () => {
    if (orderType === 'Dine In') {
      if (!tableNum.trim()) {
        setError('Please enter your table number.');
        return;
      }
      setAddressOrTable(tableNum);
    } else {
      setAddressOrTable(''); // Take Away
    }
    navigate('/menu');
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="font-serif font-black text-4xl sm:text-5xl text-brand-orange mb-4">How would you like to dine?</h1>
        <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
        {/* Dine In */}
        <button
          onClick={() => handleSelect('Dine In')}
          className={`flex flex-col items-center gap-4 p-8 rounded-3xl border transition-all ${
            orderType === 'Dine In'
              ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/15 scale-[1.03]'
              : 'bg-card-dark/60 border-brand-maroon-800 text-brand-offwhite hover:border-brand-maroon-700'
          }`}
        >
          <div className={`p-4 rounded-full ${orderType === 'Dine In' ? 'bg-white/20 text-white' : 'bg-brand-maroon-900/60 text-brand-gold'}`}>
            <Utensils className="w-8 h-8" />
          </div>
          <span className={`font-serif text-2xl font-bold ${orderType === 'Dine In' ? 'text-white' : 'text-brand-orange'}`}>Dine In</span>
          <p className={`text-sm text-center leading-relaxed ${orderType === 'Dine In' ? 'text-white/80' : 'text-brand-offwhite/70'}`}>
            Order straight to your table inside the restaurant.
          </p>
        </button>

        {/* Take Away */}
        <button
          onClick={() => handleSelect('Take Away')}
          className={`flex flex-col items-center gap-4 p-8 rounded-3xl border transition-all ${
            orderType === 'Take Away'
              ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/15 scale-[1.03]'
              : 'bg-card-dark/60 border-brand-maroon-800 text-brand-offwhite hover:border-brand-maroon-700'
          }`}
        >
          <div className={`p-4 rounded-full ${orderType === 'Take Away' ? 'bg-white/20 text-white' : 'bg-brand-maroon-900/60 text-brand-gold'}`}>
            <ShoppingBag className="w-8 h-8" />
          </div>
          <span className={`font-serif text-2xl font-bold ${orderType === 'Take Away' ? 'text-white' : 'text-brand-orange'}`}>Take Away</span>
          <p className={`text-sm text-center leading-relaxed ${orderType === 'Take Away' ? 'text-white/80' : 'text-brand-offwhite/70'}`}>
            Skip the queue. Place your order and pick it up when ready.
          </p>
        </button>
      </div>

      {/* Conditional Forms */}
      <div className="max-w-md mx-auto">
        {orderType === 'Dine In' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 bg-brand-maroon-800/20 border border-brand-maroon-800 p-6 rounded-3xl"
          >
            <label className="block font-serif text-lg font-bold text-brand-orange mb-2 flex items-center gap-2">
              <Hash className="w-5 h-5 text-brand-orange" /> Table Number
            </label>
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="e.g. 5"
              value={tableNum}
              onChange={(e) => setTableNum(e.target.value)}
              className="w-full bg-brand-maroon-900/60 border border-brand-maroon-800 rounded-2xl px-5 py-4 text-brand-orange text-lg focus:outline-none focus:border-brand-orange"
            />
          </motion.div>
        )}

        {error && <p className="text-red-600 text-center text-sm font-bold mt-4">{error}</p>}

        <button
          onClick={handleProceed}
          className="w-full mt-8 bg-brand-orange hover:bg-brand-orange-light text-white font-serif font-black text-lg py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2 group shadow-lg"
        >
          Browse Gourmet Menu
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default OrderType;
