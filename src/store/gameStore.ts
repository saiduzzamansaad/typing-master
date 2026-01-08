import { create } from 'zustand';

interface GameState {
  // Game state
  isPaused: boolean;
  isCompleted: boolean;
  errorStats: Record<string, number>;
  wpmHistory: number[];
  
  // Actions
  setIsPaused: (paused: boolean) => void;
  setIsCompleted: (completed: boolean) => void;
  addError: (key: string) => void;
  addWpmToHistory: (wpm: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  isPaused: false,
  isCompleted: false,
  errorStats: {},
  wpmHistory: [],
  
  setIsPaused: (isPaused) => set({ isPaused }),
  setIsCompleted: (isCompleted) => set({ isCompleted }),
  
  addError: (key) =>
    set((state) => ({
      errorStats: {
        ...state.errorStats,
        [key]: (state.errorStats[key] || 0) + 1,
      },
    })),
    
  addWpmToHistory: (wpm) =>
    set((state) => ({
      wpmHistory: [...state.wpmHistory, wpm].slice(-60), // Keep last 60 seconds
    })),
    
  resetGame: () =>
    set({
      isPaused: false,
      isCompleted: false,
      errorStats: {},
      wpmHistory: [],
    }),
}));