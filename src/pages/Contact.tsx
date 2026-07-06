import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Linkedin, Github, Facebook } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 py-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="font-serif font-black text-4xl sm:text-5xl text-brand-orange">
          Contact SP Spicy Gourmet
        </h1>
        <p className="text-brand-offwhite/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Have a query, group reservation, or private event in mind? We'd love to hear from you. Reach out and let's create something amazing together.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 bg-card-dark border border-brand-maroon-800/40 rounded-3xl p-8 space-y-8 shadow-xl"
        >
          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-brand-orange">Contact Details</h2>
            <p className="text-brand-offwhite/70 text-sm leading-relaxed">
              Ready to discuss your next private function or dining reservation? Reach out directly or connect with us on social media.
            </p>
          </div>

          <div className="space-y-6">
            {/* Office Location */}
            <div className="flex items-center gap-4">
              <div className="bg-brand-orange/10 p-3.5 rounded-2xl text-brand-orange shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-brand-offwhite/40 block text-xs font-bold uppercase tracking-wider mb-0.5">Office Location</span>
                <span className="font-bold text-brand-offwhite text-sm">123 Culinary Avenue, Food District, New Delhi - 110001</span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="bg-brand-orange/10 p-3.5 rounded-2xl text-brand-orange shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-brand-offwhite/40 block text-xs font-bold uppercase tracking-wider mb-0.5">Phone</span>
                <a href="tel:+919876543210" className="font-bold text-brand-offwhite text-sm hover:text-brand-orange transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="bg-brand-orange/10 p-3.5 rounded-2xl text-brand-orange shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-brand-offwhite/40 block text-xs font-bold uppercase tracking-wider mb-0.5">Email</span>
                <a href="mailto:hello@spspicymenu.com" className="font-bold text-brand-offwhite text-sm hover:text-brand-orange transition-colors">
                  hello@spspicymenu.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Connect */}
          <div className="space-y-3 pt-6 border-t border-brand-maroon-800/30">
            <span className="text-brand-offwhite/40 block text-xs font-bold uppercase tracking-wider">Connect With Us</span>
            <div className="flex gap-3">
              <a href="#" className="bg-brand-orange/5 border border-brand-maroon-800/35 hover:bg-brand-orange/10 p-3 rounded-xl text-brand-orange transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-brand-orange/5 border border-brand-maroon-800/35 hover:bg-brand-orange/10 p-3 rounded-xl text-brand-orange transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="bg-brand-orange/5 border border-brand-maroon-800/35 hover:bg-brand-orange/10 p-3 rounded-xl text-brand-orange transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Send a Message */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 bg-card-dark border border-brand-maroon-800/40 rounded-3xl p-8 shadow-xl"
        >
          <h2 className="font-serif text-2xl font-bold text-brand-orange mb-6">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="formName" className="block text-xs font-bold uppercase tracking-wider text-brand-offwhite/50 mb-2">Your Name</label>
              <input 
                type="text" 
                id="formName" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-brand-maroon-900/45 border border-brand-maroon-800/50 rounded-xl px-4 py-3 text-brand-offwhite focus:outline-none focus:border-brand-orange transition-colors text-sm"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="formEmail" className="block text-xs font-bold uppercase tracking-wider text-brand-offwhite/50 mb-2">Your Email</label>
              <input 
                type="email" 
                id="formEmail" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-maroon-900/45 border border-brand-maroon-800/50 rounded-xl px-4 py-3 text-brand-offwhite focus:outline-none focus:border-brand-orange transition-colors text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="formPhone" className="block text-xs font-bold uppercase tracking-wider text-brand-offwhite/50 mb-2">Phone Number</label>
              <input 
                type="tel" 
                id="formPhone" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-brand-maroon-900/45 border border-brand-maroon-800/50 rounded-xl px-4 py-3 text-brand-offwhite focus:outline-none focus:border-brand-orange transition-colors text-sm"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <label htmlFor="formSubject" className="block text-xs font-bold uppercase tracking-wider text-brand-offwhite/50 mb-2">Subject</label>
              <input 
                type="text" 
                id="formSubject" 
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-brand-maroon-900/45 border border-brand-maroon-800/50 rounded-xl px-4 py-3 text-brand-offwhite focus:outline-none focus:border-brand-orange transition-colors text-sm"
                placeholder="Reservation enquiry"
              />
            </div>

            <div>
              <label htmlFor="formMessage" className="block text-xs font-bold uppercase tracking-wider text-brand-offwhite/50 mb-2">Your Message</label>
              <textarea 
                id="formMessage" 
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-brand-maroon-900/45 border border-brand-maroon-800/50 rounded-xl px-4 py-3 text-brand-offwhite focus:outline-none focus:border-brand-orange transition-colors resize-none text-sm"
                placeholder="Tell us about your event details, size, date preferences..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={formStatus !== 'idle'}
              className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-serif font-black py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {formStatus === 'idle' && <><Send className="w-5 h-5" /> Send Message</>}
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
