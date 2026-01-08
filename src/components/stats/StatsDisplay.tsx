import React from 'react';
import { TrendingUp, Target, Zap, Award, Clock, Hash, Code, ZapOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTypingStore } from '../../store';
import { SessionGraph } from './SessionGraph';
import { BentoGrid } from './BentoGrid';

export const StatsDisplay: React.FC = () => {
  const {
    wpm,
    rawWpm,
    accuracy,
    consistency,
    personalBest,
    isTyping,
    gameMode,
    timeLimit,
    wordLimit,
    correctChars,
    errorChars,
  } = useTypingStore();

  const stats = [
    {
      label: 'WPM',
      value: Math.round(wpm),
      subValue: `Raw: ${Math.round(rawWpm)}`,
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Accuracy',
      value: `${accuracy.toFixed(1)}%`,
      subValue: `${correctChars} correct, ${errorChars} errors`,
      icon: Target,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Consistency',
      value: `${consistency.toFixed(1)}%`,
      subValue: 'Speed stability',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Personal Best',
      value: personalBest,
      subValue: 'WPM Record',
      icon: Award,
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const modeInfo = {
    time: { icon: Clock, label: 'Time Mode', value: `${timeLimit}s` },
    words: { icon: Hash, label: 'Word Count', value: `${wordLimit} words` },
    developer: { icon: Code, label: 'Developer Mode', value: 'Coding Practice' },
    zen: { icon: ZapOff, label: 'Zen Mode', value: 'No Pressure' },
  };

  const currentMode = modeInfo[gameMode];

  return (
    <div className="space-y-6">
      {/* Main Stats Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-200">Live Statistics</h2>
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 rounded-lg">
            <currentMode.icon className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">{currentMode.label}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white`}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5" />
                <span className="text-sm opacity-90">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs opacity-75">{stat.subValue}</div>
            </motion.div>
          ))}
        </div>

        <SessionGraph />
      </div>

      <BentoGrid />

      {/* Typing Tips Card (Keyboard Heatmap এর পরিবর্তে) */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Typing Tips</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-blue-400 font-bold">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-200 mb-1">Home Row Position</h4>
              <p className="text-sm text-gray-400">
                Keep your fingers on ASDF (left hand) and JKL; (right hand) for faster typing
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-green-400 font-bold">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-200 mb-1">Accuracy First</h4>
              <p className="text-sm text-gray-400">
                Focus on accuracy over speed. Speed will naturally improve with practice
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <span className="text-purple-400 font-bold">3</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-200 mb-1">Regular Practice</h4>
              <p className="text-sm text-gray-400">
                Practice 10-15 minutes daily for better results than long sessions once a week
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <span className="text-yellow-400 font-bold">4</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-200 mb-1">Touch Typing</h4>
              <p className="text-sm text-gray-400">
                Try not to look at the keyboard. This improves speed and reduces errors
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700/50">
          <h4 className="font-medium text-gray-300 mb-3">Current Session Info</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Mode</div>
              <div className="text-lg font-semibold">{currentMode.label}</div>
            </div>
            <div className="bg-gray-900/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Duration/Limit</div>
              <div className="text-lg font-semibold">{currentMode.value}</div>
            </div>
            <div className="bg-gray-900/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Characters</div>
              <div className="text-lg font-semibold">{correctChars + errorChars}</div>
            </div>
            <div className="bg-gray-900/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Error Rate</div>
              <div className="text-lg font-semibold">
                {correctChars + errorChars > 0 
                  ? `${((errorChars / (correctChars + errorChars)) * 100).toFixed(1)}%` 
                  : '0%'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};