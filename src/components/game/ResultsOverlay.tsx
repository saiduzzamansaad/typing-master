import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, TrendingUp, RotateCcw, Share2 } from 'lucide-react';
import { useTypingStore } from '../../store';
import { SessionGraph } from '../stats/SessionGraph';

export const ResultsOverlay: React.FC = () => {
  const {
    wpm,
    rawWpm,
    accuracy,
    consistency,
    correctChars,
    errorChars,
    gameMode,
    timeLimit,
    wordLimit,
    personalBest,
    reset,
    setShowResults,
  } = useTypingStore();

  const isNewRecord = wpm > personalBest;

  const handleRestart = () => {
    reset();
    setShowResults(false);
  };

  const handleShare = async () => {
    const text = `🏆 TypeQuest 2026 Result:
🚀 WPM: ${Math.round(wpm)} | 📊 Accuracy: ${accuracy.toFixed(1)}%
🎮 Mode: ${gameMode} | 🏆 PB: ${personalBest} WPM

Try it yourself at TypeQuest 2026!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Typing Results',
          text: text,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50"
    >
      <div className="text-center mb-8">
        {isNewRecord && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 rounded-full mb-4"
          >
            <Trophy className="w-5 h-5" />
            <span className="font-bold">NEW PERSONAL BEST!</span>
          </motion.div>
        )}
        
        <h2 className="text-3xl font-bold mb-2">Session Complete!</h2>
        <p className="text-gray-400">
          {gameMode === 'time' 
            ? `${timeLimit} Second Challenge`
            : gameMode === 'words'
            ? `${wordLimit} Words Challenge`
            : gameMode === 'developer'
            ? 'Developer Mode'
            : 'Zen Mode'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-center"
        >
          <Zap className="w-8 h-8 mx-auto mb-2" />
          <div className="text-4xl font-bold mb-1">{Math.round(wpm)}</div>
          <div className="text-sm opacity-90">WPM</div>
          <div className="text-xs opacity-75 mt-1">Raw: {Math.round(rawWpm)}</div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-center"
        >
          <Target className="w-8 h-8 mx-auto mb-2" />
          <div className="text-4xl font-bold mb-1">{accuracy.toFixed(1)}%</div>
          <div className="text-sm opacity-90">Accuracy</div>
          <div className="text-xs opacity-75 mt-1">
            {correctChars} correct, {errorChars} errors
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-center"
        >
          <TrendingUp className="w-8 h-8 mx-auto mb-2" />
          <div className="text-4xl font-bold mb-1">{consistency.toFixed(1)}%</div>
          <div className="text-sm opacity-90">Consistency</div>
          <div className="text-xs opacity-75 mt-1">Speed stability</div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-center"
        >
          <Trophy className="w-8 h-8 mx-auto mb-2" />
          <div className="text-4xl font-bold mb-1">{personalBest}</div>
          <div className="text-sm opacity-90">Personal Best</div>
          <div className="text-xs opacity-75 mt-1">All time record</div>
        </motion.div>
      </div>

      <div className="mb-8">
        <SessionGraph />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold"
        >
          <Share2 className="w-5 h-5" />
          Share Results
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            reset();
            setShowResults(false);
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-semibold"
        >
          Back to Menu
        </motion.button>
      </div>
    </motion.div>
  );
};