import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setOrderType, setAddressOrTable } = useCart();
  
  const qrTable = searchParams.get('table');

  useEffect(() => {
    if (qrTable) {
      setOrderType('Dine In');
      setAddressOrTable(qrTable);
    }
  }, [qrTable, setOrderType, setAddressOrTable]);

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl px-4 flex flex-col items-center gap-6"
      >
        <div className="bg-brand-maroon-800/40 p-5 rounded-full border border-brand-orange/20 relative animate-pulse shadow-inner mb-2">
          <Flame className="w-16 h-16 text-brand-orange" />
        </div>

        {qrTable && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-gold/20 border border-brand-gold/40 text-brand-gold font-bold px-5 py-2 rounded-full text-sm tracking-wide uppercase flex items-center gap-2 mb-2"
          >
            <UtensilsCrossed className="w-4 h-4" /> Welcome to Table {qrTable}
          </motion.div>
        )}

        <h1 className="font-serif font-black text-5xl sm:text-6xl md:text-7xl text-white leading-tight tracking-tight">
          Where Spice Meets <span className="text-brand-orange">Elegance</span>
        </h1>

        <div className="h-1.5 w-32 bg-brand-gold rounded-full my-2"></div>

        <p className="text-brand-offwhite/85 text-lg sm:text-xl leading-relaxed max-w-lg font-light">
          Experience gourmet fine-dining crafted by master chefs. Browse our digital menu, customize your order, and request service instantly.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(qrTable ? '/menu' : '/order-type')}
          className="mt-8 bg-gradient-to-r from-brand-orange to-brand-orange-light text-white font-serif font-black text-xl py-5 px-10 rounded-full shadow-2xl transition-all flex items-center gap-3 group border border-brand-orange/20 hover:shadow-brand-orange/30 hover:border-brand-gold/40"
        >
          {qrTable ? 'Start Ordering' : 'Choose Order Type'}
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Welcome;
