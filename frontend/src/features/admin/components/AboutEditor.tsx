import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface AboutEditorProps {
  initialAbout?: string;
  onSave: (newAbout: string) => Promise<void> | void;
}

export const AboutEditor: React.FC<AboutEditorProps> = ({
  initialAbout = "I'm a Full-Stack Developer with a passion for building scalable web applications, solving real-world problems, and exploring new technologies.",
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialAbout);
  const [savedText, setSavedText] = useState(initialAbout);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (val: string): string | null => {
    const trimmed = val.trim();
    if (!trimmed) return 'About text cannot be empty';
    if (trimmed.length < 10) return 'About text must be at least 10 characters';
    if (trimmed.length > 1000) return 'About text cannot exceed 1000 characters';
    return null;
  };

  const handleStartEdit = () => {
    setText(savedText);
    setError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setText(savedText);
    setError(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const validationError = validate(text);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await onSave(text.trim());
      setSavedText(text.trim());
      setIsEditing(false);
    } catch {
      setError('Failed to save about section. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      aria-label="About Section Management"
      className="w-full rounded-2xl sm:rounded-3xl border border-white/20 bg-transparent p-4 sm:p-6 transition-colors hover:border-white/30"
    >
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        {/* About content or edit textarea */}
        <div className="flex-1 w-full">
          {!isEditing ? (
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed font-mono">
              {savedText}
            </p>
          ) : (
            <div className="space-y-2 w-full">
              <label htmlFor="admin-about-textarea" className="sr-only">
                Edit About Section
              </label>
              <textarea
                id="admin-about-textarea"
                rows={4}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (error) setError(null);
                }}
                className={`w-full rounded-xl border ${
                  error ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/20 focus:border-white'
                } bg-neutral-900/50 p-3.5 text-xs sm:text-sm text-white font-mono leading-relaxed outline-none transition-colors resize-none`}
                placeholder="Enter about description..."
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>{text.length}/1000 characters</span>
                {error && <span className="text-rose-400">{error}</span>}
              </div>
            </div>
          )}
        </div>

        {/* Action Button: EDIT or Save/Cancel */}
        <div className="shrink-0 flex items-center gap-2 self-end sm:self-start">
          {!isEditing ? (
            <button
              type="button"
              onClick={handleStartEdit}
              className="rounded-xl border border-white/30 hover:border-white bg-transparent px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 hover:bg-white/5"
            >
              <span>EDIT</span>
              <Pencil className="w-3.5 h-3.5 text-orange-400" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="rounded-xl border border-white/20 hover:border-white/40 bg-transparent px-3 py-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isLoading}
                className="rounded-xl border border-white bg-white text-black px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1 transition-transform cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isLoading ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutEditor;
