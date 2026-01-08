import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cursor } from './Cursor';
import { useTypingStore, useSettingsStore } from '../../store';
import { calculateStats } from '../../utils/calculations';
import { generateText } from '../../utils/textGenerator';

export const TextDisplay: React.FC = () => {
  const {
    text,
    userInput,
    currentIndex,
    isTyping,
    gameMode,
    timeLimit,
    wordLimit,
    selectedLanguage,
    setText,
    showResults,
  } = useTypingStore();
  
  const { wordWrap } = useSettingsStore();

  const { correctChars, errorChars } = useMemo(() => {
    return calculateStats(text, userInput);
  }, [text, userInput]);

  // Generate new text when component mounts
  useEffect(() => {
    if (!text || text.trim().length === 0) {
      const newText = generateText(gameMode, wordLimit, selectedLanguage);
      setText(newText);
    }
  }, []);

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

  // If no text, show loading state
  if (!text || text.trim().length === 0) {
    return (
      <div className="text-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mb-4"
        />
        <div className="text-gray-400">Generating practice text...</div>
        <div className="text-sm text-gray-600 mt-2">
          This will only take a moment
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {showResults ? (
        <div className="text-center py-8">
          <div className="text-2xl font-bold text-green-500 mb-4">
            🎉 Test Complete!
          </div>
          <div className="text-gray-400">
            Press "Try Again" to start a new test
          </div>
        </div>
      ) : (
        <>
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
        </>
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