import React, { useState } from 'react';
import { HISTORY_MAP_NODES } from '../data/historyMapData';
import { HistoryMapNode, CategoryType } from '../types/timeline';
import { GitBranch, GitCommit, ArrowRight, Sparkles, Filter, Info, Link2, ChevronRight } from 'lucide-react';
import { audioService } from '../services/audioService';

interface HistoryMapProps {
  onSelectYear?: (year: number) => void;
  onUnlockStamp?: (stampId: string) => void;
}

export const HistoryMap: React.FC<HistoryMapProps> = ({ onSelectYear, onUnlockStamp }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('www');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const selectedNode = HISTORY_MAP_NODES.find((n) => n.id === selectedNodeId) || HISTORY_MAP_NODES[0];

  // Find precursors (nodes that have connections leading to this node)
  const precursors = HISTORY_MAP_NODES.filter((n) => n.connections.includes(selectedNode.id));

  // Find successors (nodes directly listed in connections)
  const successors = HISTORY_MAP_NODES.filter((n) => selectedNode.connections.includes(n.id));

  const filteredNodes = HISTORY_MAP_NODES.filter((n) => {
    if (activeCategoryFilter === 'all') return true;
    return n.category === activeCategoryFilter;
  });

  const handleNodeClick = (node: HistoryMapNode) => {
    setSelectedNodeId(node.id);
    audioService.playClick();
    if (onUnlockStamp) {
      onUnlockStamp('map-node-explored');
    }
  };

  const getCategoryColor = (cat: CategoryType) => {
    switch (cat) {
      case 'tech': return 'text-amber-400 border-amber-500/40 bg-amber-950/40';
      case 'websites': return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40';
      case 'social': return 'text-pink-400 border-pink-500/40 bg-pink-950/40';
      case 'ai': return 'text-purple-400 border-purple-500/40 bg-purple-950/40';
      case 'eras': return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';
      default: return 'text-zinc-300 border-zinc-700 bg-zinc-800';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <GitBranch className="w-3.5 h-3.5" />
          Technological Lineage Tree
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Internet History Map & Evolution Tree
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300">
          The internet didn’t appear overnight. Discover how ARPANET packets connected to hypertext, browsers, social graphs, mobile apps, and modern artificial intelligence.
        </p>

        {/* Filter categories */}
        <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
          {['all', 'tech', 'websites', 'social', 'ai', 'eras'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                activeCategoryFilter === cat
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat === 'all' ? 'All Innovations' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Node List / Timeline Tree, Right Lineage Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Node Stream */}
        <div className="lg:col-span-7 space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {filteredNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-zinc-850 border-cyan-500 text-white shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="font-mono text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {node.year}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      {node.label}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase font-mono ${getCategoryColor(node.category)}`}>
                        {node.category}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                      {node.summary}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                    {node.connections.length} Links
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Inspector Drawer */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-zinc-800 space-y-6">
          <div className="space-y-2 pb-4 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                Milestone Year: {selectedNode.year}
              </span>
              <span className={`text-xs font-mono uppercase px-2.5 py-0.5 rounded-full border ${getCategoryColor(selectedNode.category)}`}>
                {selectedNode.category}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {selectedNode.label}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {selectedNode.summary}
            </p>
          </div>

          {/* Precursors (What came before) */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <GitCommit className="w-3.5 h-3.5 text-amber-400" />
              Built Upon (Ancestors):
            </div>
            {precursors.length === 0 ? (
              <div className="text-xs text-zinc-500 italic p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                Foundational genesis milestone (no recorded digital precursors).
              </div>
            ) : (
              <div className="space-y-1.5">
                {precursors.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleNodeClick(p)}
                    className="w-full text-left p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 transition-all flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-white">{p.label} ({p.year})</span>
                    <span className="text-[10px] font-mono text-amber-400">View Node ⭢</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Successors (What it sparked) */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Link2 className="w-3.5 h-3.5 text-cyan-400" />
              Directly Sparked & Influenced:
            </div>
            {successors.length === 0 ? (
              <div className="text-xs text-zinc-500 italic p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                Frontier milestone currently shaping ongoing developments.
              </div>
            ) : (
              <div className="space-y-1.5">
                {successors.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleNodeClick(s)}
                    className="w-full text-left p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/40 transition-all flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-white">{s.label} ({s.year})</span>
                    <span className="text-[10px] font-mono text-cyan-400">View Node ⭢</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Jump to year action */}
          {onSelectYear && (
            <div className="pt-2">
              <button
                onClick={() => onSelectYear(selectedNode.year)}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 hover:text-black text-cyan-300 font-bold text-xs transition-all border border-cyan-500/40 flex items-center justify-center gap-2"
              >
                Time Travel to Year {selectedNode.year}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
