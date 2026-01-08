import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useTypingStore } from '../../store';

export const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { wpm, personalBest, setPersonalBest } = useTypingStore();
  const lastBestRef = useRef(personalBest);

  useEffect(() => {
    if (wpm > personalBest && wpm > 0) {
      setPersonalBest(wpm);
      launchConfetti();
    }
    lastBestRef.current = personalBest;
  }, [wpm, personalBest, setPersonalBest]);

  const launchConfetti = () => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    // Multiple confetti effects
    myConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    myConfetti({
      particleCount: 50,
      angle: 60,
      spread: 80,
      origin: { x: 0 },
    });

    myConfetti({
      particleCount: 50,
      angle: 120,
      spread: 80,
      origin: { x: 1 },
    });

    // Heart-shaped confetti
    setTimeout(() => {
      const heart = confetti.shapeFromText({ text: '❤️', scalar: 2 });
      myConfetti({
        shapes: [heart],
        particleCount: 20,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 250);
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ position: 'fixed' }}
    />
  );
};