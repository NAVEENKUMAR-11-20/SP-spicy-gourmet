import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, orderType } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const tax = subtotal * 0.05; // 5% GST/VAT
  const total = subtotal + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-brand-maroon-900 border-l border-brand-maroon-800 shadow-2xl z-50 flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-maroon-800 flex justify-between items-center bg-brand-maroon-900/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-brand-orange w-6 h-6" />
                <h3 className="font-serif text-2xl font-bold text-white">Your Cart</h3>
                <span className="bg-brand-orange text-white text-xs px-2.5 py-0.5 rounded-full font-bold ml-1">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-brand-offwhite transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center gap-4">
                  <div className="w-20 h-20 bg-brand-maroon-800/30 rounded-full flex items-center justify-center text-brand-gold">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif text-xl text-white font-bold">Your cart is empty</h4>
                  <p className="text-brand-offwhite/60 text-sm max-w-[250px]">
                    Browse our gourmet menu and add your favorite dishes to start your culinary journey.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-2.5 px-6 rounded-full text-sm transition-all"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.foodId}
                    className="flex gap-4 bg-brand-maroon-800/20 border border-brand-maroon-800/60 p-4 rounded-2xl relative overflow-hidden group"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl shrink-0"
                      />
                    )}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.vegType === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <h4 className="font-serif text-white font-bold text-base leading-snug line-clamp-1">{item.name}</h4>
                        </div>
                        <span className="text-brand-gold font-bold text-sm">₹{item.price}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        {/* Stepper */}
                        <div className="flex items-center bg-brand-maroon-900/60 border border-brand-maroon-800 rounded-full px-1">
                          <button
                            onClick={() => updateQuantity(item.foodId, item.quantity - 1)}
                            className="p-1.5 text-brand-offwhite hover:text-brand-orange transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-white font-bold text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.foodId, item.quantity + 1)}
                            className="p-1.5 text-brand-offwhite hover:text-brand-orange transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.foodId)}
                          className="text-brand-offwhite/40 hover:text-red-500 p-2 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Order Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-brand-maroon-800 bg-brand-maroon-900/80 backdrop-blur-md space-y-4">
                <div className="space-y-2 text-sm text-brand-offwhite/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (5% GST)</span>
                    <span className="font-bold text-white">₹{tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between border-t border-brand-maroon-800/80 pt-2 text-base text-white">
                    <span className="font-serif font-bold">Total Amount</span>
                    <span className="font-bold text-brand-gold">₹{total.toFixed(0)}</span>
                  </div>
                </div>

                <div className="bg-brand-maroon-800/30 rounded-xl p-3 text-center text-xs text-brand-gold/80 italic border border-brand-maroon-800/35">
                  Order Type: <strong className="text-white uppercase">{orderType}</strong>
                </div>

                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-4 px-6 rounded-full transition-all shadow-lg flex items-center justify-center gap-2 group/btn"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
