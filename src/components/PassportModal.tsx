import React, { useState } from 'react';
import { Award, Compass, CheckCircle2, X, Sparkles, MapPin, Target, Flame } from 'lucide-react';
import { ScavengerQuest } from '../types/timeline';

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitedYears: number[];
  unlockedStamps: string[];
  onSelectYear: (year: number) => void;
  onNavigateTab?: (tab: string) => void;
}

const SCAVENGER_QUESTS: ScavengerQuest[] = [
  {
    id: 'quest-dialup',
    title: 'Listen to the 56k Screech',
    description: 'Open the Sound Archive and listen to the authentic dial-up modem handshake.',
    hint: 'Click the sound wave button in the navigation header.',
    category: 'Audio',
    points: 50,
  },
  {
    id: 'quest-netscape',
    title: 'Visit the Browser Museum',
    description: 'Inspect the legendary Netscape Navigator in the Browser Museum.',
    hint: 'Open Categories -> Exhibition Wings -> Browser Museum.',
    category: 'Exhibition',
    points: 75,
  },
  {
    id: 'quest-speed',
    title: 'Simulate a 28.8k Download',
    description: 'Test a historical download in the Internet Speed Simulator.',
    hint: 'Open Categories -> Exhibition Wings -> Speed Simulator.',
    category: 'Simulation',
    points: 100,
  },
  {
    id: 'quest-lost',
    title: 'Pay Respects to GeoCities or Flash',
    description: 'Leave a flower tribute in the Lost Internet Museum memorial.',
    hint: 'Open Categories -> Exhibition Wings -> Lost Internet Museum.',
    category: 'Memorial',
    points: 75,
  },
  {
    id: 'quest-stack',
    title: 'Build Your Custom Retro Internet',
    description: 'Assemble a custom OS, browser, messenger, and device stack.',
    hint: 'Open Categories -> Exhibition Wings -> Build Your Own Internet.',
    category: 'Creator',
    points: 100,
  },
  {
    id: 'quest-capsule',
    title: 'Seal a Personal Time Capsule',
    description: 'Write your 2035 prediction and lock it in the Digital Time Capsule.',
    hint: 'Open the Time Capsule from the footer or exhibition wings.',
    category: 'Time Travel',
    points: 120,
  },
  {
    id: 'quest-konami',
    title: 'Enter the Secret Konami Code',
    description: 'Type ↑ ↑ ↓ ↓ ← → ← → B A anywhere on the museum website.',
    hint: 'An ancient gamer tradition...',
    category: 'Secret',
    points: 200,
  },
];

export const PassportModal: React.FC<PassportModalProps> = ({
  isOpen,
  onClose,
  visitedYears,
  unlockedStamps,
  onSelectYear,
  onNavigateTab,
}) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'quests' | 'years'>('achievements');

  if (!isOpen) return null;

  // Streak counter from local storage
  const streakDays = Math.max(1, Number(localStorage.getItem('itm_streak_days') || '1'));

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
      id: 'speed-sim-tested',
      title: 'Bandwidth Veteran',
      desc: 'Tested connection speed in the Bandwidth Lab',
      achieved: unlockedStamps.includes('speed-sim-tested'),
      badge: '⚡',
    },
    {
      id: 'browser-museum-explored',
      title: 'Browser Pioneer',
      desc: 'Inspected browser architecture in the Browser Museum',
      achieved: unlockedStamps.includes('browser-museum-explored'),
      badge: '🧭',
    },
    {
      id: 'respects-paid',
      title: 'Digital Mourner',
      desc: 'Paid respects to discontinued tech in the Lost Museum',
      achieved: unlockedStamps.includes('respects-paid'),
      badge: '🌹',
    },
    {
      id: 'map-node-explored',
      title: 'Cartographer of Cyberspace',
      desc: 'Traced technological lineage in the History Map',
      achieved: unlockedStamps.includes('map-node-explored'),
      badge: '🗺️',
    },
    {
      id: 'tech-explainer-read',
      title: 'Master Engineer',
      desc: 'Completed an interactive step-by-step tech explainer',
      achieved: unlockedStamps.includes('tech-explainer-read'),
      badge: '⚙️',
    },
    {
      id: 'stack-built',
      title: 'Time-Stack Architect',
      desc: 'Constructed and saved a custom historical internet stack',
      achieved: unlockedStamps.includes('stack-built'),
      badge: '🛠️',
    },
    {
      id: 'capsule-sealed',
      title: 'Time Capsule Guardian',
      desc: 'Sealed a digital time capsule with 2035 predictions',
      achieved: unlockedStamps.includes('capsule-sealed'),
      badge: '📦',
    },
    {
      id: 'konami-unlocked',
      title: '1337 Retro Gamer (Secret)',
      desc: 'Entered the legendary Konami Code sequence',
      achieved: unlockedStamps.includes('konami-unlocked'),
      badge: '👾',
    },
  ];

  const totalAchieved = achievements.filter((a) => a.achieved).length;
  const progressPercent = Math.round((totalAchieved / achievements.length) * 100);

  // Quest completion checks
  const isQuestDone = (qId: string) => {
    switch (qId) {
      case 'quest-dialup': return unlockedStamps.includes('dialup-heard');
      case 'quest-netscape': return unlockedStamps.includes('browser-museum-explored');
      case 'quest-speed': return unlockedStamps.includes('speed-sim-tested');
      case 'quest-lost': return unlockedStamps.includes('respects-paid');
      case 'quest-stack': return unlockedStamps.includes('stack-built');
      case 'quest-capsule': return unlockedStamps.includes('capsule-sealed');
      case 'quest-konami': return unlockedStamps.includes('konami-unlocked');
      default: return false;
    }
  };

  const completedQuestsCount = SCAVENGER_QUESTS.filter((q) => isQuestDone(q.id)).length;
  const totalQuestPoints = SCAVENGER_QUESTS.reduce((acc, q) => isQuestDone(q.id) ? acc + q.points : acc, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel-glow rounded-3xl p-6 sm:p-8 text-zinc-100 border border-purple-500/30 shadow-2xl max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-500/40">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Time Traveler Passport & Quests
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 font-mono border border-purple-500/30">
                  {totalAchieved} / {achievements.length} Stamps
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Visitor credentials, scavenger hunt, and achievements across the museum.
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

        {/* Progress & Streak Bar */}
        <div className="mt-4 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-400" />
                Chrononaut Mastery: {progressPercent}%
              </span>
              <span className="font-mono text-cyan-400 text-[11px]">
                {totalAchieved >= 10
                  ? '★ Grand Museum Curator'
                  : totalAchieved >= 4
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

          <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-2 sm:pt-0 sm:pl-4 shrink-0">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-sm">
                <Flame className="w-4 h-4 fill-current" />
                <span>{streakDays} Day</span>
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">Museum Streak</div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 font-bold text-sm font-mono">
                {totalQuestPoints} pts
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">Quest Score</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-4 border-b border-zinc-800 pb-2">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'achievements'
                ? 'bg-purple-600 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Stamps & Badges ({totalAchieved})
          </button>
          <button
            onClick={() => setActiveTab('quests')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'quests'
                ? 'bg-cyan-500 text-black shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            Scavenger Quests ({completedQuestsCount}/{SCAVENGER_QUESTS.length})
          </button>
          <button
            onClick={() => setActiveTab('years')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'years'
                ? 'bg-purple-600 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Visited Years ({visitedYears.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="mt-4 overflow-y-auto space-y-4 flex-1 pr-1">
          {activeTab === 'achievements' && (
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
          )}

          {activeTab === 'quests' && (
            <div className="space-y-2.5">
              {SCAVENGER_QUESTS.map((q) => {
                const completed = isQuestDone(q.id);
                return (
                  <div
                    key={q.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      completed
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-zinc-200'
                        : 'bg-zinc-900/70 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          {q.title}
                          {completed && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 font-mono text-cyan-400 border border-zinc-700">
                          +{q.points} pts
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">{q.description}</p>
                      <p className="text-[11px] font-mono text-zinc-500">Hint: {q.hint}</p>
                    </div>

                    <div className="shrink-0">
                      {completed ? (
                        <span className="text-[11px] font-mono text-emerald-400 font-bold px-2 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
                          ✓ Completed
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-zinc-500 px-2 py-1 rounded-lg bg-zinc-800">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'years' && (
            <div className="space-y-3">
              <div className="text-xs text-zinc-400">
                Click any year stamp to instantly transport to that era in the digital museum:
              </div>
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
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-zinc-800 text-center">
          <p className="text-[11px] text-zinc-500">
            Internet Time Machine • Digital Museum Visitor Credentials
          </p>
        </div>
      </div>
    </div>
  );
};
