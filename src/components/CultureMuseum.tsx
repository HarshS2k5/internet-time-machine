import React, { useState } from 'react';
import { CULTURE_MEMES } from '../data/internetCultureData';
import { CultureMemeItem } from '../types/timeline';
import { Smile, Sparkles, MessageSquare, Palette, Volume2, Search, Filter } from 'lucide-react';
import { audioService } from '../services/audioService';

interface CultureMuseumProps {
  onUnlockStamp?: (stampId: string) => void;
}

export const CultureMuseum: React.FC<CultureMuseumProps> = ({ onUnlockStamp }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = ['All', 'Viral Video/Meme', 'Internet Slang', 'Web Design Aesthetic'];

  const filteredItems = CULTURE_MEMES.filter((item) => {
    const matchesFilter = selectedFilter === 'All' || item.type === selectedFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.significance.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.catchphrase && item.catchphrase.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handlePlayCultureSound = (item: CultureMemeItem) => {
    audioService.playTeleport();
    if (onUnlockStamp) {
      onUnlockStamp('culture-sound-played');
    }
  };

  const getBadgeColor = (type: CultureMemeItem['type']) => {
    switch (type) {
      case 'Viral Video/Meme': return 'bg-purple-950/80 text-purple-300 border-purple-500/40';
      case 'Internet Slang': return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40';
      case 'Web Design Aesthetic': return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      default: return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-400 text-xs font-mono uppercase tracking-widest">
          <Smile className="w-3.5 h-3.5" />
          Memes, Slang & Design Eras
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Internet Culture Museum
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300">
          The internet isn’t just cables and code — it’s the chaotic, humorous folklore of human culture. Explore legendary viral memes, retro chatroom slang, and iconic visual aesthetics.
        </p>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search memes, slang, aesthetics (e.g. Rickroll, Doge, ASL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/60"
            />
          </div>
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === tab
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Culture Artifacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-6 rounded-2xl border border-zinc-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono ${getBadgeColor(item.type)}`}>
                  {item.type}
                </span>
                <span className="font-mono text-zinc-400 bg-zinc-850 px-2 py-0.5 rounded text-[11px]">
                  Year {item.year}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                {item.title}
              </h3>

              {item.catchphrase && (
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 font-mono text-xs text-amber-300 italic">
                  "{item.catchphrase}"
                </div>
              )}

              <p className="text-xs text-zinc-300 leading-relaxed">
                {item.significance}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
              <span className="truncate mr-2 font-mono text-zinc-500">
                Origin: {item.origin}
              </span>
              <button
                onClick={() => handlePlayCultureSound(item)}
                className="shrink-0 p-1.5 rounded-lg bg-zinc-800 hover:bg-purple-950/80 hover:text-purple-300 border border-zinc-700 transition-all"
                title="Play cultural resonance chime"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
