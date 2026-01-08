import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  TrendingUp, 
  Clock,
  BarChart3,
  Award,
  Hash,
  Cpu
} from 'lucide-react';
import { useTypingStore } from '../../store';

export const BentoGrid: React.FC = () => {
  const {
    wpm,
    accuracy,
    consistency,
    history,
    gameMode,
    timeLimit,
    wordLimit,
  } = useTypingStore();

  const stats = [
    {
      title: 'Current WPM',
      value: Math.round(wpm),
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      change: '+2%',
      description: 'Words per minute',
    },
    {
      title: 'Accuracy',
      value: `${accuracy.toFixed(1)}%`,
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      change: accuracy > 95 ? 'Excellent' : 'Good',
      description: 'Typing accuracy',
    },
    {
      title: 'Consistency',
      value: `${consistency.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      change: consistency > 90 ? 'Stable' : 'Variable',
      description: 'Speed stability',
    },
    {
      title: 'Session Time',
      value: `${timeLimit}s`,
      icon: Clock,
      color: 'from-orange-500 to-red-500',
      change: gameMode === 'time' ? 'Time Mode' : 'Word Mode',
      description: 'Current session',
    },
    {
      title: 'Total Sessions',
      value: history.length,
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500',
      change: 'All time',
      description: 'Completed tests',
    },
    {
      title: 'Word Count',
      value: wordLimit,
      icon: Hash,
      color: 'from-yellow-500 to-orange-500',
      change: 'Target',
      description: 'Words to type',
    },
    {
      title: 'Performance',
      value: Math.round((wpm * accuracy) / 100),
      icon: Award,
      color: 'from-rose-500 to-pink-500',
      change: 'Score',
      description: 'WPM × Accuracy',
    },
    {
      title: 'Mode',
      value: gameMode.charAt(0).toUpperCase() + gameMode.slice(1),
      icon: Cpu,
      color: 'from-gray-600 to-gray-800',
      change: 'Active',
      description: 'Game mode',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-200">Performance Grid</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white`}
            style={{
              gridColumn: index === 6 ? 'span 2' : 'span 1',
              gridRow: index === 6 ? 'span 1' : 'span 1',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5" />
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm font-medium mb-1">{stat.title}</div>
            <div className="text-xs opacity-75">{stat.description}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};