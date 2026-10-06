import React, { useState, useEffect } from 'react';
import { TimeCapsuleData } from '../types/timeline';
import { Archive, Lock, Key, Check, X, Sparkles, Send, Calendar } from 'lucide-react';
import { audioService } from '../services/audioService';

interface TimeCapsuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockStamp?: (stampId: string) => void;
}

export const TimeCapsuleModal: React.FC<TimeCapsuleModalProps> = ({
  isOpen,
  onClose,
  onUnlockStamp,
}) => {
  const [capsule, setCapsule] = useState<TimeCapsuleData | null>(null);
  const [favSite, setFavSite] = useState<string>('');
  const [favGame, setFavGame] = useState<string>('');
  const [favTech, setFavTech] = useState<string>('');
  const [prediction, setPrediction] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('itm_time_capsule');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCapsule(parsed);
        setFavSite(parsed.favoriteSite || '');
        setFavGame(parsed.favoriteGame || '');
        setFavTech(parsed.favoriteTech || '');
        setPrediction(parsed.prediction2035 || '');
        setMessage(parsed.messageToFuture || '');
      }
    } catch {
      // ignore
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data: TimeCapsuleData = {
      favoriteSite: favSite,
      favoriteGame: favGame,
      favoriteTech: favTech,
      prediction2035: prediction,
      messageToFuture: message,
      createdDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
    localStorage.setItem('itm_time_capsule', JSON.stringify(data));
    setCapsule(data);
    setIsSaved(true);
    audioService.playTeleport();

    if (onUnlockStamp) {
      onUnlockStamp('capsule-sealed');
    }

    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel-glow rounded-3xl p-6 sm:p-8 text-zinc-100 border border-cyan-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/40">
              <Archive className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Personal Digital Time Capsule
              </h2>
              <p className="text-xs text-zinc-400">
                Seal your tech favorites & future predictions into a local digital lockbox.
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

        {capsule ? (
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  Time Capsule Sealed
                </span>
                <span>Sealed on: {capsule.createdDate}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-zinc-400 font-mono">Favorite Website: </span>
                  <span className="text-white font-bold">{capsule.favoriteSite}</span>
                </div>
                <div>
                  <span className="text-zinc-400 font-mono">Favorite Video Game: </span>
                  <span className="text-white font-bold">{capsule.favoriteGame}</span>
                </div>
                <div>
                  <span className="text-zinc-400 font-mono">Favorite Gadget / Tech: </span>
                  <span className="text-white font-bold">{capsule.favoriteTech}</span>
                </div>
                <div>
                  <span className="text-zinc-400 font-mono">Prediction for 2035: </span>
                  <span className="text-cyan-300 italic">"{capsule.prediction2035}"</span>
                </div>
                {capsule.messageToFuture && (
                  <div>
                    <span className="text-zinc-400 font-mono">Message to Future Self: </span>
                    <span className="text-purple-300 italic">"{capsule.messageToFuture}"</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 text-center">
              Your capsule is securely stored in this browser's local memory.
            </p>

            <button
              onClick={() => setCapsule(null)}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs transition-colors"
            >
              Edit / Reseal My Capsule
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="mt-5 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300 font-bold">
                1. Your Favorite Website / Service of All Time:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. YouTube, Wikipedia, Old Reddit, Newgrounds..."
                value={favSite}
                onChange={(e) => setFavSite(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300 font-bold">
                2. Your Favorite Video Game:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Minecraft, Half-Life 2, Halo, Pokemon Red..."
                value={favGame}
                onChange={(e) => setFavGame(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300 font-bold">
                3. Your Favorite Gadget / Hardware:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. iPod Classic, Nintendo DS, CRT Monitor, iPhone 4..."
                value={favTech}
                onChange={(e) => setFavTech(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300 font-bold">
                4. Your Prediction for Technology in 2035:
              </label>
              <textarea
                rows={2}
                required
                placeholder="Where will AI, robotics, or the web be in 10 years?"
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300 font-bold">
                5. Note to Your Future Self (Optional):
              </label>
              <input
                type="text"
                placeholder="A reminder of what life feels like today..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Lock className="w-4 h-4" />
              Seal Time Capsule
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
