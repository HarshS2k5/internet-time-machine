import React, { useState } from 'react';
import { getTodayEvent, THIS_DAY_EVENTS } from '../data/thisDayInHistoryData';
import { ThisDayEvent } from '../types/timeline';
import { Calendar, Sparkles, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import { audioService } from '../services/audioService';

interface ThisDayInHistoryProps {
  onSelectYear?: (year: number) => void;
}

export const ThisDayInHistory: React.FC<ThisDayInHistoryProps> = ({ onSelectYear }) => {
  const [selectedEvent, setSelectedEvent] = useState<ThisDayEvent>(() => getTodayEvent());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDateChange = (m: number, d: number) => {
    setSelectedMonth(m);
    setSelectedDay(d);
    // Find matching event or closest
    const targetDate = new Date(2024, m - 1, d);
    const event = getTodayEvent(targetDate);
    setSelectedEvent(event);
    audioService.playClick();
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-cyan-500/30 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/40">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              On This Calendar Day in History
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {monthNames[selectedEvent.month - 1]} {selectedEvent.day}, {selectedEvent.year}
            </h3>
          </div>
        </div>

        {/* Quick Month / Day Selector */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <select
            value={selectedMonth}
            onChange={(e) => handleDateChange(Number(e.target.value), selectedDay)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-white focus:outline-none focus:border-cyan-500"
          >
            {monthNames.map((name, i) => (
              <option key={name} value={i + 1}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={selectedDay}
            onChange={(e) => handleDateChange(selectedMonth, Number(e.target.value))}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-white focus:outline-none focus:border-cyan-500"
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                Day {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Event Showcase */}
      <div className="mt-4 space-y-3">
        <h4 className="text-base sm:text-lg font-bold text-white">
          {selectedEvent.title}
        </h4>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {selectedEvent.description}
        </p>

        <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-xs text-zinc-400 font-mono">
          <span className="text-cyan-400 font-bold">Historical Legacy: </span>
          {selectedEvent.impact}
        </div>

        {onSelectYear && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onSelectYear(selectedEvent.year)}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 hover:text-black text-cyan-300 font-bold text-xs transition-all border border-cyan-500/40 flex items-center gap-1.5"
            >
              Time Travel to {selectedEvent.year}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
