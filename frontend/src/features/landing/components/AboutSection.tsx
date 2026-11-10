import React from 'react';

interface AboutSectionProps {
  theme: 'dark' | 'light';
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  theme,
  className = '',
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-neutral-300' : 'text-neutral-700';
  const highlightColor = isDark ? 'text-white' : 'text-black';
  const borderColor = isDark ? 'border-white/15' : 'border-black/15';

  return (
    <section
      id="about"
      className={`p-4 sm:p-5 rounded-2xl border ${borderColor} bg-transparent transition-colors duration-300 ${className}`}
    >
      <p
        className={`text-sm sm:text-[15px] font-light leading-relaxed ${textColor} transition-colors duration-300`}
      >
        I'm a <span className={`font-medium ${highlightColor}`}>Full-Stack Developer</span> with a
        passion for building scalable web applications, solving real-world problems, and exploring
        new technologies.
      </p>
    </section>
  );
};

export default AboutSection;

