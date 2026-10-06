import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CrtScanlines } from './components/CrtScanlines';
import { RetroAudioPlayer } from './components/RetroAudioPlayer';
import { TimeWarpModal } from './components/TimeWarpModal';
import { SearchModal } from './components/SearchModal';
import { PassportModal } from './components/PassportModal';
import { WebsiteSimulatorModal } from './components/WebsiteSimulatorModal';
import { EventDetailModal } from './components/EventDetailModal';

// Views
import { HomeView } from './views/HomeView';
import { TimelineView } from './views/TimelineView';
import { WebEvolutionView } from './views/WebEvolutionView';
import { GamingView } from './views/GamingView';
import { TechnologyView } from './views/TechnologyView';
import { SocialMediaView } from './views/SocialMediaView';
import { AITimelineView } from './views/AITimelineView';
import { CategoryExploreView } from './views/CategoryExploreView';
import { AboutView } from './views/AboutView';

import { HistoricalEvent } from './types/timeline';
import { ERAS_DATA } from './data/erasData';
import { audioService } from './services/audioService';
import { Sparkles, ArrowRight, Hourglass, Globe, ChevronRight } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentYear, setCurrentYear] = useState<number>(1998);
  const [activeEvent, setActiveEvent] = useState<HistoricalEvent | null>(null);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isTimeWarpOpen, setIsTimeWarpOpen] = useState<boolean>(false);
  const [isAudioOpen, setIsAudioOpen] = useState<boolean>(false);
  const [isPassportOpen, setIsPassportOpen] = useState<boolean>(false);
  const [activeSimulator, setActiveSimulator] = useState<string | null>(null);

  // CRT Scanlines state
  const [crtEnabled, setCrtEnabled] = useState<boolean>(() => {
    return localStorage.getItem('itm_crt_filter') === 'true';
  });

  // Visited years tracking
  const [visitedYears, setVisitedYears] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('itm_visited_years');
      return saved ? JSON.parse(saved) : [1998];
    } catch {
      return [1998];
    }
  });

  // Unlocked stamps tracking
  const [unlockedStamps, setUnlockedStamps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('itm_unlocked_stamps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toggle CRT
  const toggleCrt = () => {
    const nextVal = !crtEnabled;
    setCrtEnabled(nextVal);
    localStorage.setItem('itm_crt_filter', String(nextVal));
  };

  // Add visited year
  const handleSelectYear = (year: number) => {
    setCurrentYear(year);
    setCurrentTab('timeline');
    if (!visitedYears.includes(year)) {
      const next = [...visitedYears, year];
      setVisitedYears(next);
      localStorage.setItem('itm_visited_years', JSON.stringify(next));
    }
  };

  // Unlock an achievement stamp
  const handleUnlockStamp = (stampId: string) => {
    if (!unlockedStamps.includes(stampId)) {
      const next = [...unlockedStamps, stampId];
      setUnlockedStamps(next);
      localStorage.setItem('itm_unlocked_stamps', JSON.stringify(next));
    }
  };

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or / opens search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Determine ambient era color for current year when on timeline
  const getEraAmbientGlow = () => {
    if (currentTab !== 'timeline') return 'from-cyan-500/10 via-purple-500/5';
    if (currentYear < 1990) return 'from-emerald-500/15 via-emerald-950/20';
    if (currentYear < 2000) return 'from-amber-500/15 via-amber-950/20';
    if (currentYear < 2010) return 'from-sky-500/15 via-blue-950/20';
    if (currentYear < 2020) return 'from-purple-500/15 via-purple-950/20';
    return 'from-cyan-500/20 via-sky-950/20';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* CRT Scanline Filter Overlay (Optional nostalgic monitor) */}
      <CrtScanlines enabled={crtEnabled} />

      {/* Main Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTimeWarp={() => setIsTimeWarpOpen(true)}
        onOpenAudio={() => setIsAudioOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        crtEnabled={crtEnabled}
        onToggleCrt={toggleCrt}
        passportCount={visitedYears.length}
      />

      {/* Breadcrumb Bar for Deep Navigation */}
      {currentTab !== 'home' && (
        <div className="bg-zinc-900/60 border-b border-zinc-800/80 px-4 sm:px-8 py-2.5 text-xs text-zinc-400">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setCurrentTab('home')}
              className="hover:text-cyan-400 transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-200 capitalize font-medium">
              {currentTab === 'web' ? 'Web Evolution'
                : currentTab === 'tech' ? 'Technology Timeline'
                : currentTab === 'social' ? 'Social Media Evolution'
                : currentTab === 'ai' ? 'Artificial Intelligence'
                : currentTab === 'categories' ? 'Explore Categories'
                : currentTab}
            </span>
            {currentTab === 'timeline' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                <span className="font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  Year {currentYear}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Museum Exhibit Hall */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 relative">
        {/* Dynamic Ambient Era Background Glow */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b ${getEraAmbientGlow()} to-transparent blur-3xl pointer-events-none -z-10 transition-colors duration-700`}
        />

        {/* View Switching */}
        {currentTab === 'home' && (
          <HomeView
            onNavigate={(tab) => setCurrentTab(tab)}
            onSelectYear={handleSelectYear}
            onSelectEvent={(evt) => setActiveEvent(evt)}
            onOpenTimeWarp={() => setIsTimeWarpOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAudio={() => setIsAudioOpen(true)}
            onLaunchSimulation={(simId) => setActiveSimulator(simId)}
          />
        )}

        {currentTab === 'timeline' && (
          <TimelineView
            currentYear={currentYear}
            onSelectYear={handleSelectYear}
            onSelectEvent={(evt) => setActiveEvent(evt)}
            onOpenTimeWarp={() => setIsTimeWarpOpen(true)}
            onLaunchSimulation={(simId) => setActiveSimulator(simId)}
          />
        )}

        {currentTab === 'web' && (
          <WebEvolutionView
            onLaunchSimulation={(simId) => setActiveSimulator(simId)}
          />
        )}

        {currentTab === 'gaming' && <GamingView />}

        {currentTab === 'tech' && <TechnologyView />}

        {currentTab === 'social' && <SocialMediaView />}

        {currentTab === 'ai' && <AITimelineView />}

        {currentTab === 'categories' && (
          <CategoryExploreView
            onSelectEvent={(evt) => setActiveEvent(evt)}
            onSelectYear={handleSelectYear}
          />
        )}

        {currentTab === 'about' && <AboutView />}
      </main>

      {/* Global Interactive Modals & Emulators */}
      <TimeWarpModal
        isOpen={isTimeWarpOpen}
        onClose={() => setIsTimeWarpOpen(false)}
        onSelectYear={handleSelectYear}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectYear={handleSelectYear}
        onSelectEvent={(evt) => setActiveEvent(evt)}
      />

      <RetroAudioPlayer
        isOpen={isAudioOpen}
        onClose={() => setIsAudioOpen(false)}
        onUnlockedStamp={handleUnlockStamp}
      />

      <PassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        visitedYears={visitedYears}
        unlockedStamps={unlockedStamps}
        onSelectYear={handleSelectYear}
      />

      <WebsiteSimulatorModal
        isOpen={Boolean(activeSimulator)}
        onClose={() => setActiveSimulator(null)}
        initialSimId={activeSimulator || 'google-1998'}
        onUnlockedStamp={handleUnlockStamp}
      />

      <EventDetailModal
        event={activeEvent}
        onClose={() => setActiveEvent(null)}
        onSelectEvent={(evt) => setActiveEvent(evt)}
        onSelectYear={handleSelectYear}
      />

      {/* Museum Footer */}
      <footer className="border-t border-zinc-850 bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-black font-black text-sm">
              ⏳
            </div>
            <div>
              <span className="font-bold text-white text-sm block">
                Internet Time Machine
              </span>
              <span className="text-zinc-500 text-[11px]">
                The Interactive Digital Museum (1980 – 2026)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <button onClick={() => setCurrentTab('home')} className="hover:text-cyan-400">
              Home
            </button>
            <button onClick={() => setCurrentTab('timeline')} className="hover:text-cyan-400">
              Timeline
            </button>
            <button onClick={() => setCurrentTab('web')} className="hover:text-cyan-400">
              Web Evolution
            </button>
            <button onClick={() => setCurrentTab('gaming')} className="hover:text-cyan-400">
              Gaming
            </button>
            <button onClick={() => setCurrentTab('tech')} className="hover:text-cyan-400">
              Technology
            </button>
            <button onClick={() => setCurrentTab('social')} className="hover:text-cyan-400">
              Social Media
            </button>
            <button onClick={() => setCurrentTab('ai')} className="hover:text-cyan-400">
              AI History
            </button>
            <button onClick={() => setCurrentTab('about')} className="hover:text-cyan-400">
              About & Sources
            </button>
          </div>

          <div className="text-zinc-500 text-center md:text-right text-[11px] font-mono">
            <span>Built with React 19, TypeScript & Web Audio</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
