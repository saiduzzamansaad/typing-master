import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TypingState {
  // Core state
  text: string;
  userInput: string;
  currentIndex: number;
  correctChars: number;
  errorChars: number;
  isTyping: boolean;
  isFinished: boolean;
  showResults: boolean;
  
  // Game state
  gameMode: 'time' | 'words' | 'developer' | 'zen';
  timeLimit: number;
  wordLimit: number;
  selectedLanguage: string;
  
  // Stats
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  totalTime: number;
  startTime: number | null;
  
  // History
  history: Array<{
    wpm: number;
    accuracy: number;
    mode: string;
    timestamp: number;
  }>;
  personalBest: number;
  
  // Actions
  setText: (text: string) => void;
  setUserInput: (input: string) => void;
  setCurrentIndex: (index: number) => void;
  incrementCorrectChars: () => void;
  incrementErrorChars: () => void;
  setIsTyping: (typing: boolean) => void;
  setIsFinished: (finished: boolean) => void;
  setShowResults: (show: boolean) => void;
  setGameMode: (mode: TypingState['gameMode']) => void;
  setTimeLimit: (limit: number) => void;
  setWordLimit: (limit: number) => void;
  setSelectedLanguage: (language: string) => void;
  setWpm: (wpm: number) => void;
  setRawWpm: (rawWpm: number) => void;
  setAccuracy: (accuracy: number) => void;
  setConsistency: (consistency: number) => void;
  setStartTime: (time: number | null) => void;
  addToHistory: (entry: TypingState['history'][0]) => void;
  setPersonalBest: (best: number) => void;
  reset: () => void;
}

const initialState = {
  text: '',
  userInput: '',
  currentIndex: 0,
  correctChars: 0,
  errorChars: 0,
  isTyping: false,
  isFinished: false,
  showResults: false,
  gameMode: 'time' as const,
  timeLimit: 60,
  wordLimit: 50,
  selectedLanguage: 'english',
  wpm: 0,
  rawWpm: 0,
  accuracy: 100,
  consistency: 100,
  totalTime: 0,
  startTime: null,
  history: [],
  personalBest: 0,
};

export const useTypingStore = create<TypingState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setText: (text) => set({ text }),
      setUserInput: (userInput) => set({ userInput }),
      setCurrentIndex: (currentIndex) => set({ currentIndex }),
      incrementCorrectChars: () => set((state) => ({ correctChars: state.correctChars + 1 })),
      incrementErrorChars: () => set((state) => ({ errorChars: state.errorChars + 1 })),
      setIsTyping: (isTyping) => set({ isTyping }),
      setIsFinished: (isFinished) => set({ isFinished }),
      setShowResults: (showResults) => set({ showResults }),
      setGameMode: (gameMode) => set({ gameMode }),
      setTimeLimit: (timeLimit) => set({ timeLimit }),
      setWordLimit: (wordLimit) => set({ wordLimit }),
      setSelectedLanguage: (selectedLanguage) => set({ selectedLanguage }),
      setWpm: (wpm) => set({ wpm }),
      setRawWpm: (rawWpm) => set({ rawWpm }),
      setAccuracy: (accuracy) => set({ accuracy }),
      setConsistency: (consistency) => set({ consistency }),
      setStartTime: (startTime) => set({ startTime }),
      
      addToHistory: (entry) => 
        set((state) => ({ 
          history: [entry, ...state.history].slice(0, 50) 
        })),
      
      setPersonalBest: (personalBest) => {
        if (personalBest > get().personalBest) {
          set({ personalBest });
        }
      },
      
      reset: () => set({
        ...initialState,
        gameMode: get().gameMode,
        timeLimit: get().timeLimit,
        wordLimit: get().wordLimit,
        selectedLanguage: get().selectedLanguage,
        history: get().history,
        personalBest: get().personalBest,
      }),
    }),
    {
      name: 'typequest-storage',
      partialize: (state) => ({
        history: state.history,
        personalBest: state.personalBest,
      }),
    }
  )
);