export type SheetNumber = 1 | 2 | 3 | 4 | 5;

export type VerbCategory = 
  | 'daily'      // Codzienne czynności
  | 'action'     // Ruch i sport
  | 'school'     // Szkoła i nauka
  | 'food_home'  // Dom i jedzenie
  | 'emotions'   // Emocje i relacje
  | 'opposites'; // Przeciwieństwa

export interface VerbItem {
  id: string;
  sheet: SheetNumber;
  verb: string;
  translation: string;
  phonetic: string;
  sentence: string;
  sentenceTranslation: string;
  category: VerbCategory;
  categoryLabel: string;
  emoji: string;
  illustrationType: string;
  tip?: string; // Porada językowa dla klasy IV
}

export type StepKey = 
  | 'listen_word'      // 1. Odsłuch słówka (automatyczny)
  | 'repeat_word_1'    // 2. Pierwsze powtórzenie słówka przez dziecko
  | 'repeat_word_2'    // 3. Drugie powtórzenie słówka przez dziecko
  | 'listen_sentence'  // 4. Odsłuch prostego zdania (klasa 4, A1-A2)
  | 'repeat_sentence'  // 5. Powtórzenie zdania przez dziecko
  | 'done';            // 6. Sukces!

export interface VerbProgress {
  verbId: string;
  timesPracticed: number;
  starsEarned: number;
  lastPracticed?: string;
  mastered: boolean;
}

export interface UserStats {
  totalStars: number;
  verbsMastered: number;
  streakDays: number;
  sentencesRepeated: number;
}
