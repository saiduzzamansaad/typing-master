import React, { useEffect, useCallback } from 'react';
import { useTypingStore, useSettingsStore } from '../../store';
import { useSound } from '../../hooks/useSound';
import { generateText } from '../../utils/textGenerator';
import { calculateWPM, calculateAccuracy } from '../../utils/calculations';

export const InputHandler: React.FC = () => {
  const {
    text,
    userInput,
    currentIndex,
    isTyping,
    isFinished,
    gameMode,
    timeLimit,
    wordLimit,
    selectedLanguage,
    setUserInput,
    setCurrentIndex,
    setText,
    setIsTyping,
    setIsFinished,
    setShowResults,
    setWpm,
    setRawWpm,
    setAccuracy,
    setStartTime,
    incrementCorrectChars,
    incrementErrorChars,
    reset,
  } = useTypingStore();

  const { soundEnabled, volume, backspaceControl } = useSettingsStore();
  const { playKeySound } = useSound();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isFinished) return;

    const key = e.key;

    if (key === 'Escape') {
      reset();
      return;
    }

    if (key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      reset();
      const newText = generateText(gameMode, wordLimit, selectedLanguage);
      setText(newText);
      return;
    }

    if (!isTyping && key.length === 1) {
      setIsTyping(true);
      setStartTime(Date.now());
    }

    if (!isTyping || currentIndex >= text.length) return;

    if (soundEnabled) {
      playKeySound(key, volume);
    }

    const currentChar = text[currentIndex];

    if (key === 'Backspace') {
      if (!backspaceControl || currentIndex === 0) return;
      
      e.preventDefault();
      const newInput = userInput.slice(0, -1);
      const newIndex = currentIndex - 1;
      
      setUserInput(newInput);
      setCurrentIndex(newIndex);
      return;
    }

    if (key.length === 1) {
      const isCorrect = key === currentChar;
      
      if (isCorrect) {
        incrementCorrectChars();
      } else {
        incrementErrorChars();
      }

      const newInput = userInput + key;
      const newIndex = currentIndex + 1;
      
      setUserInput(newInput);
      setCurrentIndex(newIndex);

      // Check if test is complete
      if (gameMode === 'words') {
        const wordCount = newInput.split(' ').length;
        if (wordCount >= wordLimit) {
          setIsFinished(true);
          setShowResults(true);
        }
      } else if (newIndex >= text.length) {
        setIsFinished(true);
        setShowResults(true);
      }
    }
  }, [
    isTyping,
    isFinished,
    currentIndex,
    text,
    userInput,
    gameMode,
    wordLimit,
    soundEnabled,
    volume,
    backspaceControl,
    playKeySound,
    reset,
    setText,
    setIsTyping,
    setStartTime,
    setUserInput,
    setCurrentIndex,
    incrementCorrectChars,
    incrementErrorChars,
    setIsFinished,
    setShowResults,
    selectedLanguage,
  ]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const startTime = useTypingStore.getState().startTime;
      
      if (startTime) {
        const elapsedSeconds = (now - startTime) / 1000;
        
        if (gameMode === 'time' && elapsedSeconds >= timeLimit) {
          setIsFinished(true);
          setShowResults(true);
          clearInterval(interval);
          return;
        }

        const { wpm, rawWpm } = calculateWPM(userInput, elapsedSeconds);
        const accuracy = calculateAccuracy(userInput, text);
        
        setWpm(wpm);
        setRawWpm(rawWpm);
        setAccuracy(accuracy);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isTyping, gameMode, timeLimit, userInput, text]);

  useEffect(() => {
    const newText = generateText(gameMode, wordLimit, selectedLanguage);
    setText(newText);
    reset();
  }, [gameMode, wordLimit, selectedLanguage]);

  return (
    <input
      type="text"
      className="fixed opacity-0 pointer-events-none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
};