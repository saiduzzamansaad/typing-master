import React from 'react';
import { Keyboard, Settings, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { useTypingStore, useSettingsStore } from '../../store';

export const TopBar: React.FC = () => {
  const { personalBest } = useTypingStore();
  const { setSoundEnabled, soundEnabled, setBackspaceControl, backspaceControl } = useSettingsStore();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Keyboard className="w-8 h-8 text-blue-500" />
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            TypeQuest
          </h1>
          <p className="text-xs text-gray-500">2026 Edition</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold">PB: {personalBest} WPM</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-lg transition-colors ${
            soundEnabled
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-400'
          }`}
          title={soundEnabled ? 'Sound On' : 'Sound Off'}
        >
          <Settings className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setBackspaceControl(!backspaceControl)}
          className={`p-2 rounded-lg transition-colors ${
            backspaceControl
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-400'
          }`}
          title={backspaceControl ? 'Backspace Enabled' : 'Backspace Disabled'}
        >
          ←
        </motion.button>

        <ThemeToggle />
      </div>
    </div>
  );
};