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
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface CategoryExploreViewProps {
  onSelectEvent: (event: HistoricalEvent) => void;
  onSelectYear: (year: number) => void;
}

export const CategoryExploreView: React.FC<CategoryExploreViewProps> = ({
  onSelectEvent,
  onSelectYear,
}) => {
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

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
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

      {/* Active Category Hero Card */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              CATEGORY ARCHIVE
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              Chronological Stream (1980–2026)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {currentCategoryInfo.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-2xl leading-relaxed">
            {currentCategoryInfo.description}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center shrink-0">
          <span className="text-3xl font-extrabold text-cyan-400 font-mono">
            {categoryEvents.length}
          </span>
          <span className="text-[10px] text-zinc-400 font-mono uppercase block mt-1">
            Historic Records
          </span>
        </div>
      </section>

      {/* Category Chronological Events Stream */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-white tracking-tight font-mono flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Timeline of Milestones in {currentCategoryInfo.title}
        </h3>

        <div className="space-y-4">
          {categoryEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                audioService.playClick();
                onSelectEvent(event);
              }}
              className="glass-card rounded-2xl p-5 sm:p-6 border border-zinc-800 hover:border-cyan-500/40 cursor-pointer transition-all flex flex-col md:flex-row gap-5 items-start justify-between group"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectYear(event.year);
                    }}
                    className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/70 px-2.5 py-0.5 rounded-lg border border-cyan-500/30 hover:bg-cyan-900 transition-colors"
                  >
                    Year {event.year} ↗
                  </button>
                  <span className="text-xs text-zinc-400 font-mono">
                    {event.dateStr}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {event.title}
                </h4>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {event.headline}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {event.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform self-end md:self-center">
                <span>View Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
