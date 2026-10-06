import React from 'react';
import {
  Sparkles,
  Hourglass,
  ArrowRight,
  Globe,
  Gamepad2,
  Cpu,
  Smartphone,
  MessageSquare,
  Bot,
  ShieldCheck,
  Compass,
  Clock,
  Layers,
  Heart,
  Calendar,
  ExternalLink,
  ChevronRight,
  Terminal,
  Code2,
  User,
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface AboutViewProps {
  onNavigate?: (tab: string) => void;
  onSelectYear?: (year: number) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onSelectYear }) => {
  const handleNav = (tab: string, year?: number) => {
    audioService.playClick();
    if (year !== undefined && onSelectYear) {
      onSelectYear(year);
    } else if (onNavigate) {
      onNavigate(tab);
    }
  };

  const categories = [
    {
      id: 'web',
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      title: 'THE WEB',
      desc: 'Explore the evolution of websites, browsers, search engines, and online services.',
      actionTab: 'web',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/40',
      actionLabel: 'Explore Web Evolution',
    },
    {
      id: 'gaming',
      icon: <Gamepad2 className="w-6 h-6 text-rose-400" />,
      title: 'GAMING',
      desc: 'Explore the history of consoles, PC gaming, online gaming, and gaming technology.',
      actionTab: 'gaming',
      badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-950/40',
      actionLabel: 'Explore Gaming History',
    },
    {
      id: 'computers',
      icon: <Cpu className="w-6 h-6 text-amber-400" />,
      title: 'COMPUTERS',
      desc: 'Discover how computers evolved from early machines to modern systems.',
      actionTab: 'tech',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-950/40',
      actionLabel: 'Explore Computers & Silicon',
    },
    {
      id: 'mobile',
      icon: <Smartphone className="w-6 h-6 text-sky-400" />,
      title: 'MOBILE',
      desc: 'Explore the transformation from basic mobile phones to smartphones.',
      actionTab: 'categories',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-950/40',
      actionLabel: 'Explore Mobile History',
    },
    {
      id: 'social',
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
      title: 'SOCIAL MEDIA',
      desc: 'See how online communication and social platforms evolved.',
      actionTab: 'social',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-950/40',
      actionLabel: 'Explore Social Evolution',
    },
    {
      id: 'ai',
      icon: <Bot className="w-6 h-6 text-cyan-400" />,
      title: 'ARTIFICIAL INTELLIGENCE',
      desc: 'Explore major milestones in the development of AI.',
      actionTab: 'ai',
      badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/40',
      actionLabel: 'Explore AI Timeline',
    },
  ];

  const whyReasons = [
    {
      title: 'Discover Web Evolution',
      desc: 'Watch how simple gray HTML documents transformed into responsive Web 2.0 apps, video hubs, and AI interfaces.',
      icon: '🌐',
    },
    {
      title: 'Technology Milestones',
      desc: 'Trace pivotal hardware breakthroughs from the Intel Pentium, 3dfx Voodoo, and 56k modems to Apple Silicon.',
      icon: '⚡',
    },
    {
      title: 'History of Gaming',
      desc: 'From 8-bit cartridges and 3D polygon leaps to Battle.net LAN parties, Steam digital distribution, and ray tracing.',
      icon: '🎮',
    },
    {
      title: 'Social Media Transformation',
      desc: 'Follow the transition from BBS and AIM away messages to MySpace profiles, Twitter newsfeeds, and algorithmic video.',
      icon: '💬',
    },
    {
      title: 'Computers & Smartphones',
      desc: 'Witness the journey from monochrome Macintosh terminals and indestructible Nokia bricks to capacitive iPhones.',
      icon: '📱',
    },
    {
      title: 'Artificial Intelligence',
      desc: 'Follow the line from Alan Turing and Deep Blue to deep GPU learning, Transformers, ChatGPT, and reasoning agents.',
      icon: '🤖',
    },
    {
      title: 'Forgotten Digital Artifacts',
      desc: 'Relive dial-up handshakes, visitor counters, Flash players, and forgotten cultural phenomena that shaped the web.',
      icon: '⏳',
    },
  ];

  const erasProgression = [
    { era: '1980s', name: 'The Dawn', tag: 'TCP/IP, Mac 128K, NES, BBS', year: 1984, accent: 'text-emerald-400 border-emerald-500/40' },
    { era: '1990s', name: 'Wild Web', tag: 'Mosaic, Win95, Amazon, Google', year: 1995, accent: 'text-amber-400 border-amber-500/40' },
    { era: '2000s', name: 'Web 2.0', tag: 'Wikipedia, YouTube, iPhone, Steam', year: 2004, accent: 'text-sky-400 border-sky-500/40' },
    { era: '2010s', name: 'App & 4G', tag: 'Instagram, Retina, 4G, TikTok', year: 2012, accent: 'text-purple-400 border-purple-500/40' },
    { era: '2020s', name: 'AI Era', tag: 'M1 Chips, ChatGPT, Gemini, Vision Pro', year: 2024, accent: 'text-cyan-400 border-cyan-500/40' },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 max-w-6xl mx-auto">
      {/* 🕰️ 1. HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 pb-6 text-center overflow-hidden">
        {/* Subtle animated timeline / time-travel backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-amber-500/5 blur-3xl pointer-events-none -z-10" />

        {/* Decorative background timeline line with year markers */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-between px-8 opacity-15 pointer-events-none -z-10">
          {['1983', '1991', '1998', '2004', '2007', '2016', '2022', '2026'].map((yr) => (
            <div key={yr} className="flex flex-col items-center">
              <span className="font-mono text-xs text-cyan-400">{yr}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 my-1" />
            </div>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6">
          <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          The Digital Museum of Human Connectivity
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none uppercase">
          About The <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
            Internet Time Machine
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Travel through decades of technology, discover the history of the internet, and explore how the digital world became what it is today.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => handleNav('timeline')}
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
          >
            <Hourglass className="w-4 h-4 text-black" />
            <span>EXPLORE THE TIMELINE</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </section>

      {/* 🌍 2. OUR MISSION */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            Core Purpose
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Our Mission
          </h2>

          <div className="space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed text-left sm:text-center">
            <p className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800">
              Technology changes incredibly quickly. Websites disappear, devices become obsolete, and the internet we use today can look completely different from the internet people experienced just a few years ago.
            </p>

            <p className="text-zinc-200 font-medium text-base sm:text-lg">
              Internet Time Machine was created to make that history easier and more enjoyable to explore.
            </p>

            <p className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-zinc-900/60 to-purple-950/30 border border-cyan-500/30 text-cyan-200 font-semibold">
              Our goal is to preserve the story of the digital world and make technology history interactive, visual, and accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ⏳ 3. WHY WE BUILT IT */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            The Motivation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Why Internet Time Machine?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            We built this platform as an interactive bridge between generations of digital explorers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyReasons.map((reason, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-zinc-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="text-3xl mb-3">{reason.icon}</div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center text-[11px] font-mono text-zinc-500 group-hover:text-cyan-400 transition-colors">
                <span>Milestone Archive #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌐 4. WHAT YOU CAN EXPLORE */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            Exhibition Wings
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            What You Can Explore
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Six comprehensive wings of the digital museum, each equipped with dedicated timelines and primary records.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleNav(cat.actionTab)}
              className="glass-card rounded-2xl p-6 border border-zinc-800 hover:border-cyan-500/50 cursor-pointer group flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${cat.badgeColor}`}>
                    Interactive Wing
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>{cat.actionLabel}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📅 5. THE TIMELINE PROGRESSION */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-zinc-800 space-y-8 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            The Chronological Track
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            The Interactive Timeline
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Our timeline spans from 1980 through 2026. Jump between eras and discover the unique software paradigms, connection speeds, popular websites, and cultural trends from each period.
          </p>
        </div>

        {/* 1980s → 1990s → 2000s → 2010s → 2020s Progression Track */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {erasProgression.map((item, i) => (
            <div
              key={item.era}
              onClick={() => handleNav('timeline', item.year)}
              className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-cyan-500/50 cursor-pointer group transition-all text-center flex flex-col justify-between"
            >
              <div>
                <span className={`text-xl font-black font-mono block ${item.accent.split(' ')[0]}`}>
                  {item.era}
                </span>
                <span className="text-xs font-bold text-white mt-1 block">
                  {item.name}
                </span>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-snug">
                  {item.tag}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-800/80 text-[10px] font-mono text-cyan-400 group-hover:underline">
                Enter {item.year} →
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => handleNav('timeline')}
            className="px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white border border-cyan-500/40 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-md"
          >
            <span>START TRAVELING THROUGH TIME</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </section>

      {/* 🔭 6. OUR VISION */}
      <section className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-cyan-950/40 border border-purple-500/30 shadow-2xl overflow-hidden text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/90 border border-purple-500/50 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          The Future of the Archive
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-4">
          Our Vision
        </h2>

        <blockquote className="max-w-3xl mx-auto text-base sm:text-xl text-zinc-200 leading-relaxed font-medium italic">
          "We want Internet Time Machine to become an interactive digital museum of the internet — a place where anyone can explore the technologies, ideas, platforms, games, and moments that shaped the digital world."
        </blockquote>
      </section>

      {/* 📚 7. SOURCES & ACCURACY */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight uppercase">
            Sources & Accuracy
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          We aim to present historical information accurately and responsibly. When appropriate, information is supported by reliable sources and references. Some interactive experiences may include simplified explanations or clearly labeled hypothetical content.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-zinc-400 font-mono">
          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
            ✓ CERN & W3C Standards Archives
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
            ✓ IETF Historical Request for Comments (RFCs)
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
            ✓ Computer History Museum & IEEE Annals
          </div>
        </div>
      </section>

      {/* 👨💻 8. CREATOR SECTION: MEET THE CREATOR */}
      <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-zinc-800/80 hover:border-cyan-500/40 transition-all shadow-2xl relative overflow-hidden space-y-6">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 shadow-md shadow-cyan-950/40">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block">
                The Mind Behind The Machine
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                Meet The Creator
              </h3>
            </div>
          </div>

          <div className="self-start sm:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-[11px] font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Created by Harsh Sisodia
            </span>
          </div>
        </div>

        {/* Creator Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Avatar / Identity Info */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-center flex flex-col items-center justify-center space-y-3">
            {/* Avatar Icon with Time-travel Cosmic Glow */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full rounded-[14px] bg-zinc-950 flex items-center justify-center text-3xl select-none">
                🚀
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black text-white tracking-tight">
                Harsh Sisodia
              </h4>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider block mt-0.5">
                Creator & Developer
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 font-mono">
              Independent Digital Project
            </p>
          </div>

          {/* Personal Bio & Visual Badges */}
          <div className="lg:col-span-8 space-y-5">
            {/* Personal Introduction Quote */}
            <blockquote className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-sm sm:text-base text-zinc-200 leading-relaxed font-normal italic relative">
              <span className="text-3xl text-cyan-500/40 font-serif absolute top-2 left-3">“</span>
              <p className="relative pl-4">
                Hi! I'm Harsh Sisodia, a 12-year-old creator and developer who loves technology, gaming, AI, and building interesting digital projects. I created Internet Time Machine to make exploring the history of the internet and technology fun, interactive, and accessible.
              </p>
            </blockquote>

            {/* Visual Timeline / Attribute Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-center">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-0.5">
                  AGE
                </span>
                <span className="text-sm font-black text-white font-mono tracking-tight">
                  12 YEARS OLD
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 text-center">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block mb-0.5">
                  ROLE
                </span>
                <span className="text-sm font-black text-white font-mono tracking-tight">
                  CREATOR
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-center">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-0.5">
                  PASSION
                </span>
                <span className="text-xs sm:text-sm font-black text-white font-mono tracking-tight">
                  TECH & GAMING ENTHUSIAST
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 9. CALL TO ACTION */}
      <section className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-cyan-500/30 text-center shadow-2xl space-y-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Ready to Travel Through Time?
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Choose an era, explore a technology, and discover how the digital world evolved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => handleNav('timeline')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-black font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
          >
            <Hourglass className="w-4 h-4 text-black" />
            <span>EXPLORE TIMELINE</span>
          </button>

          <button
            onClick={() => handleNav('tech')}
            className="px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-bold text-sm flex items-center gap-2 shadow-md transition-all"
          >
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>EXPLORE TECHNOLOGY</span>
          </button>
        </div>
      </section>
    </div>
  );
};
