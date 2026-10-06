import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Search,
  Hourglass,
  Globe,
  Gamepad2,
  Cpu,
  Bot,
  Compass,
  Radio,
  Tv,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { ERAS_DATA } from '../data/erasData';
import { HISTORICAL_EVENTS } from '../data/historicalEventsData';
import { KEY_YEARS_DATA } from '../data/yearlyData';
import { HistoricalEvent, EraId } from '../types/timeline';
import { audioService } from '../services/audioService';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onSelectYear: (year: number) => void;
  onSelectEvent: (event: HistoricalEvent) => void;
  onOpenTimeWarp: () => void;
  onOpenSearch: () => void;
  onOpenAudio: () => void;
  onLaunchSimulation: (simId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectYear,
  onSelectEvent,
  onOpenTimeWarp,
  onOpenSearch,
  onOpenAudio,
  onLaunchSimulation,
}) => {
  const featuredEvents = HISTORICAL_EVENTS.filter((e) => e.featured).slice(0, 6);

  const quickJumpYears = [1984, 1991, 1995, 1998, 2001, 2004, 2007, 2010, 2016, 2020, 2022, 2024];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-8 text-center overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6 animate-pulse-slow">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          The Interactive Digital Museum
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Explore the Internet <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
            Through Time
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Travel from early green phosphor terminal networks to the birth of the World Wide Web, broadband, the smartphone revolution, and generative AI.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              audioService.playClick();
              onOpenTimeWarp();
            }}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
          >
            <Sparkles className="w-5 h-5 fill-current" />
            <span>Take Me Somewhere in Time</span>
          </button>

          <button
            onClick={() => {
              audioService.playClick();
              onNavigate('timeline');
            }}
            className="px-6 py-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 font-semibold text-sm sm:text-base flex items-center gap-2 transition-all shadow-lg"
          >
            <Hourglass className="w-4 h-4 text-cyan-400" />
            <span>Open Interactive Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Global Quick Year Scrubber Bar */}
        <div className="mt-12 max-w-4xl mx-auto p-4 rounded-2xl glass-panel border border-zinc-800 text-left">
          <div className="flex items-center justify-between text-xs mb-3 px-1">
            <span className="font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              QUICK CHRONO-JUMP (1983 – 2026)
            </span>
            <span className="text-zinc-500 hidden sm:inline text-[11px]">
              Click any year to step into history
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickJumpYears.map((yr) => (
              <button
                key={yr}
                onClick={() => {
                  audioService.playClick();
                  onSelectYear(yr);
                }}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500/60 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-cyan-300 font-bold shrink-0 transition-all"
              >
                {yr}
              </button>
            ))}
            <button
              onClick={() => {
                audioService.playClick();
                onNavigate('timeline');
              }}
              className="px-3 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold shrink-0 hover:bg-cyan-900/80 transition-all flex items-center gap-1"
            >
              All Years →
            </button>
          </div>
        </div>
      </section>

      {/* Popular Eras Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
              Historical Chapters
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore By Historical Eras
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
            Five transformative eras that defined modern human communication and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ERAS_DATA.map((era) => (
            <div
              key={era.id}
              onClick={() => {
                audioService.playClick();
                onSelectYear(era.startYear);
              }}
              className="glass-card rounded-2xl p-6 border border-zinc-800/80 hover:border-cyan-500/40 cursor-pointer flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold border ${era.aesthetic.badgeStyle}`}>
                    {era.period}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {era.endYear - era.startYear + 1} Years
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {era.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                  {era.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60">
                <span className="text-[11px] text-zinc-500 block font-mono mb-1.5">
                  SIGNATURE TECH:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {era.signatureTech.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Enter {era.startYear}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Historical Moments Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">
              Hall of Fame
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Historical Moments
            </h2>
          </div>
          <button
            onClick={() => {
              audioService.playClick();
              onNavigate('timeline');
            }}
            className="text-xs sm:text-sm text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            View all 50+ milestones →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => {
                audioService.playClick();
                onSelectEvent(evt);
              }}
              className="glass-card rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-cyan-500/40 cursor-pointer group flex flex-col transition-all"
            >
              <div className="relative h-44 overflow-hidden bg-zinc-900">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full font-mono text-xs font-bold bg-black/75 backdrop-blur-md text-cyan-300 border border-cyan-500/40">
                  {evt.year}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-xs text-zinc-300 font-mono uppercase">
                  {evt.category} • {evt.dateStr}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                    {evt.headline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-cyan-400 font-medium">
                  <span>Explore Deep-Dive</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Museum Exhibits Showcase (Sliders, Audio, Simulators) */}
      <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Tv className="w-3.5 h-3.5" />
            Interactive Museum Features
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Live Software Simulators & Historical Comparisons
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Internet Time Machine is not a passive reading list. Run simulated historical versions of classic web apps, compare website design evolutions with interactive split sliders, and listen to the real sounds of the early web.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Simulator: Google 1998 */}
          <div
            onClick={() => onLaunchSimulation('google-1998')}
            className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500/50 cursor-pointer transition-all group"
          >
            <div className="text-2xl mb-2">🔍</div>
            <h4 className="font-bold text-sm text-white group-hover:text-cyan-400">
              Google 1998 Beta
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">
              Functional 1998 Stanford search simulator with original PageRank results.
            </p>
            <span className="text-[10px] text-cyan-400 mt-3 inline-block font-mono">
              Launch Emulator →
            </span>
          </div>

          {/* Simulator: Yahoo 1996 */}
          <div
            onClick={() => onLaunchSimulation('yahoo-1996')}
            className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 cursor-pointer transition-all group"
          >
            <div className="text-2xl mb-2">📂</div>
            <h4 className="font-bold text-sm text-white group-hover:text-amber-400">
              Yahoo! 1996 Directory
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">
              Browse the curated human-indexed directory tree of the early World Wide Web.
            </p>
            <span className="text-[10px] text-amber-400 mt-3 inline-block font-mono">
              Launch Emulator →
            </span>
          </div>

          {/* Simulator: YouTube 2005 */}
          <div
            onClick={() => onLaunchSimulation('youtube-2005')}
            className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-rose-500/50 cursor-pointer transition-all group"
          >
            <div className="text-2xl mb-2">🎬</div>
            <h4 className="font-bold text-sm text-white group-hover:text-rose-400">
              YouTube 2005 Player
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">
              "Me at the zoo", 5-star ratings, yellow subscribe button, and Flash video.
            </p>
            <span className="text-[10px] text-rose-400 mt-3 inline-block font-mono">
              Launch Emulator →
            </span>
          </div>

          {/* Sound Jukebox */}
          <div
            onClick={() => onOpenAudio()}
            className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-purple-500/50 cursor-pointer transition-all group"
          >
            <div className="text-2xl mb-2">📡</div>
            <h4 className="font-bold text-sm text-white group-hover:text-purple-400">
              56K Dial-Up Handshake
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">
              Synthesize the authentic audio handshake that greeted millions in the 90s.
            </p>
            <span className="text-[10px] text-purple-400 mt-3 inline-block font-mono">
              Play Sounds →
            </span>
          </div>
        </div>
      </section>

      {/* Explore By Category Bar */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          Museum Exhibits by Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'web', title: 'Web & Browsers', icon: '🌐', count: '1991–2026' },
            { id: 'gaming', title: 'Gaming History', icon: '🎮', count: 'NES to Ray Tracing' },
            { id: 'tech', title: 'Technology & Hardware', icon: '💻', count: 'CPUs, GPUs, Phones' },
            { id: 'social', title: 'Social Media', icon: '💬', count: 'BBS to TikTok' },
            { id: 'ai', title: 'Artificial Intelligence', icon: '🤖', count: 'Turing to LLMs' },
            { id: 'categories', title: 'Mobile Smartphones', icon: '📱', count: 'DynaTAC to Foldables' },
            { id: 'categories', title: 'Internet Infrastructure', icon: '📡', count: 'TCP/IP to 5G' },
            { id: 'categories', title: 'Online Media', icon: '🎬', count: 'MP3 to 4K Streaming' },
          ].map((cat, i) => (
            <div
              key={i}
              onClick={() => {
                audioService.playClick();
                onNavigate(cat.id);
              }}
              className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/40 hover:bg-zinc-850 cursor-pointer transition-all flex items-center gap-3 group"
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-cyan-400 transition-colors">
                  {cat.title}
                </h4>
                <span className="text-[10px] text-zinc-500 font-mono block">
                  {cat.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
