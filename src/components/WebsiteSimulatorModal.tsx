import React, { useState } from 'react';
import { X, Search, Globe, Film, Lock, Monitor, ArrowLeft, RefreshCw } from 'lucide-react';
import { GOOGLE_1998_SAMPLE_RESULTS, YAHOO_1996_DIRECTORIES, RetroSearchResult } from '../data/retroSimulations';
import { audioService } from '../services/audioService';

interface WebsiteSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSimId?: string;
  onUnlockedStamp?: (stampId: string) => void;
}

export const WebsiteSimulatorModal: React.FC<WebsiteSimulatorModalProps> = ({
  isOpen,
  onClose,
  initialSimId = 'google-1998',
  onUnlockedStamp,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialSimId);

  // Google 1998 state
  const [googleQuery, setGoogleQuery] = useState<string>('');
  const [googleResults, setGoogleResults] = useState<RetroSearchResult[] | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // YouTube 2005 state
  const [ytStars, setYtStars] = useState<number>(5);
  const [ytSubscribed, setYtSubscribed] = useState<boolean>(false);
  const [ytViews, setYtViews] = useState<number>(315482);

  // Yahoo 1996 state
  const [yahooActiveCategory, setYahooActiveCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    audioService.playClick(800, 0.05);
    setHasSearched(true);

    const q = googleQuery.toLowerCase().trim();
    if (q.includes('netscape')) {
      setGoogleResults(GOOGLE_1998_SAMPLE_RESULTS.netscape);
    } else if (q.includes('space') || q.includes('jam')) {
      setGoogleResults(GOOGLE_1998_SAMPLE_RESULTS.spacejam);
    } else if (q.includes('doom') || q.includes('id')) {
      setGoogleResults(GOOGLE_1998_SAMPLE_RESULTS.doom);
    } else if (q.includes('linux') || q.includes('torvalds')) {
      setGoogleResults(GOOGLE_1998_SAMPLE_RESULTS.linux);
    } else {
      setGoogleResults(GOOGLE_1998_SAMPLE_RESULTS.default);
    }

    if (onUnlockedStamp) {
      onUnlockedStamp('google-1998-sim');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl glass-panel rounded-2xl border border-zinc-700 shadow-2xl flex flex-col h-[90vh] max-h-[800px] overflow-hidden">
        {/* Browser Chrome Header (Classic OS Window Bar) */}
        <div className="bg-zinc-900 px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono text-zinc-400 ml-2">
              Virtual Browser Emulator v1.998 — [Rendering Mode: 640x480 / 800x600]
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Browser Tabs & URL Bar */}
        <div className="bg-zinc-850 px-4 py-2 border-b border-zinc-800 shrink-0 flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => { setActiveTab('google-1998'); audioService.playClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'google-1998'
                  ? 'bg-zinc-750 text-white border border-cyan-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" /> Google Beta (1998)
            </button>
            <button
              onClick={() => { setActiveTab('yahoo-1996'); audioService.playClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'yahoo-1996'
                  ? 'bg-zinc-750 text-white border border-amber-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" /> Yahoo! Directory (1996)
            </button>
            <button
              onClick={() => { setActiveTab('youtube-2005'); audioService.playClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'youtube-2005'
                  ? 'bg-zinc-750 text-white border border-rose-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-rose-400" /> YouTube (2005)
            </button>
            <button
              onClick={() => { setActiveTab('thefacebook-2004'); audioService.playClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'thefacebook-2004'
                  ? 'bg-zinc-750 text-white border border-blue-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" /> [thefacebook] (2004)
            </button>
          </div>

          {/* URL Address Bar */}
          <div className="w-full sm:w-64 bg-zinc-950 px-3 py-1 rounded-md border border-zinc-700/80 text-[11px] font-mono text-zinc-300 truncate">
            {activeTab === 'google-1998' && 'http://google.stanford.edu/beta'}
            {activeTab === 'yahoo-1996' && 'http://www.yahoo.com/dir'}
            {activeTab === 'youtube-2005' && 'http://www.youtube.com/watch?v=jNQXAC9IVRw'}
            {activeTab === 'thefacebook-2004' && 'https://www.thefacebook.com/login.php'}
          </div>
        </div>

        {/* Emulator Viewport Canvas */}
        <div className="flex-1 overflow-y-auto bg-white text-black p-4 sm:p-6 font-serif select-text">
          {/* 1. Google 1998 Simulator */}
          {activeTab === 'google-1998' && (
            <div className="max-w-2xl mx-auto text-center py-6">
              {/* Google 1998 Logo */}
              <div className="mb-6">
                <span className="text-5xl sm:text-6xl font-bold tracking-tight select-none">
                  <span className="text-[#17449e]">G</span>
                  <span className="text-[#d62408]">o</span>
                  <span className="text-[#f7b500]">o</span>
                  <span className="text-[#17449e]">g</span>
                  <span className="text-[#008f39]">l</span>
                  <span className="text-[#d62408]">e</span>
                  <span className="text-[#17449e] italic font-serif">!</span>
                </span>
                <div className="text-xs text-zinc-600 font-sans mt-1">
                  Beta Search Engine • Stanford University Project
                </div>
              </div>

              {/* Search Box Form */}
              <form onSubmit={handleGoogleSearch} className="mb-6">
                <div className="flex justify-center mb-3">
                  <input
                    type="text"
                    value={googleQuery}
                    onChange={(e) => setGoogleQuery(e.target.value)}
                    placeholder="Search 25 million pages (e.g. Netscape, Space Jam, DOOM, Linux)..."
                    className="w-full max-w-md px-3 py-1.5 border-2 border-zinc-400 bg-white text-black text-sm outline-none font-sans shadow-inner"
                  />
                </div>
                <div className="flex justify-center gap-3 font-sans">
                  <button
                    type="submit"
                    className="win95-button px-4 py-1.5 text-xs font-semibold"
                  >
                    Google Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGoogleQuery('Space Jam');
                      handleGoogleSearch();
                    }}
                    className="win95-button px-4 py-1.5 text-xs font-semibold"
                  >
                    I'm feeling lucky
                  </button>
                </div>
              </form>

              {/* Search Results Display */}
              {hasSearched && googleResults && (
                <div className="text-left font-sans mt-8 pt-4 border-t border-zinc-300">
                  <div className="text-xs text-zinc-500 mb-4 font-mono">
                    Showing {googleResults.length} results for: <span className="font-bold text-black">{googleQuery || 'Stanford University'}</span> (PageRank 0.04 seconds)
                  </div>
                  <div className="space-y-4">
                    {googleResults.map((res, idx) => (
                      <div key={idx} className="text-xs sm:text-sm">
                        <a
                          href="#simulate"
                          onClick={(e) => { e.preventDefault(); alert(`Simulated link: ${res.url}`); }}
                          className="text-[#0000cc] underline font-medium hover:text-[#ff0000] text-sm"
                        >
                          {res.title}
                        </a>
                        <p className="text-zinc-700 text-xs mt-0.5 leading-relaxed font-serif">
                          {res.snippet}
                        </p>
                        <span className="text-[#008000] text-[11px] font-mono">
                          {res.url} - cached - 12k
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 1998 Footer */}
              <div className="mt-12 pt-6 border-t border-zinc-300 font-sans text-xs text-zinc-600">
                <p>Copyright ©1998 Google Inc. Hosted at Stanford Computer Science.</p>
                <div className="mt-2 flex justify-center gap-4 text-[#0000cc] underline text-[11px]">
                  <span>About Google</span>
                  <span>Stanford Search</span>
                  <span>Linux Search</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Yahoo 1996 Simulator */}
          {activeTab === 'yahoo-1996' && (
            <div className="max-w-3xl mx-auto font-serif">
              <div className="text-center py-4 border-b border-zinc-300 mb-6">
                <h1 className="text-4xl font-extrabold text-[#990000] italic font-serif">
                  YAHOO!
                </h1>
                <p className="text-xs text-zinc-600 mt-1 font-sans">
                  What's New • What's Cool • Today's Web Highlights
                </p>
              </div>

              {/* Directory Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-sans">
                {YAHOO_1996_DIRECTORIES.map((dir, idx) => (
                  <div key={idx} className="border-b border-dotted border-zinc-300 pb-3">
                    <h3
                      onClick={() => setYahooActiveCategory(dir.category)}
                      className="font-bold text-[#0000cc] underline text-sm cursor-pointer hover:text-red-600"
                    >
                      {dir.category}
                    </h3>
                    <p className="text-xs text-zinc-600 mt-1">
                      {dir.subcategories.join(', ')}...
                    </p>
                  </div>
                ))}
              </div>

              {yahooActiveCategory && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-300 rounded font-sans text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-black">
                      Subcategories under "{yahooActiveCategory}":
                    </span>
                    <button
                      onClick={() => setYahooActiveCategory(null)}
                      className="text-red-600 underline font-semibold"
                    >
                      Back to Directory
                    </button>
                  </div>
                  <p className="text-zinc-700">
                    Hand-indexed by Stanford curators Jerry Yang & David Filo in 1995–1996.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 3. YouTube 2005 Simulator */}
          {activeTab === 'youtube-2005' && (
            <div className="max-w-2xl mx-auto font-sans text-xs">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black text-black">You</span>
                  <span className="bg-[#cc181e] text-white px-2 py-0.5 rounded text-lg font-black">
                    Tube
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono ml-2">
                    Broadcast Yourself™
                  </span>
                </div>
                <button
                  onClick={() => {
                    setYtSubscribed(!ytSubscribed);
                    audioService.playClick();
                  }}
                  className={`px-3 py-1 font-bold text-xs rounded transition-all ${
                    ytSubscribed
                      ? 'bg-zinc-300 text-zinc-700'
                      : 'bg-[#f5c518] hover:bg-[#e0b000] text-black shadow-sm'
                  }`}
                >
                  {ytSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                </button>
              </div>

              {/* Simulated 2005 Flash Player 4:3 Box */}
              <div className="relative bg-zinc-900 text-white aspect-[4/3] rounded overflow-hidden flex flex-col items-center justify-center p-6 border-2 border-zinc-700 shadow-md">
                <div className="text-center">
                  <div className="text-4xl mb-2 animate-bounce">🐘</div>
                  <h4 className="text-base font-bold text-zinc-100">
                    Me at the zoo (April 23, 2005)
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                    "All right, so here we are in front of the elephants. The cool thing about these guys is that they have really, really, really long trunks..."
                  </p>
                  <span className="inline-block mt-3 px-2 py-0.5 bg-black/60 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/30">
                    Adobe Flash Player 8 • 320x240 • 24 fps
                  </span>
                </div>

                {/* Vintage Progress bar */}
                <div className="absolute bottom-0 inset-x-0 bg-zinc-800 p-2 flex items-center gap-2 border-t border-zinc-700">
                  <span className="text-xs">▶</span>
                  <div className="flex-1 bg-zinc-700 h-1.5 rounded overflow-hidden">
                    <div className="bg-red-600 h-full w-2/3" />
                  </div>
                  <span className="text-[10px] font-mono">0:12 / 0:19</span>
                </div>
              </div>

              {/* Video Metadata & 5-Star Ratings */}
              <div className="mt-4 p-3 bg-zinc-100 rounded border border-zinc-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="font-bold text-sm text-black">Me at the zoo</h3>
                  <div className="text-zinc-500 text-[11px] mt-0.5">
                    From: <span className="font-semibold text-blue-700">jawed</span> | Added: April 23, 2005
                  </div>
                </div>

                {/* 5-Star Rating control */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-zinc-600 mr-1">Rate:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        setYtStars(star);
                        setYtViews(ytViews + 1);
                        audioService.playClick(600 + star * 80, 0.04);
                      }}
                      className="text-base transition-transform hover:scale-125"
                    >
                      {star <= ytStars ? '⭐' : '☆'}
                    </button>
                  ))}
                  <span className="text-[11px] font-mono text-zinc-600 ml-2">
                    {ytViews.toLocaleString()} views
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 4. TheFacebook 2004 Simulator */}
          {activeTab === 'thefacebook-2004' && (
            <div className="max-w-md mx-auto font-sans text-xs bg-[#f7f7f7] border border-[#3b5998] rounded overflow-hidden shadow">
              {/* Iconic Header */}
              <div className="bg-[#3b5998] text-white p-3 flex items-center justify-between">
                <span className="font-bold text-base tracking-wide">[thefacebook]</span>
                <span className="text-[10px] text-blue-200">Harvard University Network</span>
              </div>

              {/* Login Form */}
              <div className="p-5 space-y-3">
                <p className="text-zinc-700 leading-snug">
                  TheFacebook is an online directory that connects people through social networks at colleges.
                </p>

                <div className="space-y-2 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700">
                      Email (@harvard.edu):
                    </label>
                    <input
                      type="email"
                      defaultValue="zuck@fas.harvard.edu"
                      className="w-full px-2 py-1 border border-zinc-400 bg-white rounded text-xs mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700">
                      Password:
                    </label>
                    <input
                      type="password"
                      defaultValue="dormroom2004"
                      className="w-full px-2 py-1 border border-zinc-400 bg-white rounded text-xs mt-0.5"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      audioService.playClick();
                      alert('Welcome back, Mark! Status: Coding in Kirkland House.');
                    }}
                    className="win95-button px-4 py-1.5 font-bold text-xs"
                  >
                    Login to Harvard
                  </button>
                </div>
              </div>

              <div className="p-2.5 bg-zinc-200 border-t border-zinc-300 text-[10px] text-zinc-600 text-center">
                Created by Mark Zuckerberg, Eduardo Saverin, Dustin Moskovitz & Chris Hughes.
              </div>
            </div>
          )}
        </div>

        {/* Simulator Footer */}
        <div className="bg-zinc-900 px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 shrink-0">
          <span>Interactive Digital Museum Sandbox</span>
          <button
            onClick={() => {
              setGoogleQuery('');
              setHasSearched(false);
              audioService.playClick();
            }}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Simulation
          </button>
        </div>
      </div>
    </div>
  );
};
