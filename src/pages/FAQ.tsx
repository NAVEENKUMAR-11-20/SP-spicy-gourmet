import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/mockData';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-12">
      <div className="text-center">
        <h1 className="font-serif font-black text-4xl sm:text-5xl text-white mb-4">Frequently Asked Questions</h1>
        <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full mb-6"></div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border border-brand-maroon-800 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-brand-maroon-800/40 shadow-lg' : 'bg-card-dark'}`}
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => toggleOpen(index)}
              >
                <span className="font-serif text-lg font-bold text-white pr-8">{faq.question}</span>
                <ChevronDown className={`w-6 h-6 text-brand-gold transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-brand-offwhite/80 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
