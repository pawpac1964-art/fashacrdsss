import React from 'react';
import { Sparkles, Star, Volume2, VolumeX, Sliders, BookOpen, Layers } from 'lucide-react';

interface HeaderProps {
  stars: number;
  autoSpeak: boolean;
  onToggleAutoSpeak: () => void;
  speechRate: number;
  onChangeSpeechRate: (rate: number) => void;
  viewMode: 'card' | 'grid';
  onToggleViewMode: (mode: 'card' | 'grid') => void;
  masteredCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  stars,
  autoSpeak,
  onToggleAutoSpeak,
  speechRate,
  onChangeSpeechRate,
  viewMode,
  onToggleViewMode,
  masteredCount,
  totalCount
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur border-b border-amber-100 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl shadow-md shadow-amber-500/20">
            🇬🇧
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-slate-800 text-lg sm:text-xl tracking-tight leading-none">
                Angielski Klasa IV
              </h1>
              <span className="bg-amber-100 text-amber-900 text-[11px] font-black px-2 py-0.5 rounded-full">
                Poziom A1-A2
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Wymowa • 2x Powtórzenie słówka • Proste zdania
            </p>
          </div>
        </div>

        {/* Action Controls and Stats */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Star counter */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-2xl shadow-2xs">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse" />
            <span className="font-black text-amber-950 text-sm">{stars}</span>
            <span className="text-xs font-bold text-amber-800 hidden sm:inline">gwiazdek</span>
          </div>

          {/* View toggle (Karta do nauki / Lista fiszek) */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => onToggleViewMode('card')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'card'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Tryb nauki krok po kroku"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Nauka</span>
            </button>
            <button
              onClick={() => onToggleViewMode('grid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Przeglądaj wszystkie fiszki z plików"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Fiszki ({totalCount})</span>
            </button>
          </div>

          {/* Auto pronunciation toggle */}
          <button
            onClick={onToggleAutoSpeak}
            className={`p-2 rounded-2xl border transition-colors flex items-center gap-1.5 text-xs font-bold ${
              autoSpeak
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
            }`}
            title={autoSpeak ? 'Automatyczna wymowa włączona' : 'Automatyczna wymowa wyłączona'}
          >
            {autoSpeak ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            <span className="hidden md:inline">{autoSpeak ? 'Auto-wymowa' : 'Wyciszona'}</span>
          </button>

          {/* Speed switcher */}
          <button
            onClick={() => onChangeSpeechRate(speechRate === 0.85 ? 0.7 : speechRate === 0.7 ? 1.0 : 0.85)}
            className="p-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1"
            title="Zmień tempo mówienia lektora"
          >
            <span>{speechRate <= 0.75 ? '🐢 Wolno' : speechRate >= 1.0 ? '🐰 Szybko' : '🚶 Normalnie'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
