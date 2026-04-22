import React from 'react';
import { Search, MapPin, ChevronDown, ShieldCheck, Globe, Landmark, Award, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

interface HeroProps {
  onSearch: (query: string) => void;
  onFilterChange: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onFilterChange }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://i.postimg.cc/1XS8MgxX/photo-5994386418404363889-y.jpg" 
          alt="Algerian Heritage"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </motion.div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full relative z-10 py-10 md:py-0">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="w-10 md:w-16 h-[1px] bg-heritage-gold" />
              <span className="text-[12px] md:text-[16px] uppercase tracking-[0.4em] md:tracking-[0.8em] font-black text-dark-brown drop-shadow-sm">
                {t('hero.portal_tagline')}
              </span>
              <div className="w-10 md:w-16 h-[1px] bg-heritage-gold" />
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-[11rem] font-bold display-font leading-[1.1] md:leading-[0.9] tracking-tighter text-dark-brown mb-10 md:mb-16">
              {t('hero.title')}<br />
              <span className="text-dark-brown italic font-black drop-shadow-sm">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-lg md:text-2xl lg:text-3xl text-dark-brown font-bold italic max-w-4xl mx-auto mb-12 md:mb-20 leading-relaxed px-4">
              {t('hero.description')}
            </p>
          </motion.div>

          {/* Search Bar - Luxury Design */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-4xl mx-auto px-4 md:px-0"
          >
            <div className="relative group luxury-shadow rounded-2xl overflow-hidden gold-border">
              <div className="absolute inset-0 bg-heritage-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative flex flex-col md:flex-row items-stretch bg-white/90 backdrop-blur-3xl border border-heritage-gold/10">
                <div className="flex-1 flex items-center px-6 gap-4 md:gap-6 border-b md:border-b-0 md:border-r border-heritage-gold/10">
                  <Search className="w-5 h-5 md:w-6 md:h-6 text-heritage-gold focus:scale-110 transition-transform" />
                  <input 
                    type="text"
                    placeholder={t('hero.search')}
                    className="w-full bg-transparent border-none text-dark-brown placeholder:text-dark-brown/30 focus:ring-0 text-base md:text-xl font-light py-6 md:py-8"
                    onChange={(e) => onSearch(e.target.value)}
                  />
                </div>
                <div className="hidden lg:flex items-center gap-4 px-8 border-r border-heritage-gold/10">
                  <ChevronDown className="w-5 h-5 text-heritage-gold" />
                  <select 
                    className="bg-transparent border-none text-dark-brown text-[10px] uppercase tracking-widest font-bold focus:ring-0 cursor-pointer"
                    onChange={(e) => onFilterChange(e.target.value)}
                  >
                    <option value="All" className="bg-heritage-beige">{t('hero.all_records')}</option>
                    <option value="History" className="bg-heritage-beige">{t('hero.history')}</option>
                    <option value="Arts" className="bg-heritage-beige">{t('hero.fine_arts')}</option>
                    <option value="Archaeology" className="bg-heritage-beige">{t('hero.archaeology')}</option>
                  </select>
                </div>
                <button className="bg-dark-brown hover:bg-heritage-emerald text-heritage-beige px-10 md:px-14 py-6 md:py-0 font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-4 group/btn">
                  {t('hero.search_btn')}
                  <ArrowRight className={`w-4 h-4 group-hover/btn:translate-x-2 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
