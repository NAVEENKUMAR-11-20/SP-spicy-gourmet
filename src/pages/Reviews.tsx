import React from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, Quote } from 'lucide-react';
import { reviews } from '../data/mockData';

const Reviews: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-12">
      <div className="text-center">
        <h1 className="font-serif font-black text-4xl sm:text-5xl text-white mb-4">Guest Experiences</h1>
        <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full mb-8"></div>
        
        {/* Aggregate Badge */}
        <div className="inline-flex flex-col items-center justify-center bg-card-dark border border-brand-gold/30 rounded-2xl p-6 shadow-xl mb-6">
          <div className="text-5xl font-bold text-white mb-2 font-serif">4.8</div>
          <div className="flex gap-1 mb-2">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className={`w-5 h-5 ${i === 5 ? 'text-brand-gold/50 fill-brand-gold/50' : 'text-brand-gold fill-brand-gold'}`} />
            ))}
          </div>
          <p className="text-brand-offwhite/60 text-sm">Based on 500+ reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-brand-maroon-800/40 p-8 rounded-2xl border border-brand-maroon-800 relative"
          >
            <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-maroon-900/80 fill-brand-maroon-900/80" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < review.rating ? 'text-brand-orange-light fill-brand-orange-light' : 'text-brand-maroon-700 fill-brand-maroon-700'}`} 
                />
              ))}
            </div>
            <p className="text-brand-offwhite text-lg font-serif italic mb-6 leading-relaxed relative z-10">
              "{review.text}"
            </p>
            <div className="flex justify-between items-center mt-auto border-t border-brand-maroon-800 pt-4">
              <span className="font-bold text-white">{review.author}</span>
              <span className="text-brand-offwhite/50 text-sm">{review.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a 
          href="https://google.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full transition-all font-medium"
        >
          Read more on Google <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default Reviews;
