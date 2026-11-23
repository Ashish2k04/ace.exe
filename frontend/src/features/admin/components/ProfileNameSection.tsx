import React, { useState } from 'react';
import { User } from 'lucide-react';

interface ProfileNameSectionProps {
  currentName?: string;
  onUpdate: (newName: string) => Promise<void> | void;
}

export const ProfileNameSection: React.FC<ProfileNameSectionProps> = ({
  currentName = 'Ashish Tiwari',
  onUpdate,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (val: string): string | null => {
    const trimmed = val.trim();
    if (!trimmed) return 'Name cannot be empty';
    if (trimmed.length < 2) return 'Name must be at least 2 characters';
    if (trimmed.length > 60) return 'Name cannot exceed 60 characters';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await onUpdate(name.trim());
      setName('');
    } catch {
      setError('Failed to update name. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      aria-label="Profile Name Management"
      className="w-full rounded-2xl sm:rounded-3xl border border-white/20 bg-black/60 p-4 sm:p-6 backdrop-blur-md transition-colors hover:border-white/30"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4"
      >
        {/* Name input */}
        <div className="flex-1 relative">
          <label htmlFor="admin-profile-name" className="sr-only">
            Enter your new name
          </label>
          <div className="relative">
            <input
              id="admin-profile-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder={`Enter your new name... (${currentName})`}
              className={`w-full rounded-xl border ${
                error ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/20 focus:border-white'
              } bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 font-mono outline-none transition-colors`}
            />
            <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
          </div>

          {error && (
            <p className="mt-1 text-[11px] font-mono text-rose-400" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Update Name button */}
        <button
          type="submit"
          disabled={isLoading}
          className="shrink-0 rounded-xl border border-white/30 hover:border-white bg-transparent px-5 py-3 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
        >
          {isLoading ? 'Updating...' : 'Update Name'}
        </button>
      </form>
    </section>
  );
};

export default ProfileNameSection;
