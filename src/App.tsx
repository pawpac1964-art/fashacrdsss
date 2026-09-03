/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PracticeCard } from './components/PracticeCard';
import { VerbGrid } from './components/VerbGrid';
import { VERBS_DATA } from './data/verbs';
import { VerbItem } from './types';
import { Sparkles, Trophy, BookOpen, Layers, Award, RefreshCw, Volume2 } from 'lucide-react';

export default function App() {
  const [verbs] = useState<VerbItem[]>(VERBS_DATA);
  const [currentVerbIndex, setCurrentVerbIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'card' | 'grid'>('card');
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<number>(0.85);
  
  // Local storage persisted progress
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('school_stars');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('school_mastered');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('school_stars', stars.toString());
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }, [stars]);

  useEffect(() => {
    try {
      localStorage.setItem('school_mastered', JSON.stringify(Array.from(masteredIds)));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }, [masteredIds]);

  const currentVerb = verbs[currentVerbIndex] || verbs[0];

  const handleNextVerb = () => {
    if (currentVerbIndex < verbs.length - 1) {
      setCurrentVerbIndex((prev) => prev + 1);
    } else {
      setCurrentVerbIndex(0);
    }
  };

  const handlePrevVerb = () => {
    if (currentVerbIndex > 0) {
      setCurrentVerbIndex((prev) => prev - 1);
    }
  };

  const handleSelectVerbFromGrid = (verb: VerbItem) => {
    const idx = verbs.findIndex((v) => v.id === verb.id);
    if (idx !== -1) {
      setCurrentVerbIndex(idx);
      setViewMode('card');
    }
  };

  const handleEarnStar = () => {
    setStars((prev) => prev + 1);
    setMasteredIds((prev) => {
      const next = new Set(prev);
      next.add(currentVerb.id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-orange-50/20 to-slate-50 flex flex-col">
      {/* Navigation Header */}
      <Header
        stars={stars}
        autoSpeak={autoSpeak}
        onToggleAutoSpeak={() => setAutoSpeak((prev) => !prev)}
        speechRate={speechRate}
        onChangeSpeechRate={(rate) => setSpeechRate(rate)}
        viewMode={viewMode}
        onToggleViewMode={(mode) => setViewMode(mode)}
        masteredCount={masteredIds.size}
        totalCount={verbs.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Informative Subheader for Grade 4 Primary School */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-100/90 text-amber-900 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Angielski dla Klasy IV • Poziom A1-A2 • Wszystkie słówka z 5 kartek</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Ucz się angielskich czasowników z obrazków
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Posłuchaj wymowy, powtórz słówko <strong>dwa razy</strong>, a potem powtórz <strong className="text-emerald-600 font-black">zielone zdanie angielskie</strong> z tym słówkiem!
          </p>
        </div>

        {/* View Toggle Content */}
        {viewMode === 'card' ? (
          <div className="space-y-6">
            <PracticeCard
              verb={currentVerb}
              onNext={handleNextVerb}
              onPrev={handlePrevVerb}
              hasPrev={currentVerbIndex > 0}
              hasNext={currentVerbIndex < verbs.length - 1}
              onEarnStar={handleEarnStar}
              autoSpeak={autoSpeak}
              speechRate={speechRate}
            />

            {/* Quick selector of neighboring verbs */}
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 text-xs">
              <span className="font-bold text-slate-500">
                Karta {currentVerbIndex + 1} z {verbs.length}
              </span>

              <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-xs sm:max-w-md">
                {verbs.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setCurrentVerbIndex(i)}
                    className={`w-6 h-6 rounded-lg font-bold shrink-0 transition-all ${
                      i === currentVerbIndex
                        ? 'bg-amber-500 text-white shadow-xs scale-110'
                        : masteredIds.has(v.id)
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title={`${v.verb} (${v.translation})`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setViewMode('grid')}
                className="font-bold text-amber-700 hover:text-amber-800 underline underline-offset-2 shrink-0"
              >
                Pokaż wszystkie
              </button>
            </div>
          </div>
        ) : (
          <VerbGrid
            verbs={verbs}
            onSelectVerb={handleSelectVerbFromGrid}
            selectedVerbId={currentVerb.id}
            masteredIds={masteredIds}
            speechRate={speechRate}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-400 border-t border-slate-200 bg-white/50 mt-auto">
        <p>
          Angielski dla Klasy IV SP • Pełny komplet 5 arkuszy: Basic Verbs (Flashcards 01, 02, 03, 04, 05) • Wymowa i powtarzanie zdań
        </p>
      </footer>
    </div>
  );
}
