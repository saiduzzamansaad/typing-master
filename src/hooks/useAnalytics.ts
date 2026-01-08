import { useEffect, useRef } from 'react';
import { useTypingStore } from '../store';

export const useAnalytics = () => {
  const { wpm, accuracy, gameMode, addToHistory } = useTypingStore();
  const lastSaveRef = useRef<number>(0);

  // Save session to history when test completes
  useEffect(() => {
    const saveSession = () => {
      const now = Date.now();
      
      // Don't save too frequently (minimum 5 seconds between saves)
      if (now - lastSaveRef.current < 5000) return;
      
      if (wpm > 0 && accuracy > 0) {
        addToHistory({
          wpm: Math.round(wpm),
          accuracy: parseFloat(accuracy.toFixed(1)),
          mode: gameMode,
          timestamp: now,
        });
        
        lastSaveRef.current = now;
      }
    };

    // Save on component unmount or when test is complete
    return () => {
      saveSession();
    };
  }, [wpm, accuracy, gameMode, addToHistory]);

  // Calculate typing consistency
  const calculateConsistency = (wpmHistory: number[]): number => {
    if (wpmHistory.length < 2) return 100;
    
    const avg = wpmHistory.reduce((a, b) => a + b, 0) / wpmHistory.length;
    const variance = wpmHistory.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / wpmHistory.length;
    const stdDev = Math.sqrt(variance);
    
    // Higher consistency when standard deviation is lower
    return Math.max(0, 100 - (stdDev / avg) * 100);
  };

  // Get performance insights
  const getInsights = () => {
    const insights = [];
    
    if (accuracy < 90) {
      insights.push({
        type: 'warning',
        message: 'Focus on accuracy over speed',
        suggestion: 'Try slowing down to reduce errors',
      });
    }
    
    if (wpm < 40) {
      insights.push({
        type: 'info',
        message: 'Building speed',
        suggestion: 'Practice daily to improve muscle memory',
      });
    } else if (wpm > 80) {
      insights.push({
        type: 'success',
        message: 'Excellent speed!',
        suggestion: 'Try harder texts to challenge yourself',
      });
    }
    
    return insights;
  };

  return {
    calculateConsistency,
    getInsights,
  };
};