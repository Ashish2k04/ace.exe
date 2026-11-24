import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Project } from '../../projects/data/projects';

interface ProjectListProps {
  projects: Project[];
  onRequestDelete: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onRequestDelete }) => {
  return (
    <div className="pt-6 border-t border-white/15 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs sm:text-sm font-mono tracking-wider text-neutral-300">
          All projects ({projects.length})
        </h4>
        <span className="text-[11px] font-mono text-neutral-500">
          Delete only • No edit
        </span>
      </div>

      {projects.length === 0 ? (
        <p className="text-xs font-mono text-neutral-500 py-4 text-center">
          No projects available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/[0.03] hover:border-white/40 transition-all select-none group"
            >
              {/* Thumbnail thumbnail if available */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {project.imageUrl ? (
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-neutral-900">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale opacity-75 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ) : null}

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-mono text-white truncate tracking-wide">
                    {project.title}
                  </p>
                  {project.category && (
                    <p className="text-[10px] font-mono text-neutral-400 truncate">
                      {project.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Individual delete action with trash icon matching wireframe */}
              <button
                type="button"
                onClick={() => onRequestDelete(project)}
                aria-label={`Delete project ${project.title}`}
                className="shrink-0 p-1.5 rounded-lg border border-transparent hover:border-rose-500/40 text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
