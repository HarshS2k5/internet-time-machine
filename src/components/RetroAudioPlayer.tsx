import React, { useState, useEffect } from 'react';
import { audioService } from '../services/audioService';
import { Volume2, VolumeX, Play, Square, X, Music, Radio } from 'lucide-react';

interface RetroAudioPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockedStamp?: (stampId: string) => void;
}

export const RetroAudioPlayer: React.FC<RetroAudioPlayerProps> = ({ isOpen, onClose, onUnlockedStamp }) => {
  const [isMuted, setIsMuted] = useState(audioService.getMuted());
  const [dialupPlaying, setDialupPlaying] = useState(false);
  const [dialupStep, setDialupStep] = useState<string>('Idle');

  useEffect(() => {
    setIsMuted(audioService.getMuted());
  }, [isOpen]);

  const toggleMute = () => {
    const nextMuted = audioService.toggleMute();
    setIsMuted(nextMuted);
  };

  const handlePlayDialup = () => {
    if (dialupPlaying) {
      audioService.stopDialup();
      setDialupPlaying(false);
      setDialupStep('Disconnected');
      return;
    }

    setDialupPlaying(true);
    setDialupStep('Off-hook & Dialing (DTMF)...');

    const t1 = setTimeout(() => setDialupStep('Ringing remote server...'), 1800);
    const t2 = setTimeout(() => setDialupStep('Answer carrier tone (2100 Hz)...'), 2800);
    const t3 = setTimeout(() => setDialupStep('Baud negotiation & V.90 Screech...'), 3800);
    const t4 = setTimeout(() => setDialupStep('Carrier established: 56,000 bps CONNECTED!'), 6200);

    audioService.playDialupHandshake(() => {
      setDialupPlaying(false);
      setDialupStep('Connected (Online)');
      if (onUnlockedStamp) {
        onUnlockedStamp('dialup-heard');
      }
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel-glow rounded-2xl p-6 sm:p-8 text-zinc-100 shadow-2xl border border-cyan-500/30">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/40">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Sounds of the Internet
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 font-mono border border-cyan-500/30">
                  Audio Museum
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Synthesized live in your browser using the Web Audio API. Zero external audio downloads.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className={`p-2 rounded-lg border transition-all ${
                isMuted
                  ? 'bg-rose-950/60 border-rose-600/40 text-rose-400 hover:bg-rose-900/70'
                  : 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-750'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isMuted && (
          <div className="mt-4 p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <span>Audio is currently muted in your browser.</span>
            <button onClick={toggleMute} className="underline font-semibold hover:text-rose-200">
              Enable Sound
            </button>
          </div>
        )}

        {/* Sound Items List */}
        <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* 56K Dial-Up Handshake */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/40 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-600/30">
                    1997 • 56K V.90
                  </span>
                  <h3 className="font-semibold text-white">56K Dial-Up Modem Handshake</h3>
                </div>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                  The legendary dial tone, touch tones, and screeching handshake. Modems literally probed line frequencies to negotiate speeds before connecting.
                </p>
              </div>
              <button
                onClick={handlePlayDialup}
                className={`px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 transition-all shadow-lg shrink-0 ${
                  dialupPlaying
                    ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-black font-semibold'
                }`}
              >
                {dialupPlaying ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" /> Stop Dialing
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> Dial Connect
                  </>
                )}
              </button>
            </div>

            {/* Handshake status progress */}
            {dialupPlaying && (
              <div className="mt-3 p-2.5 rounded-lg bg-black/80 border border-cyan-500/40 font-mono text-xs text-cyan-400 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  {dialupStep}
                </span>
                <span className="text-[10px] text-zinc-500">COM3: 57,600 BAUD</span>
              </div>
            )}
          </div>

          {/* Windows 95 Startup Chime */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-600/30">
                  1995 • OS Chime
                </span>
                <h3 className="font-semibold text-white">Windows 95 Inspired Chime</h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                The soothing ambient arpeggio originally composed by Brian Eno on a Mac computer.
              </p>
            </div>
            <button
              onClick={() => {
                audioService.playWin95Chime();
                if (onUnlockedStamp) onUnlockedStamp('win95-heard');
              }}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs flex items-center gap-2 border border-zinc-700 transition-all shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current text-sky-400" /> Play Chime
            </button>
          </div>

          {/* ICQ "Uh-Oh!" Alert */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-600/30">
                  1996 • Messenger
                </span>
                <h3 className="font-semibold text-white">ICQ "Uh-Oh!" Notification</h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                The unmistakable two-tone vocal chirp that notified 1990s desktop users of an incoming message.
              </p>
            </div>
            <button
              onClick={() => {
                audioService.playICQUhOh();
              }}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs flex items-center gap-2 border border-zinc-700 transition-all shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current text-emerald-400" /> Play Uh-Oh!
            </button>
          </div>

          {/* Time Warp Sound */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-600/30">
                  Sci-Fi • Portal
                </span>
                <h3 className="font-semibold text-white">Cosmic Time Warp Whoosh</h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                Sub-bass rumble and high-frequency bandpass resonance accompanying your jumps across historical eras.
              </p>
            </div>
            <button
              onClick={() => audioService.playTimeWarp()}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs flex items-center gap-2 border border-zinc-700 transition-all shrink-0"
            >
              <Music className="w-3.5 h-3.5 text-purple-400" /> Play Warp
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
          <span>Internet Museum Audio Archives</span>
          <span className="font-mono text-cyan-400/80">Sample Rate: 44.1 kHz</span>
        </div>
      </div>
    </div>
  );
};
