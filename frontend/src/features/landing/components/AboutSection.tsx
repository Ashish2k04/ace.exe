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

  return (
    <section
      id="about"
      className={`w-full max-w-xl sm:max-w-[768px] md:max-w-[800px] mx-auto px-1 sm:px-1.5 py-2 sm:py-3 rounded-2xl border-none bg-transparent transition-colors duration-300 ${className}`}
    >
      <p
        className={`text-justify text-sm sm:text-[15px] font-light leading-relaxed ${textColor} transition-colors duration-300`}
      >
        I'm a <span className={`font-medium ${highlightColor}`}>Full-Stack Developer</span> with a strong interest in backend engineering and building practical web applications. I work with React, TypeScript, Node.js, Express, and MongoDB, focusing on API development, authentication, and application architecture.
        I'm constantly exploring system design, cloud technologies, and AI to build more reliable and scalable software.
      </p>
    </section>
  );
};

export default AboutSection;

