import React, { useState } from 'react';
import { Search, Volume2, Play, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { VerbItem } from '../types';
import { speakText } from '../utils/speech';

interface VerbGridProps {
  verbs: VerbItem[];
  onSelectVerb: (verb: VerbItem) => void;
  selectedVerbId?: string;
  masteredIds: Set<string>;
  speechRate: number;
}

export const VerbGrid: React.FC<VerbGridProps> = ({
  verbs,
  onSelectVerb,
  selectedVerbId,
  masteredIds,
  speechRate
}) => {
  const [search, setSearch] = useState('');
  const [sheetFilter, setSheetFilter] = useState<number | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredVerbs = verbs.filter((v) => {
    const matchesSearch =
      v.verb.toLowerCase().includes(search.toLowerCase()) ||
      v.translation.toLowerCase().includes(search.toLowerCase()) ||
      v.sentence.toLowerCase().includes(search.toLowerCase()) ||
      v.sentenceTranslation.toLowerCase().includes(search.toLowerCase());

    const matchesSheet = sheetFilter === 'all' || v.sheet === sheetFilter;
    const matchesCategory = categoryFilter === 'all' || v.category === categoryFilter;

    return matchesSearch && matchesSheet && matchesCategory;
  });

  const handleQuickListen = (e: React.MouseEvent, verb: string) => {
    e.stopPropagation();
    speakText(verb, { rate: speechRate });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-amber-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Szukaj słówka lub znaczenia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
          />
        </div>

        {/* Sheet Tabs Filter */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setSheetFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sheetFilter === 'all'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Wszystkie ({verbs.length})
          </button>
          <button
            onClick={() => setSheetFilter(1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sheetFilter === 1
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            Arkusz 1
          </button>
          <button
            onClick={() => setSheetFilter(2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sheetFilter === 2
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            Arkusz 2
          </button>
          <button
            onClick={() => setSheetFilter(3)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sheetFilter === 3
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
            }`}
          >
            Arkusz 3
          </button>
          <button
            onClick={() => setSheetFilter(4)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sheetFilter === 4
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            Arkusz 4
          </button>
          <button
            onClick={() => setSheetFilter(5)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sheetFilter === 5
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
            }`}
          >
            Arkusz 5
          </button>
        </div>
      </div>

      {/* Grid of Flashcards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredVerbs.map((v) => {
          const isMastered = masteredIds.has(v.id);
          const isSelected = selectedVerbId === v.id;

          return (
            <div
              key={v.id}
              onClick={() => onSelectVerb(v)}
              className={`group bg-white rounded-3xl p-4 border-2 transition-all cursor-pointer flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 ${
                isSelected
                  ? 'border-amber-500 shadow-md ring-2 ring-amber-200'
                  : 'border-slate-100 hover:border-amber-200'
              }`}
            >
              <div>
                {/* Header: Sheet Tag & Emoji */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">
                    Arkusz {v.sheet}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isMastered && (
                      <span className="bg-emerald-100 text-emerald-700 text-xs px-1.5 py-0.5 rounded-md font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Opanowane
                      </span>
                    )}
                    <span className="text-xl">{v.emoji}</span>
                  </div>
                </div>

                {/* English Verb */}
                <div className="mb-2">
                  <h3 className="font-extrabold text-lg text-slate-800 capitalize leading-tight group-hover:text-amber-600 transition-colors">
                    {v.verb}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {v.phonetic}
                  </p>
                </div>

                {/* Polish Translation */}
                <p className="text-sm font-bold text-indigo-900 mb-3 bg-amber-50/70 px-2.5 py-1 rounded-xl border border-amber-100/70 inline-block">
                  {v.translation}
                </p>

                {/* Simple 4th grade sentence preview in green */}
                <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/80 mb-3 text-left">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-800 uppercase tracking-tight">
                      Zdanie (angielski):
                    </span>
                  </div>
                  <p className="text-xs font-bold text-emerald-600 line-clamp-2">
                    "{v.sentence}"
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {v.sentenceTranslation}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={(e) => handleQuickListen(e, v.verb)}
                  className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors flex items-center justify-center shrink-0"
                  title="Wymowa audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectVerb(v)}
                  className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Ćwicz (2x powtórz)
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVerbs.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">Nie znaleziono słówek pasujących do wyszukiwania.</p>
          <button
            onClick={() => {
              setSearch('');
              setSheetFilter('all');
            }}
            className="mt-3 px-4 py-2 bg-amber-500 text-white font-bold rounded-xl text-xs"
          >
            Wyczyść filtry
          </button>
        </div>
      )}
    </div>
  );
};
