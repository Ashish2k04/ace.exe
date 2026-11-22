import React, { useState, useEffect, lazy, Suspense } from 'react';
import ProfilePanel from '../components/ProfilePanel';
import AboutSection from '../components/AboutSection';
import SkillsMarquee from '../components/SkillsMarquee';
import ProjectsCarousel from '../components/ProjectsCarousel';
import ContactModal from '../components/ContactModal';
import StarField from '../../../components/StarField';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
const EchoChatPanel = lazy(
  () => import('../components/EchoChatPanel')
)

const THEME_STORAGE_KEY = 'ace_theme';

const LandingPage: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark';
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

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

  return (
    <main
      className={`relative min-h-screen w-full ${pageBg} flex flex-col lg:flex-row antialiased selection:bg-white selection:text-black transition-colors duration-300 overflow-x-hidden select-none`}
    >
      <SmoothCursor />
      {/* Star field — only on dark theme */}
      <StarField theme={theme} />

      {/* Page content */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row flex-1">

        {/* Left Section – Profile Panel */}
        <div className="w-full lg:w-[320px] xl:w-[380px] 2xl:w-[420px] shrink-0 p-6 sm:p-8 lg:min-h-screen flex flex-col justify-center items-center">
          <ProfilePanel
            theme={theme}
            onToggleTheme={toggleTheme}
            onAskAi={() => setIsChatOpen(true)}
            onGetInTouch={() => setIsContactOpen(true)}
            className="w-full max-w-sm sm:max-w-md lg:max-w-none"
          />
        </div>

        {/* Right Section – Main Content Panel */}
        <div className="flex-1 w-full min-w-0 px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-10 lg:p-5 xl:p-8 2xl:p-10 flex flex-col justify-start lg:justify-center space-y-4 sm:space-y-6">
          <AboutSection theme={theme} />
          <SkillsMarquee theme={theme} />
          <ProjectsCarousel theme={theme} />
        </div>

      </div>

      {/* Echo AI Chat Panel */}
      <Suspense fallback={null}>
        {isChatOpen && (
          <EchoChatPanel
            theme={theme}
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        )}
      </Suspense>

      {/* Contact Modal */}
      <ContactModal
        theme={theme}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
};

export default LandingPage;
