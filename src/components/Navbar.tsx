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
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-2xl border-b border-border/40 transition-transform duration-500 scale-95 origin-top ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-[1920px] mx-auto flex items-stretch h-16 md:h-20">
        {/* Logo Section */}
        <div className="px-4 md:px-8 py-2 border-r border-heritage-gold/20 flex items-center gap-3 md:gap-5 group cursor-pointer bg-heritage-sand/40 shadow-[5px_0_20px_rgba(0,0,0,0.03)] z-10 transition-colors hover:bg-heritage-sand/10">
          <div className="relative">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-dark-brown flex items-center justify-center shadow-xl transition-all duration-700 group-hover:rotate-12 rounded-full border-2 border-heritage-gold overflow-hidden">
              <img 
                src="https://i.postimg.cc/1XS8MgxX/photo-5994386418404363889-y.jpg" 
                alt="DiscoverMuseumDz Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-6 md:h-6 bg-heritage-gold rounded-full border-2 border-heritage-sand flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-2 h-2 md:w-3 md:h-3 text-dark-brown" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-black tracking-tight display-font leading-none text-dark-brown">
              {t('nav.logo_algerian')}<span className="text-heritage-gold">{t('nav.logo_heritage')}</span>
            </span>
            <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-dark-brown font-black mt-0.5 opacity-80">{t('nav.tagline')}</span>
          </div>
        </div>

        {/* Navigation Links - Grid Style */}
        <div className="hidden xl:flex flex-1 items-stretch">
          {[
            { id: 'eras', label: 'nav.archives' },
            { id: 'registry', label: 'nav.collections' },
            { id: 'dashboard', label: 'nav.analytics' }
          ].map((item) => (
            <a 
              key={item.label} 
              href={`#${item.id}`} 
              className="flex-1 flex items-center justify-center border-r border-border/40 text-[10px] uppercase tracking-[0.4em] font-black text-dark-brown hover:text-dark-brown hover:bg-heritage-sand/50 transition-all group relative overflow-hidden"
            >
              <span className="relative z-10">{t(item.label)}</span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-heritage-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          ))}
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-2 md:gap-4 px-3 md:px-8 flex-shrink-0">
          <button 
            onClick={cycleLanguage}
            className="flex items-center gap-2 bg-dark-brown text-heritage-beige px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-heritage-gold/30 shadow-xl group transition-all active:scale-95 hover:bg-dark-brown/90"
          >
            <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-heritage-gold" />
            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-widest">
              {language === 'ar' ? 'العربية' : language === 'fr' ? 'FR' : 'EN'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
