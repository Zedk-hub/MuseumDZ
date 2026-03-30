import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, History, Landmark, ShieldCheck, ScrollText } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { eras } from '../data/eras';

export const HistoricalEras: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-32 md:py-60 bg-background relative overflow-hidden">
      {/* Background Large Text */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
        <span className="text-[20vw] font-black uppercase tracking-tighter display-font">Timeline</span>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10">
        <div className="flex flex-col mb-24 md:mb-40">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-heritage-gold" />
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black text-heritage-gold">
              {t('eras.chronicles')}
            </span>
          </div>
          <h2 className="text-6xl md:text-9xl display-font font-bold tracking-tighter leading-[0.9] mb-8">
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
                  <div className="absolute -top-16 -left-8 text-[120px] md:text-[200px] font-black text-muted/10 display-font leading-none select-none pointer-events-none">
                    {isRTL ? era.arabicYear.split(' ')[0] : era.year.split(' ')[0]}
                  </div>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-full bg-${era.color}/10 flex items-center justify-center mb-10`}>
                      <History className={`w-8 h-8 text-${era.color}`} />
                    </div>
                    <h4 className="text-4xl md:text-7xl display-font font-bold mb-4 tracking-tight text-foreground">
                      {isRTL ? era.arabicTitle : era.title}
                    </h4>
                    <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed font-light italic mb-12 max-w-xl">
                      "{isRTL ? era.arabicDescription : era.description}"
                    </p>
                    <button className={`group flex items-center gap-6 text-[11px] uppercase tracking-[0.4em] font-black text-${era.color} hover:translate-x-4 transition-all`}>
                      {t('eras.view_archives')} <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
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
                  className="relative aspect-video lg:aspect-[16/9] overflow-hidden luxury-shadow group"
                >
                  <img 
                    src={era.image} 
                    alt={isRTL ? era.arabicTitle : era.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Meta Details Overlay */}
                  <div className="absolute top-8 right-8 flex flex-col gap-4">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-heritage-gold" />
                      <span className="text-[10px] uppercase tracking-widest font-black text-white">{t('eras.verified')}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-heritage-gold mb-2">{t('eras.period')}</span>
                      <span className="text-2xl text-white display-font">{isRTL ? era.arabicYear : era.year}</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Landmark className="w-5 h-5 text-heritage-gold" />
                      </div>
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                        <ScrollText className="w-5 h-5 text-heritage-gold" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
