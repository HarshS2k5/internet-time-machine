import React, { useState, useEffect, useRef } from 'react';
import { SPEED_PRESETS, SPEED_PAYLOADS, formatDownloadTime, SpeedTestPayload } from '../data/speedSimulatorData';
import { SpeedPreset } from '../types/timeline';
import { Play, Pause, RotateCcw, Zap, Gauge, Clock, Download, CheckCircle2, ShieldAlert } from 'lucide-react';
import { audioService } from '../services/audioService';

interface SpeedSimulatorProps {
  onUnlockStamp?: (stampId: string) => void;
}

export const SpeedSimulator: React.FC<SpeedSimulatorProps> = ({ onUnlockStamp }) => {
  const [selectedPreset, setSelectedPreset] = useState<SpeedPreset>(SPEED_PRESETS[1]); // 1998 56k default
  const [selectedPayload, setSelectedPayload] = useState<SpeedTestPayload>(SPEED_PAYLOADS[2]); // 4.5 MB MP3
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [downloadRateDisplay, setDownloadRateDisplay] = useState<string>('0 KB/s');
  
  const timerRef = useRef<number | null>(null);

  // Theoretical duration in real historical seconds
  const bytesPerSec = (selectedPreset.speedKbps * 1000) / 8;
  const theoreticalDurationSec = selectedPayload.sizeBytes / bytesPerSec;

  // Simulator playback factor so user doesn't wait 4 hours for a 45GB file
  // Aim for simulation visually taking ~4-10 seconds
  const simTargetSeconds = Math.max(3, Math.min(12, theoreticalDurationSec > 60 ? 8 : theoreticalDurationSec));
  const simStepIntervalMs = 50;
  const progressIncrement = 100 / ((simTargetSeconds * 1000) / simStepIntervalMs);

  const startDownload = () => {
    setIsDownloading(true);
    setIsCompleted(false);
    setDownloadProgress(0);
    audioService.playClick();
    if (onUnlockStamp) {
      onUnlockStamp('speed-sim-tested');
    }
  };

  const resetDownload = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsDownloading(false);
    setIsCompleted(false);
    setDownloadProgress(0);
  };

  useEffect(() => {
    if (isDownloading) {
      timerRef.current = window.setInterval(() => {
        setDownloadProgress((prev) => {
          const next = prev + progressIncrement;
          if (next >= 100) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsDownloading(false);
            setIsCompleted(true);
            audioService.playTeleport();
            return 100;
          }
          return next;
        });
      }, simStepIntervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isDownloading, progressIncrement]);

  // Compute downloaded bytes display
  const downloadedBytes = Math.round((downloadProgress / 100) * selectedPayload.sizeBytes);
  const downloadedLabel =
    downloadedBytes > 1024 * 1024 * 1024
      ? `${(downloadedBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
      : downloadedBytes > 1024 * 1024
      ? `${(downloadedBytes / (1024 * 1024)).toFixed(2)} MB`
      : `${(downloadedBytes / 1024).toFixed(1)} KB`;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Gauge className="w-3.5 h-3.5" />
          Interactive Bandwidth Lab
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Internet Speed Simulator
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300">
          Experience what downloading files felt like across four decades of internet bandwidth — from screeching 28.8k dial-up to instant gigabit fiber.
        </p>
      </div>

      {/* Control Station */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Speed Preset Selector */}
        <div className="glass-panel p-5 rounded-2xl border border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            1. Select Historical Era
          </h3>
          <div className="space-y-2">
            {SPEED_PRESETS.map((preset) => {
              const isSelected = selectedPreset.era === preset.era;
              return (
                <button
                  key={preset.era}
                  onClick={() => {
                    setSelectedPreset(preset);
                    resetDownload();
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-md'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-white">
                      {preset.year}: {preset.name}
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400">
                      {preset.speedLabel} · {preset.latencyMs}ms ping
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: File Payload Selector & Live Simulation Chamber */}
        <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400" />
              2. Select Download Item
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {SPEED_PAYLOADS.map((payload) => {
                const isSelected = selectedPayload.id === payload.id;
                return (
                  <button
                    key={payload.id}
                    onClick={() => {
                      setSelectedPayload(payload);
                      resetDownload();
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-purple-950/70 border-purple-500 text-white shadow-md'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-lg mb-1">{payload.icon}</div>
                    <div className="font-bold text-xs truncate text-zinc-200">
                      {payload.name}
                    </div>
                    <div className="text-[11px] font-mono text-purple-400">
                      {payload.sizeLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Download Simulation Chamber */}
          <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5 font-mono">
                {selectedPayload.icon} {selectedPayload.name}
              </span>
              <span className="font-mono text-cyan-400">
                {downloadedLabel} / {selectedPayload.sizeLabel} ({Math.round(downloadProgress)}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-zinc-700 relative">
              <div
                className={`h-full rounded-full transition-all duration-75 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                    : 'bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-500'
                }`}
                style={{ width: `${downloadProgress}%` }}
              />
            </div>

            {/* Simulated Rate / Status */}
            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span>Latency: {selectedPreset.latencyMs} ms</span>
              <span>
                {isCompleted
                  ? '✓ Download Complete'
                  : isDownloading
                  ? `Transferring at ~${selectedPreset.speedLabel.split(' ')[0]}`
                  : 'Ready to download'}
              </span>
            </div>

            {/* Simulation Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {!isDownloading && !isCompleted ? (
                <button
                  onClick={startDownload}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Download Test
                </button>
              ) : isDownloading ? (
                <button
                  onClick={() => setIsDownloading(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              ) : (
                <button
                  onClick={startDownload}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Download Again
                </button>
              )}
              <button
                onClick={resetDownload}
                className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Real Historical Calculation & Comparison */}
        <div className="glass-panel p-5 rounded-2xl border border-zinc-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Actual Historical Duration
            </h3>
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-center space-y-1">
              <div className="text-xs text-purple-300">
                In {selectedPreset.year}, downloading this took:
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-purple-200">
                {formatDownloadTime(theoreticalDurationSec)}
              </div>
              <div className="text-[10px] text-purple-400">
                Assuming 100% ideal line conditions without phone line disconnections
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              {selectedPreset.description}
            </p>
          </div>

          {/* Comparative Era Matrix */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <div className="text-xs font-bold text-zinc-300">
              How long this file took across history:
            </div>
            <div className="space-y-1.5 text-[11px] font-mono">
              {SPEED_PRESETS.map((p) => {
                const bSec = (p.speedKbps * 1000) / 8;
                const time = selectedPayload.sizeBytes / bSec;
                const isCurrent = p.era === selectedPreset.era;
                return (
                  <div
                    key={p.era}
                    className={`flex items-center justify-between p-1.5 rounded-lg ${
                      isCurrent
                        ? 'bg-cyan-950/80 text-cyan-300 font-bold border border-cyan-500/30'
                        : 'text-zinc-400 hover:bg-zinc-900'
                    }`}
                  >
                    <span>{p.year} ({p.name.split(' ')[0]})</span>
                    <span>{formatDownloadTime(time)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
