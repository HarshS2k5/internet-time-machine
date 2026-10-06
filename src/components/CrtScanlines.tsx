import React from 'react';

interface CrtScanlinesProps {
  enabled: boolean;
}

export const CrtScanlines: React.FC<CrtScanlinesProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* CRT Scanline stripes */}
      <div className="absolute inset-0 crt-overlay opacity-30" />
      {/* Subtle CRT screen glow vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40" />
      {/* Slight phosphor green tint badge */}
      <div className="absolute bottom-3 right-3 bg-emerald-950/90 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 shadow-lg pointer-events-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        CRT FILTER ACTIVE
      </div>
    </div>
  );
};
