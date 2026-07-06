import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CallWaiterFAB: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg font-medium text-sm flex items-center gap-2"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Your server has been notified
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-40 bg-gradient-accent text-white p-4 rounded-full shadow-[0_0_20px_rgba(255,78,31,0.4)] hover:shadow-[0_0_30px_rgba(255,78,31,0.6)] hover:scale-105 transition-all active:scale-95 group"
        aria-label="Call Waiter"
      >
        <Bell className="w-7 h-7 group-hover:animate-sway" />
      </button>
    </>
  );
};

export default CallWaiterFAB;
