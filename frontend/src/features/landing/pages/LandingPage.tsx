
import React, { useState, useEffect } from 'react';
import ProfilePanel from '../components/ProfilePanel';
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

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const isDark = theme === 'dark';
  const pageBg = isDark ? 'bg-black text-white' : 'bg-white text-black';
  const dividerColor = isDark ? 'bg-white/10' : 'bg-black/10';

  return (
    <main
      className={`relative min-h-screen w-full ${pageBg} flex flex-col lg:flex-row antialiased selection:bg-white selection:text-black transition-colors duration-300 overflow-x-hidden`}
    >
      {/* Star field — only on dark theme */}
      <StarField theme={theme} />

      {/* Page content */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row flex-1">

        {/* Left Section – Profile Panel */}
        <div className="w-full lg:w-[400px] xl:w-[440px] shrink-0 p-6 sm:p-8 lg:min-h-screen flex flex-col justify-center items-center">
          <ProfilePanel
            theme={theme}
            onToggleTheme={toggleTheme}
            className="w-full max-w-sm sm:max-w-md lg:max-w-none"
          />
        </div>

        {/* Vertical Divider — Desktop only */}
        <div
          className={`hidden lg:block w-px ${dividerColor} self-stretch my-8 transition-colors duration-300`}
        />

        {/* Right Section – Main Content Panel */}
        <div  className="flex-1 w-full min-w-0 max-w-4xl mx-auto px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-10 lg:p-10 flex flex-col justify-start lg:justify-center space-y-4 sm:space-y-6">
          <AboutSection theme={theme} />
          <SkillsMarquee theme={theme} />
          <ProjectsCarousel theme={theme} />
        </div>

      </div>
    </main>
  );
};

export default LandingPage;
