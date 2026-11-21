import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectPreviewProps {
  project: Project;
  theme: 'dark' | 'light';
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project, theme }) => {
  const isDark = theme === 'dark';

  const borderColor = isDark ? 'border-white/20' : 'border-black/20';
  const borderHover = isDark ? 'hover:border-white' : 'hover:border-black';
  const textColor = isDark ? 'text-white' : 'text-black';
  const previewBg = isDark ? 'bg-neutral-900/60' : 'bg-neutral-100/80';
  const buttonBg = isDark ? 'bg-white/[0.03] hover:bg-white/[0.08]' : 'bg-black/[0.03] hover:bg-black/[0.08]';

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Project Screenshot Container */}
      <div
        className={`w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl border ${borderColor} ${previewBg} overflow-hidden p-1.5 flex items-center justify-center transition-colors duration-300 shadow-lg`}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover rounded-xl select-none transition-transform duration-500 hover:scale-[1.02]"
          onError={(e) => {
            // Fallback placeholder if image fails to load
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.img-fallback')) {
              const fallback = document.createElement('div');
              fallback.className =
                'img-fallback w-full h-full rounded-xl flex items-center justify-center font-mono text-xs uppercase opacity-50';
              fallback.innerText = project.title;
              parent.appendChild(fallback);
            }
          }}
        />
      </div>

      {/* Action Buttons: Live Preview & Source Code */}
      <div className="flex flex-col gap-2.5 w-full">
        {/* Live Preview Button */}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3 px-4 rounded-xl border ${borderColor} ${borderHover} ${buttonBg} ${textColor} text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.99] group`}
          >
            <span>Live Preview</span>
            <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className={`w-full py-3 px-4 rounded-xl border ${borderColor} bg-transparent ${textColor} opacity-40 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-not-allowed`}
          >
            <span>Live Preview (Coming Soon)</span>
            <ArrowUpRight className="w-4 h-4 opacity-50" />
          </button>
        )}

        {/* Source Code Button */}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3 px-4 rounded-xl border ${borderColor} ${borderHover} ${buttonBg} ${textColor} text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.99] group`}
          >
            <span>Source Code</span>
            <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className={`w-full py-3 px-4 rounded-xl border ${borderColor} bg-transparent ${textColor} opacity-40 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-not-allowed`}
          >
            <span>Source Code (Private)</span>
            <ArrowUpRight className="w-4 h-4 opacity-50" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectPreview;
