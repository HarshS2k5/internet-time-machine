import React from 'react';
import { HistoricalEvent } from '../types/timeline';
import { X, Calendar, Globe, Tag, ExternalLink, Lightbulb, Share2, Check } from 'lucide-react';
import { HISTORICAL_EVENTS } from '../data/historicalEventsData';

interface EventDetailModalProps {
  event: HistoricalEvent | null;
  onClose: () => void;
  onSelectEvent: (event: HistoricalEvent) => void;
  onSelectYear: (year: number) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onSelectEvent,
  onSelectYear,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!event) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find related events if available
  const relatedList = (event.relatedEvents || [])
    .map(id => HISTORICAL_EVENTS.find(e => e.id === id))
    .filter((e): e is HistoricalEvent => Boolean(e));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-lg animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel-glow rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl my-auto text-zinc-100 flex flex-col max-h-[90vh]">
        {/* Event Hero Image Banner */}
        <div className="relative h-48 sm:h-64 w-full shrink-0 overflow-hidden bg-zinc-950">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/70 backdrop-blur-md text-zinc-300 hover:text-white border border-zinc-700/80 transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Hero */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <button
                  onClick={() => {
                    onSelectYear(event.year);
                    onClose();
                  }}
                  className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-900 transition-colors"
                >
                  Year: {event.year} ↗
                </button>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-700">
                  {event.category.toUpperCase()}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {event.dateStr}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                {event.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Headline */}
          <p className="text-sm sm:text-base text-zinc-200 font-medium leading-relaxed bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
            {event.headline}
          </p>

          {/* Full Historical Narrative */}
          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Historical Context & What Happened
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Why It Mattered Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-sky-950/30 to-purple-950/40 border border-cyan-500/30">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              Why It Mattered
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
              {event.whyItMattered}
            </p>
          </div>

          {/* Impact Statistics */}
          {event.impactStats && (
            <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-3">
              <div className="text-lg">📊</div>
              <div>
                <span className="text-xs font-mono text-zinc-400 block mb-0.5">
                  Historical Impact Metric
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {event.impactStats}
                </span>
              </div>
            </div>
          )}

          {/* Related Technologies */}
          {event.relatedTech && event.relatedTech.length > 0 && (
            <div>
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
                Related Technologies & Protocols
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.relatedTech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-700/80 font-mono"
                  >
                    ⚡ {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Events */}
          {relatedList.length > 0 && (
            <div>
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
                Related Historical Milestones
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {relatedList.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectEvent(rel)}
                    className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/40 hover:bg-zinc-850 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1">
                      <span>{rel.year}</span>
                      <span className="uppercase text-zinc-500">{rel.category}</span>
                    </div>
                    <div className="text-xs font-bold text-white line-clamp-1">
                      {rel.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Citation / Source */}
          {event.externalSource && (
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <span className="truncate">Source / Reference: {event.externalSource}</span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-xs shrink-0 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? 'Link Copied!' : 'Share'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
