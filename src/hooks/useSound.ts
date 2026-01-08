import { useCallback } from 'react';
import { useSettingsStore } from '../store';

export const useSound = () => {
  const { soundEnabled, volume } = useSettingsStore();

  const playKeySound = useCallback((key: string, customVolume?: number) => {
    if (!soundEnabled) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different frequencies for different key types
    if (key === 'Backspace' || key === 'Delete') {
      oscillator.frequency.setValueAtTime(120, audioContext.currentTime);
    } else if (key === ' ' || key === 'Spacebar') {
      oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
    } else if (key === 'Shift' || key === 'Control' || key === 'Alt') {
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    } else {
      oscillator.frequency.setValueAtTime(400 + Math.random() * 200, audioContext.currentTime);
    }

    gainNode.gain.setValueAtTime(customVolume || volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }, [soundEnabled, volume]);

  const playCompleteSound = useCallback(() => {
    if (!soundEnabled) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Play a chord on completion
    const frequencies = [523.25, 659.25, 783.99]; // C, E, G
    frequencies.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.1 + i * 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5 + i * 0.05);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5 + i * 0.05);
    });
  }, [soundEnabled, volume]);

  return {
    playKeySound,
    playCompleteSound,
  };
};