import React, { useRef, useEffect, useState } from 'react';

interface SkillsMarqueeProps {
  theme: 'dark' | 'light';
  className?: string;
}

const SKILLS = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'MERN',
  'Tailwind CSS',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Git',
  'REST APIs',
  'GraphQL',
  'Python',
];

export const SkillsMarquee: React.FC<SkillsMarqueeProps> = ({
  theme,
  className = '',
}) => {
  const isDark = theme === 'dark';
  const borderColor = isDark ? 'border-white/15' : 'border-black/15';
  const pillBorder = isDark ? 'border-white/20 hover:border-white' : 'border-black/20 hover:border-black';
  const textColor = isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black';

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInteracting = useRef(false);
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  // Triple skills list for seamless infinite loop
  const displaySkills = [...SKILLS, ...SKILLS, ...SKILLS];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start near the middle so scrolling in either direction has room
    const initScroll = () => {
      if (container.scrollWidth > container.clientWidth) {
        container.scrollLeft = container.scrollWidth / 3;
      }
    };
    initScroll();

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 35; // pixels per second

    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isInteracting.current && container) {
        // Moves content to the right (scrollLeft decreases)
        container.scrollLeft -= speed * delta;

        // Reset to maintain infinite loop
        if (container.scrollLeft <= 5) {
          container.scrollLeft = container.scrollWidth / 3;
        } else if (container.scrollLeft >= (2 * container.scrollWidth) / 3) {
          container.scrollLeft = container.scrollWidth / 3;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Mouse drag handlers for manual scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isMouseDown.current = true;
    isInteracting.current = true;
    setIsPaused(true);
    startX.current = e.pageX - container.offsetLeft;
    scrollLeftStart.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    container.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isMouseDown.current = false;
    isInteracting.current = false;
    setIsPaused(false);
  };

  return (
    <section
      id="skills"
      className={`relative rounded-2xl border ${borderColor} p-3.5 sm:p-4 overflow-hidden bg-transparent transition-colors duration-300 ${className}`}
    >
      {/* Subtle edge fades for smooth marquee look */}
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-r from-black via-black/60 to-transparent'
            : 'bg-gradient-to-r from-white via-white/60 to-transparent'
        }`}
      />
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-l from-black via-black/60 to-transparent'
            : 'bg-gradient-to-l from-white via-white/60 to-transparent'
        }`}
      />

      {/* Marquee Track */}
      <div
        ref={containerRef}
        onMouseEnter={() => {
          isInteracting.current = true;
          setIsPaused(true);
        }}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onTouchStart={() => {
          isInteracting.current = true;
          setIsPaused(true);
        }}
        onTouchEnd={() => {
          isInteracting.current = false;
          setIsPaused(false);
        }}
        className={`flex items-center gap-2.5 overflow-x-auto select-none py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isPaused ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {displaySkills.map((skill, idx) => (
          <div
            key={`${skill}-${idx}`}
            className={`shrink-0 px-3.5 py-1.5 rounded-lg border ${pillBorder} bg-transparent text-xs font-mono tracking-wide ${textColor} transition-all duration-200 hover:scale-[1.03] active:scale-95`}
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsMarquee;

