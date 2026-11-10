import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'ace-exe',
    title: 'ace.exe',
    category: 'Admin Portal & OS Terminal',
    description: 'Minimalist monochrome dashboard with black hole particle physics and custom shell.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cloudvault',
    title: 'CloudVault',
    category: 'Distributed Object Storage',
    description: 'High-availability S3-compatible blob storage with automated chunking and AES-256 encryption.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'flowstate',
    title: 'FlowState',
    category: 'Developer Workflow Engine',
    description: 'Real-time collaborative task runner, git commit hooks analyzer, and sprint velocity tracker.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hyperion',
    title: 'Hyperion',
    category: 'Telemetry & Observability',
    description: 'Sub-millisecond metrics aggregator streaming time-series telemetry data into low-latency charts.',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pulse',
    title: 'Pulse',
    category: 'Realtime Audio & Chat',
    description: 'Peer-to-peer encrypted messaging and crystal-clear voice rooms powered by WebRTC.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'synthetix',
    title: 'Synthetix',
    category: 'AI Code Intelligence',
    description: 'Local vector search and static analysis agent for multi-repo architectural insights.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
  },
];

interface ProjectsCarouselProps {
  theme: 'dark' | 'light';
  className?: string;
}

export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({
  theme,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDark = theme === 'dark';

  const borderColor = isDark ? 'border-white/20' : 'border-black/20';
  const borderHover = isDark ? 'hover:border-white' : 'hover:border-black';
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const activeDotBg = isDark ? 'bg-white border-white' : 'bg-black border-black';
  const inactiveDotBorder = isDark ? 'border-white/30 hover:border-white' : 'border-black/30 hover:border-black';

  const total = PROJECTS.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const currentProject = PROJECTS[currentIndex];
  const prevProject = PROJECTS[prevIndex];
  const nextProject = PROJECTS[nextIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePreview = (project: ProjectItem) => {
    alert(`Previewing: ${project.title}\n\n${project.description}`);
  };

  // Touch gesture swipe handling for mobile
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null ||
      touchStartY.current === null ||
      touchEndY.current === null
    ) {
      return;
    }

    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;

    // Trigger swipe if horizontal displacement is greater than vertical and exceeds threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  return (
    <section id="products" className={`flex flex-col space-y-4 ${className}`}>
      {/* 3-Card Carousel Track with Touch Swipe */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative flex items-center justify-center gap-2 sm:gap-4 overflow-hidden py-1 touch-pan-y"
      >
        {/* Previous Project Card (Visible thin border & rounded corners showing adjacent project preview) */}
        <div
          onClick={handlePrev}
          aria-label="Previous project preview"
          className={`hidden sm:flex flex-col w-14 sm:w-20 md:w-24 h-56 sm:h-72 rounded-2xl border ${borderColor} p-1.5 opacity-40 hover:opacity-70 cursor-pointer transition-all duration-200 shrink-0 bg-transparent overflow-hidden select-none`}
        >
          <div className="w-full h-full rounded-xl overflow-hidden bg-white/5 border border-white/10">
            <img
              src={prevProject.imageUrl}
              alt={prevProject.title}
              className="w-full h-full object-cover grayscale opacity-60"
            />
          </div>
        </div>

        {/* Current Active Project Card (Prominently in center) */}
        <div
          className={`relative flex-1 max-w-xl rounded-2xl border ${
            isDark ? 'border-white/40' : 'border-black/40'
          } p-4 sm:p-5 flex flex-col justify-between bg-transparent transition-all duration-300 shadow-none`}
        >
          {/* Card Top: Index indicator (Category heading removed) */}
          <div className="flex items-center justify-end mb-1.5">
            <span className={`text-[10px] font-mono ${subTextColor}`}>
              0{currentIndex + 1} / 0{total}
            </span>
          </div>

          {/* Prominent Project Thumbnail Image */}
          <div className="w-full h-36 sm:h-44 rounded-xl overflow-hidden border border-white/15 my-1.5 bg-black/40">
            <img
              src={currentProject.imageUrl}
              alt={currentProject.title}
              className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* Project Title & Short Description */}
          <div className="my-1.5">
            <h3 className={`text-base sm:text-lg font-normal tracking-tight ${textColor} mb-1`}>
              {currentProject.title}
            </h3>
            <p className={`text-xs sm:text-[13px] font-light ${subTextColor} line-clamp-2 leading-relaxed`}>
              {currentProject.description}
            </p>
          </div>

          {/* Preview Button inside active card */}
          <div className="flex items-center justify-start pt-1">
            <button
              type="button"
              onClick={() => handlePreview(currentProject)}
              className={`py-1.5 px-3 rounded-lg border ${borderColor} ${borderHover} bg-transparent ${textColor} text-[11px] uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95`}
            >
              <span>Preview</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>
          </div>
        </div>

        {/* Next Project Card (Visible thin border & rounded corners showing adjacent project preview) */}
        <div
          onClick={handleNext}
          aria-label="Next project preview"
          className={`hidden sm:flex flex-col w-14 sm:w-20 md:w-24 h-56 sm:h-72 rounded-2xl border ${borderColor} p-1.5 opacity-40 hover:opacity-70 cursor-pointer transition-all duration-200 shrink-0 bg-transparent overflow-hidden select-none`}
        >
          <div className="w-full h-full rounded-xl overflow-hidden bg-white/5 border border-white/10">
            <img
              src={nextProject.imageUrl}
              alt={nextProject.title}
              className="w-full h-full object-cover grayscale opacity-60"
            />
          </div>
        </div>
      </div>

      {/* Navigation Controls: Arrow Left, Project Count Dots, Arrow Right */}
      <div className="flex items-center justify-center gap-4 py-1 select-none">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous project"
          className={`p-1.5 rounded-full border ${borderColor} ${borderHover} bg-transparent ${textColor} transition-all duration-200 cursor-pointer active:scale-90`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Project Count Dots */}
        <div className="flex items-center gap-2">
          {PROJECTS.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? `w-4 h-1.5 ${activeDotBg}`
                    : `w-1.5 h-1.5 border ${inactiveDotBorder} bg-transparent`
                }`}
              />
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next project"
          className={`p-1.5 rounded-full border ${borderColor} ${borderHover} bg-transparent ${textColor} transition-all duration-200 cursor-pointer active:scale-90`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
