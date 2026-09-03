import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Mic, CheckCircle2, RotateCcw, ArrowRight, ArrowLeft, Sparkles, Star, Lightbulb, VolumeX } from 'lucide-react';
import { VerbItem, StepKey } from '../types';
import { VerbIllustration } from './VerbIllustration';
import { speakText, stopSpeaking, isSpeechRecognitionAvailable, checkPronunciationMatch } from '../utils/speech';
import { playSuccessChime, playCelebrationFanfare, playPromptDing } from '../utils/audio';

interface PracticeCardProps {
  verb: VerbItem;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onEarnStar: () => void;
  autoSpeak: boolean;
  speechRate: number;
}

export const PracticeCard: React.FC<PracticeCardProps> = ({
  verb,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
  onEarnStar,
  autoSpeak,
  speechRate
}) => {
  // Step sequence:
  // 1. listen_word -> automatically speaks verb
  // 2. repeat_word_1 -> asks child to repeat 1st time
  // 3. repeat_word_2 -> asks child to repeat 2nd time
  // 4. listen_sentence -> presents and speaks 4th-grade simple sentence
  // 5. repeat_sentence -> asks child to repeat sentence
  // 6. done -> celebration, star awarded!
  const [currentStep, setCurrentStep] = useState<StepKey>('listen_word');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micTranscript, setMicTranscript] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [completedWordRepeats, setCompletedWordRepeats] = useState(0);
  const recognitionRef = useRef<any>(null);

  // When verb changes, reset steps and play pronunciation if autoSpeak is true
  useEffect(() => {
    setCurrentStep('listen_word');
    setCompletedWordRepeats(0);
    setMicTranscript('');
    setFeedbackMsg('');
    stopSpeaking();

    if (autoSpeak) {
      const timer = setTimeout(() => {
        handleSpeakWord(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [verb.id, autoSpeak, speechRate]);

  // Handle speaking the verb
  const handleSpeakWord = async (advanceAfter = false) => {
    setIsSpeaking(true);
    await speakText(verb.verb, {
      rate: speechRate,
      onEnd: () => {
        setIsSpeaking(false);
        if (advanceAfter) {
          playPromptDing();
          setCurrentStep('repeat_word_1');
        }
      }
    });
  };

  // Handle speaking the 4th-grade sentence
  const handleSpeakSentence = async (advanceAfter = false) => {
    setIsSpeaking(true);
    await speakText(verb.sentence, {
      rate: speechRate,
      onEnd: () => {
        setIsSpeaking(false);
        if (advanceAfter) {
          playPromptDing();
          setCurrentStep('repeat_sentence');
        }
      }
    });
  };

  // Child confirms repeating word 1st time
  const handleRepeatWord1 = () => {
    playSuccessChime();
    setCompletedWordRepeats(1);
    setFeedbackMsg('Świetnie! Powiedz jeszcze raz!');
    setTimeout(() => {
      setCurrentStep('repeat_word_2');
      setFeedbackMsg('');
    }, 450);
  };

  // Child confirms repeating word 2nd time
  const handleRepeatWord2 = () => {
    playSuccessChime();
    setCompletedWordRepeats(2);
    setFeedbackMsg('Wspaniale! Opanowałeś słówko!');
    setTimeout(() => {
      setCurrentStep('listen_sentence');
      setFeedbackMsg('');
      // Speak sentence automatically
      if (autoSpeak) {
        handleSpeakSentence(true);
      }
    }, 550);
  };

  // Child confirms repeating sentence
  const handleRepeatSentence = () => {
    playCelebrationFanfare();
    setCurrentStep('done');
    onEarnStar();
  };

  // Speech Recognition (Mic integration)
  const startMic = (targetText: string, onSuccess: () => void) => {
    if (!isSpeechRecognitionAvailable()) {
      onSuccess();
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      onSuccess();
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setMicTranscript('Słucham cię...');
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setMicTranscript(transcript);

        const check = checkPronunciationMatch(transcript, targetText);
        if (check.matches) {
          recognition.stop();
          setIsListening(false);
          setFeedbackMsg('Doskonale cię usłyszałem! 🌟');
          onSuccess();
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('Speech recognition failed to start:', e);
      setIsListening(false);
      onSuccess();
    }
  };

  return (
    <div id="practice-card-container" className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border-4 border-amber-100 overflow-hidden">
      {/* Top Banner / Progress within current word */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 px-6 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide">
            Arkusz {verb.sheet}
          </span>
          <span className="text-xs font-medium text-amber-50">
            Klasa IV • Poziom A1-A2
          </span>
        </div>
        
        {/* Step indicator pills */}
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${currentStep === 'listen_word' ? 'bg-white scale-125' : 'bg-white/40'}`} title="1. Odsłuch" />
          <span className={`w-2.5 h-2.5 rounded-full ${currentStep === 'repeat_word_1' ? 'bg-white scale-125' : completedWordRepeats >= 1 ? 'bg-emerald-300' : 'bg-white/40'}`} title="2. Powtórzenie 1" />
          <span className={`w-2.5 h-2.5 rounded-full ${currentStep === 'repeat_word_2' ? 'bg-white scale-125' : completedWordRepeats >= 2 ? 'bg-emerald-300' : 'bg-white/40'}`} title="3. Powtórzenie 2" />
          <span className={`w-2.5 h-2.5 rounded-full ${currentStep === 'listen_sentence' ? 'bg-white scale-125' : 'bg-white/40'}`} title="4. Zdanie" />
          <span className={`w-2.5 h-2.5 rounded-full ${currentStep === 'repeat_sentence' ? 'bg-white scale-125' : currentStep === 'done' ? 'bg-emerald-300' : 'bg-white/40'}`} title="5. Powtórz zdanie" />
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col items-center text-center">
        {/* 1. OBRAZEK (Illustration) */}
        <motion.div 
          key={verb.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-5 relative"
        >
          <VerbIllustration type={verb.illustrationType} emoji={verb.emoji} />
          {isSpeaking && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
              className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2.5 rounded-full shadow-lg"
            >
              <Volume2 className="w-5 h-5 animate-pulse" />
            </motion.div>
          )}
        </motion.div>

        {/* 2. SŁÓWKO I WYMOWA */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight capitalize">
              {verb.verb}
            </h2>
            <button
              id="listen-word-btn"
              onClick={() => handleSpeakWord(false)}
              className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors shadow-xs"
              title="Posłuchaj wymowy jeszcze raz"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
          
          <div className="text-sm font-medium text-slate-400 mt-0.5">
            {verb.phonetic}
          </div>
        </div>

        {/* 3. TŁUMACZENIE (Polish translation) */}
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-1.5 rounded-xl font-bold text-lg sm:text-xl mb-3 shadow-xs">
          <span>Znaczenie:</span>
          <span className="text-indigo-950 font-black">{verb.translation}</span>
        </div>

        {/* ZIELONE ZDANIE PO ANGIELSKU Z TYM SŁÓWKIEM (ZGODNIE Z PROŚBĄ UŻYTKOWNIKA) */}
        <div className="w-full bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-3.5 mb-5 text-left flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">
                Zdanie po angielsku (z zielonym napisem):
              </span>
            </div>
            <p className="text-base sm:text-lg font-black text-emerald-600 tracking-wide">
              "{verb.sentence}"
            </p>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">
              {verb.sentenceTranslation}
            </p>
          </div>
          <button
            onClick={() => handleSpeakSentence(false)}
            className="p-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors shrink-0 shadow-2xs"
            title="Posłuchaj zielonego zdania"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================
            4. DYNAMICZNA OBSŁUGA KROKÓW (KAZ DZIECKU POWTÓRZYĆ 2 RAZY I ZDANIE)
           ======================================================== */}
        <div className="w-full bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 mb-6">
          <AnimatePresence mode="wait">
            {/* KROK 1: Słuchanie słówka */}
            {currentStep === 'listen_word' && (
              <motion.div 
                key="step-listen-word"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <p className="text-slate-600 font-medium">
                  Posłuchaj uważnie, jak brzmi to słówko po angielsku:
                </p>
                <button
                  id="start-repeat-1-btn"
                  onClick={() => handleSpeakWord(true)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-lg rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  <Volume2 className="w-5 h-5" />
                  Posłuchaj i zacznij powtarzać!
                </button>
              </motion.div>
            )}

            {/* KROK 2: Powtórz słówko 1. raz (1/2) */}
            {currentStep === 'repeat_word_1' && (
              <motion.div 
                key="step-repeat-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="bg-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Krok 1 z 2
                  </span>
                  <span className="font-extrabold text-slate-800 text-lg">
                    Powtórz słówko na głos! 🗣️
                  </span>
                </div>
                
                <p className="text-slate-600 text-sm">
                  Powiedz wyraźnie: <strong className="text-indigo-600 text-base font-black">"{verb.verb}"</strong>
                </p>

                {micTranscript && (
                  <div className="text-xs text-indigo-700 bg-indigo-50 p-2 rounded-lg">
                    {micTranscript}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    id="confirm-repeat-1-btn"
                    onClick={handleRepeatWord1}
                    className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    Powtórzyłem! (1/2) 👍
                  </button>
                  
                  {isSpeechRecognitionAvailable() && (
                    <button
                      onClick={() => startMic(verb.verb, handleRepeatWord1)}
                      className={`w-full sm:w-auto px-4 py-3.5 border-2 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors ${
                        isListening 
                          ? 'border-red-500 bg-red-50 text-red-700 animate-pulse' 
                          : 'border-slate-300 hover:border-slate-400 bg-white text-slate-700'
                      }`}
                    >
                      <Mic className="w-5 h-5 text-indigo-600" />
                      {isListening ? 'Słucham cię...' : 'Mów do mikrofonu'}
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* KROK 3: Powtórz słówko 2. raz (2/2) */}
            {currentStep === 'repeat_word_2' && (
              <motion.div 
                key="step-repeat-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="bg-indigo-600 text-white text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Krok 2 z 2
                  </span>
                  <span className="font-extrabold text-slate-800 text-lg">
                    Super! Powtórz jeszcze raz! 🔁
                  </span>
                </div>

                <p className="text-slate-600 text-sm">
                  Dla pewności powtórz drugi raz: <strong className="text-indigo-600 text-base font-black">"{verb.verb}"</strong>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    id="confirm-repeat-2-btn"
                    onClick={handleRepeatWord2}
                    className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                    Powtórzyłem drugi raz! (2/2) ⭐
                  </button>

                  {isSpeechRecognitionAvailable() && (
                    <button
                      onClick={() => startMic(verb.verb, handleRepeatWord2)}
                      className="w-full sm:w-auto px-4 py-3.5 border-2 border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-bold rounded-2xl flex items-center justify-center gap-2"
                    >
                      <Mic className="w-5 h-5 text-indigo-600" />
                      Mikrofon
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* KROK 4: NAJPROSTSZE ZDANIE DLA KLASY IV (Odsłuch) */}
            {currentStep === 'listen_sentence' && (
              <motion.div 
                key="step-listen-sentence"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide">
                  <span>🟢 Klasa IV Podstawowa • Angielskie zdanie z tym słówkiem</span>
                </div>

                {/* Zdanie po angielsku W KOLORZE ZIELONYM i polsku */}
                <div className="bg-emerald-50/80 p-4 sm:p-5 rounded-2xl border-2 border-emerald-300 shadow-xs text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block mb-1">
                        Zdanie po angielsku (zielony kolor):
                      </span>
                      <p className="text-xl sm:text-2xl font-black text-emerald-600 leading-relaxed tracking-wide">
                        {verb.sentence}
                      </p>
                      <p className="text-sm font-semibold text-slate-600 mt-2">
                        {verb.sentenceTranslation}
                      </p>
                    </div>
                    <button
                      id="play-sentence-btn"
                      onClick={() => handleSpeakSentence(false)}
                      className="p-3 rounded-xl bg-emerald-200 hover:bg-emerald-300 text-emerald-900 transition-colors shrink-0 shadow-xs"
                      title="Posłuchaj zdania"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <button
                  id="start-repeat-sentence-btn"
                  onClick={() => {
                    playPromptDing();
                    setCurrentStep('repeat_sentence');
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-lg rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  <Volume2 className="w-5 h-5" />
                  Teraz ja powtórzę zielone zdanie! 🎯
                </button>
              </motion.div>
            )}

            {/* KROK 5: POWTÓRZ NAJPROSTSZE ZDANIE */}
            {currentStep === 'repeat_sentence' && (
              <motion.div 
                key="step-repeat-sentence"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="bg-emerald-50/90 p-4 sm:p-5 rounded-2xl border-2 border-emerald-400 shadow-xs text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block mb-1">
                        Powtórz całe zdanie na głos (napisane zielonym kolorem):
                      </span>
                      <p className="text-xl sm:text-2xl font-black text-emerald-600 tracking-wide leading-relaxed">
                        "{verb.sentence}"
                      </p>
                      <p className="text-sm font-medium text-slate-600 mt-2">
                        Znaczenie: {verb.sentenceTranslation}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSpeakSentence(false)}
                      className="p-2.5 rounded-lg bg-emerald-200 hover:bg-emerald-300 text-emerald-900 shrink-0"
                      title="Odsłuchaj jeszcze raz"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    id="confirm-repeat-sentence-btn"
                    onClick={handleRepeatSentence}
                    className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
                    Powtórzyłem zdanie! Zdobywam gwiazdkę! 🌟
                  </button>

                  {isSpeechRecognitionAvailable() && (
                    <button
                      onClick={() => startMic(verb.sentence, handleRepeatSentence)}
                      className="w-full sm:w-auto px-4 py-3.5 border-2 border-indigo-300 hover:border-indigo-400 bg-white text-indigo-800 font-bold rounded-2xl flex items-center justify-center gap-2"
                    >
                      <Mic className="w-5 h-5 text-indigo-600" />
                      Mikrofon
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* KROK 6: SUKCES (Done) */}
            {currentStep === 'done' && (
              <motion.div 
                key="step-done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 py-2"
              >
                <div className="flex items-center justify-center gap-2 text-emerald-600 font-black text-2xl">
                  <Sparkles className="w-7 h-7 text-amber-500 fill-amber-500 animate-spin" />
                  <span>Brawo! Karta zaliczona!</span>
                  <Sparkles className="w-7 h-7 text-amber-500 fill-amber-500" />
                </div>
                
                <p className="text-slate-600 font-medium">
                  Powtórzyłeś słówko 2 razy i opanowałeś proste zdanie dla klasy 4!
                </p>

                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-left max-w-md mx-auto">
                  <span className="text-[11px] font-black text-emerald-800 uppercase block mb-0.5">
                    Opanowane zielone zdanie:
                  </span>
                  <p className="text-base font-black text-emerald-600">
                    "{verb.sentence}"
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {verb.sentenceTranslation}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCurrentStep('listen_word');
                      handleSpeakWord(true);
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Przećwicz jeszcze raz
                  </button>

                  {hasNext && (
                    <button
                      id="next-verb-btn"
                      onClick={onNext}
                      className="px-7 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold rounded-xl text-base shadow-md flex items-center gap-2"
                    >
                      Następne słówko
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {feedbackMsg && (
            <p className="text-emerald-700 font-bold text-sm mt-3 animate-pulse">
              {feedbackMsg}
            </p>
          )}
        </div>

        {/* Cenna wskazówka dla ucznia klasy 4 */}
        {verb.tip && (
          <div className="w-full bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 text-left flex items-start gap-2.5 text-xs text-amber-900 mb-4">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Wskazówka językowa: </span>
              <span>{verb.tip}</span>
            </div>
          </div>
        )}

        {/* Dolna nawigacja poprzedni / następny */}
        <div className="w-full flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
              hasPrev ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'opacity-40 cursor-not-allowed text-slate-400'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Poprzednie
          </button>

          <span className="text-xs font-semibold text-slate-400">
            {verb.categoryLabel}
          </span>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
              hasNext ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs' : 'opacity-40 cursor-not-allowed text-slate-400'
            }`}
          >
            Następne
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
