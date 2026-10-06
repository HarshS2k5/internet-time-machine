import React, { useState } from 'react';
import { BROWSER_MUSEUM_DATA } from '../data/browserMuseumData';
import { BrowserMilestone } from '../types/timeline';
import { Compass, Globe, Sparkles, CheckCircle2, ChevronRight, History, Layers, ShieldCheck, ExternalLink } from 'lucide-react';
import { audioService } from '../services/audioService';

interface BrowserMuseumProps {
  onSelectYear?: (year: number) => void;
  onUnlockStamp?: (stampId: string) => void;
}

export const BrowserMuseum: React.FC<BrowserMuseumProps> = ({ onSelectYear, onUnlockStamp }) => {
  const [selectedBrowser, setSelectedBrowser] = useState<BrowserMilestone>(BROWSER_MUSEUM_DATA[1]); // Netscape default
  const [filterEra, setFilterEra] = useState<'all' | '90s' | '2000s' | 'modern'>('all');

  const filteredBrowsers = BROWSER_MUSEUM_DATA.filter((b) => {
    if (filterEra === '90s') return b.year < 2000;
    if (filterEra === '2000s') return b.year >= 2000 && b.year < 2010;
    if (filterEra === 'modern') return b.year >= 2010;
    return true;
  });

  const handleSelect = (b: BrowserMilestone) => {
    setSelectedBrowser(b);
    audioService.playClick();
    if (onUnlockStamp) {
      onUnlockStamp('browser-museum-explored');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          The Browser Wars & Engines
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Browser Museum
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300">
          From NCSA Mosaic’s first inline images to the fierce 90s Netscape vs Microsoft battles and the modern Chromium era — discover how browsers opened the gateway to cyberspace.
        </p>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {(['all', '90s', '2000s', 'modern'] as const).map((era) => (
            <button
              key={era}
              onClick={() => setFilterEra(era)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                filterEra === era
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {era === 'all' ? 'All Browsers' : era === '90s' ? '1990s Wars' : era === '2000s' ? '2000s Standards' : 'Modern Era'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Exhibition Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Browser Selector List */}
        <div className="lg:col-span-4 space-y-2">
          {filteredBrowsers.map((b) => {
            const isSelected = selectedBrowser.id === b.id;
            return (
              <button
                key={b.id}
                onClick={() => handleSelect(b)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50 scale-[1.01]'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-zinc-800 ${b.iconColor}`}>
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{b.name}</div>
                    <div className="text-[11px] font-mono text-zinc-400">
                      Launched {b.year} · {b.developer.split('(')[0]}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 font-mono text-cyan-400 border border-zinc-700">
                    {b.year}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Browser Showcase Pavilion */}
        <div className="lg:col-span-8 space-y-6">
          {/* Retro Browser Window Frame */}
          <div className="rounded-2xl border border-zinc-700 overflow-hidden bg-zinc-950 shadow-2xl">
            {/* Title Bar */}
            <div className="bg-zinc-800 px-4 py-2 flex items-center justify-between border-b border-zinc-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-mono text-zinc-300 ml-2 font-semibold">
                  {selectedBrowser.name} (v1.0 - {selectedBrowser.year}) — Cyberspace Navigator
                </span>
              </div>
              <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/30">
                {selectedBrowser.badge}
              </div>
            </div>

            {/* Simulated Address / Toolbar */}
            <div className="bg-zinc-900/90 px-4 py-2 border-b border-zinc-800 flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-zinc-400 font-mono text-[11px]">
                <button className="px-1.5 py-0.5 rounded bg-zinc-800 hover:text-white">Back</button>
                <button className="px-1.5 py-0.5 rounded bg-zinc-800 hover:text-white">Forward</button>
                <button className="px-1.5 py-0.5 rounded bg-zinc-800 hover:text-white">Home</button>
                <button className="px-1.5 py-0.5 rounded bg-zinc-800 hover:text-white">Reload</button>
              </div>
              <div className="flex-1 bg-black/60 rounded px-3 py-1 font-mono text-[11px] text-zinc-300 border border-zinc-800 truncate">
                http://museum.internettimemachine.org/{selectedBrowser.id}/
              </div>
              {onSelectYear && (
                <button
                  onClick={() => onSelectYear(selectedBrowser.year)}
                  className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black font-semibold text-[11px] transition-colors border border-cyan-500/30 shrink-0"
                >
                  Time Travel to {selectedBrowser.year} →
                </button>
              )}
            </div>

            {/* Exhibit Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Importance Summary */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedBrowser.name}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {selectedBrowser.importance}
                </p>
              </div>

              {/* Specs & Architecture */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <div className="text-[11px] uppercase font-mono text-zinc-400 mb-1">
                    Creator & Developer
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {selectedBrowser.developer}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <div className="text-[11px] uppercase font-mono text-zinc-400 mb-1">
                    Rendering Engine
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-cyan-400 font-mono">
                    {selectedBrowser.engine}
                  </div>
                </div>
              </div>

              {/* Major Innovations */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Inventions & Features Introduced
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedBrowser.majorFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-xs text-zinc-200 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historical Timeline Milestones */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" />
                  Milestone Chronology
                </h4>
                <div className="space-y-2">
                  {selectedBrowser.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 flex items-center gap-2 font-mono"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Happened to It? */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  What Happened to It?
                </h4>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {selectedBrowser.whatHappened}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
