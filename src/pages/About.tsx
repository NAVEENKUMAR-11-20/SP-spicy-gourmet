import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';

const About: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto flex flex-col gap-16"
    >
      <div className="text-center">
        <h1 className="font-serif font-black text-4xl sm:text-5xl text-white mb-4">Our Story</h1>
        <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full"></div>
      </div>

      {/* Story Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80" 
            alt="Restaurant Ambience" 
            className="rounded-2xl shadow-xl border border-brand-maroon-800"
          />
        </div>
        <div>
          <h2 className="font-serif text-3xl text-brand-orange-light mb-4">A Decade of Culinary Excellence</h2>
          <p className="text-brand-offwhite/80 leading-relaxed mb-4">
            Founded in 2014, SP Spicy Gourmet began as a small family passion project. Our goal was simple: to bring authentic, unapologetically robust flavors to a refined dining setting.
          </p>
          <p className="text-brand-offwhite/80 leading-relaxed">
            We believe that "spicy" does not mean overpowering heat. True spice is a complex layering of aromatics—the sweetness of cinnamon, the earthiness of cumin, and the bright spark of green chili.
          </p>
        </div>
      </section>

      {/* Chef Section */}
      <section className="bg-card-dark rounded-3xl p-8 sm:p-12 border border-brand-maroon-800/60 mt-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-4 border-brand-gold shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80" 
              alt="Head Chef" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-brand-orange mb-2">
              <ChefHat className="w-5 h-5" />
              <span className="font-bold tracking-widest uppercase text-sm">Head Chef & Founder</span>
            </div>
            <h3 className="font-serif text-3xl text-white mb-4">Rajesh Kumar</h3>
            <p className="text-brand-offwhite/80 italic mb-4">
              "Food is the most direct way to communicate culture. Every dish we serve is a dialogue between traditional recipes passed down from my grandmother and modern culinary techniques."
            </p>
            <p className="text-brand-offwhite/70 text-sm">
              With over 20 years of experience in luxury hotel kitchens across India and Europe, Chef Rajesh brings an unparalleled level of precision and passion to the SP Spicy Gourmet kitchen.
            </p>
          </div>
        </div>
      </section>
      
      {/* Philosophy */}
      <section className="text-center py-8">
        <h2 className="font-serif text-3xl text-white mb-8">Our Philosophy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6">
            <h4 className="text-brand-gold font-bold mb-3">Uncompromising Sourcing</h4>
            <p className="text-brand-offwhite/70 text-sm">We partner directly with local farmers and spice merchants to ensure the highest quality ingredients reach your table.</p>
          </div>
          <div className="p-6 border-y sm:border-y-0 sm:border-x border-brand-maroon-800/50">
            <h4 className="text-brand-gold font-bold mb-3">Warm Hospitality</h4>
            <p className="text-brand-offwhite/70 text-sm">To dine with us is to be a guest in our home. Your comfort and delight are our highest priorities.</p>
          </div>
          <div className="p-6">
            <h4 className="text-brand-gold font-bold mb-3">Flavor Without Borders</h4>
            <p className="text-brand-offwhite/70 text-sm">While our roots are deeply Indian, our techniques and presentations embrace global gourmet standards.</p>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default About;
