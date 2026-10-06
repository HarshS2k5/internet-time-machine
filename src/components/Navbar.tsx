import React, { useState } from 'react';
import {
  Hourglass,
  Search,
  Compass,
  Radio,
  Tv,
  Sparkles,
  Menu,
  X,
  Globe,
  Gamepad2,
  Cpu,
  MessageSquare,
  Bot,
  Layers,
  Info,
  Archive,
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenTimeWarp: () => void;
  onOpenAudio: () => void;
  onOpenPassport: () => void;
  onOpenDocent?: () => void;
  onOpenTimeCapsule?: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  passportCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  onOpenTimeWarp,
  onOpenAudio,
  onOpenPassport,
  onOpenDocent,
  onOpenTimeCapsule,
  crtEnabled,
  onToggleCrt,
  passportCount,
}) => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'web', label: 'Web' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'tech', label: 'Technology' },
    { id: 'social', label: 'Social Media' },
    { id: 'ai', label: 'AI' },
    { id: 'categories', label: 'Explore' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: string) => {
    audioService.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Hourglass className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              Internet Time Machine
            </span>
            <span className="hidden sm:block text-[10px] text-zinc-400 font-mono -mt-1 tracking-wider uppercase">
              The Digital Museum
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === link.id
                  ? 'bg-zinc-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Signature "Take Me Somewhere in Time" Button */}
          <button
            onClick={() => {
              audioService.playClick();
              onOpenTimeWarp();
            }}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 hover:scale-105 transition-all shrink-0"
            title="Random Year Time Warp"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Take Me Somewhere in Time</span>
            <span className="sm:hidden">Warp</span>
          </button>

          {/* Global Search Button */}
          <button
            onClick={() => {
              audioService.playClick();
              onOpenSearch();
            }}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850 hover:border-zinc-700 transition-all flex items-center gap-2 text-xs"
            title="Search Archive (Ctrl+K or /)"
          >
            <Search className="w-4 h-4 text-cyan-400" />
            <span className="hidden xl:inline text-zinc-500 font-mono text-[11px]">
              Ctrl+K
            </span>
          </button>

          {/* Audio Museum Button */}
          <button
            onClick={() => {
              audioService.playClick();
              onOpenAudio();
            }}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-850 hover:border-zinc-700 transition-all"
            title="Sounds of the Internet"
          >
            <Radio className="w-4 h-4" />
          </button>

          {/* CRT Monitor Toggle */}
          <button
            onClick={() => {
              audioService.playClick();
              onToggleCrt();
            }}
            className={`p-2 rounded-xl border transition-all ${
              crtEnabled
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400 shadow-sm shadow-emerald-900/30'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
            title="Toggle Retro CRT Scanline Filter"
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* Passport / Achievements */}
          <button
            onClick={() => {
              audioService.playClick();
              onOpenPassport();
            }}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-purple-400 hover:bg-zinc-850 hover:border-zinc-700 transition-all relative"
            title="Time Traveler Passport & Quests"
          >
            <Compass className="w-4 h-4" />
            {passportCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-[9px] font-mono text-white flex items-center justify-center font-bold">
                {passportCount}
              </span>
            )}
          </button>

          {/* AI History Docent */}
          {onOpenDocent && (
            <button
              onClick={() => {
                audioService.playClick();
                onOpenDocent();
              }}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-850 hover:border-zinc-700 transition-all hidden sm:flex"
              title="AI Museum Docent"
            >
              <Bot className="w-4 h-4" />
            </button>
          )}

          {/* Time Capsule */}
          {onOpenTimeCapsule && (
            <button
              onClick={() => {
                audioService.playClick();
                onOpenTimeCapsule();
              }}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:bg-zinc-850 hover:border-zinc-700 transition-all hidden sm:flex"
              title="Personal Digital Time Capsule"
            >
              <Archive className="w-4 h-4" />
            </button>
          )}


          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-4 space-y-1 animate-slide-down">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                currentTab === link.id
                  ? 'bg-zinc-800 text-cyan-400 font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <span>{link.label}</span>
              {currentTab === link.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
