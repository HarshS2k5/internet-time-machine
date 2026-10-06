import React from 'react';
import { Award, Compass, CheckCircle2, X, Sparkles, MapPin } from 'lucide-react';
import { ERAS_DATA } from '../data/erasData';

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitedYears: number[];
  unlockedStamps: string[];
  onSelectYear: (year: number) => void;
}

export const PassportModal: React.FC<PassportModalProps> = ({
  isOpen,
  onClose,
  visitedYears,
  unlockedStamps,
  onSelectYear,
}) => {
  if (!isOpen) return null;

  // Calculate achievements
  const achievements = [
    {
      id: 'first-jump',
      title: 'Time Traveler Initiate',
      desc: 'Jumped to your first historical year',
      achieved: visitedYears.length >= 1,
      badge: '🧭',
    },
    {
      id: 'dialup-heard',
      title: 'Dial-up Modem Veteran',
      desc: 'Listened to the authentic 56K handshake audio',
      achieved: unlockedStamps.includes('dialup-heard'),
      badge: '📡',
    },
    {
      id: '80s-pioneer',
      title: 'ARPANET & 80s Pioneer',
      desc: 'Explored any year between 1980 and 1989',
      achieved: visitedYears.some((y) => y >= 1980 && y <= 1989),
      badge: '💾',
    },
    {
      id: 'dotcom-boom',
      title: 'Dot-Com Enthusiast',
      desc: 'Explored the wild 1990s or 2000s Web boom',
      achieved: visitedYears.some((y) => y >= 1990 && y <= 2005),
      badge: '🌐',
    },
    {
      id: 'mobile-revolution',
      title: 'Mobile & Social Citizen',
      desc: 'Explored the smartphone era (2007–2019)',
      achieved: visitedYears.some((y) => y >= 2007 && y <= 2019),
      badge: '📱',
    },
    {
      id: 'ai-explorer',
      title: 'AI Era Chrononaut',
      desc: 'Traveled to 2020 or beyond in the generative age',
      achieved: visitedYears.some((y) => y >= 2020),
      badge: '🤖',
    },
    {
      id: 'chrononaut-pro',
      title: 'Master Historian',
      desc: 'Explored 5 or more distinct historical years',
      achieved: visitedYears.length >= 5,
      badge: '🏆',
    },
  ];

  const totalAchieved = achievements.filter((a) => a.achieved).length;
  const progressPercent = Math.round((totalAchieved / achievements.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel-glow rounded-3xl p-6 sm:p-8 text-zinc-100 border border-purple-500/30 shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-500/40">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Time Traveler Passport
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 font-mono border border-purple-500/30">
                  {totalAchieved} / {achievements.length} Stamps
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Your personal record of eras and milestones visited in the digital museum.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400" />
              Chrononaut Progress: {progressPercent}%
            </span>
            <span className="font-mono text-cyan-400 text-[11px]">
              {totalAchieved === achievements.length
                ? '★ Grand Museum Curator'
                : totalAchieved >= 3
                ? '★ Seasoned Time Traveler'
                : '★ Novice Explorer'}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Content Tabs / Scrollable Area */}
        <div className="mt-4 overflow-y-auto space-y-6 flex-1 pr-1">
          {/* Stamps Grid */}
          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
              Achievement Stamps
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                    a.achieved
                      ? 'bg-purple-950/30 border-purple-500/40 text-zinc-200'
                      : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-500 opacity-60'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                      a.achieved
                        ? 'bg-purple-900/60 border border-purple-400/50 shadow-md shadow-purple-900/30'
                        : 'bg-zinc-800 border border-zinc-700'
                    }`}
                  >
                    {a.badge}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white leading-tight">
                        {a.title}
                      </span>
                      {a.achieved && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                      {a.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visited Years Log */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Visited Years Log ({visitedYears.length})
              </h4>
              <span className="text-[10px] text-zinc-500">Click any stamp to jump back</span>
            </div>

            {visitedYears.length === 0 ? (
              <p className="text-xs text-zinc-500 italic">
                You haven't visited any years yet. Explore the timeline or click "Take Me Somewhere in Time" to collect stamps!
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {visitedYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      onSelectYear(year);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-cyan-500/40 hover:border-cyan-400 hover:bg-zinc-800 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-all group"
                  >
                    <MapPin className="w-3 h-3 text-cyan-400 group-hover:scale-110" />
                    <span>{year}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-zinc-800 text-center">
          <p className="text-[11px] text-zinc-500">
            Internet Time Machine • Digital Museum Visitor Credentials
          </p>
        </div>
      </div>
    </div>
  );
};
