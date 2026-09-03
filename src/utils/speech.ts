// Web Speech API wrapper for speech synthesis and recognition

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  lang?: string;
}

let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export function getEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices();
  
  // Prefer natural English voices (US, GB, or Google English)
  const preferred = voices.find(
    v => (v.lang.startsWith('en-') || v.lang === 'en') && 
         (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
  );
  if (preferred) return preferred;

  return voices.find(v => v.lang.startsWith('en-') || v.lang === 'en') || null;
}

export function speakText(text: string, options: SpeechOptions = {}): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      options.onEnd?.();
      resolve();
      return;
    }

    // Cancel any currently playing speech to avoid overlapping
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'en-US';
    utterance.rate = options.rate ?? 0.85; // slightly slower for 4th-grade primary school learners
    utterance.pitch = options.pitch ?? 1.05; // slightly cheerful tone
    utterance.volume = options.volume ?? 1.0;

    const voice = getEnglishVoice();
    if (voice && (!options.lang || options.lang.startsWith('en'))) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      options.onEnd?.();
      resolve();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      options.onEnd?.();
      resolve();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Failed to speak:', err);
      options.onEnd?.();
      resolve();
    }
  });
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeechRecognitionAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

// Clean text for speech comparison
export function cleanSpokenText(str: string): string {
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"–—]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Fuzzy matching to verify child's pronunciation
export function checkPronunciationMatch(spoken: string, target: string): { matches: boolean; score: number } {
  const cleanSpoken = cleanSpokenText(spoken);
  const cleanTarget = cleanSpokenText(target);

  if (!cleanSpoken || !cleanTarget) return { matches: false, score: 0 };

  if (cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
    return { matches: true, score: 100 };
  }

  // Token level match
  const targetWords = cleanTarget.split(' ');
  const spokenWords = cleanSpoken.split(' ');
  
  let matchedCount = 0;
  targetWords.forEach(tw => {
    if (spokenWords.some(sw => sw.includes(tw) || tw.includes(sw))) {
      matchedCount++;
    }
  });

  const score = Math.round((matchedCount / targetWords.length) * 100);
  return {
    matches: score >= 50,
    score
  };
}
