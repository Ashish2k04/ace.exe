import React from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
  src: string | null;
  alt?: string;
  onRemove?: () => void;
  className?: string;
  label?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt = 'Image preview',
  onRemove,
  className = '',
  label,
}) => {
  if (!src) return null;

  return (
    <div className={`relative inline-flex flex-col items-center group ${className}`}>
      <div className="relative rounded-2xl border border-white/20 bg-neutral-900/60 p-1.5 overflow-hidden shadow-lg">
        <img
          src={src}
          alt={alt}
          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl select-none"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.img-error-fallback')) {
              const fallback = document.createElement('div');
              fallback.className =
                'img-error-fallback w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center text-neutral-500 text-[10px] font-mono text-center p-2';
              fallback.innerText = 'Preview failed';
              parent.appendChild(fallback);
            }
          }}
        />

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove image"
            className="absolute top-2.5 right-2.5 p-1 rounded-lg bg-black/80 border border-white/20 text-neutral-300 hover:text-white hover:border-white transition-all cursor-pointer shadow-md"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {label && (
        <span className="mt-1.5 text-[11px] font-mono text-neutral-400 flex items-center gap-1">
          <ImageIcon className="w-3 h-3 opacity-60" />
          {label}
        </span>
      )}
    </div>
  );
};

export default ImagePreview;
