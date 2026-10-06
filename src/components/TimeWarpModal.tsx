import React, { useState, useEffect } from 'react';
import { audioService } from '../services/audioService';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Zap, X } from 'lucide-react';
import { ALL_YEARS, getYearData } from '../data/yearlyData';

interface TimeWarpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectYear: (year: number) => void;
}

export const TimeWarpModal: React.FC<TimeWarpModalProps> = ({
  isOpen,
  onClose,
  onSelectYear,
}) => {
  const [displayYear, setDisplayYear] = useState<number>(2000);
  const [finalYear, setFinalYear] = useState<number | null>(null);
  const [isWarping, setIsWarping] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) {
      setFinalYear(null);
      setIsWarping(true);
      return;
    }

    // Play time warp sound
    audioService.playTimeWarp();
    setIsWarping(true);
    setFinalYear(null);

    // Pick a random exciting year from the list
    const randomIndex = Math.floor(Math.random() * ALL_YEARS.length);
    const chosenYear = ALL_YEARS[randomIndex];

    // High speed number rolling animation
    let counter = 0;
    const intervalTime = 60;
    const maxTicks = 24;

    const timer = setInterval(() => {
      counter++;
      const tempYear = ALL_YEARS[Math.floor(Math.random() * ALL_YEARS.length)];
      setDisplayYear(tempYear);
      audioService.playClick(400 + counter * 30, 0.03);

      if (counter >= maxTicks) {
        clearInterval(timer);
        setDisplayYear(chosenYear);
        setFinalYear(chosenYear);
        setIsWarping(false);

        // Confetti burst on arrival!
        try {
          confetti({
            particleCount: 75,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#06b6d4', '#f59e0b', '#a855f7', '#10b981'],
          });
        } catch {
          // confetti error safe
        }
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const arrivedData = finalYear ? getYearData(finalYear) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-8 text-center text-zinc-100 border border-cyan-500/40 shadow-2xl overflow-hidden">
        {/* Animated Background Rays */}
        <div className="absolute -inset-2 bg-radial-gradient from-cyan-500/20 via-purple-500/10 to-transparent blur-2xl pointer-events-none animate-pulse-slow" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cosmic Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Zap className="w-3.5 h-3.5 animate-bounce" />
          Quantum Chrono-Jump Active
        </div>

        {/* Main Number Display */}
        <div className="my-6">
          <div className="text-xs uppercase font-mono text-zinc-400 mb-1">
            {isWarping ? 'WARPING THROUGH SPACE-TIME...' : 'DESTINATION LOCKED'}
          </div>
          <div
            className={`text-7xl sm:text-8xl font-black tracking-tight font-mono transition-all duration-300 ${
              isWarping
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-400 blur-[1px]'
                : 'text-white drop-shadow-[0_0_35px_rgba(6,182,212,0.6)] scale-105'
            }`}
          >
            {displayYear}
          </div>
        </div>

        {/* Arrived Year Details */}
        {arrivedData && !isWarping && (
          <div className="mt-4 p-5 rounded-2xl bg-zinc-900/90 border border-cyan-500/30 text-left animate-slide-up">
            <div className="flex items-center justify-between text-xs text-cyan-400 font-mono mb-2">
              <span>{arrivedData.eraName}</span>
              <span>Speed: {arrivedData.internetSpeed}</span>
            </div>
            <h4 className="font-bold text-white text-base sm:text-lg leading-snug">
              {arrivedData.headline}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 line-clamp-3 leading-relaxed">
              {arrivedData.summary}
            </p>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-wrap gap-1.5">
              {arrivedData.popularWebsites.slice(0, 3).map((site, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700"
                >
                  🌐 {site}
                </span>
              ))}
              {arrivedData.popularGames.slice(0, 2).map((game, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700"
                >
                  🎮 {game}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8">
          <button
            disabled={isWarping}
            onClick={() => {
              if (finalYear) {
                onSelectYear(finalYear);
                onClose();
              }
            }}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
              isWarping
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold hover:scale-[1.02]'
            }`}
          >
            {isWarping ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                Calculating Chrono Coordinates...
              </>
            ) : (
              <>
                <span>Step Into The Year {finalYear}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
