import React, { useState } from 'react';
import { TECH_MILESTONES } from '../data/techData';
import { Cpu, Smartphone, Monitor, Wifi, Zap, ArrowRight, Lightbulb } from 'lucide-react';
import { audioService } from '../services/audioService';

export const TechnologyView: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');

  const types = ['All', 'Computer', 'Smartphone', 'GPU', 'CPU', 'Internet'];

  const filteredItems = selectedType === 'All'
    ? TECH_MILESTONES
    : TECH_MILESTONES.filter((item) => item.type === selectedType);

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-mono uppercase tracking-widest">
          <Cpu className="w-3.5 h-3.5" />
          Hardware & Silicon Timeline
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Technology & Architecture Milestones
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          The physical machinery that made the software possible: microprocessors, graphics processing units, wireless standards, and mobile silicon.
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => {
              audioService.playClick();
              setSelectedType(t);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedType === t
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Hardware Timeline Cards */}
      <section className="space-y-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col lg:flex-row gap-6 items-start justify-between"
          >
            {/* Image Preview */}
            <div className="relative w-full lg:w-72 h-48 lg:h-56 rounded-2xl overflow-hidden shrink-0 bg-zinc-950">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full font-mono text-xs font-bold bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/40">
                {item.year}
              </div>
              <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-zinc-900 text-[10px] font-mono text-zinc-300">
                {item.type}
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-amber-400">
                  {item.launchDate}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-400 font-mono">
                  {item.type}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {item.title}
              </h3>

              <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 font-mono text-xs text-cyan-300">
                {item.specs}
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {item.explanation}
              </p>

              {/* Why It Mattered */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-zinc-200">
                <span className="font-bold text-amber-400 block mb-1 font-mono uppercase text-[10px] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Why It Mattered:
                </span>
                {item.whyItMattered}
              </div>

              {/* Related Technologies */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1.5">
                  Related Technologies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.relatedTechnologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-0.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono"
                    >
                      ⚡ {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
