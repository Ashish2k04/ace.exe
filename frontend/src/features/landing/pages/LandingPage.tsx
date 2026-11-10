import React, { useState, useEffect } from 'react';
import ProfilePanel from '../components/ProfilePanel';
import SectionNavigation from '../components/SectionNavigation';
import AboutSection from '../components/AboutSection';
import SkillsMarquee from '../components/SkillsMarquee';
import ProjectsCarousel from '../components/ProjectsCarousel';
import StarField from '../../../components/StarField';

const THEME_STORAGE_KEY = 'ace_theme';

const LandingPage: React.FC = () => {
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

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const isDark = theme === 'dark';
  const pageBg = isDark ? 'bg-black text-white' : 'bg-white text-black';
  const dividerColor = isDark ? 'bg-white/10' : 'bg-black/10';

  return (
    <main
      className={`relative min-h-screen w-full ${pageBg} flex flex-col md:flex-row antialiased selection:bg-white selection:text-black transition-colors duration-300 overflow-x-hidden`}
    >
      {/* Star field — only on dark theme */}
      {isDark && <StarField />}

      {/* Page content sits above star canvas */}
      <div className="relative z-10 w-full flex flex-col md:flex-row flex-1">
        {/* Left Section – Profile Panel */}
        <div className="w-full md:w-[340px] lg:w-[380px] xl:w-[420px] shrink-0 p-6 sm:p-8 md:min-h-screen flex flex-col justify-center items-center">
          <ProfilePanel
            theme={theme}
            onToggleTheme={toggleTheme}
            className="w-full max-w-sm sm:max-w-md md:max-w-none"
          />
        </div>

        {/* Vertical Divider for Desktop */}
        {/* <div className={`hidden md:block w-px ${dividerColor} self-stretch my-8 transition-colors duration-300`} /> */}

        {/* Section Navigation — Desktop only */}
        {/* <div className="hidden md:flex items-center justify-center px-3 lg:px-5 shrink-0 py-8">
          <SectionNavigation theme={theme} />
        </div> */}

        {/* Right Section – Main Content Panel */}
        <div className="flex-1 p-4 sm:p-6 lg:p-10 flex flex-col justify-center space-y-4 sm:space-y-6 max-w-4xl min-w-0">
          <AboutSection theme={theme} />
          <SkillsMarquee theme={theme} />
          <ProjectsCarousel theme={theme} />
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
