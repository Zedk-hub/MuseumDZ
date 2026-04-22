import React from 'react';
import { Users, Landmark, TrendingUp, Map as MapIcon, FileText, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { museums, regions } from '../data/museums';
import { useLanguage } from '../lib/LanguageContext';

export const Dashboard: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const totalVisitors = museums.reduce((acc, m) => acc + m.visitors, 0);
  const avgRating = (museums.reduce((acc, m) => acc + m.rating, 0) / museums.length).toFixed(1);

  const startYear = 1962;
  const currentYear = new Date().getFullYear();

  const chartData = museums.slice(0, 8).map(m => ({
    name: isRTL ? (m.arabicName || m.name).split(' ').slice(-1)[0] : m.name.split(' ').slice(-1)[0],
    visitors: m.visitors
  }));

  const stats = [
    { label: t('dashboard.reg_inst'), value: '124', icon: Landmark, color: 'text-black' },
    { label: t('dashboard.visitors'), value: (totalVisitors * 12).toLocaleString(), icon: Users, color: 'text-black' },
    { label: t('dashboard.satisfaction'), value: `${avgRating}/5.0`, icon: TrendingUp, color: 'text-heritage-emerald' },
    { label: t('dashboard.wilayas'), value: '48', icon: MapIcon, color: 'text-black' },
  ];

  const COLORS = ['#C5A059', '#2D1810', '#065F46', '#8D6E63'];

  return (
    <section id="dashboard" className="py-20 md:py-40 bg-heritage-sand relative overflow-hidden border-y border-heritage-gold/10">
      <div className="absolute inset-0 cultural-pattern opacity-[0.02]" />
      
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8 md:gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-dark-brown" />
              <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black text-dark-brown">
                {t('dashboard.census')}
              </span>
            </div>
            <h2 className="text-4xl md:text-8xl display-font mb-4 font-bold tracking-tighter text-dark-brown leading-tight">{t('dashboard.performance')}</h2>
            <h3 className="text-2xl md:text-5xl arabic-serif text-dark-brown">{t('dashboard.report')}</h3>
          </div>
          <div className="flex items-center gap-4 md:gap-6 bg-white/80 border border-heritage-gold/10 px-6 md:px-10 py-4 md:py-6 luxury-shadow backdrop-blur-sm rounded-xl">
            <div className="relative">
              <ShieldCheck className="w-6 h-6 text-dark-brown relative z-10" />
              <div className="absolute inset-0 bg-dark-brown/10 blur-sm rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.1em] font-black text-dark-brown">{t('dashboard.integrity')}</span>
              <span className="text-[10px] md:text-[11px] font-black tracking-tight text-dark-brown">{t('dashboard.ministry')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-20 md:mb-32">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/40 border border-heritage-gold/10 p-8 md:p-10 luxury-shadow group relative overflow-hidden transition-all duration-500 hover:border-heritage-gold/30 rounded-2xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-heritage-gold/5 rounded-bl-full -mr-12 -mt-12 transition-all duration-500 group-hover:bg-heritage-gold/10" />
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className={`p-4 md:p-5 bg-heritage-beige rounded-xl border border-heritage-gold/10 ${stat.color}`}>
                  <stat.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div className="text-right">
                  <div className="text-3xl md:text-5xl font-black display-font tracking-tighter text-black">{stat.value}</div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-[0.2em] font-black text-dark-brown mb-2">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          <div className="lg:col-span-8 bg-white/40 border border-heritage-gold/10 p-6 md:p-14 luxury-shadow relative overflow-hidden rounded-3xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-heritage-beige via-heritage-gold to-heritage-red opacity-30" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 gap-6">
              <div>
                <h3 className="text-lg md:text-2xl display-font font-black tracking-tight text-black">{t('dashboard.matrix')}</h3>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-dark-brown mt-2 font-black">{t('dashboard.traffic')}</p>
              </div>
              <div className="md:text-right">
                <h3 className="text-base md:text-xl arabic-font font-black text-black">{t('dashboard.distribution')}</h3>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-dark-brown mt-2 font-black">{t('dashboard.metrics')}</p>
              </div>
            </div>
            <div className="h-[300px] md:h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', fill: '#2D1810' }}
                    dy={10}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8, fontWeight: 600, fill: '#2D1810' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(197,160,89,0.05)' }}
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: '1px solid rgba(197,160,89,0.3)', 
                      boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                      backgroundColor: 'rgba(253, 251, 247, 0.95)',
                      backdropFilter: 'blur(10px)',
                      padding: '12px'
                    }}
                  />
                  <Bar dataKey="visitors" radius={[4, 4, 0, 0]} barSize={32}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/40 border border-heritage-gold/10 p-6 md:p-14 luxury-shadow rounded-3xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 gap-4">
              <div>
                <h3 className="text-lg md:text-2xl display-font font-bold tracking-tight text-dark-brown">{t('dashboard.density')}</h3>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-dark-brown mt-2 font-black">{t('dashboard.geo_dist')}</p>
              </div>
              <div className="md:text-right">
                <h3 className="text-base md:text-xl arabic-font font-bold text-dark-brown">{t('dashboard.heritage_density')}</h3>
              </div>
            </div>
            <div className="space-y-10 md:space-y-12">
              {regions.map((region, i) => (
                <div key={region.id} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold tracking-tight display-font text-dark-brown">{isRTL ? region.arabicName : region.name} {t('dashboard.sector')}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] uppercase tracking-[0.1em] text-dark-brown font-black">{region.museumCount} {t('dashboard.units')}</span>
                      <span className="text-[8px] font-black text-dark-brown mt-1">{((region.museumCount / 124) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-heritage-gold/10 relative overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(region.museumCount / 50) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "circOut" }}
                      className="h-full bg-heritage-gold relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 md:mt-20 p-8 border border-dashed border-heritage-gold/30 text-center bg-heritage-gold/5 relative group rounded-2xl">
              <div className="absolute inset-0 bg-heritage-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <MapIcon className="w-8 h-8 md:w-10 md:h-10 text-dark-brown mx-auto mb-4 md:mb-6 opacity-60 group-hover:scale-110 transition-transform duration-500" />
              <p className="text-[9px] uppercase tracking-[0.3em] leading-loose text-dark-brown font-black relative z-10">
                {t('dashboard.geospatial')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
