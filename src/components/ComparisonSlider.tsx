import React, { useState, useRef, useCallback } from 'react';
import { WebsiteEvolutionItem } from '../types/timeline';
import { Sparkles, SlidersHorizontal, Monitor, ExternalLink } from 'lucide-react';

interface ComparisonSliderProps {
  item: WebsiteEvolutionItem;
  onLaunchSimulation?: (simId: string) => void;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ item, onLaunchSimulation }) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percent = (clampedX / rect.width) * 100;
    setSliderPos(percent);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-7 border border-zinc-800">
      {/* Platform Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {item.name}
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              Launched {item.launchYear}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
              {item.category}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Optional Interactive Simulator Launcher */}
        {item.simulationAvailable && onLaunchSimulation && (
          <button
            onClick={() => onLaunchSimulation(item.simulationAvailable!)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all shrink-0 self-start sm:self-auto shadow-sm"
          >
            <Monitor className="w-4 h-4 text-amber-400" />
            <span>Simulate {item.before.year} Web App</span>
          </button>
        )}
      </div>

      {/* Interactive Visual Comparison Slider */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-mono mb-2 px-1">
          <span className="text-amber-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            VINTAGE: {item.before.title} ({item.before.year})
          </span>
          <span className="text-zinc-500 hidden sm:inline flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Drag slider to compare designs
          </span>
          <span className="text-cyan-400 flex items-center gap-1.5">
            MODERN: {item.after.title} ({item.after.year})
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
          </span>
        </div>

        {/* Slider Viewport Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-zinc-700/80 shadow-2xl bg-zinc-950"
        >
          {/* Layer 2: Modern (Underneath, right side visible) */}
          <div className="absolute inset-0">
            <img
              src={item.after.image}
              alt={item.after.title}
              className="w-full h-full object-cover object-top"
            />
            {/* Modern Badge Overlay */}
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg">
              {item.after.year} Modern Interface
            </div>
          </div>

          {/* Layer 1: Vintage (Clipped to slider position on the left) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="relative w-full h-full">
              <img
                src={item.before.image}
                alt={item.before.title}
                className="absolute inset-0 w-full h-full object-cover object-top max-w-none"
                style={{ width: containerRef.current?.clientWidth || '100%' }}
              />
              {/* Retro Monitor Vintage Hue Filter on Vintage Half */}
              <div className="absolute inset-0 bg-amber-950/20 mix-blend-color pointer-events-none" />
              {/* Vintage Badge Overlay */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40 text-amber-300 text-xs font-mono shadow-lg">
                {item.before.year} Original Architecture
              </div>
            </div>
          </div>

          {/* Divider Bar & Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-zinc-900 shadow-xl flex items-center justify-center font-bold text-xs border-2 border-cyan-500 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
              ⇄
            </div>
          </div>
        </div>

        {/* Quick Position Jump Buttons */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <button
            onClick={() => setSliderPos(0)}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-cyan-400 hover:border-zinc-700 transition-all"
          >
            View 100% Modern
          </button>
          <button
            onClick={() => setSliderPos(50)}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 transition-all font-semibold"
          >
            50 / 50 Split
          </button>
          <button
            onClick={() => setSliderPos(100)}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-amber-400 hover:border-zinc-700 transition-all"
          >
            View 100% Vintage
          </button>
        </div>
      </div>

      {/* Side-by-side Architectural Feature Breakdown */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Before Features */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              {item.before.year} Design Architecture
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/20">
              Web {item.before.year < 2000 ? '1.0' : '2.0'}
            </span>
          </div>
          <p className="text-xs text-zinc-400 italic mb-3">
            "{item.before.aestheticNotes}"
          </p>
          <ul className="space-y-1.5 text-xs text-zinc-300">
            {item.before.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400 shrink-0">▪</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* After Features */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              {item.after.year} Modern Architecture
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/20">
              Modern Cloud & AI
            </span>
          </div>
          <p className="text-xs text-zinc-400 italic mb-3">
            "{item.after.aestheticNotes}"
          </p>
          <ul className="space-y-1.5 text-xs text-zinc-300">
            {item.after.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-cyan-400 shrink-0">▪</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Historical Evolution Timeline Milestones */}
      <div className="mt-6 pt-5 border-t border-zinc-800">
        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
          Historical Design Milestones
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {item.milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-cyan-400">
                  {m.year}
                </span>
                <span className="font-semibold text-zinc-200">
                  {m.title}
                </span>
              </div>
              <p className="text-zinc-400 text-[11px] mt-1 leading-snug">
                {m.designShift}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
