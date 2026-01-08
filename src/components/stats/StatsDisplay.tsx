import React from 'react';
import { TrendingUp, Target, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTypingStore } from '../../store';
import { SessionGraph } from './SessionGraph';
import { KeyboardHeatmap } from './KeyboardHeatmap';
import { BentoGrid } from './BentoGrid';

export const StatsDisplay: React.FC = () => {
  const {
    wpm,
    rawWpm,
    accuracy,
    consistency,
    personalBest,
    isTyping,
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
      subValue: 'Keystrokes',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Consistency',
      value: `${consistency.toFixed(1)}%`,
      subValue: 'Stability',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Personal Best',
      value: personalBest,
      subValue: 'WPM',
      icon: Award,
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold mb-6 text-gray-200">Live Statistics</h2>
        
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

        {isTyping && <SessionGraph />}
      </div>

      <BentoGrid />
      <KeyboardHeatmap />
    </div>
  );
};