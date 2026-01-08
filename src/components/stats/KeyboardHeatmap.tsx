import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Keyboard } from 'lucide-react';
import { useTypingStore } from '../../store';

const KEYBOARD_LAYOUT = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl'],
];

export const KeyboardHeatmap: React.FC = () => {
  const { errorStats } = useTypingStore();

  const keyErrors = useMemo(() => {
    const errors: Record<string, number> = {};
    
    // Simulate some error data (in real app, this would come from actual typing data)
    const commonErrors = {
      'a': 12,
      's': 8,
      'd': 5,
      'f': 3,
      'j': 4,
      'k': 7,
      'l': 6,
      ';': 9,
      "'": 11,
      'Enter': 15,
      'Shift': 10,
      'Space': 20,
    };

    KEYBOARD_LAYOUT.flat().forEach(key => {
      errors[key] = commonErrors[key as keyof typeof commonErrors] || Math.floor(Math.random() * 5);
    });

    return errors;
  }, []);

  const maxErrors = Math.max(...Object.values(keyErrors));

  const getErrorColor = (errorCount: number) => {
    if (errorCount === 0) return 'bg-gray-700';
    
    const percentage = errorCount / maxErrors;
    
    if (percentage < 0.3) return 'bg-green-500/20';
    if (percentage < 0.6) return 'bg-yellow-500/30';
    if (percentage < 0.8) return 'bg-orange-500/40';
    return 'bg-red-500/50';
  };

  const getKeySize = (key: string) => {
    if (key === 'Backspace' || key === 'Enter') return 'col-span-2';
    if (key === 'Tab' || key === 'Caps' || key === 'Shift') return 'col-span-1.5';
    if (key === 'Space') return 'col-span-3';
    if (key === 'Ctrl' || key === 'Alt' || key === 'Win') return 'col-span-1';
    return '';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Keyboard className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-200">Keyboard Heatmap</h2>
        </div>
        <div className="text-sm text-gray-400">
          Red areas indicate frequent errors
        </div>
      </div>

      <div className="space-y-2">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((key) => (
              <motion.div
                key={key}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: rowIndex * 0.1 }}
                className={`
                  relative ${getKeySize(key)}
                  h-12 px-2 flex items-center justify-center
                  rounded-lg ${getErrorColor(keyErrors[key])}
                  border border-gray-700
                  transition-all duration-300
                  group
                `}
              >
                <span className="text-xs font-medium text-gray-300">
                  {key}
                </span>
                
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                              bg-gray-900 text-white text-xs px-2 py-1 rounded
                              opacity-0 group-hover:opacity-100 transition-opacity
                              pointer-events-none whitespace-nowrap">
                  Errors: {keyErrors[key]}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
                                w-2 h-2 bg-gray-900 rotate-45" />
                </div>
                
                {keyErrors[key] > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full 
                                animate-pulse" />
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded" />
          <span className="text-sm text-gray-400">0 errors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500/20 rounded" />
          <span className="text-sm text-gray-400">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500/30 rounded" />
          <span className="text-sm text-gray-400">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500/50 rounded" />
          <span className="text-sm text-gray-400">High</span>
        </div>
      </div>
    </div>
  );
};