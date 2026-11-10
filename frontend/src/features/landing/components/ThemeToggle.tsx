import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={`p-1.5 rounded-full transition-all duration-300 border cursor-pointer ${
        isDark
          ? 'bg-black text-white border-white/30 hover:border-white hover:bg-white/10'
          : 'bg-white text-black border-black/30 hover:border-black hover:bg-black/10'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-3.5 h-3.5 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-3.5 h-3.5 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;

