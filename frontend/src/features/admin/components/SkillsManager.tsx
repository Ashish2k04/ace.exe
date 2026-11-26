import React, { useState } from 'react';
import { Plus, Trash2, X, Check } from 'lucide-react';

interface SkillsManagerProps {
  skills: string[];
  onAddSkill: (skill: string) => Promise<void> | void;
  onRequestDeleteSkill: (skill: string) => void;
}

export const SkillsManager: React.FC<SkillsManagerProps> = ({
  skills,
  onAddSkill,
  onRequestDeleteSkill,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newSkill.trim();

    if (!trimmed) {
      setError('Skill name cannot be empty');
      return;
    }

    // Duplicate check (case-insensitive)
    const exists = skills.some((s) => s.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      setError(`"${trimmed}" already exists`);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await onAddSkill(trimmed);
      setNewSkill('');
      setIsAdding(false);
    } catch {
      setError('Failed to add skill');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      aria-label="Skills Management"
      className="w-full rounded-2xl sm:rounded-3xl border border-white/20 bg-transparent p-4 sm:p-6 transition-colors hover:border-white/30"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Badges list */}
        <div className="flex-1 flex flex-wrap gap-2.5 sm:gap-3 items-center">
          {skills.map((skill) => (
            <div
              key={skill}
              className="relative inline-flex items-center px-3.5 py-1.5 rounded-xl border border-white/20 bg-white/[0.03] text-xs font-mono uppercase tracking-wider text-white select-none group hover:border-white/40 transition-colors"
            >
              <span>{skill}</span>

              {/* Trash icon positioned at top right matching wireframe */}
              <button
                type="button"
                onClick={() => onRequestDeleteSkill(skill)}
                aria-label={`Delete skill ${skill}`}
                className="ml-2 -mr-1 p-0.5 rounded text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}

          {skills.length === 0 && (
            <span className="text-xs font-mono text-neutral-500">No skills added yet.</span>
          )}
        </div>

        {/* Add button / inline input */}
        <div className="shrink-0 self-end sm:self-center">
          {!isAdding ? (
            <button
              type="button"
              onClick={() => {
                setIsAdding(true);
                setError(null);
              }}
              className="rounded-xl border border-white/30 hover:border-white bg-transparent px-4 py-2 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 hover:bg-white/5"
            >
              <span>Add</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
          ) : (
            <form onSubmit={handleAdd} className="flex items-center gap-1.5">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  value={newSkill}
                  onChange={(e) => {
                    setNewSkill(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Skill name..."
                  className="w-32 sm:w-40 px-3 py-1.5 rounded-xl border border-white/30 focus:border-white bg-neutral-900 text-xs font-mono text-white placeholder:text-neutral-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                aria-label="Confirm add skill"
                className="p-1.5 rounded-xl border border-white bg-white text-black transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Check className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setNewSkill('');
                  setError(null);
                }}
                aria-label="Cancel adding skill"
                className="p-1.5 rounded-xl border border-white/20 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-2 text-[11px] font-mono text-rose-400" role="alert">
          {error}
        </p>
      )}
    </section>
  );
};

export default SkillsManager;
