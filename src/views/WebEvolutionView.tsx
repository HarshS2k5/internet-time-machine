import React, { useState } from 'react';
import { WEBSITE_EVOLUTION_DATA } from '../data/websiteEvolutionData';
import { ComparisonSlider } from '../components/ComparisonSlider';
import { Globe, Search, Layers, Monitor, Sliders, ExternalLink } from 'lucide-react';
import { audioService } from '../services/audioService';

interface WebEvolutionViewProps {
  onLaunchSimulation: (simId: string) => void;
}

export const WebEvolutionView: React.FC<WebEvolutionViewProps> = ({ onLaunchSimulation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Search', 'Video', 'Commerce', 'Social', 'Information'];

  const filteredItems = selectedCategory === 'All'
    ? WEBSITE_EVOLUTION_DATA
    : WEBSITE_EVOLUTION_DATA.filter((i) => i.category === selectedCategory);

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Globe className="w-3.5 h-3.5" />
          Interactive Exhibition
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Website Evolution & Comparison
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          Witness how the world’s most iconic websites evolved from raw 1990s HTML tables and Flash video into responsive, AI-augmented experiences. Drag the split sliders to compare past and present.
        </p>
      </section>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              audioService.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-600 text-black shadow-lg shadow-cyan-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Web Evolution Sliders List */}
      <section className="space-y-12">
        {filteredItems.map((item) => (
          <ComparisonSlider
            key={item.id}
            item={item}
            onLaunchSimulation={onLaunchSimulation}
          />
        ))}
      </section>

      {/* Web Design Eras Sandbox Callout */}
      <section className="p-6 sm:p-8 rounded-3xl glass-panel border border-zinc-800 text-center max-w-4xl mx-auto space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Experience Live Historical Web Emulators
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          Try querying our 1998 Google Stanford Beta emulator, browsing the hand-indexed 1996 Yahoo Directory, or rating 2005 YouTube videos with 5 stars.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => onLaunchSimulation('google-1998')}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/40 text-cyan-400 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Search className="w-3.5 h-3.5" /> Launch Google 1998
          </button>
          <button
            onClick={() => onLaunchSimulation('yahoo-1996')}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-400 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Globe className="w-3.5 h-3.5" /> Launch Yahoo 1996
          </button>
          <button
            onClick={() => onLaunchSimulation('youtube-2005')}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-rose-500/40 text-rose-400 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Monitor className="w-3.5 h-3.5" /> Launch YouTube 2005
          </button>
          <button
            onClick={() => onLaunchSimulation('thefacebook-2004')}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-blue-500/40 text-blue-400 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Layers className="w-3.5 h-3.5" /> Launch [thefacebook] 2004
          </button>
        </div>
      </section>
    </div>
  );
};
