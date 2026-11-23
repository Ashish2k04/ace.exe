import React, { useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import ImagePreview from './ImagePreview';

interface ProfileImageSectionProps {
  currentPfpUrl?: string;
  onUpdate: (file: File) => Promise<void> | void;
}

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({
  currentPfpUrl = '/ace.png',
  onUpdate,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs on change or unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (file: File) => {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      setError('Invalid format. Please upload PNG, JPG, WEBP, or SVG.');
      setSelectedFile(null);
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size too large. Maximum size is 5MB.');
      setSelectedFile(null);
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Create object URL preview
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemovePreview = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select an image file first.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await onUpdate(selectedFile);
      handleRemovePreview();
    } catch {
      setError('Failed to update profile picture. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      aria-label="Profile Picture Management"
      className="w-full rounded-2xl sm:rounded-3xl border border-white/20 bg-black/60 p-4 sm:p-6 backdrop-blur-md transition-colors hover:border-white/30"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Upload Button / Trigger */}
        <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            ref={fileInputRef}
            id="admin-pfp-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleInputChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/20 hover:border-white/50 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-mono uppercase tracking-wider text-neutral-200 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Upload className="w-3.5 h-3.5 opacity-70" />
            <span>Upload File +</span>
          </button>

          {/* Image preview (either selected or current) */}
          <div className="flex items-center gap-3">
            {previewUrl ? (
              <ImagePreview
                src={previewUrl}
                alt="Selected profile preview"
                onRemove={handleRemovePreview}
                label="New Selection"
              />
            ) : currentPfpUrl ? (
              <ImagePreview
                src={currentPfpUrl}
                alt="Current profile picture"
                label="Current PFP"
              />
            ) : null}
          </div>
        </div>

        {/* Update Pfp button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedFile || isLoading}
          className="shrink-0 rounded-xl border border-white/30 hover:border-white bg-transparent px-5 py-3 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5"
        >
          {isLoading ? 'Updating...' : 'Update Pfp'}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-[11px] font-mono text-rose-400" role="alert">
          {error}
        </p>
      )}
    </section>
  );
};

export default ProfileImageSection;
