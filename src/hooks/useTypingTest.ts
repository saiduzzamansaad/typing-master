import { useState, useCallback, useEffect } from 'react';
import { calculateWPM, calculateAccuracy } from '../utils/calculations';

export const useTypingTest = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleKeyPress = useCallback((key: string) => {
    if (isFinished) return;

    if (!isTyping) {
      setIsTyping(true);
      setStartTime(Date.now());
    }

    if (currentIndex >= text.length) {
      setIsFinished(true);
      return;
    }

    if (key === 'Backspace') {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        setUserInput(prev => prev.slice(0, -1));
      }
      return;
    }

    if (key.length === 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput(prev => prev + key);

      if (currentIndex + 1 >= text.length) {
        setIsFinished(true);
      }
    }
  }, [text, currentIndex, isTyping, isFinished]);

  useEffect(() => {
    if (!isTyping || !startTime) return;

    const interval = setInterval(() => {
      const elapsedTime = (Date.now() - startTime) / 1000 / 60; // in minutes
      const { wpm: calculatedWPM } = calculateWPM(userInput, elapsedTime);
      const calculatedAccuracy = calculateAccuracy(userInput, text);
      
      setWpm(calculatedWPM);
      setAccuracy(calculatedAccuracy);
    }, 100);

    return () => clearInterval(interval);
  }, [isTyping, startTime, userInput, text]);

  const reset = useCallback(() => {
    setUserInput('');
    setCurrentIndex(0);
    setIsTyping(false);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    setStartTime(null);
  }, []);

  return {
    text,
    setText,
    userInput,
    currentIndex,
    isTyping,
    isFinished,
    wpm,
    accuracy,
    handleKeyPress,
    reset,
  };
};