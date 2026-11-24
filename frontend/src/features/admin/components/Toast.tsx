import React from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border bg-black/90 backdrop-blur-md shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
              isSuccess
                ? 'border-emerald-500/40 text-emerald-300'
                : isError
                ? 'border-rose-500/40 text-rose-300'
                : 'border-white/20 text-neutral-200'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <Check className="w-4 h-4 text-emerald-400" />}
              {isError && <AlertCircle className="w-4 h-4 text-rose-400" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-neutral-400" />}
            </div>

            <p className="flex-1 text-xs leading-relaxed text-neutral-200 font-mono">
              {toast.message}
            </p>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 text-neutral-400 hover:text-white transition-colors p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
