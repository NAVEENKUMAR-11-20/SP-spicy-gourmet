import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChefHat, Leaf, ShieldCheck, Users, Flame, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
  const { foodItems, loadingItems } = useCart();
  
  // Extract some top picks from fetched items
  const topPicks = foodItems.slice(0, 4);

  return (
    <div className="flex flex-col gap-24 pb-12">
      {/* Hero Section */}
      <section className="relative -mt-24 pt-32 pb-20 min-h-[85vh] flex items-center justify-center text-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-[-1]">
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-900 via-brand-maroon-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-maroon-900/80 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-6 text-brand-orange-light"
          >
            <Flame className="w-5 h-5" />
            <span className="uppercase tracking-[0.3em] text-sm font-semibold">Welcome to</span>
            <Flame className="w-5 h-5" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif font-black text-5xl sm:text-6xl md:text-7xl leading-tight text-white mb-6"
          >
            Where Spice <br />
            <span className="text-transparent bg-clip-text bg-gradient-accent relative inline-block">
              Meets Elegance
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-brand-gold rounded-full opacity-60"></div>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-brand-offwhite/80 mb-10 max-w-2xl font-light"
          >
            A gourmet journey of flavors awaits you. Settle in, explore our digital menu, and prepare for an unforgettable dining experience.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <Link 
              to="/menu" 
              className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,78,31,0.3)] hover:shadow-[0_0_30px_rgba(255,78,31,0.5)]"
            >
              View Full Menu
            </Link>
            <p className="mt-4 text-xs text-brand-gold font-medium uppercase tracking-wider">
              No need to order online — just browse and tell your server
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <ShieldCheck />, title: "Premium Quality", desc: "Fresh ingredients sourced daily" },
          { icon: <Flame />, title: "Authentic Spices", desc: "Traditional blends, modern presentation" },
          { icon: <Star />, title: "Gourmet Experience", desc: "Elegant dining, exceptional service" }
        ].map((highlight, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card-dark border border-brand-maroon-800/50 rounded-2xl p-6 text-center backdrop-blur-sm"
          >
            <div className="inline-flex items-center justify-center p-4 bg-brand-maroon-800 rounded-full mb-4 text-brand-gold">
              {highlight.icon}
            </div>
            <h3 className="font-serif font-bold text-xl text-white mb-2">{highlight.title}</h3>
            <p className="text-brand-offwhite/70 text-sm">{highlight.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Top Picks Tonight */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-2 flex items-center gap-3">
              Top Picks Tonight <Flame className="text-brand-orange" />
            </h2>
            <div className="h-0.5 w-24 bg-brand-gold rounded-full"></div>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 snap-x hide-scrollbar">
          {topPicks.map((pick: any) => (
            <div key={pick.id} className="min-w-[260px] sm:min-w-0 bg-brand-maroon-800/40 rounded-2xl p-5 border border-brand-maroon-800/80 snap-start flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-brand-maroon-900 shadow-xl">
                <img src={pick.image} alt={pick.name} className="w-full h-full object-cover" />
                <div className="absolute top-0 right-0 bg-brand-gold text-brand-maroon-900 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                  Chef's Pick
                </div>
              </div>
              <div className="flex items-center gap-1 text-brand-gold mb-2">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold">{pick.rating}</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-white mb-2 leading-tight">{pick.name}</h3>
              <p className="text-brand-offwhite/60 text-xs mb-4 line-clamp-2">{pick.description}</p>
              <div className="mt-auto font-sans font-semibold text-brand-orange">₹{pick.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Story */}
      <section className="bg-brand-maroon-800/30 rounded-3xl overflow-hidden border border-brand-maroon-800/60">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-64 md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80" 
              alt="Spices" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-4">The Secret is in the Grind</h2>
            <div className="h-0.5 w-16 bg-brand-orange mb-6"></div>
            <p className="text-brand-offwhite/80 leading-relaxed">
              We don't buy pre-packaged spice mixes. Every morning at 6 AM, our master chefs begin roasting and grinding whole spices—cardamom from Kerala, cloves from Zanzibar, and chilies sourced directly from Guntur farms.
              <br/><br/>
              This dedication to the authentic process ensures that every dish carries a fresh, vibrant warmth that simply cannot be replicated. It's not just heat; it's a symphony of flavor.
            </p>
          </div>
        </div>
      </section>

      {/* Services Icons */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        {[
          { icon: <Users />, label: "Dine-In Only" },
          { icon: <Leaf />, label: "Fresh Daily Ingredients" },
          { icon: <Flame />, label: "Customizable Spice" },
          { icon: <ChefHat />, label: "Family-Friendly" },
        ].map((service, idx) => (
          <div key={idx} className="flex flex-col items-center text-center gap-3">
            <div className="p-4 rounded-full bg-brand-maroon-800/60 text-brand-orange">
              {service.icon}
            </div>
            <span className="text-sm font-medium text-brand-offwhite/90">{service.label}</span>
          </div>
        ))}
      </section>

      {/* Closing CTA */}
      <section className="bg-gradient-to-r from-brand-maroon-800 to-brand-orange/20 rounded-3xl p-8 sm:p-12 text-center border border-brand-orange/20">
        <h2 className="font-serif font-bold text-3xl text-white mb-4">Hungry?</h2>
        <p className="text-brand-offwhite/80 mb-8 max-w-lg mx-auto">
          Explore our full range of appetizers, signature curries, tandoori specialties, and decadent desserts.
        </p>
        <Link 
          to="/menu" 
          className="inline-block bg-white text-brand-maroon-900 font-bold py-3 px-8 rounded-full transition-all hover:scale-105 hover:bg-brand-gold shadow-lg"
        >
          Explore Our Full Menu
        </Link>
      </section>
    </div>
  );
};

export default Home;
