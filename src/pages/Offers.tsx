import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { offers } from '../data/mockData';

const Offers: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-serif font-black text-4xl sm:text-5xl text-white mb-4 flex justify-center items-center gap-3">
          <Sparkles className="text-brand-orange" /> Combo Deals <Sparkles className="text-brand-orange" />
        </h1>
        <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full mb-6"></div>
        <p className="text-brand-offwhite/80 max-w-xl mx-auto">
          Exclusive experiences curated for our dine-in guests. No codes or coupons needed—simply ask your server.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-brand-maroon-800 to-brand-maroon-900 rounded-3xl p-8 border border-brand-maroon-800/80 shadow-2xl relative overflow-hidden group"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl group-hover:bg-brand-orange/10 transition-colors"></div>

            <div className="relative z-10">
              <h3 className="font-serif text-3xl text-white font-bold mb-2">{offer.title}</h3>
              <div className="text-brand-orange text-2xl font-bold mb-6">₹{offer.price}</div>
              
              <p className="text-brand-offwhite/80 mb-8 leading-relaxed">
                {offer.description}
              </p>
              
              <div className="space-y-3 mb-10">
                <h4 className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-4">Includes</h4>
                {offer.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-brand-offwhite">{item}</span>
                  </div>
                ))}
              </div>

              <div className="text-sm text-brand-gold/70 italic mt-auto border-t border-brand-maroon-800 pt-4">
                * Valid for dine-in only. Mention to your server when ordering.
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
