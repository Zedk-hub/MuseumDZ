import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { chatWithHeritageAI } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const HeritageGuide: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      parts: [{ text: input.trim() }]
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);

    const result = await chatWithHeritageAI(input.trim(), messages);
    
    if (result) {
      setMessages(prev => [...prev, {
        role: 'model',
        parts: [{ text: result }]
      }]);
    } else {
      setError(t('ai.error'));
    }
    
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 md:bottom-12 ${isRTL ? 'left-8 md:left-12' : 'right-8 md:right-12'} z-[300001] h-14 md:h-16 flex items-center gap-4 bg-heritage-gold text-black px-6 md:px-8 rounded-full shadow-[0_20px_50px_rgba(197,160,89,0.4)] group overflow-hidden border-2 border-white/20`}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Sparkles className="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform relative z-10" />
        <span className="text-[12px] md:text-[14px] uppercase font-black tracking-[0.2em] md:tracking-[0.3em] relative z-10 whitespace-nowrap">
          {t('ai.title')}
        </span>
        <div className="absolute -top-1 -right-1 bg-white w-3 h-3 rounded-full animate-ping z-20" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[400000] flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 1, y: '100%' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1, y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="pointer-events-auto w-full h-full bg-black flex flex-col relative"
            >
              <div className="absolute inset-0 cultural-pattern opacity-[0.03] pointer-events-none" />
              
              {/* Close Button Only - No Title Header */}
              <div className="absolute top-8 right-8 z-[400001] md:top-12 md:right-12">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-5 bg-white/5 hover:bg-heritage-gold hover:text-black rounded-full transition-all text-heritage-beige backdrop-blur-xl border border-white/10 shadow-2xl group"
                >
                  <X className="w-8 h-8 group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              {/* Chat Body - Expanded */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 md:p-24 space-y-12 scroll-smooth relative z-10"
              >
                <div className="max-w-4xl mx-auto space-y-12">
                  {/* Welcome Message */}
                  <div className="flex gap-6 items-start max-w-[90%]">
                    <div className="w-14 h-14 rounded-2xl bg-heritage-gold/20 border border-heritage-gold/30 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-7 h-7 text-heritage-gold" />
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl rounded-tl-none backdrop-blur-3xl shadow-2xl">
                      <p className="text-xl md:text-3xl leading-relaxed text-heritage-beige font-bold">{t('ai.welcome')}</p>
                    </div>
                  </div>

                {/* Messages */}
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex gap-5 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border shadow-lg ${
                      msg.role === 'user' 
                        ? 'bg-heritage-gold border-heritage-gold shadow-heritage-gold/20' 
                        : 'bg-white/10 border-white/20'
                    }`}>
                      {msg.role === 'user' ? <User className="w-5 h-5 text-black font-bold" /> : <Bot className="w-5 h-5 text-heritage-beige" />}
                    </div>
                    <div className={`p-6 rounded-[2rem] max-w-[85%] shadow-2xl ${
                      msg.role === 'user' 
                        ? 'bg-heritage-gold/90 border border-heritage-gold rounded-tr-none text-right' 
                        : 'bg-white/5 border border-white/10 rounded-tl-none'
                    }`}>
                      <p className={`text-base md:text-lg leading-relaxed whitespace-pre-wrap font-bold ${msg.role === 'user' ? 'text-black' : 'text-heritage-beige'}`}>
                        {msg.parts[0].text}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 rounded-2xl bg-heritage-gold/20 border border-heritage-gold/30 flex items-center justify-center animate-pulse">
                      <Bot className="w-5 h-5 text-heritage-gold" />
                    </div>
                    <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none flex items-center gap-4">
                       <Loader2 className="w-5 h-5 text-heritage-gold animate-spin" />
                       <span className="text-[10px] text-heritage-gold/60 animate-pulse font-black uppercase tracking-[0.5em]">PROCESSING_QUERY...</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}
                </div>
              </div>

              {/* Input */}
              <div className="p-8 md:p-16 bg-white/5 border-t border-white/10 mt-auto backdrop-blur-3xl relative z-10">
                <div className="max-w-4xl mx-auto">
                  <div className="relative group">
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={t('ai.placeholder')}
                      className="w-full bg-white/10 border border-white/20 p-6 pr-20 md:p-8 md:pr-24 rounded-[1.5rem] md:rounded-[2rem] text-xl md:text-3xl text-heritage-beige focus:outline-none focus:border-heritage-gold transition-all placeholder:text-heritage-beige/40 font-bold shadow-2xl"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isTyping}
                      className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 p-4 md:p-6 bg-heritage-gold hover:bg-white text-black rounded-[1rem] md:rounded-[1.5rem] transition-all disabled:opacity-50 disabled:grayscale hover:scale-105 active:scale-95 shadow-xl`}
                    >
                      <Send className={`w-6 h-6 md:w-8 md:h-8 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-4 opacity-40">
                    <Sparkles className="w-5 h-5 text-heritage-gold" />
                    <span className="text-[12px] md:text-[14px] uppercase tracking-[0.4em] font-black text-heritage-beige">{t('ai.disclaimer')}</span>
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
