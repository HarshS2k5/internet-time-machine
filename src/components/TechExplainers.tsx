import React, { useState } from 'react';
import { TECH_EXPLAINERS } from '../data/techExplainersData';
import { TechExplainer } from '../types/timeline';
import { PhoneCall, Search, Globe, PlayCircle, Cpu, ChevronRight, CheckCircle2, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { audioService } from '../services/audioService';

interface TechExplainersProps {
  onUnlockStamp?: (stampId: string) => void;
}

export const TechExplainers: React.FC<TechExplainersProps> = ({ onUnlockStamp }) => {
  const [selectedExplainer, setSelectedExplainer] = useState<TechExplainer>(TECH_EXPLAINERS[0]);
  const [activeStep, setActiveStep] = useState<number>(0);

  const getExplainerIcon = (id: string) => {
    switch (id) {
      case 'dialup-modem': return <PhoneCall className="w-5 h-5" />;
      case 'search-pagerank': return <Search className="w-5 h-5" />;
      case 'dns-resolution': return <Globe className="w-5 h-5" />;
      case 'video-streaming': return <PlayCircle className="w-5 h-5" />;
      case 'large-language-models': return <Cpu className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleSelectExplainer = (item: TechExplainer) => {
    setSelectedExplainer(item);
    setActiveStep(0);
    audioService.playClick();
    if (onUnlockStamp) {
      onUnlockStamp('tech-explainer-read');
    }
  };

  const currentStepData = selectedExplainer.steps[activeStep];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5" />
          Interactive Mechanics & Under the Hood
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          How Technology Worked
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300">
          Demystifying the engineering marvels that power cyberspace. Step through the physics of 56k modems, DNS resolution chains, PageRank algorithms, and AI transformers.
        </p>
      </div>

      {/* Explainer Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {TECH_EXPLAINERS.map((item) => {
          const isSelected = selectedExplainer.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectExplainer(item)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-lg shadow-cyan-950/40 scale-[1.02]'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <div className={`p-2 rounded-xl w-fit ${isSelected ? 'bg-cyan-500 text-black' : 'bg-zinc-800 text-zinc-300'}`}>
                {getExplainerIcon(item.id)}
              </div>
              <div>
                <div className="font-bold text-xs text-white line-clamp-1">{item.title}</div>
                <div className="text-[10px] text-zinc-400 font-mono line-clamp-1">{item.category}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6">
        {/* Title & Overview */}
        <div className="space-y-2 pb-5 border-b border-zinc-800">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            {selectedExplainer.category} · Step-by-Step Interactive Guide
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold text-white">
            {selectedExplainer.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
            {selectedExplainer.summary}
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {selectedExplainer.steps.map((s, idx) => {
            const isCurrent = activeStep === idx;
            const isCompleted = activeStep > idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveStep(idx);
                  audioService.playClick();
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-cyan-950/90 border-cyan-500 text-white shadow-md'
                    : isCompleted
                    ? 'bg-zinc-900 border-emerald-500/40 text-zinc-300'
                    : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span>Step {s.stepNumber} of 4</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  ) : null}
                </div>
                <div className="font-bold text-xs text-white truncate">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center text-sm font-mono shrink-0">
              {currentStepData.stepNumber}
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              {currentStepData.title}
            </h4>
          </div>

          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
            {currentStepData.description}
          </p>

          {/* Deep Engineering Note */}
          <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-1 font-mono">
            <div className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold">
              Engineering Specification / Technical Detail
            </div>
            <div className="text-xs text-zinc-300 leading-relaxed">
              {currentStepData.technicalDetail}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
            <button
              disabled={activeStep === 0}
              onClick={() => {
                setActiveStep((prev) => Math.max(0, prev - 1));
                audioService.playClick();
              }}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none"
            >
              ← Previous Step
            </button>

            {activeStep < selectedExplainer.steps.length - 1 ? (
              <button
                onClick={() => {
                  setActiveStep((prev) => prev + 1);
                  audioService.playClick();
                }}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                Next Step →
              </button>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Explainer Completed
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
