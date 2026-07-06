import React from 'react';
import { ExternalLink, Navigation } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12">
      <div className="text-center mb-4">
        <h1 className="font-serif font-black text-4xl sm:text-5xl text-white mb-4">Location & Hours</h1>
        <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card-dark rounded-3xl overflow-hidden border border-brand-maroon-800 h-[400px] lg:h-[600px] relative group">
          {/* Mock Google Map iframe - in real life use real coordinates */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0645607248386!2d77.2198083150824!3d28.62782708241961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xc46188eb10526014!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1689255260000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter invert-[90%] hue-rotate-[180deg] contrast-[1.2] grayscale-[30%] opacity-80 mix-blend-screen"
          ></iframe>
          
          <div className="absolute top-4 right-4 z-10">
            <a 
              href="https://maps.google.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
            >
              Get Directions <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-brand-maroon-800/40 border border-brand-maroon-800 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Navigation className="text-brand-orange w-6 h-6" />
              <h3 className="font-serif text-xl font-bold text-white">Getting Here</h3>
            </div>
            <p className="text-brand-offwhite/80 text-sm mb-4">
              We are located in the heart of the culinary district, just opposite the Grand Plaza Mall.
            </p>
            <div className="space-y-4 text-sm">
              <div>
                <strong className="text-white block mb-1">Valet Parking</strong>
                <span className="text-brand-offwhite/70">Complimentary valet parking is available at the main entrance.</span>
              </div>
              <div>
                <strong className="text-white block mb-1">Public Transport</strong>
                <span className="text-brand-offwhite/70">5-minute walk from Central Metro Station (Gate 3).</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-maroon-800/40 border border-brand-maroon-800 rounded-3xl p-8 flex-1">
            <h3 className="font-serif text-xl font-bold text-white mb-6">Weekly Hours</h3>
            
            <div className="space-y-4">
              {[
                { day: 'Monday', hours: '11:30 AM - 10:30 PM' },
                { day: 'Tuesday', hours: '11:30 AM - 10:30 PM' },
                { day: 'Wednesday', hours: '11:30 AM - 10:30 PM' },
                { day: 'Thursday', hours: '11:30 AM - 10:30 PM' },
                { day: 'Friday', hours: '11:30 AM - 11:30 PM', isWeekend: true },
                { day: 'Saturday', hours: '11:30 AM - 11:30 PM', isWeekend: true },
                { day: 'Sunday', hours: '11:30 AM - 11:30 PM', isWeekend: true },
              ].map((item) => (
                <div key={item.day} className={`flex justify-between items-center ${item.isWeekend ? 'text-brand-gold font-medium' : 'text-brand-offwhite/80'}`}>
                  <span>{item.day}</span>
                  <span className="text-sm">{item.hours}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-brand-maroon-800/50 text-xs text-brand-offwhite/50 text-center">
              * Holiday hours may vary
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
