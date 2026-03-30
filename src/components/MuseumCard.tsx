import React, { useState } from 'react';
import { MapPin, ArrowRight, ShieldCheck, Clock, Award, Image as ImageIcon, X, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Museum, Artifact } from '../types';
import { useLanguage } from '../lib/LanguageContext';

interface MuseumCardProps {
  museum: Museum;
}

export const MuseumCard: React.FC<MuseumCardProps> = ({ museum }) => {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const { t, isRTL } = useLanguage();

  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${museum.location.lat},${museum.location.lng}`, '_blank');
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group bg-card border border-border/60 overflow-hidden luxury-shadow relative flex flex-col h-full transition-all duration-700 hover:border-heritage-green/50"
      >
        {/* Archival Header - Recipe 1: Technical Grid */}
        <div className="bg-muted/30 px-6 py-3 border-b border-border/40 flex justify-between items-center font-mono">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-heritage-gold animate-pulse shadow-[0_0_8px_rgba(197,160,89,0.6)]" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 font-bold">
              REF_ID: {museum.id.padStart(4, '0')}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.2em] text-heritage-gold font-black">
              {isRTL ? (museum.arabicCategory || museum.category) : museum.category}
            </span>
            <div className="h-3 w-[1px] bg-border/60" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
              v1.0.4
            </span>
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden">
          <img 
            src={museum.imageUrl} 
            alt={isRTL ? museum.arabicName : museum.name}
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 grayscale-[0.3] group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700" />
          
          {/* Hover Action Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[4px]">
            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={handleGetDirections}
                className="relative overflow-hidden bg-white text-black px-10 py-5 text-[10px] uppercase tracking-[0.4em] font-black flex items-center gap-4 group/btn shadow-2xl"
              >
                <span className="relative z-10">{t('museum.access_coords')}</span>
                <ArrowRight className={`relative z-10 w-4 h-4 transition-transform group-hover/btn:translate-x-2 ${isRTL ? 'rotate-180' : ''}`} />
                <div className="absolute inset-0 bg-heritage-gold translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              </button>
              <div className="flex items-center gap-4 text-white/40 text-[9px] uppercase tracking-[0.5em] font-bold">
                <div className="h-[1px] w-8 bg-white/20" />
                {t('museum.gps')}: {museum.location.lat.toFixed(4)}, {museum.location.lng.toFixed(4)}
                <div className="h-[1px] w-8 bg-white/20" />
              </div>
            </div>
          </div>

          {/* National Stamp Overlay */}
          <div className="absolute top-6 right-6 w-14 h-14 national-seal opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 flex items-center justify-center border border-white/20 rounded-full backdrop-blur-sm">
            <Landmark className="text-white w-6 h-6" />
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-3 text-heritage-gold mb-3">
              <MapPin className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black">{isRTL ? museum.arabicWilaya : museum.wilaya} — {t('museum.algeria')}</span>
            </div>
            <h3 className="text-3xl md:text-4xl display-font text-white font-bold leading-[0.9] tracking-tighter mb-2">
              {isRTL ? museum.arabicName : museum.name}
            </h3>
            <div className="h-[1px] w-12 bg-heritage-green/50 group-hover:w-full transition-all duration-1000" />
          </div>
        </div>

        <div className="p-8 md:p-10 flex-1 flex flex-col bg-card relative">
          <div className="absolute inset-0 cultural-pattern opacity-[0.02] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <h4 className="text-2xl md:text-3xl arabic-serif text-foreground/90 font-medium leading-tight">
                {isRTL ? museum.name : museum.arabicName}
              </h4>
              <div className="flex flex-col items-end pt-2">
                <span className="text-[11px] arabic-font font-black text-heritage-gold">{isRTL ? museum.wilaya : museum.arabicWilaya}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 font-bold mt-1">{t('museum.region')} 0{Math.floor(Math.random() * 9) + 1}</span>
              </div>
            </div>
            
            <p className="text-base text-muted-foreground mb-10 line-clamp-3 leading-relaxed font-light italic border-l-2 border-heritage-green/20 pl-6">
              "{isRTL ? museum.arabicDescription : museum.description}"
            </p>

            {/* Artifacts Preview - Recipe 3: Hardware Tool Vibe */}
            {museum.artifacts && museum.artifacts.length > 0 && (
              <div className="mb-12 bg-muted/20 p-6 border border-border/40">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-heritage-gold animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground">{t('museum.archive_preview')}</span>
                  </div>
                  <div className="text-[9px] font-mono text-muted-foreground/60">{t('museum.scan_count')}: {museum.artifacts.length}</div>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {museum.artifacts.map((artifact) => (
                    <motion.button
                      key={artifact.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      onClick={() => setSelectedArtifact(artifact)}
                      className="relative flex-shrink-0 w-20 h-20 overflow-hidden border border-border/60 hover:border-heritage-gold transition-all duration-500 group/artifact shadow-xl bg-black"
                    >
                      <img 
                        src={artifact.imageUrl} 
                        alt={isRTL ? artifact.arabicName : artifact.name}
                        className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover/artifact:scale-125 group-hover/artifact:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/artifact:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-heritage-gold" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto grid grid-cols-2 gap-10 pt-10 border-t border-border/40 font-mono">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center border border-border/40 group-hover:border-heritage-gold/40 transition-colors">
                  <Clock className="w-5 h-5 text-heritage-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-black">{t('museum.status_open')}</span>
                  <span className="text-[12px] font-bold tracking-tight">{museum.openingHours.open} — {museum.openingHours.close}</span>
                </div>
              </div>
              <div className="flex items-center gap-5 justify-end">
                <button 
                  onClick={handleGetDirections}
                  className="flex flex-col items-end group/map"
                >
                  <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-black group-hover/map:text-heritage-gold transition-colors">{t('museum.access_coords')}</span>
                  <span className="text-[12px] font-bold text-heritage-gold tracking-tight group-hover/map:text-heritage-gold transition-colors">{museum.location.lat.toFixed(3)}°N, {museum.location.lng.toFixed(3)}°E</span>
                </button>
                <button 
                  onClick={handleGetDirections}
                  className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center border border-border/40 group-hover:border-heritage-gold/40 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-heritage-gold" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Certification */}
        <div className="px-10 py-6 bg-muted/30 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShieldCheck className="w-5 h-5 text-heritage-gold relative z-10" />
              <div className="absolute inset-0 bg-heritage-gold/30 blur-md rounded-full" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground/60">
              {t('museum.verified_archive')}
            </span>
          </div>
          <div className="text-[12px] arabic-font font-black text-heritage-gold/70">{t('museum.certified')}</div>
        </div>
      </motion.div>

      {/* Artifact Modal - Recipe 4: Dark Luxury */}
      <AnimatePresence>
        {selectedArtifact && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArtifact(null)}
              className="absolute inset-0 bg-black/98 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-card border border-white/10 flex flex-col md:flex-row luxury-shadow"
            >
              <button 
                onClick={() => setSelectedArtifact(null)}
                className="absolute top-8 right-8 z-30 p-4 bg-white/5 text-white hover:bg-heritage-gold transition-all rounded-full backdrop-blur-md border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-3/5 relative overflow-hidden flex-shrink-0 bg-black">
                <img 
                  src={selectedArtifact.imageUrl} 
                  alt={isRTL ? selectedArtifact.arabicName : selectedArtifact.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-12 left-12 p-8 bg-black/40 backdrop-blur-md border-l-4 border-heritage-gold">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-black text-heritage-gold mb-3 block">{t('artifact.era')}</span>
                  <span className="text-3xl md:text-4xl text-white display-font font-bold tracking-tighter">{isRTL ? selectedArtifact.arabicPeriod : selectedArtifact.period}</span>
                </div>
              </div>

              <div className="md:w-2/5 p-12 md:p-16 flex flex-col justify-center bg-card relative overflow-y-auto">
                <div className="absolute inset-0 cultural-pattern opacity-5 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-[1px] bg-heritage-gold" />
                    <span className="text-[10px] uppercase tracking-[0.5em] font-black text-heritage-gold">{t('artifact.registry_entry')}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl display-font font-bold mb-4 tracking-tighter leading-[0.9]">{isRTL ? selectedArtifact.arabicName : selectedArtifact.name}</h2>
                  <h3 className="text-3xl md:text-4xl arabic-serif text-foreground/80 mb-12">{isRTL ? selectedArtifact.name : selectedArtifact.arabicName}</h3>
                  
                  <div className="space-y-10 mb-16">
                    <p className="text-muted-foreground leading-relaxed text-lg font-light italic">
                      "{isRTL ? selectedArtifact.arabicDescription : selectedArtifact.description}"
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-xl arabic-font font-light">
                      {isRTL ? selectedArtifact.description : selectedArtifact.arabicDescription}
                    </p>
                  </div>

                  <div className="pt-12 border-t border-border/40 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <Landmark className="w-5 h-5 text-heritage-gold" />
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">{t('artifact.custodian')}</span>
                        <span className="text-[12px] font-bold tracking-tight">{isRTL ? museum.arabicName : museum.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <ShieldCheck className="w-5 h-5 text-heritage-gold" />
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">{t('artifact.verification')}</span>
                        <span className="text-[12px] font-bold tracking-tight text-heritage-gold">{t('artifact.authentic')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
