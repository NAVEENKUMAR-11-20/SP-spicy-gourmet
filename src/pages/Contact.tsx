import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12">
      <div className="text-center mb-4">
        <h1 className="font-serif font-black text-4xl sm:text-5xl text-white mb-4">Get in Touch</h1>
        <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card-dark border border-brand-maroon-800 rounded-3xl p-8"
          >
            <h2 className="font-serif text-2xl text-white mb-6">Contact Details</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-maroon-800 p-3 rounded-full text-brand-gold shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Address</h4>
                  <p className="text-brand-offwhite/80 text-sm">123 Culinary Avenue, Food District<br/>New Delhi, 110001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-brand-maroon-800 p-3 rounded-full text-brand-gold shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Phone</h4>
                  <a href="tel:+919876543210" className="text-brand-offwhite/80 text-sm hover:text-brand-orange transition-colors">+91 98765 43210</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-brand-maroon-800 p-3 rounded-full text-green-500 shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">WhatsApp</h4>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-brand-offwhite/80 text-sm hover:text-brand-orange transition-colors">Chat for general enquiries</a>
                  <p className="text-brand-offwhite/40 text-xs mt-1">* Not for ordering</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-maroon-800 p-3 rounded-full text-brand-gold shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email</h4>
                  <a href="mailto:hello@spspicymenu.com" className="text-brand-offwhite/80 text-sm hover:text-brand-orange transition-colors">hello@spspicymenu.com</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-brand-orange to-brand-maroon-800 rounded-3xl p-8 border border-brand-orange/30 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6 text-white">
              <Clock className="w-6 h-6" />
              <h2 className="font-serif text-2xl">Opening Hours</h2>
            </div>
            <div className="space-y-2 text-white/90">
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span>Monday - Thursday</span>
                <span className="font-bold">11:30 AM - 10:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2 pt-2">
                <span>Friday - Sunday</span>
                <span className="font-bold">11:30 AM - 11:30 PM</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enquiry Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card-dark border border-brand-maroon-800 rounded-3xl p-8"
        >
          <h2 className="font-serif text-2xl text-white mb-2">Event & Reservation Enquiry</h2>
          <p className="text-brand-offwhite/60 text-sm mb-8">Host your private events with us. Fill out the form below and our manager will contact you.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-offwhite/80 mb-2">Full Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full bg-brand-maroon-900/50 border border-brand-maroon-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-brand-offwhite/80 mb-2">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                required
                className="w-full bg-brand-maroon-900/50 border border-brand-maroon-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-offwhite/80 mb-2">Message</label>
              <textarea 
                id="message" 
                required
                rows={4}
                className="w-full bg-brand-maroon-900/50 border border-brand-maroon-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors resize-none"
                placeholder="Tell us about your event size, date preference, etc."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={formStatus !== 'idle'}
              className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {formStatus === 'idle' && <><Send className="w-5 h-5" /> Send Enquiry</>}
              {formStatus === 'submitting' && <span className="animate-pulse">Sending...</span>}
              {formStatus === 'success' && <span>Message Sent!</span>}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
