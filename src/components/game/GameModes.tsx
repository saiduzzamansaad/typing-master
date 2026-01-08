import React from 'react';
import { Clock, Hash, Code, Zen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTypingStore } from '../../store';

const MODES = [
  { id: 'time', label: 'Time Mode', icon: Clock, durations: [15, 30, 60, 120] },
  { id: 'words', label: 'Word Count', icon: Hash, counts: [10, 25, 50, 100] },
  { id: 'developer', label: 'Developer Mode', icon: Code, languages: ['javascript', 'python', 'typescript', 'html'] },
  { id: 'zen', label: 'Zen Mode', icon: Zen },
] as const;

export const GameModes: React.FC = () => {
  const {
    gameMode,
    timeLimit,
    wordLimit,
    selectedLanguage,
    setGameMode,
    setTimeLimit,
    setWordLimit,
    setSelectedLanguage,
    reset,
  } = useTypingStore();

  const currentMode = MODES.find(mode => mode.id === gameMode);

  const handleModeChange = (newMode: typeof gameMode) => {
    setGameMode(newMode);
    reset();
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h2 className="text-xl font-semibold mb-4 text-gray-200">Game Modes</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {MODES.map((mode) => (
          <motion.button
            key={mode.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleModeChange(mode.id)}
            className={`p-4 rounded-xl transition-all duration-200 ${
              gameMode === mode.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
            }`}
          >
            <mode.icon className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">{mode.label}</span>
          </motion.button>
        ))}
      </div>

      {currentMode && (
        <div className="mt-6">
          {gameMode === 'time' && (
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-300">Select Duration</h3>
              <div className="flex flex-wrap gap-3">
                {currentMode.durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setTimeLimit(duration)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      timeLimit === duration
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {duration}s
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameMode === 'words' && (
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-300">Word Count</h3>
              <div className="flex flex-wrap gap-3">
                {currentMode.counts.map((count) => (
                  <button
                    key={count}
                    onClick={() => setWordLimit(count)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      wordLimit === count
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {count} words
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameMode === 'developer' && (
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-300">Programming Language</h3>
              <div className="flex flex-wrap gap-3">
                {currentMode.languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => setSelectedLanguage(language)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedLanguage === language
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameMode === 'zen' && (
            <div className="text-center py-4">
              <p className="text-gray-400">
                No pressure, no timer. Just focus on your typing rhythm.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};