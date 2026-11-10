import React from 'react';
import { Sparkles, Mail, FileDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ProfilePanelProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  className?: string;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({
  theme,
  onToggleTheme,
  className = '',
}) => {
  const isDark = theme === 'dark';

  const borderColor = isDark ? 'border-white/20' : 'border-black/20';
  const borderHover = isDark ? 'hover:border-white' : 'hover:border-black';
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-600';

  const handleResumeDownload = () => {
    // Open resume or download placeholder
    window.open('#resume', '_blank');
  };

  const handleGetInTouch = () => {
    window.location.href = 'mailto:contact@ashishtiwari.dev';
  };

  const handleAskAi = () => {
    // Interactive UI feedback
    const msg = "AI Assistant will be available soon!";
    alert(msg);
  };

  return (
    <aside
      className={`flex flex-col items-center text-center p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-none shrink-0 ${className}`}
    >
      {/* Avatar Container: Square with rounded corners and Theme Toggle badge */}
      <div className="relative mb-4">
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border ${borderColor} p-1.5 flex items-center justify-center overflow-hidden transition-colors duration-300`}
        >
          <img
            src="/ace.png"
            alt="Ashish Tiwari"
            className="w-full h-full object-cover rounded-xl select-none"
            onError={(e) => {
              // Fallback to stylized SVG avatar if image fails to load
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.avatar-fallback')) {
                const fallback = document.createElement('div');
                fallback.className =
                  'avatar-fallback w-full h-full rounded-xl flex items-center justify-center font-mono font-bold text-xl uppercase';
                fallback.innerText = 'AT';
                parent.appendChild(fallback);
              }
            }}
          />
        </div>

        {/* Theme Toggle positioned at bottom-right of avatar square */}
        <div className="absolute -bottom-1 -right-1 z-10">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>

      {/* Name & Title */}
      <div className="mb-6">
        <h1
          className={`text-xl sm:text-2xl font-normal tracking-tight ${textColor} transition-colors duration-300`}
        >
          Ashish Tiwari
        </h1>
        <p className={`text-xs ${subTextColor} font-mono tracking-widest mt-1 uppercase`}>
          Full-Stack Developer
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5">
        {/* Ask AI Button */}
        <button
          type="button"
          onClick={handleAskAi}
          className={`w-full py-2.5 px-4 rounded-xl border ${borderColor} ${borderHover} bg-transparent ${textColor} text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.99]`}
        >
          <Sparkles className="w-3.5 h-3.5 opacity-70" />
          <span>Ask Ai</span>
        </button>

        {/* Get in Touch Button */}
        <button
          type="button"
          onClick={handleGetInTouch}
          className={`w-full py-2.5 px-4 rounded-xl border ${borderColor} ${borderHover} bg-transparent ${textColor} text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.99]`}
        >
          <Mail className="w-3.5 h-3.5 opacity-70" />
          <span>Get in touch</span>
        </button>

        {/* Get Resume Button: visible directly below 'Get in touch' on both desktop and mobile */}
        <button
          type="button"
          onClick={handleResumeDownload}
          className={`w-full py-2.5 px-4 rounded-xl border border-dashed ${
            isDark ? 'border-white/40 hover:border-white' : 'border-black/40 hover:border-black'
          } bg-transparent ${textColor} text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.99]`}
        >
          <FileDown className="w-3.5 h-3.5 opacity-70" />
          <span>Get Resume</span>
        </button>

        {/* GitHub & LinkedIn side by side */}
        <div className="flex items-center gap-2 pt-1 w-full">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 py-2 px-3 rounded-xl border ${borderColor} ${borderHover} bg-transparent ${textColor} text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-[0.99]`}
          >
            <GithubIcon className="w-3.5 h-3.5 opacity-80" />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 py-2 px-3 rounded-xl border ${borderColor} ${borderHover} bg-transparent ${textColor} text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-[0.99]`}
          >
            <LinkedinIcon className="w-3.5 h-3.5 opacity-80" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default ProfilePanel;
