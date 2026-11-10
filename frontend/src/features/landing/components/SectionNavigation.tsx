import React, { useState, useEffect } from 'react';

const SECTIONS = ['ABOUT', 'SKILLS', 'PRODUCTS'] as const;
type SectionType = (typeof SECTIONS)[number];

interface SectionNavigationProps {
  theme: 'dark' | 'light';
  className?: string;
}

export const SectionNavigation: React.FC<SectionNavigationProps> = ({
  theme,
  className = '',
}) => {
  const isDark = theme === 'dark';
  const borderColor = isDark ? 'border-white/20' : 'border-black/20';
  const textColor = isDark ? 'text-white' : 'text-black';
  const dividerColor = isDark ? 'bg-white/10' : 'bg-black/10';

  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 450);
    return () => clearInterval(cursorTimer);
  }, []);

  // Continuous typing and deleting loop:
  // 1. Type ABOUT and delete it.
  // 2. Type SKILLS and delete it.
  // 3. Type PRODUCTS and delete it.
  // 4. Repeat continuously.
  useEffect(() => {
    const targetWord = SECTIONS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (currentText.length < targetWord.length) {
        // Typing forward
        timeout = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length + 1));
        }, 110);
      } else {
        // Word completed, pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1200);
      }
    } else {
      if (currentText.length > 0) {
        // Deleting backward
        timeout = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length - 1));
        }, 60);
      } else {
        // Word fully deleted, pause then move to next word
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % SECTIONS.length);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, wordIndex]);

  const handleSectionClick = (sectionName: SectionType) => {
    const sectionId = sectionName === 'PRODUCTS' ? 'products' : sectionName.toLowerCase();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <aside
      aria-label="Section navigation"
      className={`border ${borderColor} rounded-2xl md:rounded-3xl p-1.5 md:py-6 md:px-2 flex md:flex-col items-center justify-between w-full md:w-12 lg:w-14 h-auto md:h-[580px] lg:h-[640px] xl:h-[680px] bg-transparent shrink-0 transition-colors duration-300 ${className}`}
    >
      {/* 3 Distinct Vertical Sections: ABOUT, SKILLS, PRODUCTS */}
      {SECTIONS.map((section, idx) => {
        const isActive = wordIndex === idx;

        return (
          <div
            key={section}
            onClick={() => handleSectionClick(section)}
            className="flex-1 w-full flex items-center justify-center relative cursor-pointer select-none py-2 md:py-0"
          >
            {/* Desktop: Vertical Orientation (reading top-to-bottom) */}
            <div className="hidden md:flex items-center justify-center w-full h-full relative">
              {/* Dim baseline label so container structure is always clearly defined */}
              <span
                className="text-[11px] font-mono tracking-widest [writing-mode:vertical-lr] rotate-180 uppercase opacity-15 pointer-events-none transition-opacity duration-300"
              >
                {section}
              </span>

              {/* Active animated typing text */}
              {isActive && (
                <span
                  className={`absolute text-xs font-mono tracking-widest uppercase [writing-mode:vertical-lr] rotate-180 ${textColor} font-semibold`}
                >
                  {currentText}
                  <span className={`inline-block ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
                    _
                  </span>
                </span>
              )}
            </div>

            {/* Mobile: Horizontal display */}
            <div className="md:hidden flex items-center justify-center px-3 py-1">
              <span
                className={`text-xs font-mono tracking-wider uppercase transition-colors duration-200 ${
                  isActive ? `${textColor} font-semibold` : 'text-neutral-500 opacity-40'
                }`}
              >
                {isActive ? currentText || '_' : section}
                {isActive && (
                  <span className={showCursor ? 'opacity-100' : 'opacity-0'}>_</span>
                )}
              </span>
            </div>

            {/* Divider between sections inside the container */}
            {idx < SECTIONS.length - 1 && (
              <div
                className={`hidden md:block absolute bottom-0 left-2 right-2 h-px ${dividerColor}`}
              />
            )}
          </div>
        );
      })}
    </aside>
  );
};

export default SectionNavigation;
