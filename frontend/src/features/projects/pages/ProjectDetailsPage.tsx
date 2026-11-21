import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { getProjectBySlug } from '../data/projects';
import ProjectPreview from '../components/ProjectPreview';
import ProjectInfo from '../components/ProjectInfo';
import StarField from '../../../components/StarField';
import ThemeToggle from '../../landing/components/ThemeToggle';
import { SmoothCursor } from '@/components/ui/smooth-cursor';

const THEME_STORAGE_KEY = 'ace_theme';

export const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';
  const pageBg = isDark ? 'bg-black text-white' : 'bg-white text-black';
  const borderColor = isDark ? 'border-white/20' : 'border-black/20';
  const cardBg = isDark ? 'bg-neutral-950/70 backdrop-blur-xl' : 'bg-white/70 backdrop-blur-xl';
  const dividerColor = isDark ? 'bg-white/15' : 'bg-black/15';
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <main
      className={`relative min-h-screen w-full ${pageBg} flex flex-col antialiased selection:bg-white selection:text-black transition-colors duration-300 overflow-x-hidden`}
    >
      <SmoothCursor />

      {/* Star Field background — same as landing page */}
      <StarField theme={theme} />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex flex-col flex-1">
        {/* Top Navigation Bar: Back Button & Theme Toggle */}
        <header className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border ${borderColor} hover:border-current bg-transparent ${textColor} text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className={`hidden sm:inline text-[11px] font-mono uppercase tracking-widest ${subTextColor}`}>
              ace.exe // projects
            </span>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        {/* Project Card or Not-Found State */}
        <div className="flex-1 flex items-center justify-center">
          {project ? (
            /* Main Project Container matching the hand-drawn wireframe */
            <section
              aria-label={`${project.title} Project Details`}
              className={`w-full rounded-3xl border ${borderColor} ${cardBg} p-6 sm:p-8 lg:p-10 shadow-2xl transition-colors duration-300`}
            >
              <div className="flex flex-col md:flex-row items-stretch gap-8 lg:gap-10">
                {/* Left Section: Screenshot & Action Buttons */}
                <div className="w-full md:w-[48%] lg:w-[46%] shrink-0">
                  <ProjectPreview project={project} theme={theme} />
                </div>

                {/* Vertical Divider (Desktop only) */}
                <div
                  className={`hidden md:block w-px ${dividerColor} self-stretch transition-colors duration-300`}
                />

                {/* Right Section: Technology Badges & Description */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <ProjectInfo project={project} theme={theme} />
                </div>
              </div>
            </section>
          ) : (
            /* Not-Found State for invalid project slug */
            <div
              className={`w-full max-w-md mx-auto text-center rounded-3xl border ${borderColor} ${cardBg} p-8 sm:p-10 shadow-2xl`}
            >
              <div
                className={`w-14 h-14 mx-auto mb-4 rounded-2xl border ${borderColor} flex items-center justify-center opacity-80`}
              >
                <AlertCircle className="w-7 h-7 text-neutral-400" />
              </div>
              <h1 className={`text-xl font-normal tracking-tight ${textColor} mb-2`}>
                Project Not Found
              </h1>
              <p className={`text-xs ${subTextColor} leading-relaxed mb-6`}>
                The project with slug <code className="font-mono px-1 py-0.5 rounded bg-white/10 font-bold">"{slug}"</code> does not exist or may have been removed.
              </p>
              <Link
                to="/"
                className={`inline-flex items-center gap-2 py-2.5 px-5 rounded-xl border ${borderColor} hover:border-current bg-transparent ${textColor} text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer active:scale-95`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Portfolio</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailsPage;
