import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  theme: 'dark' | 'light' | 'system';
  soundEnabled: boolean;
  volume: number;
  cursorSmoothness: number;
  backspaceControl: boolean;
  showHeatmap: boolean;
  wordWrap: boolean;
  
  setTheme: (theme: SettingsState['theme']) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setCursorSmoothness: (smoothness: number) => void;
  setBackspaceControl: (control: boolean) => void;
  setShowHeatmap: (show: boolean) => void;
  setWordWrap: (wrap: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      soundEnabled: true,
      volume: 0.5,
      cursorSmoothness: 1,
      backspaceControl: true,
      showHeatmap: true,
      wordWrap: true,
      
      setTheme: (theme) => set({ theme }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setVolume: (volume) => set({ volume }),
      setCursorSmoothness: (cursorSmoothness) => set({ cursorSmoothness }),
      setBackspaceControl: (backspaceControl) => set({ backspaceControl }),
      setShowHeatmap: (showHeatmap) => set({ showHeatmap }),
      setWordWrap: (wordWrap) => set({ wordWrap }),
    }),
    {
      name: 'typequest-settings',
    }
  )
);