import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

interface ResumeManagerProps {
  currentResumeName?: string;
  onUpdate: (file: File) => Promise<void> | void;
}

export const ResumeManager: React.FC<ResumeManagerProps> = ({
  currentResumeName = 'Ashish_Tiwari_Resume.pdf',
  onUpdate,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUploadedName, setLastUploadedName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // PDF validation check
    const isPdfMime = file.type === 'application/pdf';
    const isPdfExt = file.name.toLowerCase().endsWith('.pdf');

    if (!isPdfMime && !isPdfExt) {
      setError('Invalid file format. Please upload a PDF file (.pdf).');
      setSelectedFile(null);
      return;
    }

    // Size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. PDF must be under 10MB.');
      setSelectedFile(null);
      return;
    }

    setError(null);
    setSelectedFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select a PDF resume file first.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await onUpdate(selectedFile);
      setLastUploadedName(selectedFile.name);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch {
      setError('Failed to update resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      aria-label="Resume Management"
      className="w-full rounded-2xl sm:rounded-3xl border border-white/20 bg-transparent p-4 sm:p-6 transition-colors hover:border-white/30"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Upload Trigger / File Info */}
        <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <input
            ref={fileInputRef}
            id="admin-resume-upload"
            type="file"
            accept="application/pdf,.pdf"
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

          {/* Selected or current file indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <FileText className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-xs">
              {selectedFile ? (
                <span className="text-white font-medium">{selectedFile.name}</span>
              ) : lastUploadedName ? (
                <span>{lastUploadedName}</span>
              ) : (
                <span>{currentResumeName}</span>
              )}
            </span>
            {selectedFile && (
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-sans">
                <CheckCircle2 className="w-3 h-3" /> Ready
              </span>
            )}
          </div>
        </div>

        {/* Update Resume Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedFile || isLoading}
          className="shrink-0 rounded-xl border border-white/30 hover:border-white bg-transparent px-5 py-3 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5"
        >
          {isLoading ? 'Updating...' : 'Update Resume'}
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

export default ResumeManager;
