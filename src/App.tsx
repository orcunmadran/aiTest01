/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Clock, 
  User, 
  Calendar,
  ArrowRight,
  TrendingUp,
  Newspaper
} from 'lucide-react';
import { newsData } from './data/news';
import { NewsItem, Category } from './types';
import { cn } from './lib/utils';

const categories: Category[] = ['Tümü', 'Siyaset', 'Teknoloji', 'Spor', 'Ekonomi', 'Kültür'];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredNews = newsData[0];
  const trendingNews = newsData.slice(1, 4);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
              setSelectedCategory('Tümü');
              setSelectedNews(null);
            }}>
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <Newspaper size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight">HABER<span className="text-emerald-600">PORTALI</span></span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-emerald-600",
                    selectedCategory === cat ? "text-emerald-600" : "text-gray-500"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Haber ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-emerald-500 transition-all w-48 lg:w-64"
                />
              </div>
              <button 
                className="md:hidden p-2 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-black/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "block w-full text-left px-3 py-3 rounded-md text-base font-medium",
                      selectedCategory === cat ? "bg-emerald-50 text-emerald-600" : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {cat}
                  </button>
                ))}
                <div className="pt-4 px-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Haber ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedNews ? (
          <div className="space-y-12">
            {/* Hero Section (Only on "Tümü" and no search) */}
            {selectedCategory === 'Tümü' && !searchQuery && (
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="lg:col-span-8 group cursor-pointer"
                  onClick={() => setSelectedNews(featuredNews)}
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
                    <img 
                      src={featuredNews.imageUrl} 
                      alt={featuredNews.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white">
                      <span className="inline-block px-3 py-1 bg-emerald-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                        {featuredNews.category}
                      </span>
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 group-hover:text-emerald-400 transition-colors">
                        {featuredNews.title}
                      </h1>
                      <p className="text-gray-200 text-lg line-clamp-2 max-w-2xl mb-6">
                        {featuredNews.summary}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-300">
                        <span className="flex items-center gap-2"><User size={16} /> {featuredNews.author}</span>
                        <span className="flex items-center gap-2"><Clock size={16} /> {featuredNews.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-emerald-600" size={20} />
                    <h2 className="text-xl font-bold tracking-tight">Günün Öne Çıkanları</h2>
                  </div>
                  <div className="space-y-6">
                    {trendingNews.map((news, idx) => (
                      <motion.div 
                        key={news.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-4 group cursor-pointer"
                        onClick={() => setSelectedNews(news)}
                      >
                        <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden">
                          <img 
                            src={news.imageUrl} 
                            alt={news.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
                            {news.category}
                          </span>
                          <h3 className="font-bold text-sm leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                            {news.title}
                          </h3>
                          <span className="text-xs text-gray-400 mt-2">{news.date}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* News Grid */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">
                  {searchQuery ? `"${searchQuery}" için sonuçlar` : `${selectedCategory} Haberleri`}
                </h2>
                <span className="text-sm text-gray-500">{filteredNews.length} haber bulundu</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredNews.map((news, idx) => (
                    <motion.article
                      layout
                      key={news.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group flex flex-col bg-white rounded-3xl border border-black/5 overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden" onClick={() => setSelectedNews(news)}>
                        <img 
                          src={news.imageUrl} 
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest rounded-full text-emerald-700 shadow-sm">
                            {news.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-3">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {news.date}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {news.readTime}</span>
                        </div>
                        <h3 
                          className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2"
                          onClick={() => setSelectedNews(news)}
                        >
                          {news.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">
                          {news.summary}
                        </p>
                        <button 
                          onClick={() => setSelectedNews(news)}
                          className="flex items-center gap-2 text-sm font-bold text-emerald-600 group/btn"
                        >
                          Devamını Oku 
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>

              {filteredNews.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 text-gray-400">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Sonuç bulunamadı</h3>
                  <p className="text-gray-500 mt-2">Arama kriterlerinize uygun haber mevcut değil.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Tümü');
                    }}
                    className="mt-6 text-emerald-600 font-bold hover:underline"
                  >
                    Tüm haberleri gör
                  </button>
                </div>
              )}
            </section>
          </div>
        ) : (
          /* News Detail View */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <button 
              onClick={() => setSelectedNews(null)}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors mb-8 group"
            >
              <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              Geri Dön
            </button>

            <header className="mb-10">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                {selectedNews.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-8">
                {selectedNews.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-y border-black/5 py-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                    {selectedNews.author[0]}
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold leading-none">{selectedNews.author}</p>
                    <p className="text-[10px] uppercase tracking-widest mt-1">Editör</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-black/5 hidden sm:block" />
                <span className="flex items-center gap-2"><Calendar size={16} /> {selectedNews.date}</span>
                <span className="flex items-center gap-2"><Clock size={16} /> {selectedNews.readTime} okuma</span>
              </div>
            </header>

            <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-10 shadow-2xl shadow-black/10">
              <img 
                src={selectedNews.imageUrl} 
                alt={selectedNews.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p className="text-xl font-medium text-gray-900 leading-relaxed italic border-l-4 border-emerald-500 pl-6 py-2">
                {selectedNews.summary}
              </p>
              <p>{selectedNews.content}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>

            <footer className="mt-16 pt-10 border-t border-black/5">
              <div className="bg-gray-50 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold mb-2">Bu haberi beğendiniz mi?</h4>
                  <p className="text-gray-500 text-sm">Daha fazla {selectedNews.category.toLowerCase()} haberi için bültenimize abone olun.</p>
                </div>
                <button className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
                  Abone Ol
                </button>
              </div>
            </footer>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                  <Newspaper size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight">HABER<span className="text-emerald-600">PORTALI</span></span>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed">
                Türkiye'nin en güncel ve tarafsız haber portalı. Teknoloji, siyaset, spor ve daha fazlası için bizi takip edin.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Kategoriler</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {categories.slice(1).map(cat => (
                  <li key={cat}><button onClick={() => setSelectedCategory(cat)} className="hover:text-emerald-600 transition-colors">{cat}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">İletişim</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>Hakkımızda</li>
                <li>Künye</li>
                <li>Reklam</li>
                <li>İletişim Formu</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium uppercase tracking-widest">
            <p>© 2026 Haber Portalı. Tüm hakları saklıdır.</p>
            <div className="flex gap-8">
              <span>Gizlilik Politikası</span>
              <span>Kullanım Koşulları</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
