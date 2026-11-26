import React, { useState } from 'react';
import { Share2, ExternalLink } from 'lucide-react';

export interface SocialLinks {
  linkedin: string;
  instagram: string;
  github: string;
  x: string;
}

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XTwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface SocialLinksManagerProps {
  currentLinks?: Partial<SocialLinks>;
  onUpdate: (links: SocialLinks) => Promise<void> | void;
}

export const SocialLinksManager: React.FC<SocialLinksManagerProps> = ({
  currentLinks,
  onUpdate,
}) => {
  const [links, setLinks] = useState<SocialLinks>({
    linkedin: currentLinks?.linkedin ?? 'https://linkedin.com/in/ashish2k04',
    instagram: currentLinks?.instagram ?? 'https://www.instagram.com/alienx.js/',
    github: currentLinks?.github ?? 'https://github.com/Ashish2k04',
    x: currentLinks?.x ?? 'https://x.com/alienx_js',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SocialLinks, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateUrl = (url: string): string | null => {
    const trimmed = url.trim();
    if (!trimmed) return null; // Optional if empty, or validate format if filled
    try {
      const parsed = new URL(trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`);
      if (!parsed.hostname.includes('.')) {
        return 'Please enter a valid URL';
      }
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  };

  const handleChange = (platform: keyof SocialLinks, value: string) => {
    setLinks((prev) => ({ ...prev, [platform]: value }));
    if (errors[platform]) {
      setErrors((prev) => ({ ...prev, [platform]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof SocialLinks, string>> = {};
    (Object.keys(links) as Array<keyof SocialLinks>).forEach((platform) => {
      const err = validateUrl(links[platform]);
      if (err) newErrors[platform] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await onUpdate({
        linkedin: links.linkedin.trim(),
        instagram: links.instagram.trim(),
        github: links.github.trim(),
        x: links.x.trim(),
      });
    } catch {
      // error handled by parent if needed
    } finally {
      setIsLoading(false);
    }
  };

  const platforms: Array<{
    id: keyof SocialLinks;
    label: string;
    placeholder: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      placeholder: 'https://linkedin.com/in/username',
      icon: <LinkedinIcon className="w-4 h-4 text-neutral-400" />,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      placeholder: 'https://instagram.com/username',
      icon: <InstagramIcon className="w-4 h-4 text-neutral-400" />,
    },
    {
      id: 'github',
      label: 'GitHub',
      placeholder: 'https://github.com/username',
      icon: <GithubIcon className="w-4 h-4 text-neutral-400" />,
    },
    {
      id: 'x',
      label: 'X (Twitter)',
      placeholder: 'https://x.com/username',
      icon: <XTwitterIcon className="w-4 h-4 text-neutral-400" />,
    },
  ];

  return (
    <section
      aria-label="Social Media Links Management"
      className="w-full rounded-2xl sm:rounded-3xl border border-white/20 bg-transparent p-4 sm:p-6 transition-colors hover:border-white/30 space-y-4 sm:space-y-5"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Header row */}
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-neutral-400" />
            <h2 className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase font-mono">
              Social Media Links
            </h2>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="shrink-0 rounded-xl border border-white/30 hover:border-white bg-transparent px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
          >
            {isLoading ? 'Updating...' : 'Update Links'}
          </button>
        </div>

        {/* 2x2 Grid of Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {platforms.map(({ id, label, placeholder, icon }) => (
            <div key={id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={`admin-social-${id}`}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-400 font-mono"
                >
                  {icon}
                  <span>{label}</span>
                </label>

                {links[id] && (
                  <a
                    href={links[id].startsWith('http') ? links[id] : `https://${links[id]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Test link to ${label}`}
                    className="text-neutral-500 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="relative">
                <input
                  id={`admin-social-${id}`}
                  type="url"
                  value={links[id]}
                  onChange={(e) => handleChange(id, e.target.value)}
                  placeholder={placeholder}
                  className={`w-full rounded-xl border ${
                    errors[id]
                      ? 'border-rose-500/80 focus:border-rose-500'
                      : 'border-white/20 focus:border-white'
                  } bg-transparent px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 font-mono outline-none transition-colors`}
                />
              </div>

              {errors[id] && (
                <p className="text-[11px] font-mono text-rose-400" role="alert">
                  {errors[id]}
                </p>
              )}
            </div>
          ))}
        </div>
      </form>
    </section>
  );
};

export default SocialLinksManager;
