import React from 'react';
import { Info, ShieldCheck, Database, Award, BookOpen, ExternalLink, Code } from 'lucide-react';
import { HISTORICAL_EVENTS } from '../data/historicalEventsData';
import { ALL_YEARS } from '../data/yearlyData';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Info className="w-3.5 h-3.5" />
          Museum Manifesto & Architecture
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About Internet Time Machine
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          A modern interactive digital museum engineered to preserve, chronicle, and educate the public on the evolution of the Internet, software, hardware, online culture, and artificial intelligence.
        </p>
      </section>

      {/* Museum Metrics Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center">
          <span className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">
            {ALL_YEARS.length}
          </span>
          <span className="text-xs text-zinc-400 font-mono uppercase block mt-1">
            Years Cataloged (1983–2026)
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center">
          <span className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">
            {HISTORICAL_EVENTS.length}+
          </span>
          <span className="text-xs text-zinc-400 font-mono uppercase block mt-1">
            Verified Milestones
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center">
          <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
            4
          </span>
          <span className="text-xs text-zinc-400 font-mono uppercase block mt-1">
            Live Web Emulators
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center">
          <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
            100%
          </span>
          <span className="text-xs text-zinc-400 font-mono uppercase block mt-1">
            Web Audio Synthesized
          </span>
        </div>
      </section>

      {/* Historical Rigor & Fact Checking */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Historical Accuracy & Archival Integrity
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Every date, hardware specification, protocol release, and user metric in the Internet Time Machine is sourced from primary historical archives:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300">
          <li className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-cyan-400">✓</span> CERN Document Server & W3C Technical Reports
          </li>
          <li className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-cyan-400">✓</span> Internet Engineering Task Force (IETF) RFCs
          </li>
          <li className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-cyan-400">✓</span> Computer History Museum Archives (Mountain View, CA)
          </li>
          <li className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-cyan-400">✓</span> Stanford University Department of Computer Science
          </li>
          <li className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-cyan-400">✓</span> IEEE Annals of the History of Computing
          </li>
          <li className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <span className="text-cyan-400">✓</span> ITU (International Telecommunication Union) Stats
          </li>
        </ul>
      </section>

      {/* Modular Data Architecture */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/40">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Extensible & Modular Data Architecture
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Historical information is maintained in strictly typed, modular data registries rather than being hardcoded into layout components. Adding new years, events, or technologies requires simply adding a typed entry to the registry without touching the rendering pipeline.
        </p>
      </section>

      {/* Zero Dependency Audio Architecture */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/40">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Real-Time Web Audio Synthesis
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Rather than relying on brittle external MP3 files that can 404 or buffer, our "Sounds of the Internet" engine synthesizes 56k dial-up modem handshakes, DTMF tones, and frequency bandpass filters in real-time via the browser's native Web Audio API oscillators.
        </p>
      </section>
    </div>
  );
};
