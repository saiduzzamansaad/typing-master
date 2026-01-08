export const GAME_MODES = {
      TIME: 'time',
      WORDS: 'words',
      DEVELOPER: 'developer',
      ZEN: 'zen',
    } as const;
    
    export const TIME_LIMITS = [15, 30, 60, 120] as const;
    export const WORD_LIMITS = [10, 25, 50, 100] as const;
    
    export const DEVELOPER_LANGUAGES = [
      'javascript',
      'python',
      'typescript',
      'html',
      'css',
      'java',
      'csharp',
      'cpp',
    ] as const;
    
    export const KEYBOARD_LAYOUT = [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
      ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
      ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl'],
    ] as const;
    
    export const DEFAULT_SETTINGS = {
      theme: 'dark' as const,
      soundEnabled: true,
      volume: 0.5,
      cursorSmoothness: 1,
      backspaceControl: true,
      showHeatmap: true,
      wordWrap: true,
    };
    
    export const SOUND_FREQUENCIES = {
      NORMAL: 400,
      SPACE: 80,
      BACKSPACE: 120,
      SHIFT: 200,
      ERROR: 300,
    } as const;
    
    export const ACHIEVEMENTS = {
      SPEED_DEMON: { threshold: 100, name: 'Speed Demon' },
      ACCURACY_MASTER: { threshold: 99, name: 'Accuracy Master' },
      MARATHON_RUNNER: { threshold: 1000, name: 'Marathon Runner' },
      PERFECTIONIST: { threshold: 100, name: 'Perfectionist' },
    } as const;