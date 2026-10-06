import React, { useState } from 'react';
import { AI_MILESTONES } from '../data/aiData';
import { Bot, Sparkles, Brain, Cpu, FileText, CheckCircle2, Zap } from 'lucide-react';
import { audioService } from '../services/audioService';

export const AITimelineView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Foundational', 'Deep Learning', 'NLP', 'Generative AI', 'Reasoning'];

  const filteredItems = selectedCategory === 'All'
    ? AI_MILESTONES
    : AI_MILESTONES.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Bot className="w-3.5 h-3.5" />
          The Artificial Intelligence Archive
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The History of Artificial Intelligence
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          From Alan Turing’s 1950 Imitation Game and symbolic logic to the GPU deep learning revolution, Transformers, ChatGPT, Gemini multimodal reasoning, and autonomous multi-agent systems.
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              audioService.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* AI Milestones Cards */}
      <section className="space-y-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl p-6 sm:p-8 border border-zinc-800 hover:border-cyan-500/40 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-black text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-xl border border-cyan-500/40">
                  {item.year}
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {item.milestone}
                  </h3>
                  <span className="text-xs text-zinc-400 font-mono">
                    {item.organization}
                  </span>
                </div>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-700 font-mono self-start sm:self-auto">
                {item.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {item.explanation}
            </p>

            {/* Impact Box */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs sm:text-sm text-zinc-200">
              <span className="font-bold text-cyan-400 block mb-1 font-mono uppercase text-[10px] flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" />
                Historic Impact & Legacy:
              </span>
              {item.impact}
            </div>

            {/* Academic Paper / Benchmark Reference */}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="truncate">{item.keyMetricOrPaper}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
