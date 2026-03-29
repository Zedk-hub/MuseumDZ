import React from 'react';
import { Sun, Moon, Landmark, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

interface NavbarProps {
  isDark: boolean;
  toggleDark: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleDark }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-2xl border-b border-border/40">
      <div className="max-w-[1800px] mx-auto flex items-stretch">
        {/* Logo Section */}
        <div className="px-8 md:px-12 py-6 md:py-8 border-r border-border/40 flex items-center gap-6 group cursor-pointer">
          <div className="relative">
            <div className="w-12 h-12 md:w-14 md:h-14 national-seal flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:rotate-[360deg]">
              <Landmark className="text-white w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-heritage-gold rounded-full border-2 border-background flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tighter display-font leading-none">
              {t('nav.logo_algerian')}<span className="text-heritage-green">{t('nav.logo_heritage')}</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-muted-foreground font-black mt-1">{t('nav.tagline')}</span>
          </div>
        </div>

        {/* Navigation Links - Grid Style */}
        <div className="hidden xl:flex flex-1 items-stretch">
          {['Collections', 'Exhibitions', 'Archives', 'Analytics'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="flex-1 flex items-center justify-center border-r border-border/40 text-[10px] uppercase tracking-[0.4em] font-black text-foreground/40 hover:text-heritage-green hover:bg-muted/50 transition-all group relative overflow-hidden"
            >
              <span className="relative z-10">{t(`nav.${item.toLowerCase()}`)}</span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-heritage-green translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          ))}
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-6 md:gap-10 px-8 md:px-12">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="hidden sm:flex items-center gap-4 text-muted-foreground hover:text-heritage-green cursor-pointer transition-all group"
          >
            <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">{language === 'en' ? 'AR' : 'EN'}</span>
          </button>
          
          <button 
            onClick={toggleDark}
            className="p-3 hover:text-heritage-green transition-all rounded-full hover:bg-muted relative group"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button className="relative overflow-hidden group bg-foreground text-background px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-black transition-all hover:pr-14">
            <span className="relative z-10">{t('nav.access')}</span>
            <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute inset-0 bg-heritage-green translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </nav>
  );
};
