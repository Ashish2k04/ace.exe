import React from 'react';
import type { Project } from '../data/projects';

interface ProjectInfoProps {
  project: Project;
  theme: 'dark' | 'light';
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({ project, theme }) => {
  const isDark = theme === 'dark';

  const borderColor = isDark ? 'border-white/20' : 'border-black/20';
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const descColor = isDark ? 'text-neutral-300' : 'text-neutral-700';
  const badgeBg = isDark ? 'bg-white/[0.04] hover:bg-white/[0.08]' : 'bg-black/[0.04] hover:bg-black/[0.08]';

  return (
    <div className="flex flex-col justify-start h-full w-full">
      {/* Title & Category Header */}
      <div className="mb-6">
        <h1 className={`text-2xl sm:text-3xl font-normal tracking-tight ${textColor} mb-1.5`}>
          {project.title}
        </h1>
        {project.category && (
          <p className={`text-xs font-mono uppercase tracking-widest ${subTextColor}`}>
            {project.category}
          </p>
        )}
      </div>

      {/* Technology Stack Badges */}
      <div className="mb-6">
        <p className={`text-[11px] font-mono uppercase tracking-wider ${subTextColor} mb-3`}>
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={`px-3.5 py-1.5 rounded-xl border ${borderColor} ${badgeBg} ${textColor} text-xs font-mono tracking-wide transition-colors duration-200 select-none`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project Description */}
      <div className="flex-1">
        <p className={`text-[11px] font-mono uppercase tracking-wider ${subTextColor} mb-3`}>
          About the Project
        </p>
        <p className={`text-sm sm:text-[15px] font-light leading-relaxed ${descColor}`}>
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectInfo;
