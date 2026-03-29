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
          src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=2400" 
          alt="Algerian Heritage"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
      </motion.div>

      <div className="max-w-[1800px] mx-auto px-8 md:px-12 w-full relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-[1px] bg-heritage-gold/60" />
              <span className="text-[12px] md:text-[14px] uppercase tracking-[0.8em] font-black text-heritage-gold drop-shadow-lg">
                {t('hero.portal_tagline')}
              </span>
              <div className="w-16 h-[1px] bg-heritage-gold/60" />
            </div>
            
            <h1 className="text-7xl md:text-[11rem] font-bold display-font leading-[0.9] tracking-tighter text-white mb-16 drop-shadow-2xl">
              {t('hero.title')}<br />
              <span className="text-heritage-green italic font-light">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-xl md:text-3xl text-white/80 font-light italic max-w-3xl mb-20 leading-relaxed">
              {t('hero.description')}
            </p>
          </motion.div>

          {/* Search Bar - Luxury Design */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative group luxury-shadow">
              <div className="absolute inset-0 bg-heritage-green/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative flex items-center bg-white/10 backdrop-blur-3xl border border-white/20 p-3 md:p-4">
                <div className="flex-1 flex items-center px-6 gap-6">
                  <Search className="w-6 h-6 text-heritage-gold" />
                  <input 
                    type="text"
                    placeholder={t('hero.search')}
                    className="w-full bg-transparent border-none text-white placeholder:text-white/40 focus:ring-0 text-lg md:text-xl font-light py-4"
                    onChange={(e) => onSearch(e.target.value)}
                  />
                </div>
                <div className="hidden md:flex items-center gap-4 px-8 border-l border-white/10">
                  <ChevronDown className="w-5 h-5 text-heritage-gold" />
                  <select 
                    className="bg-transparent border-none text-white text-sm uppercase tracking-widest font-bold focus:ring-0 cursor-pointer"
                    onChange={(e) => onFilterChange(e.target.value)}
                  >
                    <option value="All" className="bg-black">{t('hero.all_records')}</option>
                    <option value="History" className="bg-black">{t('hero.history')}</option>
                    <option value="Arts" className="bg-black">{t('hero.fine_arts')}</option>
                    <option value="Archaeology" className="bg-black">{t('hero.archaeology')}</option>
                  </select>
                </div>
                <button className="bg-heritage-green hover:bg-heritage-green/90 text-white px-12 py-5 font-black uppercase tracking-[0.3em] text-[11px] transition-all flex items-center gap-4 group/btn">
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
