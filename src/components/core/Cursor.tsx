import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorProps {
  currentIndex: number;
  text: string;
  wordWrap: boolean;
}

export const Cursor: React.FC<CursorProps> = ({ currentIndex, text, wordWrap }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [charDimensions, setCharDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const textElement = document.querySelector('.font-mono');
    if (textElement) {
      const span = document.createElement('span');
      span.textContent = 'A';
      span.className = 'text-2xl font-mono absolute invisible';
      document.body.appendChild(span);
      const rect = span.getBoundingClientRect();
      setCharDimensions({ width: rect.width, height: rect.height });
      document.body.removeChild(span);
    }
  }, []);

  useEffect(() => {
    if (!wordWrap) {
      const x = currentIndex * charDimensions.width;
      setCursorPosition({ x, y: 0 });
    } else {
      const charsPerLine = 80;
      const line = Math.floor(currentIndex / charsPerLine);
      const column = currentIndex % charsPerLine;
      const x = column * charDimensions.width;
      const y = line * (charDimensions.height * 1.5);
      setCursorPosition({ x, y });
    }
  }, [currentIndex, charDimensions, wordWrap]);

  return (
    <AnimatePresence>
      <motion.div
        className="absolute pointer-events-none"
        initial={false}
        animate={{
          x: cursorPosition.x,
          y: cursorPosition.y,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <div className="w-0.5 h-8 bg-blue-500 relative">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};