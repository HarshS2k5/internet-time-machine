import React from 'react';
import { SOCIAL_MEDIA_MILESTONES } from '../data/socialMediaData';
import { MessageSquare, Users, Sparkles, TrendingUp, Radio, Share2, Flame } from 'lucide-react';
import { audioService } from '../services/audioService';

export const SocialMediaView: React.FC = () => {
  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-400 text-xs font-mono uppercase tracking-widest">
          <MessageSquare className="w-3.5 h-3.5" />
          The Social Web
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Social Media Evolution & Online Culture
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          From anonymous Usenet newsgroups and AIM buddy lists to the real-identity social graph, ephemeral Snaps, algorithmic short video, and the open decentralized Fediverse.
        </p>
      </section>

      {/* Vertical Social Timeline Stream */}
      <section className="relative border-l-2 border-purple-900/50 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {SOCIAL_MEDIA_MILESTONES.map((platform, idx) => (
          <div key={platform.id} className="relative group">
            {/* Timeline Dot Marker */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-7 h-7 rounded-full bg-zinc-950 border-2 border-purple-500 text-purple-400 flex items-center justify-center font-mono text-[10px] font-bold group-hover:scale-125 transition-transform shadow-lg shadow-purple-900/40">
              {idx + 1}
            </div>

            {/* Platform Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-zinc-800 hover:border-purple-500/40 transition-all space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {platform.platform}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-xs font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                      Launched {platform.launchYear}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono mt-1 block">
                    Era: {platform.era}
                  </span>
                </div>

                {/* Peak Stats Badge */}
                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                    PEAK ADOPTION
                  </span>
                  <span className="text-xs font-semibold text-cyan-400 font-mono">
                    {platform.peakStats}
                  </span>
                </div>
              </div>

              {/* Purpose & Changes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block mb-1">
                    🎯 Core Purpose & Innovation:
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {platform.mainPurpose}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block mb-1">
                    🔄 Major Evolution & Architectural Shifts:
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {platform.majorChanges}
                  </p>
                </div>
              </div>

              {/* Cultural Influence Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/30 to-pink-950/20 border border-purple-500/30">
                <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-pink-400" />
                  Cultural Influence & Internet Psychology:
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {platform.culturalInfluence}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
