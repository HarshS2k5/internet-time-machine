import React, { useState } from 'react';
import { Bot, Send, Sparkles, X, History, HelpCircle, BookOpen } from 'lucide-react';
import { audioService } from '../services/audioService';

interface AiHistoryGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectYear?: (year: number) => void;
  onUnlockStamp?: (stampId: string) => void;
}

interface DocentMessage {
  role: 'docent' | 'user';
  text: string;
  yearCitation?: number;
}

const KNOWLEDGE_RESPONSES: { [keywords: string]: { text: string; year: number } } = {
  flash: {
    text: "Adobe Flash (originally FutureSplash, then Macromedia Flash) powered the web's golden age of animations and browser games like Newgrounds. However, it had fatal flaws: massive CPU usage, critical zero-day security vulnerabilities, and zero touch battery optimization. When Steve Jobs banned Flash from the iPhone in his famous 2010 open letter, open standards like HTML5, CSS3, and WebGL quickly took over. Adobe officially ended Flash support on December 31, 2020.",
    year: 2010,
  },
  dotcom: {
    text: "The Dot-Com Bubble (1995–2000) was triggered by Netscape's massive August 1995 IPO. Suddenly, venture capital flooded into any company with '.com' in its name, regardless of whether they had profits or business models (like Pets.com). The NASDAQ peaked at 5,048 in March 2000 before crashing 78%. While hundreds went bankrupt, survivors like Amazon, eBay, and Google went on to define the 21st-century global economy.",
    year: 2000,
  },
  google: {
    text: "Before Google, search engines like AltaVista and Yahoo ranked websites mainly by keyword frequency (easily spammed by stuffing hidden words). In 1998, Larry Page and Sergey Brin created PageRank, which treated hyperlinks as democratic votes: a link from an authoritative academic or government page gave more weight. This produced dramatically more accurate results at lightning speed.",
    year: 1998,
  },
  email: {
    text: "Ray Tomlinson sent the first network email in 1971 across ARPANET. He chose the '@' symbol on the Model 33 Teletype keyboard to separate the user's name from the destination host machine (user@host). Tomlinson famously said he didn't remember the exact text of that first test email, likely something mundane like 'QWERTYUIOP'.",
    year: 1971,
  },
  browser: {
    text: "The First Browser War raged between Netscape Navigator and Microsoft Internet Explorer between 1995 and 2001. Netscape initially commanded 80% market share. Microsoft responded by bundling Internet Explorer for free with Windows 95/98, effectively cutting off Netscape's retail sales channels. This led to the landmark United States v. Microsoft antitrust case in 1998.",
    year: 1995,
  },
  default: {
    text: "As the Internet Time Machine Docent, I've tracked four decades of digital evolution from the 1969 ARPANET packet tests to the 1983 TCP/IP standard, the 1993 Web revolution, the 2007 smartphone dawn, and modern generative AI. Explore our interactive timelines, browser museum, and speed simulator to dive deeper into any era!",
    year: 1998,
  },
};

export const AiHistoryGuideModal: React.FC<AiHistoryGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectYear,
  onUnlockStamp,
}) => {
  const [messages, setMessages] = useState<DocentMessage[]>([
    {
      role: 'docent',
      text: "Greetings, time traveler! I am your AI Museum Docent. Ask me anything about how the internet, browsers, websites, smartphones, or AI evolved over time.",
      yearCitation: 1983,
    },
  ]);
  const [inputVal, setInputVal] = useState<string>('');

  if (!isOpen) return null;

  const handleAsk = (query: string) => {
    if (!query.trim()) return;

    audioService.playClick();
    const userMsg: DocentMessage = { role: 'user', text: query };
    const qLower = query.toLowerCase();

    let matched = KNOWLEDGE_RESPONSES.default;
    if (qLower.includes('flash') || qLower.includes('adobe') || qLower.includes('newground')) {
      matched = KNOWLEDGE_RESPONSES.flash;
    } else if (qLower.includes('dot') || qLower.includes('bubble') || qLower.includes('crash')) {
      matched = KNOWLEDGE_RESPONSES.dotcom;
    } else if (qLower.includes('google') || qLower.includes('search') || qLower.includes('pagerank')) {
      matched = KNOWLEDGE_RESPONSES.google;
    } else if (qLower.includes('email') || qLower.includes('mail') || qLower.includes('tomlinson')) {
      matched = KNOWLEDGE_RESPONSES.email;
    } else if (qLower.includes('browser') || qLower.includes('netscape') || qLower.includes('explorer') || qLower.includes('ie')) {
      matched = KNOWLEDGE_RESPONSES.browser;
    }

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      audioService.playTeleport();
      setMessages((prev) => [
        ...prev,
        { role: 'docent', text: matched.text, yearCitation: matched.year },
      ]);
      if (onUnlockStamp) {
        onUnlockStamp('ai-docent-chatted');
      }
    }, 400);
  };

  const sampleQuestions = [
    'Why did Adobe Flash die?',
    'What caused the dot-com bubble crash?',
    'How did Google defeat AltaVista?',
    'Who invented email and the @ symbol?',
    'What was the Netscape vs Microsoft browser war?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel-glow rounded-3xl p-6 text-zinc-100 border border-cyan-500/30 shadow-2xl max-h-[85vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/40">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                AI History Docent
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono border border-cyan-500/30">
                  Museum Knowledge Base
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Interactive assistant answering questions grounded in 40+ years of tech history.
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

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto my-4 space-y-3.5 pr-2 max-h-[50vh]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-br-none'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none space-y-2'
                }`}
              >
                <p>{m.text}</p>
                {m.yearCitation && onSelectYear && (
                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-cyan-400">Citation Era: Year {m.yearCitation}</span>
                    <button
                      onClick={() => {
                        onSelectYear(m.yearCitation!);
                        onClose();
                      }}
                      className="text-white hover:text-cyan-300 underline font-semibold"
                    >
                      Travel to {m.yearCitation} →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Queries */}
        <div className="pb-3 overflow-x-auto flex items-center gap-1.5 text-[11px] text-zinc-400">
          <span className="shrink-0 font-mono text-zinc-500">Ask Docent:</span>
          {sampleQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleAsk(q)}
              className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 hover:text-cyan-300 border border-zinc-800 shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Query Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(inputVal);
          }}
          className="flex items-center gap-2 pt-2 border-t border-zinc-800"
        >
          <input
            type="text"
            placeholder="Ask anything about internet history..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
