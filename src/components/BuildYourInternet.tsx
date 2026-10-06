import React, { useState } from 'react';
import { BUILD_COMPONENTS } from '../data/buildYourInternetData';
import { BuildComponentItem } from '../types/timeline';
import { Wrench, Sparkles, Share2, Check, RefreshCw, Trophy, Laptop, Globe, MessageSquare, Music } from 'lucide-react';
import { audioService } from '../services/audioService';

interface BuildYourInternetProps {
  onUnlockStamp?: (stampId: string) => void;
}

export const BuildYourInternet: React.FC<BuildYourInternetProps> = ({ onUnlockStamp }) => {
  // Selections state
  const [selectedOS, setSelectedOS] = useState<string>('os-win95');
  const [selectedBrowser, setSelectedBrowser] = useState<string>('browser-netscape');
  const [selectedSearch, setSelectedSearch] = useState<string>('search-yahoo');
  const [selectedMsg, setSelectedMsg] = useState<string>('msg-aim');
  const [selectedSocial, setSelectedSocial] = useState<string>('social-geocities');
  const [selectedMusic, setSelectedMusic] = useState<string>('music-winamp');
  const [selectedDev, setSelectedDev] = useState<string>('dev-crt-tower');
  const [copied, setCopied] = useState<boolean>(false);

  const getComponent = (id: string) => BUILD_COMPONENTS.find((c) => c.id === id);

  const osItem = getComponent(selectedOS);
  const browserItem = getComponent(selectedBrowser);
  const searchItem = getComponent(selectedSearch);
  const msgItem = getComponent(selectedMsg);
  const socialItem = getComponent(selectedSocial);
  const musicItem = getComponent(selectedMusic);
  const devItem = getComponent(selectedDev);

  const activeComponents = [osItem, browserItem, searchItem, msgItem, socialItem, musicItem, devItem].filter(Boolean) as BuildComponentItem[];

  // Calculate average year
  const avgYear = Math.round(
    activeComponents.reduce((acc, curr) => acc + curr.year, 0) / (activeComponents.length || 1)
  );

  // Determine Archetype
  let archetypeTitle = '90s Cyberpunk Pioneer';
  let archetypeDesc = 'You crave raw dial-up modems, HTML text editors, and the uncurated mystery of the early web.';
  if (avgYear >= 2000 && avgYear <= 2005) {
    archetypeTitle = 'Y2K Golden Age Digital Native';
    archetypeDesc = 'You came alive in the era of Winamp visualizers, AIM away messages, and custom MySpace CSS themes.';
  } else if (avgYear > 2005 && avgYear <= 2012) {
    archetypeTitle = 'Web 2.0 Standards Rebel';
    archetypeDesc = 'You championed Firefox tabs, iPod click wheels, and dynamic AJAX web applications.';
  } else if (avgYear > 2012) {
    archetypeTitle = 'Modern Cloud Streamer';
    archetypeDesc = 'You prefer sleek ultra-responsive interfaces, streaming bandwidth, and interconnected platforms.';
  }

  const handleShare = () => {
    const text = `🖥️ My Custom Internet Stack (Average Year: ${avgYear}) - ${archetypeTitle}\n` +
      `OS: ${osItem?.name}\n` +
      `Browser: ${browserItem?.name}\n` +
      `Search: ${searchItem?.name}\n` +
      `Chat: ${msgItem?.name}\n` +
      `Social: ${socialItem?.name}\n` +
      `Music: ${musicItem?.name}\n` +
      `Device: ${devItem?.name}\n\n` +
      `Built on Internet Time Machine: https://internet-time-machine-six.vercel.app`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    audioService.playTeleport();
    setTimeout(() => setCopied(false), 2500);

    if (onUnlockStamp) {
      onUnlockStamp('stack-built');
    }
  };

  const renderCategoryPicker = (
    category: BuildComponentItem['category'],
    title: string,
    selectedId: string,
    onSelect: (id: string) => void
  ) => {
    const items = BUILD_COMPONENTS.filter((c) => c.category === category);
    return (
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-300 font-mono uppercase tracking-wider flex items-center justify-between">
          <span>{title}</span>
          <span className="text-cyan-400 text-[11px]">{getComponent(selectedId)?.year}</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {items.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item.id);
                  audioService.playClick();
                }}
                className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-md'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="font-bold text-white truncate">{item.name}</div>
                <div className="text-[10px] text-zinc-500 font-mono">{item.vibe}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Wrench className="w-3.5 h-3.5" />
          Interactive Stack Architect
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Build Your Own Historical Internet
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300">
          Mix and match legendary operating systems, browsers, search engines, messengers, and devices from across four decades to create your ultimate historical computing setup.
        </p>
      </div>

      {/* Main Grid: Left Pickers, Right Generated Archetype Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Component Selector Area */}
        <div className="lg:col-span-7 space-y-6">
          {renderCategoryPicker('OS', '1. Operating System', selectedOS, setSelectedOS)}
          {renderCategoryPicker('Browser', '2. Web Browser', selectedBrowser, setSelectedBrowser)}
          {renderCategoryPicker('Search', '3. Search Engine', selectedSearch, setSelectedSearch)}
          {renderCategoryPicker('Messenger', '4. Instant Messenger', selectedMsg, setSelectedMsg)}
          {renderCategoryPicker('Social', '5. Social Space', selectedSocial, setSelectedSocial)}
          {renderCategoryPicker('MusicPlayer', '6. Music Player', selectedMusic, setSelectedMusic)}
          {renderCategoryPicker('Device', '7. Hardware Battle Station', selectedDev, setSelectedDev)}
        </div>

        {/* Right Preview & Archetype Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                Composite Era: ~{avgYear}
              </span>
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>

            <div className="space-y-1.5 text-center">
              <div className="text-xs font-mono uppercase text-zinc-400">
                Your Internet Archetype
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {archetypeTitle}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                {archetypeDesc}
              </p>
            </div>

            {/* Spec sheet summary */}
            <div className="space-y-2 p-4 rounded-2xl bg-black/60 border border-zinc-800 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>OS:</span>
                <span className="text-white font-bold">{osItem?.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Browser:</span>
                <span className="text-white font-bold">{browserItem?.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Search:</span>
                <span className="text-white font-bold">{searchItem?.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Chat:</span>
                <span className="text-white font-bold">{msgItem?.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Community:</span>
                <span className="text-white font-bold">{socialItem?.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Music:</span>
                <span className="text-white font-bold">{musicItem?.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Device:</span>
                <span className="text-white font-bold">{devItem?.name}</span>
              </div>
            </div>

            {/* Share / Copy Button */}
            <button
              onClick={handleShare}
              className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Stack Copied to Clipboard!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share & Save My Custom Stack
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
