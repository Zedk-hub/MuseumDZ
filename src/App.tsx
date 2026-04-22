import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MuseumCard } from './components/MuseumCard';
import { Dashboard } from './components/Dashboard';
import { HistoricalEras } from './components/HistoricalEras';
import { HeritageGuide } from './components/HeritageGuide';
import { LegalModal } from './components/LegalModal';
import { museums } from './data/museums';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Info, Mail, Phone, MapPin, Facebook, Twitter, Instagram, ExternalLink, ArrowRight, ShieldCheck, Globe, ScrollText, Award, Compass, Send, X } from 'lucide-react';
import { useLanguage } from './lib/LanguageContext';
import { useFavorites } from './lib/FavoritesContext';
import { Filter, Bookmark, Grid, Heart, ChevronDown } from 'lucide-react';

interface FooterProps {
  onOpenLegal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { t, isRTL } = useLanguage();
  return (
    <footer className="bg-dark-brown text-heritage-beige py-24 md:py-48 relative overflow-hidden">
      <div className="absolute inset-0 cultural-pattern opacity-[0.03] pointer-events-none" />
      <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-32 mb-24 md:mb-32">
          <div className="lg:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex justify-between items-start mb-8 md:mb-12">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full border border-heritage-gold/30 shadow-2xl">
                      <Landmark className="text-dark-brown w-6 h-6" />
                    </div>
                    <span className="text-xl md:text-3xl display-font font-bold tracking-tighter uppercase text-heritage-beige/90">{t('hero.subtitle')}</span>
                  </div>
                </div>
                <p className="text-base md:text-xl text-heritage-beige/60 leading-relaxed font-bold italic mb-10 max-w-lg">
                  "{t('footer.tagline')}"
                </p>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-heritage-beige mb-10">{t('footer.registry')}</h4>
            <ul className="space-y-6">
              {[
                { key: 'nav.collections', href: '#registry' },
                { key: 'nav.exhibitions', href: '#registry' },
                { key: 'nav.archives', href: '#eras' },
                { key: 'nav.analytics', href: '#dashboard' }
              ].map((item) => (
                <li key={item.key}>
                  <a href={item.href} className="text-lg font-black text-white/50 hover:text-heritage-gold transition-colors">{t(item.key)}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-heritage-beige mb-10">{t('footer.about')}</h4>
            <div className="space-y-8">
              <div>
                <button 
                  onClick={onOpenLegal}
                  className="text-sm font-bold leading-relaxed text-white/50 italic text-left hover:text-heritage-gold transition-colors"
                >
                  {t('footer.disclaimer_text')}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-[11px] uppercase tracking-[0.4em] font-black text-white/30">
            {t('footer.copyright')}
          </div>
          <div className="flex items-center gap-12">
            <button onClick={onOpenLegal} className="text-[11px] uppercase tracking-[0.4em] font-black text-white/40 hover:text-white transition-colors">{t('footer.privacy')}</button>
            <button onClick={onOpenLegal} className="text-[11px] uppercase tracking-[0.4em] font-black text-white/40 hover:text-white transition-colors">{t('footer.terms')}</button>
          </div>
          <div className="text-2xl md:text-3xl arabic-serif text-white/10" dir="rtl">
            {t('footer.independent_note')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const { t, isRTL, language } = useLanguage();
  const { favorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [wilayaFilter, setWilayaFilter] = useState('All');
  const [eraFilter, setEraFilter] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLegalOpen, setIsLegalOpen] = useState(false);

  const availableWilayas = useMemo(() => {
    const list = Array.from(new Set(museums.map(m => m.wilaya))).sort();
    return ['All', ...list];
  }, []);

  const availableEras = useMemo(() => {
    const list = Array.from(new Set(museums.filter(m => m.period).map(m => m.period!))).sort();
    return ['All', ...list];
  }, []);

  const categories = ['All', 'Archaeology', 'Arts', 'History', 'Ethnography', 'Natural History'];

  const [showCharter, setShowCharter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const filteredMuseums = useMemo(() => {
    return museums.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           m.wilaya.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (m.arabicName && m.arabicName.includes(searchQuery)) ||
                           (m.arabicWilaya && m.arabicWilaya.includes(searchQuery));
      const matchesCategory = categoryFilter === 'All' || m.category === categoryFilter;
      const matchesWilaya = wilayaFilter === 'All' || m.wilaya === wilayaFilter;
      const matchesEra = eraFilter === 'All' || m.period === eraFilter;
      const matchesFavorites = !showFavoritesOnly || favorites.includes(m.id);
      
      return matchesSearch && matchesCategory && matchesWilaya && matchesEra && matchesFavorites;
    });
  }, [searchQuery, categoryFilter, wilayaFilter, eraFilter, showFavoritesOnly, favorites]);

  const allArtifacts = useMemo(() => {
    return museums.flatMap(m => m.artifacts || []).slice(0, 6);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-8xl font-black display-font text-heritage-brown tracking-tighter mb-4 px-6">
              Museum<span className="text-heritage-gold">DZ</span>
            </h1>
            <div className="w-20 h-[1px] bg-heritage-gold/20 mx-auto overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-heritage-gold"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-heritage-beige text-dark-brown selection:bg-heritage-gold selection:text-white paper-texture"
        >
          <main className="relative">
            <Hero onSearch={setSearchQuery} onFilterChange={setCategoryFilter} />

            {/* Mission Section - Recipe 6: Warm Organic / Cultural */}
            <section className="py-24 md:py-52 bg-heritage-sand relative overflow-hidden transition-colors duration-500 border-b border-heritage-gold/10">
              <div className="absolute inset-0 cultural-pattern opacity-[0.03] pointer-events-none" />
              <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative order-2 lg:order-1"
                  >
                    <div className="aspect-[4/5] md:aspect-[3/4] rounded-[60px] md:rounded-[120px] overflow-hidden luxury-shadow relative z-10 border border-heritage-gold/20">
                      <img 
                        src="https://i.postimg.cc/zBsM9y7x/photo-2026-04-22-20-46-54.jpg" 
                        alt="Project Legacy"
                        className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-heritage-gold/10 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-heritage-emerald/5 rounded-full blur-3xl opacity-50" />
                    
                    <div className="absolute top-20 -left-12 bg-white/90 p-8 rounded-full luxury-shadow gold-border flex flex-col items-center justify-center text-center z-20 backdrop-blur-md">
                      <Award className="w-8 h-8 text-heritage-gold mb-2" />
                      <span className="text-[10px] uppercase tracking-widest font-black text-dark-brown">PROGRESS</span>
                      <span className="text-[9px] text-dark-brown/40">Heritage</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2"
                  >
                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                      <div className="w-8 md:w-12 h-[1px] bg-dark-brown" />
                      <span className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-black text-dark-brown">{t('mission.tagline')}</span>
                    </div>
                    <h2 className="text-4xl md:text-8xl display-font font-bold mb-8 md:mb-10 leading-[1.1] tracking-tighter text-dark-brown">
                      {t('mission.title')}
                    </h2>
                    <h3 className="text-3xl md:text-6xl arabic-serif text-dark-brown mb-8 md:mb-12 leading-relaxed" dir="rtl">{t('mission.arabic_title')}</h3>
                    <button 
                      onClick={() => setShowCharter(true)}
                      className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 bg-dark-brown text-heritage-beige rounded-2xl md:rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black hover:bg-heritage-emerald transition-all luxury-shadow group"
                    >
                      <span className="flex items-center gap-4">
                        {t('mission.charter')}
                        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-2 ${isRTL ? 'rotate-180' : ''}`} />
                      </span>
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Charter Modal */}
              <AnimatePresence>
                {showCharter && (
                  <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowCharter(false)}
                      className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 30 }}
                      className="relative w-full max-w-4xl bg-heritage-sand rounded-[40px] luxury-shadow border border-heritage-gold/20 overflow-y-auto max-h-[90vh] custom-scrollbar"
                    >
                      <div className="p-8 md:p-14 lg:p-20 relative">
                        <div className="absolute inset-0 cultural-pattern opacity-[0.03] pointer-events-none" />
                        
                        <div className="flex justify-end mb-8 sticky top-0 z-30">
                          <button 
                            onClick={() => setShowCharter(false)}
                            className="p-4 bg-dark-brown/5 hover:bg-dark-brown hover:text-white transition-all rounded-full luxury-shadow backdrop-blur-md border border-dark-brown/10"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[1px] bg-dark-brown" />
                            <span className="text-[12px] uppercase tracking-[0.4em] font-black text-dark-brown">{t('mission.charter')}</span>
                          </div>

                          <h2 className="text-4xl md:text-6xl display-font font-bold mb-10 text-dark-brown tracking-tighter leading-tight">
                            {t('mission.title')}
                          </h2>

                          <div className="space-y-8">
                            <div className="text-xl md:text-3xl text-dark-brown leading-relaxed text-justify rtl:text-right whitespace-pre-line font-medium italic border-l-4 border-heritage-gold/30 pl-8">
                              {t('mission.description')}
                            </div>
                          </div>

                          <div className="mt-16 pt-10 border-t border-dark-brown/10 flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-dark-brown/40">
                             <span>Official National Charter</span>
                             <span>MuseumDZ Archive v1.0</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </section>

            <HistoricalEras />

            {/* National Museum Directory Registry Portal — Recipe 5: Brutalist / Data Grid */}
            <section id="registry" className="py-24 md:py-60 relative overflow-hidden bg-heritage-beige">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-heritage-gold/[0.03] -skew-x-12 translate-x-1/2 pointer-events-none" />
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 md:mb-48 gap-12 lg:gap-20">
              <div className="max-w-4xl w-full">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-12 md:w-16 h-[1px] bg-heritage-brown/40" />
                  <span className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] md:tracking-[0.6em] font-black text-dark-brown">
                    {t('inventory.tagline')}
                  </span>
                </div>
                <h2 className="text-5xl md:text-[10rem] display-font font-bold mb-8 tracking-tighter leading-[1.1] md:leading-[0.9] text-dark-brown">
                  {t('inventory.title').split(' ').slice(0, 1).join(' ')} <br /> 
                  <span className="text-dark-brown italic font-black drop-shadow-sm">{t('inventory.title').split(' ').slice(1).join(' ')}</span>
                </h2>
                <h3 className="text-4xl md:text-8xl arabic-serif text-dark-brown leading-tight mb-12" dir="rtl">{t('inventory.arabic_title')}</h3>

                {/* Advanced Filtering Engine */}
                <div className="mt-16 md:mt-20 space-y-10 md:space-y-12 bg-white/60 backdrop-blur-3xl p-6 md:p-12 border border-heritage-gold/20 luxury-shadow relative overflow-hidden rounded-3xl">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-heritage-gold/0 via-heritage-gold/50 to-heritage-gold/0" />
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="p-3 md:p-4 bg-heritage-beige border border-heritage-gold/20 rounded-xl">
                        <Filter className="w-5 h-5 text-heritage-gold" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold display-font tracking-tight text-heritage-brown">REGISTRY_ENGINE</h4>
                        <p className="text-[9px] uppercase tracking-[0.1em] text-heritage-brown/40 font-black">Refine Search Parameters</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-center md:justify-end">
                      <button 
                        onClick={() => setShowFavoritesOnly(false)}
                        className={`flex-1 md:flex-none px-5 md:px-6 py-3 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black transition-all rounded-xl flex items-center justify-center gap-2 md:gap-3 ${!showFavoritesOnly ? 'bg-heritage-brown text-heritage-beige shadow-lg' : 'bg-heritage-gold/10 text-heritage-brown/60 hover:bg-heritage-gold/20'}`}
                      >
                        <Grid className="w-3.5 h-3.5" />
                        {t('filters.all')}
                      </button>
                      <button 
                        onClick={() => setShowFavoritesOnly(true)}
                        className={`flex-1 md:flex-none px-5 md:px-6 py-3 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black transition-all rounded-xl flex items-center justify-center gap-2 md:gap-3 ${showFavoritesOnly ? 'bg-heritage-red text-heritage-beige shadow-lg' : 'bg-heritage-gold/10 text-heritage-brown/60 hover:bg-heritage-gold/20'}`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-white' : ''}`} />
                        {t('nav.favorites')}
                        <span className="ml-1 opacity-60">[{favorites.length}]</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Category Filter */}
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-heritage-brown/40 px-2">{t('filters.category')}</label>
                      <div className="relative group">
                        <select 
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className="w-full bg-heritage-beige border border-heritage-gold/20 p-4 md:p-5 rounded-2xl text-xs md:text-sm font-bold tracking-tight text-heritage-brown focus:outline-none focus:border-heritage-gold/50 transition-colors appearance-none cursor-pointer"
                        >
                          {categories.map(c => (
                            <option key={c} value={c} className="bg-heritage-beige">{c === 'All' ? t('filters.all') : t(`hero.${c.toLowerCase().replace(' ', '_')}`)}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-gold/50 group-hover:text-heritage-gold transition-colors pointer-events-none" />
                      </div>
                    </div>

                    {/* Wilaya Filter */}
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-heritage-brown/40 px-2">{t('filters.wilaya')}</label>
                      <div className="relative group">
                        <select 
                          value={wilayaFilter}
                          onChange={(e) => setWilayaFilter(e.target.value)}
                          className="w-full bg-heritage-beige border border-heritage-gold/20 p-4 md:p-5 rounded-2xl text-xs md:text-sm font-bold tracking-tight text-heritage-brown focus:outline-none focus:border-heritage-gold/50 transition-colors appearance-none cursor-pointer"
                        >
                          {availableWilayas.map(w => (
                            <option key={w} value={w} className="bg-heritage-beige">{w === 'All' ? t('filters.all') : w}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-gold/50 group-hover:text-heritage-gold transition-colors pointer-events-none" />
                      </div>
                    </div>

                    {/* Era Filter */}
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-heritage-brown/40 px-2">{t('filters.era')}</label>
                      <div className="relative group">
                        <select 
                          value={eraFilter}
                          onChange={(e) => setEraFilter(e.target.value)}
                          className="w-full bg-heritage-beige border border-heritage-gold/20 p-4 md:p-5 rounded-2xl text-xs md:text-sm font-bold tracking-tight text-heritage-brown focus:outline-none focus:border-heritage-gold/50 transition-colors appearance-none cursor-pointer"
                        >
                          {availableEras.map(e => (
                            <option key={e} value={e} className="bg-heritage-beige">{e === 'All' ? t('filters.all') : e}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-gold/50 group-hover:text-heritage-gold transition-colors pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 md:mt-20 p-8 md:p-10 bg-white/40 border-l-4 border-heritage-gold max-w-2xl luxury-shadow rounded-r-2xl">
                  <p className="text-xl md:text-2xl text-heritage-brown font-light italic leading-relaxed">
                    "{t('footer.tagline')}"
                  </p>
                </div>

                {/* Regional Summary — Recipe 1: Technical Grid */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { id: 'north', count: 6, label: 'Algiers', ar: 'العاصمة' },
                    { id: 'east', count: 10, label: 'East', ar: 'الشرق' },
                    { id: 'west', count: 5, label: 'West', ar: 'الغرب' },
                    { id: 'south', count: 2, label: 'South', ar: 'الجنوب' }
                  ].map((region) => (
                    <div key={region.id} className="p-6 border border-border/40 bg-card luxury-shadow flex flex-col gap-4 group hover:border-heritage-gold transition-colors">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/40">{region.id}</span>
                        <div className="w-2 h-2 rounded-full bg-heritage-gold animate-pulse" />
                      </div>
                      <div>
                        <div className="text-2xl font-black display-font text-black">{region.count}</div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-black text-dark-brown">{t(`dashboard.${region.id === 'north' ? 'wilayas' : 'wilayas'}`)}</div>
                      </div>
                      <div className="pt-4 border-t border-border/20">
                        <div className="text-sm font-black text-dark-brown">{region.label}</div>
                        <div className="text-xs arabic-serif text-black font-bold" dir="rtl">{region.ar}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start lg:items-end">
                <div className="flex items-baseline gap-6 mb-6">
                  <span className="text-7xl md:text-[10rem] display-font font-black tracking-tighter text-black leading-none">{filteredMuseums.length}</span>
                  <span className="text-3xl md:text-5xl display-font font-black text-dark-brown/40">/ 124</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] font-black text-muted-foreground/60">
                  <div className="w-2 h-2 rounded-full bg-heritage-brown animate-pulse" />
                  {t('inventory.active_records')} — {t('inventory.active')}
                </div>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 md:gap-x-24 gap-y-32 md:gap-y-48"
              >
                {filteredMuseums.map((museum, index) => (
                  <motion.div
                    key={museum.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                  >
                    <MuseumCard museum={museum} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredMuseums.length === 0 && (
              <div className="text-center py-40 md:py-60 border border-dashed border-border/40 bg-muted/5 backdrop-blur-sm">
                <Info className="w-16 h-16 text-muted-foreground mx-auto mb-8 opacity-10" />
                <h3 className="text-2xl md:text-4xl display-font mb-4 font-light italic">{t('inventory.no_matching')}</h3>
                <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">{t('inventory.no_matching_desc')}</p>
                <button 
                  onClick={() => { setSearchQuery(''); setCategoryFilter('All'); }}
                  className="mt-12 group flex items-center gap-4 mx-auto text-[11px] uppercase tracking-[0.4em] text-heritage-gold font-black hover:text-heritage-brown transition-colors"
                >
                  <div className="w-8 h-[1px] bg-heritage-gold group-hover:bg-heritage-brown transition-colors" />
                  {t('inventory.reset')}
                </button>
              </div>
            )}
          </div>
        </section>

            {/* Secondary mission, Map duplicate and Newsletter duplicates removed below */}

            <Dashboard />
      </main>
      <Footer onOpenLegal={() => setIsLegalOpen(true)} />
      <HeritageGuide />
      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
    </motion.div>
    )}
    </AnimatePresence>
  );
}
