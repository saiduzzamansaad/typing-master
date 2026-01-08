import React from 'react';
import { Keyboard, RotateCcw, Zap } from 'lucide-react';

export const BottomBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Shortcuts</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Tab</kbd>
                <span className="text-xs text-gray-500">+</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Enter</kbd>
                <span className="text-sm text-gray-400 ml-2">Restart Test</span>
              </div>
              
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Esc</kbd>
                <span className="text-sm text-gray-400 ml-2">Reset All</span>
              </div>
              
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Space</kbd>
                <span className="text-sm text-gray-400 ml-2">Pause/Resume</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Zap className="w-4 h-4" />
              <span>Built with React & Framer Motion</span>
            </div>
            
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
              onClick={() => window.location.reload()}
            >
              <RotateCcw className="w-4 h-4" />
              Reset Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};