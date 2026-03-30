import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MuseumCard } from './components/MuseumCard';
import { Dashboard } from './components/Dashboard';
import { HistoricalEras } from './components/HistoricalEras';
import { museums } from './data/museums';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Info, Mail, Phone, MapPin, Facebook, Twitter, Instagram, ExternalLink, ArrowRight, ShieldCheck, Globe, ScrollText, Award, Compass, Send } from 'lucide-react';
import { useLanguage } from './lib/LanguageContext';

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();
  return (
    <footer className="bg-black text-white py-32 md:py-48 relative overflow-hidden">
      <div className="absolute inset-0 cultural-pattern opacity-[0.03] pointer-events-none" />
      <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 lg:gap-32 mb-32">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-heritage-green rounded-full flex items-center justify-center">
                <Landmark className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl md:text-3xl display-font font-bold tracking-tighter uppercase">{t('hero.subtitle')}</span>
            </div>
            <p className="text-lg md:text-xl text-white/40 leading-relaxed font-light italic mb-12 max-w-md">
              "{t('footer.tagline')}"
            </p>
            <div className="flex gap-8">
              {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="text-[11px] uppercase tracking-[0.4em] font-black text-white/60 hover:text-heritage-green transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-heritage-green mb-10">{t('footer.registry')}</h4>
            <ul className="space-y-6">
              {['nav.collections', 'nav.exhibitions', 'nav.archives', 'nav.analytics'].map((key) => (
                <li key={key}>
                  <a href="#" className="text-lg font-light text-white/60 hover:text-white transition-colors">{t(key)}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-heritage-green mb-10">{t('footer.archives')}</h4>
            <ul className="space-y-6">
              {[
                { key: 'footer.research', label: 'Research' },
                { key: 'footer.digital_twins', label: 'Digital Twins' },
                { key: 'footer.publications', label: 'Publications' },
                { key: 'footer.educational', label: 'Educational' }
              ].map((item) => (
                <li key={item.key}>
                  <a href="#" className="text-lg font-light text-white/60 hover:text-white transition-colors">{t(item.key)}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-heritage-green mb-10">{t('footer.headquarters')}</h4>
            <div className="space-y-8">
              <div>
                <div className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2">{t('footer.location')}</div>
                <div className="text-lg font-light">{t('hero.algiers')}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2">{t('footer.contact')}</div>
                <div className="text-lg font-light">registry@heritage.gov.dz</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-[11px] uppercase tracking-[0.4em] font-black text-white/40">
            {t('footer.copyright')}
          </div>
          <div className="flex items-center gap-12">
            <a href="#" className="text-[11px] uppercase tracking-[0.4em] font-black text-white/40 hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-[11px] uppercase tracking-[0.4em] font-black text-white/40 hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
          <div className="text-2xl md:text-3xl arabic-serif text-white/20" dir="rtl">
            {t('footer.republic')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const { t, isRTL } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const filteredMuseums = useMemo(() => {
    return museums.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           m.wilaya.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (m.arabicName && m.arabicName.includes(searchQuery)) ||
                           (m.arabicWilaya && m.arabicWilaya.includes(searchQuery));
      const matchesCategory = categoryFilter === 'All' || m.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

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
            <h1 className="text-6xl md:text-8xl font-black display-font text-foreground tracking-tighter mb-4">
              Museum<span className="text-heritage-green">DZ</span>
            </h1>
            <div className="w-24 h-[2px] bg-foreground mx-auto overflow-hidden">
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
          className="min-h-screen bg-background text-foreground selection:bg-heritage-gold selection:text-white paper-texture"
        >
          <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
          
          <main>
            <Hero onSearch={setSearchQuery} onFilterChange={setCategoryFilter} />

        {/* Mission Section - Recipe 6: Warm Organic / Cultural */}
        <section className="py-32 md:py-52 bg-background/50 dark:bg-muted/5 relative overflow-hidden transition-colors duration-500">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-heritage-green/40 dark:bg-heritage-gold" />
                  <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black text-heritage-green/60 dark:text-heritage-gold">
                    {t('mission.tagline')} — {t('mission.arabic_title')}
                  </span>
                </div>
                <h2 className="text-5xl md:text-8xl serif font-light mb-10 leading-[1.1] text-foreground dark:text-foreground">
                  {t('mission.title').split(' ').slice(0, 2).join(' ')} <br />
                  <span className="italic">{t('mission.title').split(' ').slice(2).join(' ')}</span>
                </h2>
                <h3 className="text-3xl md:text-5xl arabic-serif text-foreground/60 dark:text-foreground/60 mb-12" dir="rtl">{t('mission.arabic_title')}</h3>
                <p className="text-lg md:text-2xl text-foreground/70 dark:text-foreground/70 mb-12 leading-relaxed font-light italic">
                  "{t('mission.description')}"
                </p>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white dark:bg-muted flex items-center justify-center shadow-sm">
                      <ShieldCheck className="w-6 h-6 text-[#5A5A40] dark:text-heritage-gold" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest font-black text-[#5A5A40] dark:text-foreground/40">{t('mission.preservation')}</span>
                      <span className="text-sm font-bold">{t('mission.archives')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white dark:bg-muted flex items-center justify-center shadow-sm">
                      <Globe className="w-6 h-6 text-[#5A5A40] dark:text-heritage-gold" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest font-black text-[#5A5A40] dark:text-foreground/40">{t('mission.accessibility')}</span>
                      <span className="text-sm font-bold">{t('mission.digital')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="aspect-[4/5] rounded-[40px] overflow-hidden luxury-shadow relative z-10"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1200" 
                    alt="Cultural Heritage Detail"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-heritage-gold/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-heritage-green/5 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        <HistoricalEras />

        {/* Heritage Chronicles - Vertical Timeline - Recipe 9: Oversized Typographic */}
        <section className="py-32 md:py-60 bg-background relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 relative z-10">
            <div className="flex flex-col items-center mb-32 text-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-heritage-gold" />
                <span className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-black text-heritage-gold">
                  {t('chronicles.tagline')} — {t('chronicles.arabic_title')}
                </span>
              </div>
              <h2 className="text-6xl md:text-[10rem] display-font font-bold mb-8 tracking-tighter leading-[0.9]">
                {t('chronicles.title').split(' ').slice(0, 2).join(' ')} <br />
                <span className="text-heritage-green italic font-light">{t('chronicles.title').split(' ').slice(2).join(' ')}</span>
              </h2>
              <h3 className="text-4xl md:text-7xl arabic-serif text-foreground/40 leading-tight" dir="rtl">{t('chronicles.arabic_title')}</h3>
            </div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/40 hidden md:block" />
              
              <div className="space-y-32 md:space-y-64">
                {[
                  { year: '10,000 BC', title: 'Tassili n\'Ajjer', arabicTitle: 'طاسيلي ناجر', desc: 'The world\'s largest open-air museum of prehistoric rock art.', img: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1200' },
                  { year: '200 AD', title: 'Roman Timgad', arabicTitle: 'تيمقاد الرومانية', desc: 'A perfectly preserved Roman military colony, the "Pompeii of Africa".', img: 'https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?auto=format&fit=crop&q=80&w=1200' },
                  { year: '1067 AD', title: 'Beni Hammad Fort', arabicTitle: 'قلعة بني حماد', desc: 'The first capital of the Hammadid emirs, a masterpiece of Islamic architecture.', img: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1200' }
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row items-center gap-16 md:gap-32 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className="flex-1 text-center md:text-right">
                      {idx % 2 !== 0 && (
                        <div className="hidden md:block">
                          <span className="text-[120px] display-font font-black text-muted/10 leading-none mb-8 block">{item.year}</span>
                          <h4 className="text-4xl display-font font-bold mb-4">{item.title}</h4>
                          <h5 className="text-2xl arabic-serif text-heritage-green mb-6" dir="rtl">{item.arabicTitle}</h5>
                          <p className="text-lg text-muted-foreground font-light italic leading-relaxed max-w-md ml-auto">"{item.desc}"</p>
                        </div>
                      )}
                      {idx % 2 === 0 && (
                        <div className="md:hidden">
                          <span className="text-8xl display-font font-black text-muted/10 leading-none mb-8 block">{item.year}</span>
                          <h4 className="text-4xl display-font font-bold mb-4">{item.title}</h4>
                          <h5 className="text-2xl arabic-serif text-heritage-green mb-6" dir="rtl">{item.arabicTitle}</h5>
                          <p className="text-lg text-muted-foreground font-light italic leading-relaxed">"{item.desc}"</p>
                        </div>
                      )}
                    </div>

                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-heritage-green rounded-full border-4 border-background shadow-[0_0_0_10px_rgba(62,39,35,0.1)] hidden md:block" />
                    </div>

                    <div className="flex-1">
                      <div className="aspect-video md:aspect-[4/3] rounded-[40px] overflow-hidden luxury-shadow group">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                      </div>
                      {idx % 2 === 0 && (
                        <div className="hidden md:block mt-12">
                          <span className="text-[120px] display-font font-black text-muted/10 leading-none mb-8 block">{item.year}</span>
                          <h4 className="text-4xl display-font font-bold mb-4">{item.title}</h4>
                          <h5 className="text-2xl arabic-serif text-heritage-green mb-6" dir="rtl">{item.arabicTitle}</h5>
                          <p className="text-lg text-muted-foreground font-light italic leading-relaxed max-w-md">"{item.desc}"</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* National Treasury Section - Recipe 5: Brutalist / Creative Tool */}
        <section className="py-32 md:py-60 bg-muted/10 relative overflow-hidden border-y border-border/40">
          <div className="absolute inset-0 cultural-pattern opacity-[0.03]" />
          <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 md:mb-40 gap-16">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-[1px] bg-heritage-gold" />
                  <span className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-black text-heritage-gold">
                    {t('treasury.tagline')} — {t('treasury.arabic_title')}
                  </span>
                </div>
                <h2 className="text-6xl md:text-[10rem] display-font font-bold mb-8 tracking-tighter leading-[0.9]">
                  {t('treasury.title').split(' ').slice(0, 2).join(' ')} <br />
                  <span className="text-heritage-green italic font-light">{t('treasury.title').split(' ').slice(2).join(' ')}</span>
                </h2>
                <h3 className="text-4xl md:text-7xl arabic-serif text-foreground/60 leading-tight" dir="rtl">{t('treasury.arabic_title')}</h3>
              </div>
              <div className="flex flex-col items-start lg:items-end max-w-md">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light italic mb-10 lg:text-right">
                  "{t('treasury.description')}"
                </p>
                <div className="flex items-center gap-8 font-mono">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold">{t('treasury.registry_count')}</span>
                    <span className="text-3xl font-light tracking-tighter">048/124</span>
                  </div>
                  <div className="h-12 w-[1px] bg-border/60" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold">{t('treasury.last_updated')}</span>
                    <span className="text-3xl font-light tracking-tighter">{t('treasury.month')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {allArtifacts.map((artifact, idx) => (
                <motion.div
                  key={artifact.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative group overflow-hidden luxury-shadow ${idx === 0 || idx === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <div className="aspect-[4/5] md:aspect-auto md:h-full relative">
                    <img 
                      src={artifact.imageUrl} 
                      alt={artifact.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                      <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-heritage-gold mb-2">{artifact.period}</div>
                      <h4 className="text-2xl text-white display-font mb-2">{artifact.name}</h4>
                      <h5 className="text-lg arabic-serif text-white/60 mb-6" dir="rtl">{artifact.arabicName}</h5>
                      <button className="text-[10px] uppercase tracking-[0.4em] font-black text-white border-b border-white/40 pb-2 hover:border-heritage-gold hover:text-heritage-gold transition-all">
                        {t('treasury.examine')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Heritage Spotlight Section - Recipe 9: Oversized Typographic */}
        <section className="py-32 md:py-60 relative overflow-hidden bg-background">
          <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 relative">
                <div className="absolute -top-24 -left-12 text-[180px] md:text-[320px] font-black text-muted/10 display-font leading-none select-none pointer-events-none">
                  {t('spotlight.year')}
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-[1px] bg-heritage-red" />
                    <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black text-heritage-red">
                      {t('spotlight.tagline')} — {t('spotlight.arabic_title')}
                    </span>
                  </div>
                  <h2 className="text-5xl md:text-9xl display-font font-bold mb-8 tracking-tighter leading-[0.9]">
                    {t('spotlight.title').split(' ').slice(0, 2).join(' ')} <br />
                    <span className="text-heritage-green">{t('spotlight.title').split(' ').slice(2).join(' ')}</span>
                  </h2>
                  <h3 className="text-4xl md:text-6xl arabic-serif text-foreground/80 mb-12" dir="rtl">{t('spotlight.arabic_title')}</h3>
                  <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light italic mb-12">
                    "{t('spotlight.description')}"
                  </p>
                  <button className="group flex items-center gap-6 px-10 py-5 bg-foreground text-background text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-heritage-green hover:text-white transition-all">
                    {t('spotlight.cta')} <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                  </button>
                </motion.div>
              </div>
              <div className="lg:col-span-5 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="aspect-[3/4] relative overflow-hidden luxury-shadow group"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1200" 
                    alt={t('spotlight.maqam')}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-heritage-gold mb-2 block">{t('spotlight.featured')}</span>
                    <h4 className="text-2xl text-white display-font">{t('spotlight.maqam')}</h4>
                  </div>
                </motion.div>
                {/* Floating Detail Card */}
                <div className="absolute -bottom-12 -left-12 bg-card p-10 border border-border/60 luxury-shadow hidden xl:block max-w-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="w-5 h-5 text-heritage-green" />
                    <span className="text-[10px] uppercase tracking-widest font-black">{t('spotlight.verified')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {t('spotlight.mujahid_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Heritage Highlights Section - Recipe 5: Brutalist / Creative Tool */}
        <section className="py-32 md:py-60 bg-muted/10 relative overflow-hidden border-y border-border/40">
          <div className="absolute inset-0 cultural-pattern opacity-[0.03]" />
          <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 md:mb-40 gap-16">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-[1px] bg-heritage-gold" />
                  <span className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-black text-heritage-gold">
                    {t('treasury.tagline')} — {t('treasury.arabic_title')}
                  </span>
                </div>
                <h2 className="text-6xl md:text-[10rem] display-font font-bold mb-8 tracking-tighter leading-[0.9]">
                  {t('treasury.title').split(' ').slice(0, 2).join(' ')} <br />
                  <span className="text-heritage-green italic font-light">{t('treasury.title').split(' ').slice(2).join(' ')}</span>
                </h2>
                <h3 className="text-4xl md:text-7xl arabic-serif text-foreground/60 leading-tight" dir="rtl">{t('treasury.arabic_title')}</h3>
              </div>
              <div className="flex flex-col items-start lg:items-end max-w-md">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light italic mb-10 lg:text-right">
                  "{t('treasury.description')}"
                </p>
                <div className="flex items-center gap-8 font-mono">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold">{t('treasury.registry_count')}</span>
                    <span className="text-3xl font-light tracking-tighter">048/124</span>
                  </div>
                  <div className="h-12 w-[1px] bg-border/60" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold">{t('treasury.last_updated')}</span>
                    <span className="text-3xl font-light tracking-tighter">{t('treasury.month')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
              {allArtifacts.slice(0, 3).map((artifact, index) => (
                <motion.div
                  key={artifact.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 1, ease: "easeOut" }}
                  className={`${
                    index === 0 ? 'md:col-span-7 aspect-[16/10]' : 
                    index === 1 ? 'md:col-span-5 aspect-[4/5]' : 
                    'md:col-span-12 aspect-[21/9]'
                  } group relative overflow-hidden border border-border/60 luxury-shadow bg-card`}
                >
                  <img 
                    src={artifact.imageUrl} 
                    alt={artifact.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 grayscale-[0.2] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700" />
                  
                  <div className="absolute inset-0 p-12 flex flex-col justify-end translate-y-12 group-hover:translate-y-0 transition-all duration-700">
                    <div className="flex items-center gap-4 mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      <div className="w-12 h-[1px] bg-heritage-gold" />
                      <span className="text-[11px] uppercase tracking-[0.5em] font-black text-heritage-gold">{isRTL ? artifact.arabicPeriod : artifact.period}</span>
                    </div>
                    <h4 className="text-4xl md:text-6xl text-white display-font mb-3 tracking-tighter leading-none">{isRTL ? artifact.arabicName : artifact.name}</h4>
                    <h5 className="text-3xl md:text-4xl text-white/70 arabic-serif mb-8" dir="rtl">{artifact.arabicName}</h5>
                    <p className="text-base md:text-xl text-white/50 max-w-2xl line-clamp-2 mb-12 opacity-0 group-hover:opacity-100 transition-opacity delay-200 leading-relaxed font-light italic">
                      "{isRTL ? artifact.arabicDescription : artifact.description}"
                    </p>
                    <button className="flex items-center gap-6 pt-10 border-t border-white/10 group/btn w-fit">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-heritage-gold transition-all duration-500 scale-90 group-hover/btn:scale-100">
                        <ArrowRight className="w-6 h-6 text-white transition-transform group-hover/btn:translate-x-2" />
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white/60 group-hover/btn:text-white transition-colors">{t('treasury.examine')}</span>
                    </button>
                  </div>
                  
                  {/* Brutalist Numbering */}
                  <div className="absolute top-10 left-10 text-white/10 text-8xl font-black display-font leading-none select-none pointer-events-none group-hover:text-heritage-green/20 transition-colors duration-700">
                    0{index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="inventory" className="py-32 md:py-60 relative overflow-hidden bg-background">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
          <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 md:mb-48 gap-20">
              <div className="max-w-4xl">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-[1px] bg-heritage-green" />
                  <span className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-black text-heritage-green">
                    {t('inventory.tagline')} — {t('inventory.arabic_title')}
                  </span>
                </div>
                <h2 className="text-6xl md:text-[10rem] display-font font-bold mb-8 tracking-tighter leading-[0.9]">{t('inventory.title').split(' ').slice(0, 1).join(' ')} <br /> <span className="text-heritage-green italic font-light">{t('inventory.title').split(' ').slice(1).join(' ')}</span></h2>
                <h3 className="text-4xl md:text-7xl arabic-serif text-foreground/60 leading-tight" dir="rtl">{t('inventory.arabic_title')}</h3>
              </div>
              <div className="flex flex-col items-start lg:items-end">
                <div className="flex items-baseline gap-6 mb-6">
                  <span className="text-7xl md:text-[10rem] display-font font-light tracking-tighter text-heritage-green leading-none">{filteredMuseums.length}</span>
                  <span className="text-3xl md:text-5xl display-font font-light text-muted-foreground/40">/ 124</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] font-black text-muted-foreground/60">
                  <div className="w-2 h-2 rounded-full bg-heritage-green animate-pulse" />
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
                  className="mt-12 group flex items-center gap-4 mx-auto text-[11px] uppercase tracking-[0.4em] text-heritage-gold font-black hover:text-heritage-green transition-colors"
                >
                  <div className="w-8 h-[1px] bg-heritage-gold group-hover:bg-heritage-green transition-colors" />
                  {t('inventory.reset')}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Mission Section - Recipe 6: Warm Organic / Cultural */}
        <section className="py-32 md:py-60 bg-[#fbfaf8] dark:bg-muted/5 relative overflow-hidden transition-colors duration-500">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[3/4] rounded-[120px] overflow-hidden luxury-shadow relative z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1200" 
                      alt="Cultural Preservation"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                </div>
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-heritage-gold/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-heritage-green/5 rounded-full blur-3xl" />
                
                {/* Organic Badge */}
                <div className="absolute top-20 -left-12 bg-white dark:bg-muted p-8 rounded-full luxury-shadow border border-heritage-gold/20 flex flex-col items-center justify-center text-center z-20">
                  <Award className="w-8 h-8 text-heritage-gold mb-2" />
                  <span className="text-[10px] uppercase tracking-widest font-black dark:text-foreground/80">UNESCO</span>
                  <span className="text-[9px] text-muted-foreground">Partner</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-heritage-green" />
                  <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black text-heritage-green">{t('mission.tagline')} — {t('mission.arabic_title')}</span>
                </div>
                <h2 className="text-5xl md:text-7xl display-font font-bold mb-10 leading-[1.1] tracking-tighter">
                  {t('mission.soul').split(' ').slice(0, 2).join(' ')} <br />
                  <span className="text-heritage-green italic font-light">{t('mission.soul').split(' ').slice(2).join(' ')}</span>
                </h2>
                <h3 className="text-3xl md:text-5xl arabic-serif text-foreground/60 mb-12" dir="rtl">{t('mission.soul_desc').split('.')[0]}</h3>
                <div className="space-y-8 mb-16">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light italic">
                    "{t('mission.soul_desc')}"
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="p-6 bg-white border border-heritage-gold/10 rounded-3xl">
                      <h4 className="text-2xl display-font font-bold mb-2">{t('mission.education')}</h4>
                      <p className="text-xs text-muted-foreground">{t('mission.education_desc')}</p>
                    </div>
                    <div className="p-6 bg-white border border-heritage-gold/10 rounded-3xl">
                      <h4 className="text-2xl display-font font-bold mb-2">{t('mission.research')}</h4>
                      <p className="text-xs text-muted-foreground">{t('mission.research_desc')}</p>
                    </div>
                  </div>
                </div>
                <button className="px-12 py-6 bg-heritage-green text-white rounded-full text-[11px] uppercase tracking-[0.4em] font-black hover:bg-heritage-green/90 transition-all luxury-shadow">
                  {t('mission.charter')}
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cultural Map Section - Recipe 7: Atmospheric / Immersive Media */}
        <section className="py-32 md:py-60 relative overflow-hidden bg-black text-white">
          <div className="absolute inset-0 atmosphere opacity-40 pointer-events-none" />
          <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10">
            <div className="flex flex-col items-center text-center mb-24 md:mb-40">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-heritage-gold" />
                <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black text-heritage-gold">{t('atlas.tagline')} — {t('atlas.arabic_title')}</span>
                <div className="w-12 h-[1px] bg-heritage-gold" />
              </div>
              <h2 className="text-6xl md:text-[10rem] display-font font-bold mb-8 tracking-tighter leading-[0.9]">{t('atlas.title').split(' ').slice(0, 2).join(' ')} <br /> <span className="text-heritage-green italic font-light">{t('atlas.title').split(' ').slice(2).join(' ')}</span></h2>
              <h3 className="text-4xl md:text-7xl arabic-serif text-white/40" dir="rtl">{t('atlas.arabic_title')}</h3>
            </div>

            <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
                alt={t('atlas.title')}
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[10s]"
                referrerPolicy="no-referrer"
              />
              
              {/* Monitoring HUD */}
              <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-heritage-green animate-ping" />
                      <span className="text-[10px] uppercase tracking-[0.4em] font-black">{t('atlas.system_active')}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono">
                      {museums.slice(0, 4).map((m) => (
                        <div key={m.id} className="flex flex-col gap-1">
                          <span className="text-[8px] text-white/40 uppercase tracking-widest truncate max-w-[120px]">{isRTL ? m.arabicName : m.name}</span>
                          <span className="text-[10px] text-heritage-gold">{m.location.lat.toFixed(4)}°N / {m.location.lng.toFixed(4)}°E</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-2 font-mono text-[10px] text-white/40">
                    <div>{t('atlas.lat')}: 28.0339° N</div>
                    <div>{t('atlas.lng')}: 1.6596° E</div>
                    <div>{t('atlas.alt')}: 1,041m</div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-end justify-between gap-12">
                  <div className="max-w-xl text-left">
                    <p className="text-xl md:text-3xl font-light italic text-white/80 leading-relaxed mb-10">
                      "{t('atlas.description')}"
                    </p>
                    <div className="flex gap-6">
                      <button className="px-10 py-5 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-black hover:bg-heritage-green hover:text-white transition-all">
                        {t('atlas.cta')}
                      </button>
                      <button className="px-10 py-5 border border-white/20 text-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white/10 transition-all">
                        {t('atlas.status')}: {t('atlas.nominal')}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-6">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">ACTIVE_NODES</span>
                        <span className="text-2xl font-bold">48.00</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-heritage-green" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section - Recipe 11: SaaS Landing / Split Layout */}
        <section className="relative overflow-hidden border-t border-border/40">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-[600px]">
            <div className="bg-black text-white p-16 md:p-24 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full cultural-pattern opacity-[0.05] pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl display-font font-bold mb-8 tracking-tighter leading-[0.85]">{t('newsletter.title').split(' ').slice(0, 2).join(' ')} <br /> <span className="text-heritage-green italic font-light">{t('newsletter.title').split(' ').slice(2).join(' ')}</span></h2>
                <h3 className="text-3xl md:text-5xl arabic-serif text-white/60 mb-12" dir="rtl">{t('newsletter.arabic_title')}</h3>
                <p className="text-lg text-white/40 max-w-md mb-12 font-light italic">
                  "{t('newsletter.description')}"
                </p>
                <div className="flex gap-4 max-w-md">
                  <input 
                    type="email" 
                    placeholder={t('newsletter.placeholder')} 
                    className="flex-1 bg-white/10 border border-white/20 px-8 py-5 text-white text-[11px] uppercase tracking-widest outline-none focus:border-heritage-green transition-colors"
                  />
                  <button className="bg-heritage-green text-white px-10 py-5 text-[11px] uppercase tracking-[0.4em] font-black hover:bg-heritage-green/90 transition-all">
                    {t('newsletter.subscribe')}
                  </button>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden bg-muted/20">
              <img 
                src="https://images.unsplash.com/photo-1518998053502-53cc8efd9abc?auto=format&fit=crop&q=80&w=1200" 
                alt="Museum Interior"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-heritage-green/10 mix-blend-multiply" />
              
              {/* Floating Element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center rotate-12">
                <div className="text-center">
                  <div className="text-4xl font-bold display-font text-white mb-2">{t('newsletter.subscribers_count')}</div>
                  <div className="text-[9px] uppercase tracking-widest font-black text-white/60">{t('newsletter.subscribers')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Map (Atlas) - Recipe 7: Atmospheric / Immersive Media */}
        <section className="py-32 md:py-60 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 atmosphere opacity-20 pointer-events-none" />
          <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-[1px] bg-heritage-green" />
                  <span className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-black text-heritage-green">
                    {t('atlas.tagline')} — {t('atlas.arabic_title')}
                  </span>
                </div>
                <h2 className="text-6xl md:text-[10rem] display-font font-bold mb-8 tracking-tighter leading-[0.9] text-white">
                  {t('atlas.title').split(' ').slice(0, 1).join(' ')} <br />
                  <span className="text-heritage-green italic font-light">{t('atlas.title').split(' ').slice(1).join(' ')}</span>
                </h2>
                <h3 className="text-4xl md:text-7xl arabic-serif text-white/40 leading-tight mb-16" dir="rtl">{t('atlas.arabic_title')}</h3>
                
                {/* Monitoring HUD */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                  {[
                    { label: t('atlas.lat'), value: '36.7538° N' },
                    { label: t('atlas.lng'), value: '3.0588° E' },
                    { label: t('atlas.alt'), value: '124m' },
                    { label: t('atlas.status'), value: t('atlas.nominal'), color: 'text-heritage-green' }
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col border-l border-white/10 pl-6">
                      <span className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2">{stat.label}</span>
                      <span className={`text-xl font-mono tracking-tighter ${stat.color || 'text-white'}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>

                <button className="group flex items-center gap-6 px-10 py-5 bg-heritage-green text-white text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-foreground transition-all">
                  {t('atlas.cta')} <Compass className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                </button>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-full border border-background/10 relative p-12 md:p-24 flex items-center justify-center">
                  <div className="absolute inset-0 border border-background/5 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-12 border border-heritage-green/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10 w-full h-full rounded-full overflow-hidden luxury-shadow border-4 border-background/10"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200" 
                      alt="Algeria Map View"
                      className="w-full h-full object-cover grayscale opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-heritage-green/10 mix-blend-overlay" />
                    
                    {/* Pulsing Location Markers */}
                    {[
                      { top: '20%', left: '40%', name: 'Algiers' },
                      { top: '35%', left: '65%', name: 'Constantine' },
                      { top: '45%', left: '25%', name: 'Oran' },
                      { top: '75%', left: '55%', name: 'Tassili' }
                    ].map((loc) => (
                      <div key={loc.name} className="absolute" style={{ top: loc.top, left: loc.left }}>
                        <div className="w-3 h-3 bg-heritage-green rounded-full animate-ping absolute inset-0" />
                        <div className="w-3 h-3 bg-heritage-green rounded-full relative z-10" />
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-widest font-black text-white/60">
                          {loc.name}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Dashboard />

        {/* Newsletter Section - Recipe 11: SaaS Split Layout */}
        <section className="bg-background border-t border-border/40">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-32 border-b lg:border-b-0 lg:border-r border-border/40 relative overflow-hidden group">
              <div className="absolute inset-0 cultural-pattern opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-[1px] bg-heritage-green" />
                  <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black text-heritage-green">
                    {t('newsletter.tagline')} — {t('newsletter.arabic_title')}
                  </span>
                </div>
                <h2 className="text-5xl md:text-8xl display-font font-bold mb-8 tracking-tighter leading-[0.9]">
                  {t('newsletter.title').split(' ').slice(0, 2).join(' ')} <br />
                  <span className="text-heritage-green italic font-light">{t('newsletter.title').split(' ').slice(2).join(' ')}</span>
                </h2>
                <h3 className="text-3xl md:text-5xl arabic-serif text-foreground/40 mb-12" dir="rtl">{t('newsletter.arabic_title')}</h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light italic mb-12 max-w-md">
                  "{t('newsletter.description')}"
                </p>
                <div className="flex items-center gap-8">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-background overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tighter">{t('newsletter.subscribers_count')}</span>
                    <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/60">{t('newsletter.subscribers')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 md:p-32 flex flex-col justify-center bg-muted/5">
              <div className="max-w-md w-full">
                <div className="relative mb-8">
                  <input 
                    type="email" 
                    placeholder={t('newsletter.placeholder')}
                    className="w-full bg-transparent border-b-2 border-border/60 py-6 text-2xl md:text-3xl font-light focus:outline-none focus:border-heritage-green transition-colors placeholder:text-muted-foreground/20"
                  />
                  <button className="absolute right-0 bottom-6 group">
                    <Send className="w-8 h-8 text-muted-foreground group-hover:text-heritage-green group-hover:-translate-y-2 group-hover:translate-x-2 transition-all" />
                  </button>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/40 leading-relaxed">
                  {t('newsletter.privacy_notice')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
    )}
    </AnimatePresence>
  );
}
