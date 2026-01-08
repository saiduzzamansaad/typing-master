import { useState, useEffect, useCallback } from 'react';

interface UseTimerProps {
  initialTime: number;
  onTimeUp?: () => void;
  autoStart?: boolean;
}

export const useTimer = ({ initialTime, onTimeUp, autoStart = false }: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isFinished, setIsFinished] = useState(false);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsFinished(false);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(initialTime);
    setIsRunning(autoStart);
    setIsFinished(false);
  }, [initialTime, autoStart]);

  const addTime = useCallback((seconds: number) => {
    setTimeLeft(prev => prev + seconds);
  }, []);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsFinished(true);
          setIsRunning(false);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / initialTime) * 100;

  return {
    timeLeft,
    minutes,
    seconds,
    isRunning,
    isFinished,
    progress,
    start,
    pause,
    reset,
    addTime,
    setIsRunning,
  };
};