import React, { useState } from 'react';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { HISTORICAL_EVENTS } from '../data/historicalEventsData';
import { CategoryType, HistoricalEvent } from '../types/timeline';
import {
  Globe,
  Gamepad2,
  Smartphone,
  Cpu,
  Bot,
  Wifi,
  MessageSquare,
  Film,
  ArrowRight,
  Layers,
  Sparkles,
  Compass,
  Skull,
  Gauge,
  GitBranch,
  Wrench,
  Smile,
} from 'lucide-react';
import { audioService } from '../services/audioService';

// Interactive Wings
import { BrowserMuseum } from '../components/BrowserMuseum';
import { LostInternetMuseum } from '../components/LostInternetMuseum';
import { SpeedSimulator } from '../components/SpeedSimulator';
import { HistoryMap } from '../components/HistoryMap';
import { TechExplainers } from '../components/TechExplainers';
import { CultureMuseum } from '../components/CultureMuseum';
import { BuildYourInternet } from '../components/BuildYourInternet';

interface CategoryExploreViewProps {
  onSelectEvent: (event: HistoricalEvent) => void;
  onSelectYear: (year: number) => void;
  onUnlockStamp?: (stampId: string) => void;
}

type ExhibitionWing =
  | 'categories'
  | 'browser-museum'
  | 'lost-internet'
  | 'speed-simulator'
  | 'history-map'
  | 'tech-explainers'
  | 'culture-museum'
  | 'build-internet';

export const CategoryExploreView: React.FC<CategoryExploreViewProps> = ({
  onSelectEvent,
  onSelectYear,
  onUnlockStamp,
}) => {
  const [activeWing, setActiveWing] = useState<ExhibitionWing>('categories');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('web');

  const currentCategoryInfo = CATEGORIES_DATA.find((c) => c.id === activeCategory) || CATEGORIES_DATA[0];
  const categoryEvents = HISTORICAL_EVENTS.filter((e) => e.category === activeCategory);

  const getCategoryIconComponent = (id: CategoryType) => {
    switch (id) {
      case 'web': return <Globe className="w-5 h-5" />;
      case 'gaming': return <Gamepad2 className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'computers': return <Cpu className="w-5 h-5" />;
      case 'ai': return <Bot className="w-5 h-5" />;
      case 'internet': return <Wifi className="w-5 h-5" />;
      case 'social': return <MessageSquare className="w-5 h-5" />;
      case 'media': return <Film className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const wingsConfig = [
    { id: 'categories', label: 'Category Pillars', icon: Layers, badge: '8 Pillars' },
    { id: 'browser-museum', label: 'Browser Museum', icon: Compass, badge: 'Engines' },
    { id: 'lost-internet', label: 'Lost Internet', icon: Skull, badge: 'Memorial' },
    { id: 'speed-simulator', label: 'Speed Simulator', icon: Gauge, badge: 'Bandwidth' },
    { id: 'history-map', label: 'History Map & Tree', icon: GitBranch, badge: 'Lineage' },
    { id: 'tech-explainers', label: 'How Tech Worked', icon: Cpu, badge: 'Mechanics' },
    { id: 'culture-museum', label: 'Culture & Memes', icon: Smile, badge: 'Folklore' },
    { id: 'build-internet', label: 'Build Your Internet', icon: Wrench, badge: 'Lab' },
  ];

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* Top Museum Wing Navigation Bar */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Digital Museum Exhibition Wings
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            Interactive Galleries & Historical Labs
          </span>
        </div>

        {/* Wing Pills Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {wingsConfig.map((wing) => {
            const IconComponent = wing.icon;
            const isCurrent = activeWing === wing.id;
            return (
              <button
                key={wing.id}
                onClick={() => {
                  setActiveWing(wing.id as ExhibitionWing);
                  audioService.playClick();
                }}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isCurrent
                    ? 'bg-cyan-950 border-cyan-500 text-white shadow-lg shadow-cyan-950/60 scale-[1.02]'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isCurrent ? 'text-cyan-400' : 'text-zinc-400'}`} />
                <span className="text-[11px] font-bold line-clamp-1">{wing.label}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800/80 text-zinc-400">
                  {wing.badge}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Render Active Exhibition Wing */}
      {activeWing === 'browser-museum' && (
        <BrowserMuseum onSelectYear={onSelectYear} onUnlockStamp={onUnlockStamp} />
      )}

      {activeWing === 'lost-internet' && (
        <LostInternetMuseum onSelectYear={onSelectYear} onUnlockStamp={onUnlockStamp} />
      )}

      {activeWing === 'speed-simulator' && (
        <SpeedSimulator onUnlockStamp={onUnlockStamp} />
      )}

      {activeWing === 'history-map' && (
        <HistoryMap onSelectYear={onSelectYear} onUnlockStamp={onUnlockStamp} />
      )}

      {activeWing === 'tech-explainers' && (
        <TechExplainers onUnlockStamp={onUnlockStamp} />
      )}

      {activeWing === 'culture-museum' && (
        <CultureMuseum onUnlockStamp={onUnlockStamp} />
      )}

      {activeWing === 'build-internet' && (
        <BuildYourInternet onUnlockStamp={onUnlockStamp} />
      )}

      {/* Default: 8 Pillars Category Exploration */}
      {activeWing === 'categories' && (
        <div className="space-y-10 sm:space-y-14">
          {/* Header */}
          <section className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              Thematic Exploration
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Explore by Digital Category
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Select any of the eight fundamental technology pillars to explore a dedicated chronological stream of milestones that transformed human culture.
            </p>
          </section>

          {/* Category Pills Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  audioService.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  activeCategory === cat.id
                    ? 'bg-zinc-800 border-cyan-500/60 shadow-lg shadow-cyan-950/40 scale-[1.02]'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-cyan-500 text-black'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {getCategoryIconComponent(cat.id)}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-white">
                    {cat.title}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono">
                    {HISTORICAL_EVENTS.filter((e) => e.category === cat.id).length} Milestones
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Category Header Banner */}
          <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  {getCategoryIconComponent(activeCategory)}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentCategoryInfo.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                {currentCategoryInfo.description}
              </p>
            </div>
            <div className="text-left md:text-right font-mono">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
                {categoryEvents.length}
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest">
                Milestones Recorded
              </div>
            </div>
          </section>

          {/* Chronological Event Cards */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Chronological Milestones
              </h3>
              <span className="text-xs font-mono text-zinc-500">
                Ordered by historical year
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => {
                    audioService.playClick();
                    onSelectEvent(event);
                  }}
                  className="glass-panel p-5 rounded-2xl border border-zinc-800 hover:border-cyan-500/50 transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                        {event.year}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500">
                        {event.dateStr}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {event.title}
                    </h4>

                    <p className="text-xs text-zinc-300 mt-2 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                    <span className="truncate mr-2 font-mono text-[11px] text-zinc-500">
                      {event.whyItMattered}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectYear(event.year);
                      }}
                      className="shrink-0 p-1.5 rounded-lg bg-zinc-800 hover:bg-cyan-500 hover:text-black transition-colors"
                      title={`Time Travel to ${event.year}`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
