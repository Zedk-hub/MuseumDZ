import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Scale, FileText, Lock, Globe, Landmark } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  const { t, isRTL } = useLanguage();

  const legalItems = [
    { title: 'legal.item1_title', desc: 'legal.item1_desc', icon: Landmark },
    { title: 'legal.item2_title', desc: 'legal.item2_desc', icon: Scale },
    { title: 'legal.item3_title', desc: 'legal.item3_desc', icon: FileText },
    { title: 'legal.item4_title', desc: 'legal.item4_desc', icon: Lock },
    { title: 'legal.item5_title', desc: 'legal.item5_desc', icon: ShieldCheck },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-brown/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-heritage-beige rounded-[2rem] overflow-hidden luxury-shadow border border-heritage-gold/20 flex flex-col"
          >
            {/* Header */}
            <div className="p-8 md:p-12 border-b border-heritage-gold/10 flex justify-between items-center bg-white/50 relative">
              <div className="absolute inset-0 cultural-pattern opacity-[0.03] pointer-events-none" />
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 bg-dark-brown rounded-full flex items-center justify-center shadow-lg border border-heritage-gold/20">
                  <ShieldCheck className="text-heritage-gold w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold display-font text-dark-brown tracking-tight">
                    {t('legal.title')}
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-heritage-gold mt-1">
                    VERIFIED_LEGAL_FRAMEWORK_v1.0
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-4 hover:bg-dark-brown hover:text-white transition-all rounded-full border border-heritage-gold/10 group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 space-y-12">
              <div className="bg-heritage-sand/30 p-8 rounded-3xl border border-dashed border-heritage-gold/20 italic text-dark-brown font-bold leading-relaxed text-lg">
                "{t('legal.intro')}"
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {legalItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-heritage-gold/20 flex items-center justify-center luxury-shadow group-hover:bg-heritage-gold group-hover:text-white transition-colors duration-500">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold display-font text-dark-brown group-hover:text-heritage-gold transition-colors">
                        {t(item.title)}
                      </h3>
                    </div>
                    <p className="text-dark-brown font-bold leading-relaxed pl-14">
                      {t(item.desc)}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="pt-12 border-t border-heritage-gold/10 text-center">
                <div className="inline-flex items-center gap-4 bg-dark-brown text-heritage-beige px-8 py-3 rounded-full text-[9px] uppercase tracking-[0.4em] font-black">
                  <Globe className="w-4 h-4 text-heritage-gold" />
                  Independent Cultural Initiative 2026
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-heritage-gold/10 flex justify-center bg-white/30 backdrop-blur-md">
              <button 
                onClick={onClose}
                className="px-12 py-5 bg-dark-brown text-heritage-beige rounded-2xl text-[10px] uppercase tracking-[0.4em] font-black hover:bg-heritage-emerald transition-all luxury-shadow"
              >
                {t('legal.close')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
