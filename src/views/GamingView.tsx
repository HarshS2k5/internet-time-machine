import React, { useState } from 'react';
import { GAMING_MILESTONES } from '../data/gamingData';
import { Gamepad2, Trophy, Cpu, Flame, Disc, Radio, Filter, ArrowRight } from 'lucide-react';
import { audioService } from '../services/audioService';

export const GamingView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const categories = ['All', '8-bit & 16-bit', '3D Revolution', 'Online Golden Age', 'HD & Esports', 'Modern Era'];
  const types = ['All', 'Console', 'PC', 'Graphics', 'Engine', 'Online/MMO', 'Esports'];

  const filteredItems = GAMING_MILESTONES.filter((item) => {
    const catMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const typeMatch = selectedType === 'All' || item.type === selectedType;
    return catMatch && typeMatch;
  });

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-400 text-xs font-mono uppercase tracking-widest">
          <Gamepad2 className="w-3.5 h-3.5" />
          Interactive Gaming Archive
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The Evolution of Video Games
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          From 8-bit cartridges and 3D polygon breakthroughs to Battle.net LAN parties, Steam digital distribution, and ray-traced virtual worlds.
        </p>
      </section>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Era Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-zinc-500 text-xs font-mono mr-1">ERA:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                audioService.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-900/30'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-zinc-500 text-xs font-mono mr-1">TYPE:</span>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => {
                audioService.playClick();
                setSelectedType(t);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
                selectedType === t
                  ? 'bg-zinc-800 text-rose-400 border border-rose-500/40'
                  : 'text-zinc-400 hover:text-white bg-zinc-900/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Milestones Timeline Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl overflow-hidden border border-zinc-800 hover:border-rose-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Media Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-zinc-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full font-mono text-xs font-bold bg-black/80 backdrop-blur-md text-rose-400 border border-rose-500/40">
                  {item.year}
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-lg bg-zinc-900/90 text-zinc-300 text-xs font-mono">
                  {item.type} • {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                {item.featuredGame && (
                  <div className="text-xs text-rose-400 font-mono">
                    Featured: {item.featuredGame}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Why It Mattered Box */}
                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-zinc-200">
                  <span className="font-bold text-rose-400 block mb-1 font-mono uppercase text-[10px]">
                    Why It Mattered:
                  </span>
                  {item.whyItMattered}
                </div>
              </div>
            </div>

            {/* Innovations Tags Footer */}
            <div className="p-6 pt-0">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1.5">
                Key Innovations:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.innovations.map((inn, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    ★ {inn}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
