import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, History, Landmark, ShieldCheck, ScrollText, X, BookOpen, Quote } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { eras } from '../data/eras';
import { Era } from '../types';

export const HistoricalEras: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [selectedEra, setSelectedEra] = useState<Era | null>(null);

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedEra(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getLocalizedTitle = (era: Era) => {
    if (language === 'ar') return era.arabicTitle || era.title;
    if (language === 'fr') return era.frenchTitle || era.title;
    return era.title;
  };

  const getLocalizedDescription = (era: Era) => {
    if (language === 'ar') return era.arabicDescription || era.description;
    if (language === 'fr') return era.frenchDescription || era.description;
    return era.description;
  };

  const getLocalizedContent = (era: Era) => {
    if (language === 'ar') return era.arabicContent || era.arabicDescription || era.description;
    if (language === 'fr') return era.frenchContent || era.frenchDescription || era.description;
    return era.content || era.description;
  };

  const getLocalizedYear = (era: Era) => {
    // Standard Latin numerals as requested
    return era.year;
  };

  return (
    <section id="eras" className="py-32 md:py-60 bg-background relative overflow-hidden">
      {/* Background Large Text */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
        <span className="text-[20vw] font-black uppercase tracking-tighter display-font">Timeline</span>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10">
        <div className="flex flex-col mb-24 md:mb-40">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-heritage-gold" />
            <span className="text-[12px] md:text-[14px] uppercase tracking-[0.5em] font-black text-dark-brown drop-shadow-sm">
              {t('eras.chronicles')}
            </span>
          </div>
          <h2 className="text-7xl md:text-10xl display-font font-bold tracking-tighter leading-[0.9] mb-8 text-foreground">
            {t('eras.title')}
          </h2>
        </div>

        <div className="space-y-32 md:space-y-64">
          {eras.map((era, index) => (
            <div key={era.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`lg:col-span-5 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="absolute -top-16 -left-8 text-[120px] md:text-[200px] font-black text-heritage-brown/5 display-font leading-none select-none pointer-events-none hidden sm:block">
                    {/* Background text removed as requested or standardized */}
                  </div>
                  <div className="relative z-10 px-4 md:px-0">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-heritage-gold/10 flex items-center justify-center mb-8 md:mb-10 border border-heritage-gold/20`}>
                      <History className={`w-6 h-6 md:w-8 md:h-8 text-heritage-gold`} />
                    </div>
                    <h4 className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4 md:mb-6 leading-tight">
                      <span className="text-4xl md:text-9xl display-font font-bold tracking-tight text-heritage-brown">
                        {getLocalizedTitle(era as any)}
                      </span>
                      <span className="text-2xl md:text-5xl text-dark-brown/40 font-black display-font">
                        {getLocalizedYear(era as any)}
                      </span>
                    </h4>
                    <p className="text-lg md:text-4xl text-dark-brown leading-relaxed font-bold italic mb-8 md:mb-12 max-w-2xl">
                      "{getLocalizedDescription(era as any)}"
                    </p>
                    <button 
                      onClick={() => setSelectedEra(era as any)}
                      className={`group flex items-center gap-4 md:gap-6 text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-dark-brown hover:translate-x-4 transition-all`}
                    >
                      {t('eras.view_archives')} <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className={`lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative aspect-video lg:aspect-[16/9] overflow-hidden luxury-shadow group cursor-pointer"
                  onClick={() => setSelectedEra(era as any)}
                >
                  <img 
                    src={era.image} 
                    alt={getLocalizedTitle(era as any)}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Meta Details Overlay */}
                  <div className="absolute top-8 right-8 flex flex-col gap-4">
                    <div className="bg-heritage-beige/90 backdrop-blur-md border border-heritage-gold/40 px-6 py-3 flex items-center gap-3 shadow-xl">
                      <ShieldCheck className="w-4 h-4 text-heritage-gold" />
                      <span className="text-[10px] uppercase tracking-widest font-black text-dark-brown">{t('eras.verified')}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-10 right-10 flex gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Landmark className="w-5 h-5 text-heritage-gold" />
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <ScrollText className="w-5 h-5 text-heritage-gold" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Era Detail Modal */}
      <AnimatePresence>
        {selectedEra && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEra(null)}
              className="fixed inset-0 bg-black/98 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="relative w-full max-w-6xl bg-card border border-white/10 flex flex-col luxury-shadow my-auto"
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50 pointer-events-none">
                <button 
                  onClick={() => setSelectedEra(null)}
                  className="pointer-events-auto flex items-center gap-4 px-6 py-3 bg-white/10 text-white hover:bg-heritage-gold transition-all rounded-full backdrop-blur-md border border-white/10 group"
                >
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${!isRTL ? 'rotate-180' : ''}`} />
                  <span className="text-[10px] uppercase tracking-widest font-black">{t('museum.back')}</span>
                </button>
                <button 
                  onClick={() => setSelectedEra(null)}
                  className="pointer-events-auto p-4 bg-white/5 text-white hover:bg-red-500 transition-all rounded-full backdrop-blur-md border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh]">
                {/* Visual */}
                <div className="lg:col-span-5 relative h-64 lg:h-full bg-black overflow-hidden bg-muted/10">
                  <img 
                    src={selectedEra.image} 
                    alt={getLocalizedTitle(selectedEra)}
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12">
                     <div className="bg-heritage-sand/90 backdrop-blur-xl p-10 md:p-14 border border-heritage-gold/20 shadow-2xl rounded-3xl">
                        <div className="text-[10px] uppercase tracking-[0.4em] font-black text-dark-brown mb-4 drop-shadow-sm">{t('eras.chronicles')}</div>
                        <h2 className="text-5xl md:text-8xl text-black font-black tracking-tighter display-font mb-6 leading-none">{getLocalizedTitle(selectedEra)}</h2>
                        <div className="text-3xl md:text-5xl display-font font-black text-black">{getLocalizedYear(selectedEra)}</div>
                     </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 p-10 md:p-20 overflow-y-auto bg-card relative">
                  <div className="absolute inset-0 cultural-pattern opacity-5 pointer-events-none" />
                  <div className="relative z-10 space-y-12">
                    <div className="flex items-center gap-6 pb-12 border-b border-border/40">
                      <div className="w-20 h-20 rounded-full border border-heritage-gold/30 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-heritage-gold" />
                      </div>
                      <div>
                        <div className="text-[12px] uppercase tracking-widest font-black text-dark-brown mb-2">{t('eras.verified')}</div>
                        <div className="text-2xl font-bold tracking-tight text-dark-brown">National Archive Dossier</div>
                      </div>
                    </div>

                    <div className="flex gap-8 items-start">
                      <Quote className="w-16 h-16 text-heritage-gold/20 flex-shrink-0" />
                      <div 
                        className={`text-xl md:text-3xl leading-relaxed text-foreground font-light whitespace-pre-line ${isRTL ? 'text-right' : 'text-left'}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        {getLocalizedContent(selectedEra)}
                      </div>
                    </div>

                    <div className="pt-12 border-t border-border/40 flex justify-between items-center text-[10px] font-mono text-muted-foreground/30">
                      <span>DOCUMENT_CLASSIFIED_HERITAGE</span>
                      <span>v2.4.0_REV</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
