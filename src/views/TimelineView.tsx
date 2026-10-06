import React, { useState, useEffect } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Globe,
  Gamepad2,
  Smartphone,
  Cpu,
  MessageSquare,
  Sparkles,
  Zap,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ALL_YEARS, getYearData } from '../data/yearlyData';
import { ERAS_DATA } from '../data/erasData';
import { HistoricalEvent, YearData, EraId } from '../types/timeline';
import { audioService } from '../services/audioService';

interface TimelineViewProps {
  currentYear: number;
  onSelectYear: (year: number) => void;
  onSelectEvent: (event: HistoricalEvent) => void;
  onOpenTimeWarp: () => void;
  onLaunchSimulation: (simId: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  currentYear,
  onSelectYear,
  onSelectEvent,
  onOpenTimeWarp,
  onLaunchSimulation,
}) => {
  const yearData: YearData = getYearData(currentYear);
  const currentEra = ERAS_DATA.find((e) => e.id === yearData.eraId) || ERAS_DATA[0];

  const handleYearChange = (year: number) => {
    const clamped = Math.max(1983, Math.min(2026, year));
    audioService.playClick(300 + (clamped - 1980) * 15, 0.03);
    onSelectYear(clamped);
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') {
        handleYearChange(currentYear - 1);
      } else if (e.key === 'ArrowRight') {
        handleYearChange(currentYear + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentYear]);

  // Era tabs
  const eraTabs = [
    { id: 'dawn-80s', label: '1980s: The Dawn', startYear: 1983 },
    { id: 'wild-web-90s', label: '1990s: Wild Web', startYear: 1995 },
    { id: 'dotcom-2000s', label: '2000s: Web 2.0', startYear: 2004 },
    { id: 'mobile-social-2010s', label: '2010s: Mobile & 4G', startYear: 2012 },
    { id: 'ai-modern-2020s', label: '2020s: Generative AI', startYear: 2024 },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-16">
      {/* Timeline Controls & Scrubber Card */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl space-y-6">
        {/* Era Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {eraTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleYearChange(tab.startYear)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                yearData.eraId === tab.id
                  ? 'bg-zinc-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={onOpenTimeWarp}
            className="ml-auto px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold hover:bg-purple-900/60 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" /> Random Year
          </button>
        </div>

        {/* Current Year Large Center Display & Prev/Next Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-zinc-800/80">
          <div className="flex items-center gap-4">
            <button
              disabled={currentYear <= 1983}
              onClick={() => handleYearChange(currentYear - 1)}
              className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
              title="Previous Year (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-5xl sm:text-7xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                  {currentYear}
                </h1>
                <span className={`text-xs px-2.5 py-1 rounded-full font-mono border ${currentEra.aesthetic.badgeStyle}`}>
                  {yearData.eraName}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                {currentEra.aesthetic.eraVibe}
              </p>
            </div>

            <button
              disabled={currentYear >= 2026}
              onClick={() => handleYearChange(currentYear + 1)}
              className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
              title="Next Year (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Metrics of That Year */}
          <div className="grid grid-cols-2 gap-3 sm:text-right">
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                TYPICAL CONNECTION
              </span>
              <span className="text-xs sm:text-sm font-bold text-cyan-400 font-mono">
                {yearData.internetSpeed}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                ONLINE POPULATION
              </span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">
                {yearData.activeUsers}
              </span>
            </div>
          </div>
        </div>

        {/* The Continuous Slider Bar Scrubber */}
        <div className="space-y-2 pt-2">
          <input
            type="range"
            min={1983}
            max={2026}
            step={1}
            value={currentYear}
            onChange={(e) => handleYearChange(parseInt(e.target.value))}
            className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300 transition-all"
          />
          <div className="flex justify-between text-[11px] font-mono text-zinc-500 px-1">
            <span>1983 (TCP/IP)</span>
            <span>1995 (Win95 & Web)</span>
            <span>2007 (iPhone)</span>
            <span>2016 (AlphaGo)</span>
            <span>2022 (ChatGPT)</span>
            <span>2026 (AI Agents)</span>
          </div>
        </div>
      </section>

      {/* Dynamic Year Overview Hero Card */}
      <section className="glass-card rounded-3xl p-6 sm:p-9 border border-zinc-800 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              Annual Overview • {currentYear}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {yearData.headline}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-4xl">
            {yearData.summary}
          </p>
        </div>

        {/* Web Design Style Feature Box */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row gap-5 justify-between">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                🎨 Web Design Paradigm of {currentYear}:
              </span>
              <span className="text-xs font-bold text-white">
                {yearData.webDesignStyle.title}
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {yearData.webDesignStyle.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {yearData.webDesignStyle.characteristics.map((ch, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700"
                >
                  ✓ {ch}
                </span>
              ))}
            </div>
          </div>

          {/* Color Palette Preview */}
          <div className="shrink-0 flex md:flex-col justify-start gap-2 border-t md:border-t-0 md:border-l border-zinc-800 pt-3 md:pt-0 md:pl-5">
            <span className="text-[11px] font-mono text-zinc-500 block">
              ERA PALETTE
            </span>
            <div className="flex items-center gap-2">
              {yearData.webDesignStyle.colorPalette.map((col, idx) => (
                <div
                  key={idx}
                  style={{ backgroundColor: col }}
                  className="w-6 h-6 rounded-lg border border-white/20 shadow-sm"
                  title={col}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Dimensions for This Year (Websites, Games, Devices, Social, Trends) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Popular Websites */}
        <div className="glass-card rounded-2xl p-5 border border-zinc-800">
          <div className="flex items-center gap-2 mb-3 text-cyan-400">
            <Globe className="w-4 h-4" />
            <h3 className="font-bold text-sm uppercase font-mono tracking-wider text-white">
              Popular Websites & Portals
            </h3>
          </div>
          <ul className="space-y-2 text-xs">
            {yearData.popularWebsites.map((site, i) => (
              <li
                key={i}
                className="p-2 rounded-lg bg-zinc-900/70 border border-zinc-800 text-zinc-200 flex items-center justify-between"
              >
                <span>{site}</span>
                <span className="text-[10px] text-zinc-500 font-mono">Rank #{i + 1}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Games */}
        <div className="glass-card rounded-2xl p-5 border border-zinc-800">
          <div className="flex items-center gap-2 mb-3 text-rose-400">
            <Gamepad2 className="w-4 h-4" />
            <h3 className="font-bold text-sm uppercase font-mono tracking-wider text-white">
              Hit Games & Virtual Worlds
            </h3>
          </div>
          <ul className="space-y-2 text-xs">
            {yearData.popularGames.map((game, i) => (
              <li
                key={i}
                className="p-2 rounded-lg bg-zinc-900/70 border border-zinc-800 text-zinc-200 flex items-center justify-between"
              >
                <span>{game}</span>
                <span className="text-[10px] text-rose-400 font-mono">Hit</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Major Devices */}
        <div className="glass-card rounded-2xl p-5 border border-zinc-800">
          <div className="flex items-center gap-2 mb-3 text-amber-400">
            <Smartphone className="w-4 h-4" />
            <h3 className="font-bold text-sm uppercase font-mono tracking-wider text-white">
              Major Devices & Hardware
            </h3>
          </div>
          <ul className="space-y-2 text-xs">
            {yearData.majorDevices.map((device, i) => (
              <li
                key={i}
                className="p-2 rounded-lg bg-zinc-900/70 border border-zinc-800 text-zinc-200 flex items-center justify-between"
              >
                <span>{device}</span>
                <span className="text-[10px] text-amber-400 font-mono">Hardware</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Platforms */}
        <div className="glass-card rounded-2xl p-5 border border-zinc-800">
          <div className="flex items-center gap-2 mb-3 text-purple-400">
            <MessageSquare className="w-4 h-4" />
            <h3 className="font-bold text-sm uppercase font-mono tracking-wider text-white">
              Social Platforms & Communities
            </h3>
          </div>
          <ul className="space-y-2 text-xs">
            {yearData.socialPlatforms.map((soc, i) => (
              <li
                key={i}
                className="p-2 rounded-lg bg-zinc-900/70 border border-zinc-800 text-zinc-200 flex items-center justify-between"
              >
                <span>{soc}</span>
                <span className="text-[10px] text-purple-400 font-mono">Community</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cultural Trends */}
        <div className="glass-card rounded-2xl p-5 border border-zinc-800 md:col-span-2">
          <div className="flex items-center gap-2 mb-3 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <h3 className="font-bold text-sm uppercase font-mono tracking-wider text-white">
              Online Culture, Memes & Society in {currentYear}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {yearData.culturalTrends.map((trend, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-zinc-300 flex items-start gap-2"
              >
                <span className="text-emerald-400">🔥</span>
                <span>{trend}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Historical Events in this Year */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Pivotal Events & Launches in {currentYear} ({yearData.keyEvents.length})
          </h3>
          <span className="text-xs text-zinc-400">
            Click any event card to open its dedicated archive page
          </span>
        </div>

        {yearData.keyEvents.length === 0 ? (
          <div className="p-8 rounded-2xl glass-card text-center text-zinc-500">
            <p className="text-sm">
              No single isolated flagship event recorded for {currentYear}, but steady technological progress occurred across {yearData.eraName}.
            </p>
            <p className="text-xs mt-1 text-zinc-600">
              Explore adjacent years like {currentYear - 1} or {currentYear + 1} to see major watershed moments.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {yearData.keyEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => {
                  audioService.playClick();
                  onSelectEvent(evt);
                }}
                className="glass-card rounded-2xl overflow-hidden border border-zinc-800 hover:border-cyan-500/40 cursor-pointer group flex flex-col transition-all"
              >
                <div className="relative h-44 overflow-hidden bg-zinc-950">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full font-mono text-xs font-bold bg-black/80 backdrop-blur-md text-cyan-300 border border-cyan-500/40">
                    {evt.dateStr}
                  </div>
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-zinc-900/90 text-zinc-300 text-[10px] font-mono uppercase">
                    {evt.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {evt.headline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                    <span>Read Full Historical Dossier</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
