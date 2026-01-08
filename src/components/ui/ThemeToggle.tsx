import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useSettingsStore } from '../../store';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useSettingsStore();

  const themes = [
    { id: 'light' as const, icon: Sun, label: 'Light' },
    { id: 'dark' as const, icon: Moon, label: 'Dark' },
    { id: 'system' as const, icon: Monitor, label: 'System' },
  ];

  const handleThemeChange = () => {
    const currentIndex = themes.findIndex(t => t.id === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].id);
    
    // Apply theme to document
    if (themes[nextIndex].id === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (themes[nextIndex].id === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System theme
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const currentTheme = themes.find(t => t.id === theme);
  const Icon = currentTheme?.icon || Sun;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleThemeChange}
      className="relative p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300"
      title={`Theme: ${currentTheme?.label}`}
    >
      <Icon className="w-5 h-5" />
      
      <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {currentTheme?.label} Mode
        <div className="absolute top-full right-2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
      </div>
    </motion.button>
  );
};