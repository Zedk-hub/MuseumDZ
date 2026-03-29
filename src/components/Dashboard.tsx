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

  const chartData = museums.map(m => ({
    name: isRTL ? (m.arabicName || m.name).split(' ').slice(-1)[0] : m.name.split(' ').slice(-1)[0],
    visitors: m.visitors
  }));

  const stats = [
    { label: t('dashboard.reg_inst'), value: '124', icon: Landmark, color: 'text-heritage-green' },
    { label: t('dashboard.visitors'), value: (totalVisitors * 12).toLocaleString(), icon: Users, color: 'text-heritage-gold' },
    { label: t('dashboard.satisfaction'), value: `${avgRating}/5.0`, icon: TrendingUp, color: 'text-heritage-green' },
    { label: t('dashboard.wilayas'), value: '48', icon: MapIcon, color: 'text-heritage-red' },
  ];

  const COLORS = ['#006233', '#B8860B', '#D21034', '#555555'];

  return (
    <section id="dashboard" className="py-24 md:py-40 bg-secondary/10 relative overflow-hidden border-y border-border/40">
      <div className="absolute inset-0 cultural-pattern opacity-[0.05]" />
      
      <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-heritage-green" />
              <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black text-heritage-green">
                {t('dashboard.census')}
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl display-font mb-6 font-bold tracking-tighter">{t('dashboard.performance')}</h2>
            <h3 className="text-3xl md:text-4xl arabic-serif text-foreground/60">{t('dashboard.report')}</h3>
          </div>
          <div className="flex items-center gap-6 bg-card border border-border/60 px-8 py-4 luxury-shadow backdrop-blur-sm">
            <div className="relative">
              <ShieldCheck className="w-6 h-6 text-heritage-green relative z-10" />
              <div className="absolute inset-0 bg-heritage-green/20 blur-md rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/80">{t('dashboard.integrity')}</span>
              <span className="text-[11px] font-bold tracking-tight">{t('dashboard.ministry')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-20 md:mb-32">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border/60 p-10 luxury-shadow group relative overflow-hidden transition-all duration-500 hover:border-heritage-green/30"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-heritage-green/5 rounded-bl-full -mr-12 -mt-12 transition-all duration-500 group-hover:bg-heritage-green/10" />
              <div className="flex justify-between items-start mb-8">
                <div className={`p-5 bg-muted/50 rounded-sm border border-border/40 ${stat.color}`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-light display-font tracking-tighter">{stat.value}</div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground mb-2">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          <div className="lg:col-span-8 bg-card border border-border/60 p-10 md:p-14 luxury-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-heritage-green via-heritage-gold to-heritage-red opacity-30" />
            <div className="flex justify-between items-center mb-12 md:mb-16">
              <div>
                <h3 className="text-xl md:text-2xl display-font font-bold tracking-tight">{t('dashboard.matrix')}</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2 font-bold">{t('dashboard.traffic')}</p>
              </div>
              <div className="text-right">
                <h3 className="text-lg md:text-xl arabic-font font-bold">{t('dashboard.distribution')}</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2 font-bold">{t('dashboard.metrics')}</p>
              </div>
            </div>
            <div className="h-[400px] md:h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', fill: '#6B7280' }}
                    dy={15}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 600, fill: '#9CA3AF' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,98,51,0.05)' }}
                    contentStyle={{ 
                      borderRadius: '0px', 
                      border: '1px solid var(--chart-tooltip-border)', 
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      backgroundColor: 'var(--chart-tooltip-bg)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Bar dataKey="visitors" radius={[2, 2, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 bg-card border border-border/60 p-10 md:p-14 luxury-shadow">
            <div className="flex justify-between items-center mb-12 md:mb-16">
              <div>
                <h3 className="text-xl md:text-2xl display-font font-bold tracking-tight">{t('dashboard.density')}</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2 font-bold">{t('dashboard.geo_dist')}</p>
              </div>
              <div className="text-right">
                <h3 className="text-lg md:text-xl arabic-font font-bold">{t('dashboard.heritage_density')}</h3>
              </div>
            </div>
            <div className="space-y-12">
              {regions.map((region, i) => (
                <div key={region.id} className="group">
                  <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col">
                      <span className="text-sm md:text-base font-bold tracking-tight display-font">{isRTL ? region.arabicName : region.name} {t('dashboard.sector')}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-heritage-green font-black">{region.museumCount} {t('dashboard.units')}</span>
                      <span className="text-[9px] font-bold text-muted-foreground/60 mt-1">{((region.museumCount / 124) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-muted/50 relative overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(region.museumCount / 50) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "circOut" }}
                      className="h-full bg-heritage-green relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-20 p-10 border border-dashed border-border/60 text-center bg-muted/10 relative group">
              <div className="absolute inset-0 bg-heritage-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <MapIcon className="w-10 h-10 text-heritage-gold mx-auto mb-6 opacity-40 group-hover:scale-110 transition-transform duration-500" />
              <p className="text-[10px] uppercase tracking-[0.4em] leading-loose text-muted-foreground font-black relative z-10">
                {t('dashboard.geospatial')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
