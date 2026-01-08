import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cursor } from './Cursor';
import { useTypingStore, useSettingsStore } from '../../store';
import { calculateStats } from '../../utils/calculations';

export const TextDisplay: React.FC = () => {
  const {
    text,
    userInput,
    currentIndex,
    isTyping,
    gameMode,
  } = useTypingStore();
  
  const { wordWrap } = useSettingsStore();

  const { correctChars, errorChars } = useMemo(() => {
    return calculateStats(text, userInput);
  }, [text, userInput]);

  const renderCharacter = (char: string, index: number) => {
    if (index >= userInput.length) {
      return (
        <span key={index} className="text-gray-500">
          {char}
        </span>
      );
    }

    const isCorrect = userInput[index] === char;
    const isCurrent = index === currentIndex;

    return (
      <span
        key={index}
        className={`relative ${
          isCorrect
            ? 'text-white'
            : 'text-red-500'
        } ${isCurrent ? 'bg-blue-500/20 rounded' : ''}`}
      >
        {char}
        {!isCorrect && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
        )}
      </span>
    );
  };

  const lines = useMemo(() => {
    if (!wordWrap) return [text];
    return text.match(/.{1,80}/g) || [text];
  }, [text, wordWrap]);

  return (
    <div className="relative">
      <div
        className={`text-2xl leading-relaxed font-mono select-none ${
          wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto'
        }`}
      >
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="mb-4">
            {line.split('').map((char, charIndex) => {
              const absoluteIndex = lineIndex * 80 + charIndex;
              return renderCharacter(char, absoluteIndex);
            })}
          </div>
        ))}
      </div>
      
      {isTyping && (
        <Cursor
          currentIndex={currentIndex}
          text={text}
          wordWrap={wordWrap}
        />
      )}
      
      <div className="mt-6 flex justify-between text-sm text-gray-400">
        <div>
          Correct: <span className="text-green-400 font-semibold">{correctChars}</span>
        </div>
        <div>
          Errors: <span className="text-red-400 font-semibold">{errorChars}</span>
        </div>
        <div>
          Remaining: <span className="text-blue-400 font-semibold">
            {gameMode === 'words' 
              ? Math.max(0, useTypingStore.getState().wordLimit - userInput.split(' ').length)
              : text.length - currentIndex
            }
          </span>
        </div>
      </div>
    </div>
  );
};