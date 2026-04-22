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
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const cycleLanguage = () => {
    if (language === 'ar') setLanguage('fr');
    else if (language === 'fr') setLanguage('en');
    else setLanguage('ar');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-2xl border-b border-border/40 transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-[1800px] mx-auto flex items-stretch">
        {/* Logo Section */}
        <div className="px-6 md:px-12 py-4 md:py-8 border-r border-heritage-gold/20 flex items-center gap-4 md:gap-6 group cursor-pointer bg-white/50 backdrop-blur-md">
          <div className="relative">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-dark-brown flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:rotate-[360deg] rounded-full border border-heritage-gold/30">
              <Landmark className="text-heritage-gold w-5 h-5 md:w-7 md:h-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-heritage-gold rounded-full border-2 border-heritage-beige flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-2.5 h-2.5 md:w-3 md:h-3 text-dark-brown" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-black tracking-tighter display-font leading-none text-dark-brown">
              {t('nav.logo_algerian')}<span className="text-heritage-gold mx-1">{t('nav.logo_heritage')}</span>
            </span>
            <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-dark-brown font-black mt-1 opacity-60 hover:opacity-100">{t('nav.tagline')}</span>
          </div>
        </div>

        {/* Navigation Links - Grid Style */}
        <div className="hidden xl:flex flex-1 items-stretch">
          {[
            { id: 'eras', label: 'nav.archives' },
            { id: 'registry', label: 'nav.collections' },
            { id: 'registry', label: 'nav.exhibitions' },
            { id: 'dashboard', label: 'nav.analytics' }
          ].map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              className="flex-1 flex items-center justify-center border-r border-border/40 text-[10px] uppercase tracking-[0.4em] font-black text-dark-brown hover:text-dark-brown hover:bg-heritage-sand/50 transition-all group relative overflow-hidden"
            >
              <span className="relative z-10">{t(item.label)}</span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-heritage-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          ))}
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-6 md:gap-10 px-8 md:px-12">
          <button 
            onClick={cycleLanguage}
            className="hidden sm:flex items-center gap-4 text-dark-brown hover:text-heritage-gold cursor-pointer transition-all group"
          >
            <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700 text-heritage-gold group-hover:text-heritage-gold" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">{language.toUpperCase()}</span>
          </button>
          
          <button 
            onClick={toggleDark}
            className="p-3 text-dark-brown hover:text-heritage-gold transition-all rounded-full hover:bg-heritage-sand relative group"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button className="relative overflow-hidden group bg-dark-brown text-heritage-beige px-6 md:px-10 py-4 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black transition-all hover:pr-14">
            <span className="relative z-10">{t('nav.access')}</span>
            <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute inset-0 bg-heritage-emerald translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </nav>
  );
};
