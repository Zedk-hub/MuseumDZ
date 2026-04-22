import React, { useState } from 'react';
import { MapPin, ArrowRight, ShieldCheck, Clock, Award, Image as ImageIcon, X, Landmark, ScrollText, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Museum, Artifact } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import { useFavorites } from '../lib/FavoritesContext';

interface MuseumCardProps {
  museum: Museum;
}

export const MuseumCard: React.FC<MuseumCardProps> = ({ museum }) => {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [showMuseumDetails, setShowMuseumDetails] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Body Scroll Lock
  React.useEffect(() => {
    if (showMuseumDetails || showFullGallery || selectedArtifact) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMuseumDetails, showFullGallery, selectedArtifact]);

  const gallery = museum.gallery || [museum.imageUrl];

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMuseumDetails(false);
        setSelectedArtifact(null);
        setActiveImageIndex(0);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);
  const { t, isRTL, language } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleGetDirections = () => {
    if (museum.mapLink) {
      window.open(museum.mapLink, '_blank');
    } else {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${museum.location.lat},${museum.location.lng}`, '_blank');
    }
  };

  const getLocalizedName = (item: Museum | Artifact) => {
    if (language === 'ar' && 'arabicName' in item) return item.arabicName || item.name;
    if (language === 'fr' && 'frenchName' in item) return item.frenchName || item.name;
    return item.name;
  };

  const getLocalizedWilaya = (m: Museum) => {
    if (language === 'ar') return m.arabicWilaya || m.wilaya;
    if (language === 'fr') return m.frenchWilaya || m.wilaya;
    return m.wilaya;
  };

  const getLocalizedDescription = (item: Museum | Artifact) => {
    if (language === 'ar' && 'arabicDescription' in item) return item.arabicDescription || item.description;
    if (language === 'fr' && 'frenchDescription' in item) return item.frenchDescription || item.description;
    return item.description;
  };

  const getLocalizedCategory = (m: Museum) => {
    if (language === 'ar') return m.arabicCategory || m.category;
    if (language === 'fr') return m.frenchCategory || m.category;
    return m.category;
  };

  const getLocalizedPeriod = (item: Artifact) => {
    if (language === 'ar') return item.arabicPeriod || item.period;
    if (language === 'fr') return item.frenchPeriod || item.period;
    return item.period;
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group bg-card border border-border/60 overflow-hidden luxury-shadow relative flex flex-col h-full transition-all duration-700 hover:border-heritage-gold"
      >
        {/* Archival Header - Recipe 1: Technical Grid */}
        <div className="bg-muted/30 px-6 py-3 border-b border-border/40 flex justify-between items-center font-mono">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-heritage-gold animate-pulse shadow-[0_0_8px_rgba(197,160,89,0.6)]" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-dark-brown font-black">
              REF_ID: {museum.id.padStart(4, '0')}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleFavorite(museum.id); }}
              className="p-1 hover:bg-muted rounded-full transition-colors group/fav"
            >
              <Heart className={`w-3.5 h-3.5 transition-all ${isFavorite(museum.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-dark-brown group-hover/fav:text-red-400 opacity-60 group-hover/fav:opacity-100'}`} />
            </button>
            <span className="text-[9px] uppercase tracking-[0.2em] text-dark-brown font-black">
              {getLocalizedCategory(museum)}
            </span>
            <div className="h-3 w-[1px] bg-border/60" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-dark-brown font-black">
              v1.0.4
            </span>
          </div>
        </div>

        <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden">
          <img 
            src={museum.imageUrl} 
            alt={getLocalizedName(museum)}
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 grayscale-[0.2] group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/90 via-[#3E2723]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
          
          {/* Hover Action Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-4 md:gap-6 px-6 text-center">
              <button 
                onClick={handleGetDirections}
                className="relative overflow-hidden bg-heritage-beige text-heritage-brown px-8 md:px-10 py-4 md:py-5 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black flex items-center gap-3 md:gap-4 group/btn shadow-2xl rounded-sm"
              >
                <span className="relative z-10">{t('museum.access_coords')}</span>
                <ArrowRight className={`relative z-10 w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover/btn:translate-x-2 ${isRTL ? 'rotate-180' : ''}`} />
                <div className="absolute inset-0 bg-heritage-gold translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              </button>
              <div className="hidden sm:flex items-center gap-4 text-heritage-beige/60 text-[9px] uppercase tracking-[0.4em] font-bold">
                <div className="h-[px] w-6 bg-heritage-beige/20" />
                {t('museum.gps')}: {museum.location.lat.toFixed(3)}, {museum.location.lng.toFixed(3)}
                <div className="h-[px] w-6 bg-heritage-beige/20" />
              </div>
            </div>
          </div>

          {/* National Stamp Overlay */}
          <div className="absolute top-6 right-6 w-14 h-14 national-seal opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 flex items-center justify-center border border-white/20 rounded-full backdrop-blur-sm">
            <Landmark className="text-white w-6 h-6" />
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-8 left-8 right-8 cursor-pointer" onClick={() => setShowMuseumDetails(true)}>
            <div className="flex items-center gap-3 text-white mb-3">
              <MapPin className="w-3 h-3 text-heritage-gold" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black">{getLocalizedWilaya(museum)} — {t('museum.algeria')}</span>
            </div>
            <h3 className="text-4xl md:text-6xl display-font text-white font-bold leading-[0.9] tracking-tighter mb-4">
              {getLocalizedName(museum)}
            </h3>
            <div className="h-[1px] w-12 bg-heritage-gold group-hover:w-full transition-all duration-1000" />
          </div>
        </div>

        <div className="p-8 md:p-10 flex-1 flex flex-col bg-white relative cursor-pointer" onClick={() => setShowMuseumDetails(true)}>
          <div className="absolute inset-0 cultural-pattern opacity-[0.02] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <h4 className="text-3xl md:text-5xl arabic-serif text-dark-brown font-medium leading-tight">
                {language === 'ar' ? museum.name : museum.arabicName}
              </h4>
              <div className="flex flex-col items-end pt-2">
                <span className="text-[11px] arabic-font font-black text-dark-brown">{language === 'ar' ? museum.wilaya : museum.arabicWilaya}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-dark-brown font-black mt-1">{t('museum.region')} 0{Math.floor(Math.random() * 9) + 1}</span>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-dark-brown mb-10 line-clamp-3 leading-relaxed font-bold italic border-l-2 border-heritage-gold/30 pl-6">
              "{getLocalizedDescription(museum)}"
            </p>

            <div className="mb-10 text-[10px] uppercase tracking-[0.4em] font-black text-dark-brown hover:text-heritage-emerald transition-colors flex items-center gap-4">
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              {t('museum.view_entry')}
            </div>

            {/* Visitor Essentials - Recipe 2: Modern Swiss */}
            <div className="grid grid-cols-2 gap-4 mb-10 text-[10px] font-mono border-y border-border/40 py-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-dark-brown">
                  <Landmark className="w-3 h-3" />
                  <span className="uppercase tracking-[0.2em] font-black">{t('museum.access_fee')}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center pr-4 border-r border-border/40">
                    <span className="text-dark-brown font-bold truncate">{t('museum.fee_adult')}</span>
                    <span className="font-bold text-dark-brown">{museum.ticketPrice?.adult} {t('museum.fee_currency')}</span>
                  </div>
                  <div className="flex justify-between items-center pr-4 border-r border-border/40">
                    <span className="text-dark-brown font-bold truncate">{t('museum.fee_student')}</span>
                    <span className="font-bold text-dark-brown">{museum.ticketPrice?.student} {t('museum.fee_currency')}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 pl-4">
                <div className="flex items-center gap-2 text-dark-brown">
                  <ImageIcon className="w-3 h-3" />
                  <span className="uppercase tracking-[0.2em] font-black">{t('museum.photography')}</span>
                </div>
                <div className="font-bold tracking-tight">
                  <span className={museum.photographyAllowed ? 'text-heritage-emerald' : 'text-heritage-red'}>
                    {museum.photographyAllowed ? t('museum.photo_allowed') : t('museum.photo_not_allowed')}
                  </span>
                </div>
                {museum.phone && (
                  <div className="mt-2 pt-2 border-t border-border/40">
                    <div className="text-dark-brown uppercase tracking-[0.2em] font-black mb-1">{t('museum.phone')}</div>
                    <div className="font-bold text-dark-brown tracking-tighter">{museum.phone}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Artifacts Preview - Recipe 3: Hardware Tool Vibe */}
            {museum.artifacts && museum.artifacts.length > 0 && (
              <div className="mb-12 bg-muted/20 p-6 border border-border/40">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-heritage-gold animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-dark-brown">{t('museum.archive_preview')}</span>
                  </div>
                  <div className="text-[9px] font-mono text-dark-brown font-bold">{t('museum.scan_count')}: {museum.artifacts.length}</div>
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
                        alt={getLocalizedName(artifact)}
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
                  <span className="text-[9px] uppercase tracking-[0.2em] text-dark-brown font-black">{t('museum.status_open')}</span>
                  <span className="text-[12px] font-bold tracking-tight text-dark-brown">{museum.openingHours.open} — {museum.openingHours.close}</span>
                </div>
              </div>
              <div className="flex items-center gap-5 justify-end">
                <button 
                  onClick={handleGetDirections}
                  className="flex flex-col items-end group/map"
                >
                  <span className="text-[9px] uppercase tracking-[0.2em] text-dark-brown font-black group-hover/map:text-heritage-gold transition-colors">{t('museum.access_coords')}</span>
                  <span className="text-[12px] font-bold text-dark-brown tracking-tight group-hover/map:text-heritage-gold transition-colors">{museum.location.lat.toFixed(3)}°N, {museum.location.lng.toFixed(3)}°E</span>
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
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-dark-brown">
              {t('museum.verified_archive')}
            </span>
          </div>
          <div className="text-[12px] arabic-font font-black text-heritage-gold/70">{t('museum.certified')}</div>
        </div>
      </motion.div>

      {/* Museum Detail Modal - Recipe 4: Dark Luxury */}
      <AnimatePresence>
        {showMuseumDetails && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex flex-col"
          >
            {/* Added a strong black backdrop that covers EVERYTHING behind it */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[-2]"
              onClick={() => setShowMuseumDetails(false)}
            />
            {/* Opaque solid layer to prevent any background 'bleeding' */}
            <div className="absolute inset-0 bg-background z-[-1]" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="flex-1 flex flex-col overflow-hidden relative"
            >
              {/* Floating Back Button - No structured bar to maximize visibility */}
              <button 
                onClick={() => setShowMuseumDetails(false)}
                className="absolute top-6 left-6 z-[100] group flex items-center gap-4 px-6 py-4 bg-background/80 backdrop-blur-xl border border-border rounded-full hover:bg-heritage-gold hover:text-white transition-all luxury-shadow"
              >
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${!isRTL ? 'rotate-180' : ''}`} />
                <span className="text-[10px] uppercase font-black tracking-[0.3em]">{t('museum.back')}</span>
              </button>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
              {/* Hero Banner with Call to Gallery */}
              <div className="relative h-[40vh] md:h-[60vh] overflow-hidden group">
                <img 
                  src={gallery[0]} 
                  alt={museum.name}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFullGallery(true)}
                    className="px-12 py-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full flex items-center gap-6 group/btn luxury-shadow"
                  >
                    <ImageIcon className="w-6 h-6 text-heritage-gold" />
                    <span className="text-[12px] uppercase tracking-[0.6em] font-black">{t('museum.photos').toUpperCase()}</span>
                    <div className="w-10 h-10 rounded-full bg-heritage-gold flex items-center justify-center transition-transform group-hover/btn:rotate-45">
                      <ArrowRight className="w-5 h-5 -rotate-45 text-background" />
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Main Information Grid */}
              <div className="max-w-[1400px] mx-auto p-8 md:p-20 space-y-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
                  <div className="md:col-span-8 space-y-12">
                    <div className="space-y-6">
                      <h1 className="text-6xl md:text-9xl display-font font-black tracking-tighter leading-[0.8] mb-4 text-[#2D1810]">{getLocalizedName(museum)}</h1>
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-[1px] bg-dark-brown" />
                        <h2 className="text-3xl md:text-5xl arabic-serif text-[#2D1810]" dir="rtl">{language === 'ar' ? museum.name : museum.arabicName}</h2>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute -left-10 top-0 bottom-0 w-[2px] bg-heritage-gold/20" />
                      <p className="text-xl md:text-4xl font-bold leading-relaxed text-[#2D1810] italic">
                        "{getLocalizedDescription(museum)}"
                      </p>
                    </div>

                    {/* Quick Stats Integrated */}
                    <div className="grid grid-cols-2 gap-8 pt-12 border-t border-border/40">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground">{t('museum.access_fee')}</span>
                        <div className="text-2xl font-bold">{museum.ticketPrice?.adult} {t('museum.fee_currency')}</div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground">{t('museum.photography')}</span>
                        <div className="text-lg font-bold flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${museum.photographyAllowed ? 'bg-green-500' : 'bg-red-500'}`} />
                          {museum.photographyAllowed ? t('museum.photo_allowed') : t('museum.photo_not_allowed')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4 space-y-10">
                    {/* NEW: Institutional Record Box with Photos Trigger */}
                    <div className="bg-muted/30 border border-border/40 rounded-3xl p-10 space-y-10 luxury-shadow">
                      <div className="space-y-4">
                        <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-dark-brown">{t('museum.verified_archive')}</h4>
                        <div className="p-6 bg-white rounded-2xl border border-heritage-gold/20 flex flex-col gap-2">
                          <span className="text-[9px] font-mono text-dark-brown">INSTITUTIONAL_RECORD_HASH</span>
                          <span className="text-lg font-mono font-bold tracking-tighter text-dark-brown">MDZ_{museum.id}_AUTH_2026</span>
                        </div>
                      </div>

                      {/* Photo Box Request */}
                      <button 
                        onClick={() => setShowFullGallery(true)}
                        className="w-full group relative overflow-hidden bg-dark-brown text-heritage-beige rounded-2xl p-8 transition-transform hover:-translate-y-1 hover:shadow-2xl"
                      >
                        <div className="absolute inset-0 cultural-pattern opacity-10 pointer-events-none" />
                        <div className="relative z-10 flex flex-col gap-4 text-left font-sans">
                          <div className="flex justify-between items-start">
                            <ImageIcon className="w-10 h-10 text-heritage-gold" />
                            <Award className="w-6 h-6 opacity-20" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-[10px] uppercase tracking-[0.5em] font-black opacity-60 mb-2">{t('museum.photos').toUpperCase()}</span>
                            <span className="text-3xl display-font font-bold">{gallery.length} ARCHIVES</span>
                          </div>
                        </div>
                        <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-heritage-gold flex items-center justify-center translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                          <ArrowRight className="w-6 h-6 text-dark-brown" />
                        </div>
                      </button>

                      <div className="pt-6 border-t border-heritage-gold/20">
                        <button 
                          onClick={handleGetDirections}
                          className="w-full py-6 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.4em] font-black border-2 border-dark-brown text-dark-brown hover:bg-heritage-emerald hover:border-heritage-emerald hover:text-white transition-all rounded-2xl"
                        >
                          <MapPin className="w-4 h-4" />
                          {t('museum.access_coords')}
                        </button>
                      </div>
                    </div>

                    <div className="px-6 space-y-4">
                      <div className="flex items-center gap-4 text-muted-foreground/60">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-[10px] uppercase font-bold tracking-widest">{t('artifact.verification')}</span>
                      </div>
                      <div className="text-xs font-mono leading-relaxed text-muted-foreground/40">
                        OFFICIAL_REGISTRY_CERTIFICATE_ISSUED_BY_MINISTRY_OF_CULTURE_ALGERIA
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                {/* Artifacts Gallery Section */}
                {museum.artifacts && museum.artifacts.length > 0 && (
                  <div className="space-y-16">
                    <div className="flex items-center justify-between border-b border-border/20 pb-8">
                      <div className="flex items-center gap-6">
                        <ScrollText className="w-8 h-8 text-dark-brown" />
                        <h3 className="text-[14px] uppercase tracking-[0.8em] font-black text-dark-brown">{t('museum.digital_collection')}</h3>
                      </div>
                      <div className="flex items-center gap-4 px-6 py-2 bg-muted rounded-full text-[10px] font-mono">
                        <span className="text-dark-brown font-black">REGISTRY_COUNT:</span>
                        <span className="font-bold">{museum.artifacts.length}</span>
                      </div>
                    </div>

                    <div className="flex gap-12 overflow-x-auto pb-12 snap-x custom-scrollbar">
                      {museum.artifacts.map((artifact) => (
                        <motion.div 
                          key={artifact.id}
                          whileHover={{ y: -15 }}
                          className="bg-muted/20 border border-border/40 luxury-shadow flex-shrink-0 w-80 md:w-[28rem] rounded-[2rem] overflow-hidden snap-center cursor-pointer group/art"
                          onClick={(e) => { e.stopPropagation(); setSelectedArtifact(artifact); }}
                        >
                          <div className="aspect-[4/5] overflow-hidden relative">
                            <img src={artifact.imageUrl} alt={artifact.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover/art:scale-110" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/art:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-sm">
                              <div className="p-8 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 transform scale-50 group-hover/art:scale-100 transition-all duration-700">
                                <ImageIcon className="text-white w-10 h-10" />
                              </div>
                            </div>
                          </div>
                          <div className="p-10">
                            <div className="text-[11px] uppercase tracking-[0.4em] font-black text-dark-brown mb-4">{getLocalizedPeriod(artifact)}</div>
                            <h4 className="text-3xl md:text-4xl display-font font-bold mb-4 group-hover/art:text-heritage-brown transition-colors">{getLocalizedName(artifact)}</h4>
                            <p className="text-xl arabic-serif text-muted-foreground/60" dir="rtl">{isRTL ? artifact.name : artifact.arabicName}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Final Footer Navigation */}
                <div className="pt-20 pb-20 border-t border-border/20 flex flex-col items-center gap-12">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowMuseumDetails(false)}
                    className="flex flex-col items-center gap-8 group"
                  >
                    <div className="w-28 h-28 rounded-full border-2 border-heritage-gold/20 flex items-center justify-center group-hover:bg-heritage-gold group-hover:border-heritage-gold transition-all duration-700 luxury-shadow relative overflow-hidden">
                      <ArrowRight className={`w-12 h-12 text-heritage-gold group-hover:text-black transition-all transform ${isRTL ? 'rotate-0' : 'rotate-180'}`} />
                    </div>
                    <span className="text-[14px] uppercase tracking-[1em] font-black text-heritage-gold group-hover:text-white transition-colors">{t('museum.back').toUpperCase()}</span>
                  </motion.button>
                  
                  <div className="text-[9px] font-mono text-muted-foreground/20 uppercase tracking-[0.5em]">
                    Heritage_Portal_v2_2026 // Algerian_National_Archive
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Professional Full-Screen Photo Gallery Overlay */}
      <AnimatePresence>
        {showFullGallery && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100001] bg-black flex flex-col overflow-hidden"
          >
            {/* Floating Gallery Controls - Minimalist implementation */}
            <div className="absolute top-10 left-10 z-[200]">
              <button 
                onClick={() => setShowFullGallery(false)}
                className="group flex items-center gap-6 bg-heritage-gold px-12 py-6 rounded-full text-white transition-all duration-500 shadow-[0_30px_60px_rgba(193,154,107,0.5)] hover:scale-105 active:scale-95"
              >
                <ArrowRight className={`w-7 h-7 transition-transform group-hover:translate-x-1 ${!isRTL ? 'rotate-180' : ''}`} />
                <span className="text-[16px] uppercase font-black tracking-[0.4em]">{t('museum.back')}</span>
              </button>
            </div>

            <div className="absolute top-10 right-10 z-[200] hidden md:flex flex-col items-end text-white p-5 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 font-mono text-[12px] tracking-[0.5em]">
              <span className="text-heritage-gold">IMAGE_INDEX</span>
              <span>{activeImageIndex + 1} / {gallery.length}</span>
            </div>

            {/* Immersive Image Display */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-0 overflow-hidden">
              <div className="absolute inset-0 cultural-pattern opacity-[0.05] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={gallery[activeImageIndex]}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
                >
                  <img 
                    src={gallery[activeImageIndex]} 
                    alt={getLocalizedName(museum)}
                    className="max-w-full max-h-full object-contain shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Image Metadata Overlay */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 p-4 bg-black/40 backdrop-blur-md rounded-full border border-white/5 flex items-center gap-8 text-white/60 text-[10px] uppercase font-mono tracking-widest hidden md:flex">
                    <span>{getLocalizedName(museum)}</span>
                    <div className="w-[1px] h-4 bg-white/20" />
                    <span>ALGERIAN_HERITAGE_ARCHIVE</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows - Smaller and Professional */}
              {gallery.length > 1 && (
                <div className="absolute inset-x-4 md:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button 
                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
                    className="pointer-events-auto p-4 md:p-6 rounded-full bg-white/5 hover:bg-heritage-gold backdrop-blur-2xl border border-white/5 text-white transition-all group opacity-30 hover:opacity-100"
                  >
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 rotate-180 transition-transform group-hover:-translate-x-2" />
                  </button>
                  <button 
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % gallery.length)}
                    className="pointer-events-auto p-4 md:p-6 rounded-full bg-white/5 hover:bg-heritage-gold backdrop-blur-2xl border border-white/5 text-white transition-all group opacity-30 hover:opacity-100"
                  >
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-2" />
                  </button>
                </div>
              )}
            </div>

            {/* Gallery Filmstrip at bottom */}
            <div className="bg-black/80 backdrop-blur-3xl p-6 border-t border-white/5 flex justify-center gap-4 overflow-x-auto custom-scrollbar">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-14 md:w-32 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${activeImageIndex === idx ? 'ring-2 ring-heritage-gold scale-105' : 'opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  {activeImageIndex === idx && (
                    <div className="absolute inset-0 bg-heritage-gold/20" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Artifact Modal - Recipe 4: Dark Luxury */}
      <AnimatePresence>
        {selectedArtifact && (
          <div className="fixed inset-0 z-[100002] flex items-center justify-center p-0 md:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArtifact(null)}
              className="absolute inset-0 bg-black backdrop-blur-3xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="relative w-full h-full md:h-auto max-w-6xl max-h-[100vh] md:max-h-[90vh] overflow-hidden bg-card border border-white/10 flex flex-col md:flex-row luxury-shadow"
            >
              {/* Sidebar Header for back button */}
              <div className="md:w-[120px] bg-background border-b md:border-b-0 md:border-r border-border/40 flex md:flex-col items-center justify-center p-6 gap-6 z-40">
                <button 
                  onClick={() => setSelectedArtifact(null)}
                  className="group flex flex-col items-center gap-4 transition-all"
                >
                  <div className="p-5 bg-muted hover:bg-heritage-gold hover:text-white transition-all rounded-full border border-border luxury-shadow">
                    <ArrowRight className={`w-6 h-6 transform transition-transform group-hover:translate-x-1 ${!isRTL ? 'rotate-180' : ''}`} />
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground group-hover:text-heritage-gold transition-colors">{t('museum.back')}</span>
                </button>
              </div>

              <div className="flex-1 flex flex-col md:flex-row overflow-y-auto custom-scrollbar">
                <div className="md:w-3/5 relative bg-black flex items-center justify-center min-h-[300px] md:min-h-0">
                  <img 
                    src={selectedArtifact.imageUrl} 
                    alt={getLocalizedName(selectedArtifact)}
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur-md border-l-2 border-heritage-gold">
                    <span className="text-[8px] uppercase tracking-[0.4em] font-black text-heritage-gold mb-1 block">{t('artifact.era')}</span>
                    <span className="text-xl text-white display-font font-bold tracking-tighter">{getLocalizedPeriod(selectedArtifact)}</span>
                  </div>
                </div>

                <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-card relative">
                  <div className="absolute inset-0 cultural-pattern opacity-5 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-[1px] bg-dark-brown" />
                      <span className="text-[9px] uppercase tracking-[0.5em] font-black text-dark-brown">{t('artifact.registry_entry')}</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl display-font font-black mb-4 tracking-tighter leading-tight text-[#2D1810]">{getLocalizedName(selectedArtifact)}</h2>
                    <h3 className="text-3xl md:text-4xl arabic-serif text-heritage-gold mb-8 font-black" dir={isRTL ? 'rtl' : 'ltr'}>{language === 'ar' ? selectedArtifact.name : selectedArtifact.arabicName}</h3>
                    
                    <div className="space-y-8 mb-12">
                      <p className="text-[#2D1810] leading-relaxed text-lg md:text-xl font-bold italic border-l-2 border-heritage-gold/20 pl-6">
                        "{getLocalizedDescription(selectedArtifact)}"
                      </p>
                    </div>

                    <div className="pt-8 border-t border-border/40 flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <Landmark className="w-4 h-4 text-heritage-gold" />
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground font-bold">{t('artifact.custodian')}</span>
                          <span className="text-[11px] font-bold tracking-tight">{isRTL ? museum.arabicName : museum.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <ShieldCheck className="w-4 h-4 text-heritage-gold" />
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground font-bold">{t('artifact.verification')}</span>
                          <span className="text-[11px] font-bold tracking-tight text-heritage-gold">{t('artifact.authentic')}</span>
                        </div>
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
