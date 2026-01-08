export const calculateWPM = (input: string, minutes: number): { wpm: number; rawWpm: number } => {
      if (minutes === 0) return { wpm: 0, rawWpm: 0 };
      
      const words = input.trim().split(/\s+/).length;
      const characters = input.length;
      
      const rawWpm = characters / 5 / minutes;
      const wpm = words / minutes;
      
      return {
        wpm: Math.round(wpm),
        rawWpm: Math.round(rawWpm),
      };
    };
    
    export const calculateAccuracy = (input: string, text: string): number => {
      if (!input) return 100;
      
      let correct = 0;
      const minLength = Math.min(input.length, text.length);
      
      for (let i = 0; i < minLength; i++) {
        if (input[i] === text[i]) {
          correct++;
        }
      }
      
      return (correct / input.length) * 100;
    };
    
    export const calculateStats = (text: string, userInput: string) => {
      let correctChars = 0;
      let errorChars = 0;
      
      for (let i = 0; i < userInput.length; i++) {
        if (i >= text.length) break;
        
        if (userInput[i] === text[i]) {
          correctChars++;
        } else {
          errorChars++;
        }
      }
      
      return { correctChars, errorChars };
    };
    
    export const calculateConsistency = (wpmHistory: number[]): number => {
      if (wpmHistory.length < 2) return 100;
      
      const avg = wpmHistory.reduce((a, b) => a + b, 0) / wpmHistory.length;
      const variance = wpmHistory.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / wpmHistory.length;
      const stdDev = Math.sqrt(variance);
      
      return Math.max(0, 100 - (stdDev / avg) * 100);
    };