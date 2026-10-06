import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Calendar, Globe, Gamepad2, Cpu, Bot, Wifi, MessageSquare, Film, ArrowRight, Filter } from 'lucide-react';
import { HISTORICAL_EVENTS } from '../data/historicalEventsData';
import { KEY_YEARS_DATA } from '../data/yearlyData';
import { ERAS_DATA } from '../data/erasData';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { HistoricalEvent, CategoryType } from '../types/timeline';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectYear: (year: number) => void;
  onSelectEvent: (event: HistoricalEvent) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectYear,
  onSelectEvent,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [selectedEra, setSelectedEra] = useState<string | 'all'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setSelectedCategory('all');
      setSelectedEra('all');
    }
  }, [isOpen]);

  // Global search filtering
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1. Filter historical events
    let filteredEvents = HISTORICAL_EVENTS.filter((event) => {
      // Category filter
      if (selectedCategory !== 'all' && event.category !== selectedCategory) {
        return false;
      }
      // Era filter
      if (selectedEra !== 'all' && event.eraId !== selectedEra) {
        return false;
      }
      // Query filter
      if (!q) return true;

      const titleMatch = event.title.toLowerCase().includes(q);
      const headlineMatch = event.headline.toLowerCase().includes(q);
      const whyMatch = event.whyItMattered.toLowerCase().includes(q);
      const yearMatch = String(event.year).includes(q);
      const tagMatch = event.tags.some(t => t.toLowerCase().includes(q));
      const techMatch = (event.relatedTech || []).some(t => t.toLowerCase().includes(q));

      return titleMatch || headlineMatch || whyMatch || yearMatch || tagMatch || techMatch;
    });

    // 2. Filter matching years data if query matches a year or general trend
    let matchedYears = KEY_YEARS_DATA.filter(yd => {
      if (selectedEra !== 'all' && yd.eraId !== selectedEra) return false;
      if (!q) return false;

      const yearNumMatch = String(yd.year).includes(q);
      const headlineMatch = yd.headline.toLowerCase().includes(q);
      const siteMatch = yd.popularWebsites.some(w => w.toLowerCase().includes(q));
      const gameMatch = yd.popularGames.some(g => g.toLowerCase().includes(q));
      const deviceMatch = yd.majorDevices.some(d => d.toLowerCase().includes(q));
      const trendMatch = yd.culturalTrends.some(t => t.toLowerCase().includes(q));

      return yearNumMatch || headlineMatch || siteMatch || gameMatch || deviceMatch || trendMatch;
    });

    return {
      events: filteredEvents.slice(0, 20),
      years: matchedYears.slice(0, 5),
    };
  }, [query, selectedCategory, selectedEra]);

  if (!isOpen) return null;

  const getCategoryIcon = (cat: CategoryType) => {
    switch (cat) {
      case 'web': return <Globe className="w-3.5 h-3.5 text-emerald-400" />;
      case 'gaming': return <Gamepad2 className="w-3.5 h-3.5 text-rose-400" />;
      case 'mobile': return <Cpu className="w-3.5 h-3.5 text-sky-400" />;
      case 'computers': return <Cpu className="w-3.5 h-3.5 text-amber-400" />;
      case 'ai': return <Bot className="w-3.5 h-3.5 text-cyan-400" />;
      case 'internet': return <Wifi className="w-3.5 h-3.5 text-blue-400" />;
      case 'social': return <MessageSquare className="w-3.5 h-3.5 text-purple-400" />;
      case 'media': return <Film className="w-3.5 h-3.5 text-pink-400" />;
      default: return <Globe className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl glass-panel-glow rounded-2xl shadow-2xl border border-cyan-500/30 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search years, websites, games, devices, AI, trends (e.g., 1998, Google, DOOM, iPhone, ChatGPT)..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm sm:text-base outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-500 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filters Row */}
        <div className="p-3 border-b border-zinc-800/80 bg-zinc-950/40 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-400 flex items-center gap-1 font-mono text-[11px] mr-1">
            <Filter className="w-3 h-3 text-cyan-400" />
            FILTERS:
          </span>

          {/* Category Select */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as CategoryType | 'all')}
            className="bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-cyan-500"
          >
            <option value="all">All Categories</option>
            {CATEGORIES_DATA.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          {/* Era Select */}
          <select
            value={selectedEra}
            onChange={(e) => setSelectedEra(e.target.value)}
            className="bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-cyan-500"
          >
            <option value="all">All Eras (1980–2026)</option>
            {ERAS_DATA.map((era) => (
              <option key={era.id} value={era.id}>
                {era.name} ({era.period})
              </option>
            ))}
          </select>

          {(selectedCategory !== 'all' || selectedEra !== 'all' || query) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedEra('all');
                setQuery('');
              }}
              className="text-[11px] text-cyan-400 hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-4 max-h-[60vh] divide-y divide-zinc-800/60">
          {/* Matched Years Summary Cards */}
          {results.years.length > 0 && (
            <div className="pb-3">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-2">
                Pivotal Year Highlights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.years.map((y) => (
                  <div
                    key={y.year}
                    onClick={() => {
                      onSelectYear(y.year);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-850 cursor-pointer transition-all flex items-start justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {y.year}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                          {y.eraName}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 mt-1 line-clamp-1">
                        {y.headline}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 shrink-0 ml-2 mt-1 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Historical Events List */}
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider my-2 flex items-center justify-between">
              <span>Historical Events ({results.events.length})</span>
              <span className="text-[10px] text-zinc-500">Click item for deep-dive page</span>
            </div>

            {results.events.length === 0 ? (
              <div className="py-12 text-center text-zinc-500">
                <p className="text-sm">No historical events match your search query.</p>
                <p className="text-xs mt-1 text-zinc-600">Try searching for "Google", "iPhone", "1995", "DOOM", or "AI".</p>
              </div>
            ) : (
              <div className="space-y-2 mt-2">
                {results.events.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      onSelectEvent(event);
                      onClose();
                    }}
                    className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 hover:bg-zinc-800/70 cursor-pointer transition-all flex items-start gap-3.5 group"
                  >
                    <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700/80 shrink-0 mt-0.5">
                      {getCategoryIcon(event.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-500/30">
                          {event.year}
                        </span>
                        <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                          {event.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {event.headline}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {event.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 shrink-0 self-center transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Footer */}
        <div className="p-3 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-300">
              ESC
            </kbd>
            to close
          </span>
          <span className="text-[11px]">
            Internet Time Machine Global Archive
          </span>
        </div>
      </div>
    </div>
  );
};
