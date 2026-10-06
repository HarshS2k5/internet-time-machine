import React, { useState } from 'react';
import { LOST_INTERNET_DATA } from '../data/lostInternetData';
import { LostTechItem } from '../types/timeline';
import { Skull, Heart, Search, Filter, ShieldAlert, Sparkles, ArrowRight, X } from 'lucide-react';
import { audioService } from '../services/audioService';

interface LostInternetMuseumProps {
  onSelectYear?: (year: number) => void;
  onUnlockStamp?: (stampId: string) => void;
}

export const LostInternetMuseum: React.FC<LostInternetMuseumProps> = ({ onSelectYear, onUnlockStamp }) => {
  const [selectedItem, setSelectedItem] = useState<LostTechItem | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [respectsCount, setRespectsCount] = useState<{ [id: string]: number }>(() => {
    try {
      const saved = localStorage.getItem('itm_lost_respects');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const categories = ['All', 'Website', 'Service', 'Standard/Plugin', 'Hardware/Gadget'];

  const filteredItems = LOST_INTERNET_DATA.filter((item) => {
    const matchesCategory = selectedFilter === 'All' || item.category === selectedFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whatItWas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whatKilledIt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePayRespects = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.playTeleport();
    const current = respectsCount[id] || 0;
    const next = { ...respectsCount, [id]: current + 1 };
    setRespectsCount(next);
    localStorage.setItem('itm_lost_respects', JSON.stringify(next));

    if (onUnlockStamp) {
      onUnlockStamp('respects-paid');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-400 text-xs font-mono uppercase tracking-widest">
          <Skull className="w-3.5 h-3.5" />
          The Digital Graveyard & Memorial
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Lost Internet Museum
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300">
          A tribute to beloved websites, technologies, services, and hardware that once commanded the entire world, before fading into digital history.
        </p>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search discontinued tech (e.g. Flash, AIM, GeoCities)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/60"
            />
          </div>
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === cat
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Memorial Tombstones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const count = respectsCount[item.id] || 0;
          return (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                audioService.playClick();
              }}
              className="glass-panel p-5 rounded-2xl border border-zinc-800 hover:border-rose-500/40 transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top Meta */}
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-rose-400 px-2.5 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-[11px]">
                    ✝ {item.lifespan}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 bg-zinc-850 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-2 line-clamp-3 leading-relaxed">
                  {item.whatItWas}
                </p>
              </div>

              {/* Bottom Quick Look */}
              <div className="mt-5 pt-3 border-t border-zinc-800/80 space-y-2">
                <div className="text-[11px] text-zinc-400">
                  <span className="text-rose-400 font-semibold">Killed by: </span>
                  <span className="line-clamp-1">{item.whatKilledIt}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={(e) => handlePayRespects(item.id, e)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-rose-950/80 hover:text-rose-300 border border-zinc-700 hover:border-rose-500/40 text-[11px] text-zinc-300 transition-all"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
                    <span>Pay Respects ({count})</span>
                  </button>
                  <span className="text-xs text-cyan-400 group-hover:translate-x-0.5 transition-transform font-semibold flex items-center gap-1">
                    Examine ⭢
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Detail Memorial Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl glass-panel-glow rounded-3xl p-6 sm:p-8 text-zinc-100 border border-rose-500/30 shadow-2xl max-h-[88vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/40">
                    {selectedItem.lifespan}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Category: {selectedItem.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Sections */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  What It Was
                </h4>
                <p className="text-zinc-200 leading-relaxed bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800">
                  {selectedItem.whatItWas}
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Why It Mattered
                </h4>
                <p className="text-zinc-200 leading-relaxed bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800">
                  {selectedItem.whyItMattered}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
                    What Killed It
                  </h4>
                  <p className="text-rose-200/90 leading-relaxed bg-rose-950/20 p-3.5 rounded-xl border border-rose-500/30">
                    {selectedItem.whatKilledIt}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    What Replaced It
                  </h4>
                  <p className="text-emerald-200/90 leading-relaxed bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/30">
                    {selectedItem.whatReplacedIt}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={(e) => handlePayRespects(selectedItem.id, e)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition-all shadow-lg shadow-rose-500/20"
              >
                <Heart className="w-4 h-4 fill-current" />
                Pay Respects ({respectsCount[selectedItem.id] || 0} Flowers Left)
              </button>

              {onSelectYear && (
                <button
                  onClick={() => {
                    onSelectYear(selectedItem.birthYear);
                    setSelectedItem(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 hover:text-black text-cyan-300 font-bold text-xs transition-all border border-cyan-500/40"
                >
                  Time Travel to {selectedItem.birthYear} →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
