import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useTypingStore } from '../../store';

interface TimerProps {
  onTimeUp?: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const { isTyping, gameMode, timeLimit, startTime } = useTypingStore();
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (gameMode !== 'time' || !isTyping || !startTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, timeLimit - elapsed);
      
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        onTimeUp?.();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isTyping, gameMode, timeLimit, startTime, onTimeUp]);

  if (gameMode !== 'time') return null;

  const progress = (timeLeft / timeLimit) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-gray-300">Time Remaining</span>
        </div>
        <div className="text-2xl font-bold tabular-nums">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
      
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      
      <div className="mt-2 text-sm text-gray-400">
        Progress: {Math.round(100 - progress)}%
      </div>
    </div>
  );
};