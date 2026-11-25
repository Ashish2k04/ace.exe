import React, { useState, useRef, useEffect } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import ImagePreview from './ImagePreview';
import type { Project } from '../../projects/data/projects';

interface ProjectFormProps {
  onAddProject: (project: Omit<Project, 'id'>) => Promise<void> | void;
}

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];

export const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject }) => {
  const [title, setTitle] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>(['HTML', 'CSS', 'JS', 'MERN', 'NEXTJS']);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<{
    title?: string;
    liveUrl?: string;
    githubUrl?: string;
    description?: string;
    screenshot?: string;
    skill?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (screenshotPreview && screenshotPreview.startsWith('blob:')) {
        URL.revokeObjectURL(screenshotPreview);
      }
    };
  }, [screenshotPreview]);

  const isValidUrl = (url: string) => {
    if (!url) return true; // optional unless specified
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        screenshot: 'Invalid image format. Supported: PNG, JPG, WEBP, SVG',
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, screenshot: 'Screenshot must be under 5MB' }));
      return;
    }

    setErrors((prev) => ({ ...prev, screenshot: undefined }));
    setScreenshotFile(file);

    if (screenshotPreview && screenshotPreview.startsWith('blob:')) {
      URL.revokeObjectURL(screenshotPreview);
    }
    const url = URL.createObjectURL(file);
    setScreenshotPreview(url);
  };

  const handleRemoveScreenshot = () => {
    if (screenshotPreview && screenshotPreview.startsWith('blob:')) {
      URL.revokeObjectURL(screenshotPreview);
    }
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (!trimmed) return;

    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setErrors((prev) => ({ ...prev, skill: `"${trimmed}" already added` }));
      return;
    }

    setSkills((prev) => [...prev, trimmed]);
    setNewSkillInput('');
    setErrors((prev) => ({ ...prev, skill: undefined }));
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = 'Project name is required';
    } else if (title.trim().length < 2) {
      newErrors.title = 'Project name must be at least 2 characters';
    }

    if (liveUrl.trim() && !isValidUrl(liveUrl.trim())) {
      newErrors.liveUrl = 'Please enter a valid URL (e.g. https://example.com)';
    }

    if (githubUrl.trim() && !isValidUrl(githubUrl.trim())) {
      newErrors.githubUrl = 'Please enter a valid URL (e.g. https://github.com/...)';
    }

    if (!description.trim()) {
      newErrors.description = 'Project description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      await onAddProject({
        title: title.trim(),
        category: 'Featured Project',
        description: description.trim(),
        technologies: skills,
        imageUrl: screenshotPreview || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        liveUrl: liveUrl.trim() || undefined,
        githubUrl: githubUrl.trim() || undefined,
      });

      // Reset form
      setTitle('');
      setLiveUrl('');
      setGithubUrl('');
      setDescription('');
      handleRemoveScreenshot();
      setErrors({});
    } catch {
      setErrors((prev) => ({ ...prev, title: 'Failed to add project' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Top Header with Add + Button */}
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-300">
          Add New Project
        </h3>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl border border-white/30 hover:border-white bg-transparent px-4 py-2 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5"
        >
          <span>{isLoading ? 'Adding...' : 'Add +'}</span>
        </button>
      </div>

      {/* 1. Enter project name */}
      <div>
        <label htmlFor="admin-project-name" className="sr-only">
          Project Name
        </label>
        <input
          id="admin-project-name"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          placeholder="Enter project name.."
          className={`w-full rounded-xl border ${
            errors.title ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/20 focus:border-white'
          } bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 font-mono outline-none transition-colors`}
        />
        {errors.title && (
          <p className="mt-1 text-[11px] font-mono text-rose-400" role="alert">
            {errors.title}
          </p>
        )}
      </div>

      {/* 2. Live preview Link */}
      <div>
        <label htmlFor="admin-project-live" className="sr-only">
          Live Preview Link
        </label>
        <input
          id="admin-project-live"
          type="url"
          value={liveUrl}
          onChange={(e) => {
            setLiveUrl(e.target.value);
            if (errors.liveUrl) setErrors((prev) => ({ ...prev, liveUrl: undefined }));
          }}
          placeholder="Live preview Link.. (e.g. https://yourproject.com)"
          className={`w-full rounded-xl border ${
            errors.liveUrl ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/20 focus:border-white'
          } bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 font-mono outline-none transition-colors`}
        />
        {errors.liveUrl && (
          <p className="mt-1 text-[11px] font-mono text-rose-400" role="alert">
            {errors.liveUrl}
          </p>
        )}
      </div>

      {/* 3. Source code Link */}
      <div>
        <label htmlFor="admin-project-github" className="sr-only">
          Source Code Link
        </label>
        <input
          id="admin-project-github"
          type="url"
          value={githubUrl}
          onChange={(e) => {
            setGithubUrl(e.target.value);
            if (errors.githubUrl) setErrors((prev) => ({ ...prev, githubUrl: undefined }));
          }}
          placeholder="Source code Link.. (e.g. https://github.com/...)"
          className={`w-full rounded-xl border ${
            errors.githubUrl ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/20 focus:border-white'
          } bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 font-mono outline-none transition-colors`}
        />
        {errors.githubUrl && (
          <p className="mt-1 text-[11px] font-mono text-rose-400" role="alert">
            {errors.githubUrl}
          </p>
        )}
      </div>

      {/* 4. Upload Screenshot */}
      <div>
        <input
          ref={fileInputRef}
          id="admin-project-screenshot"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleScreenshotChange}
          className="hidden"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 px-4 rounded-xl border border-white/20 hover:border-white/50 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-mono uppercase tracking-wider text-neutral-200 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Upload className="w-3.5 h-3.5 opacity-70" />
            <span>Upload Screenshot +</span>
          </button>

          {screenshotPreview && (
            <ImagePreview
              src={screenshotPreview}
              alt="Project screenshot preview"
              onRemove={handleRemoveScreenshot}
              label={screenshotFile?.name || 'Screenshot'}
            />
          )}
        </div>

        {errors.screenshot && (
          <p className="mt-1 text-[11px] font-mono text-rose-400" role="alert">
            {errors.screenshot}
          </p>
        )}
      </div>

      {/* 5. Project Skills Sub-Box */}
      <div className="rounded-2xl border border-white/20 bg-transparent p-4 space-y-3">
        <div className="flex items-center gap-2">
          <label htmlFor="admin-project-skill-input" className="sr-only">
            Enter Skill name to add
          </label>
          <input
            id="admin-project-skill-input"
            type="text"
            value={newSkillInput}
            onChange={(e) => {
              setNewSkillInput(e.target.value);
              if (errors.skill) setErrors((prev) => ({ ...prev, skill: undefined }));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="Enter Skill name to add.."
            className="flex-1 rounded-xl border border-white/20 focus:border-white bg-transparent px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-neutral-500 outline-none transition-colors"
          />

          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2.5 rounded-xl border border-white/30 hover:border-white bg-transparent text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer active:scale-95 hover:bg-white/5"
          >
            Add
          </button>
        </div>

        {errors.skill && (
          <p className="text-[11px] font-mono text-rose-400" role="alert">
            {errors.skill}
          </p>
        )}

        {/* Removable skills badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {skills.map((skill) => (
            <div
              key={skill}
              className="relative inline-flex items-center px-3 py-1.5 rounded-xl border border-white/20 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-white select-none"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                aria-label={`Remove skill ${skill}`}
                className="ml-2 -mr-1 p-0.5 rounded text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}

          {skills.length === 0 && (
            <span className="text-[11px] font-mono text-neutral-500">
              No skills attached to this project yet.
            </span>
          )}
        </div>
      </div>

      {/* 6. Write about section for your project */}
      <div>
        <label htmlFor="admin-project-desc" className="sr-only">
          Write about section for your project
        </label>
        <textarea
          id="admin-project-desc"
          rows={4}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
          }}
          placeholder="Write about section for your project.."
          className={`w-full rounded-xl border ${
            errors.description ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/20 focus:border-white'
          } bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 font-mono outline-none transition-colors resize-y min-h-[90px]`}
        />
        {errors.description && (
          <p className="mt-1 text-[11px] font-mono text-rose-400" role="alert">
            {errors.description}
          </p>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
