import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  theme: 'dark' | 'light';
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactModal: React.FC<ContactModalProps> = ({ theme, isOpen, onClose }) => {
  const isDark = theme === 'dark';
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    message?: boolean;
  }>({});

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validate a single field
  const validateField = (field: keyof FormState, value: string): string | undefined => {
    const trimmed = value.trim();
    if (field === 'name') {
      if (!trimmed) return 'Name is required';
      if (trimmed.length < 2) return 'Name must be at least 2 characters';
      if (trimmed.length > 80) return 'Name cannot exceed 80 characters';
    }
    if (field === 'email') {
      if (!trimmed) return 'Email is required';
      if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address';
    }
    if (field === 'message') {
      if (!trimmed) return 'Message is required';
      if (trimmed.length < 10) return 'Message must be at least 10 characters';
      if (trimmed.length > 1000) return 'Message cannot exceed 1000 characters';
    }
    return undefined;
  };

  // Validate entire form
  const validateForm = (data: FormState): FormErrors => {
    const newErrors: FormErrors = {};
    const nameErr = validateField('name', data.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField('email', data.email);
    if (emailErr) newErrors.email = emailErr;

    const msgErr = validateField('message', data.message);
    if (msgErr) newErrors.message = msgErr;

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormState;

    setFormData((prev) => ({ ...prev, [key]: value }));

    // Update error dynamically if field has already been touched
    if (touched[key]) {
      const fieldError = validateField(key, value);
      setErrors((prev) => ({ ...prev, [key]: fieldError }));
    }

    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormState;

    setTouched((prev) => ({ ...prev, [key]: true }));
    const fieldError = validateField(key, value);
    setErrors((prev) => ({ ...prev, [key]: fieldError }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    // Frontend-only confirmation as strictly requested (no backend/API calls)
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('Form is ready! Message submission will be connected soon.');
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
    }, 400);
  };

  // Keyboard navigation, focus management & scroll lock
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement;

    // Lock background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button initially to keep focus in modal without popping virtual mobile keyboard
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap focus inside modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(focusableElements).filter(
          (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      // Return focus to previously active element (the Get in Touch button)
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const borderColor = isDark ? 'border-white/20' : 'border-black/20';
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const modalBg = isDark ? 'bg-neutral-950/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl';
  const inputBg = isDark ? 'bg-white/[0.03]' : 'bg-black/[0.02]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        className={`relative z-10 w-full max-w-[420px] sm:max-w-[440px] rounded-3xl border ${borderColor} ${modalBg} ${textColor} p-5 sm:p-6 shadow-2xl transition-all duration-300 my-auto`}
      >
        <h2 id="contact-modal-title" className="sr-only">
          Get in Touch with Ashish Tiwari
        </h2>

        {/* Top Prominent CLOSE Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className={`w-full py-2 px-4 mb-4 rounded-xl border ${borderColor} hover:border-current bg-transparent ${textColor} text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.99]`}
          aria-label="Close modal"
        >
          <X className="w-3.5 h-3.5 opacity-80" />
          <span>CLOSE</span>
        </button>

        {/* Form Confirmation UI */}
        {successMessage && (
          <div
            className={`mb-4 p-3 rounded-xl border ${
              isDark
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border-emerald-600/30 bg-emerald-50 text-emerald-800'
            } text-xs flex items-center gap-2`}
            role="status"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span className="leading-snug">{successMessage}</span>
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          {/* Name Field */}
          <div>
            <label htmlFor="contact-name" className="sr-only">
              Your Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your Good Name..."
              aria-invalid={!!touched.name && !!errors.name}
              aria-describedby={touched.name && errors.name ? 'contact-name-error' : undefined}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                touched.name && errors.name
                  ? 'border-red-500/80 focus:border-red-500'
                  : `${borderColor} focus:border-current`
              } ${inputBg} text-xs sm:text-sm ${textColor} placeholder:${subTextColor} outline-none transition-colors duration-200`}
            />
            {touched.name && errors.name && (
              <p id="contact-name-error" className="mt-1 text-[11px] text-red-400 font-mono" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="contact-email" className="sr-only">
              Your Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your Email Please..."
              aria-invalid={!!touched.email && !!errors.email}
              aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                touched.email && errors.email
                  ? 'border-red-500/80 focus:border-red-500'
                  : `${borderColor} focus:border-current`
              } ${inputBg} text-xs sm:text-sm ${textColor} placeholder:${subTextColor} outline-none transition-colors duration-200`}
            />
            {touched.email && errors.email && (
              <p id="contact-email-error" className="mt-1 text-[11px] text-red-400 font-mono" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="contact-message" className="sr-only">
              Your Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your Message Please..."
              aria-invalid={!!touched.message && !!errors.message}
              aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                touched.message && errors.message
                  ? 'border-red-500/80 focus:border-red-500'
                  : `${borderColor} focus:border-current`
              } ${inputBg} text-xs sm:text-sm ${textColor} placeholder:${subTextColor} outline-none transition-colors duration-200 resize-none`}
            />
            {touched.message && errors.message && (
              <p id="contact-message-error" className="mt-1 text-[11px] text-red-400 font-mono" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`relative overflow-hidden w-full py-2.5 px-4 rounded-xl border ${borderColor} hover:border-current bg-transparent ${textColor} text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className={`shine-effect ${theme === 'light' ? 'shine-light' : 'shine-dark'}`} />
            <span>{isSubmitting ? 'VALIDATING...' : 'SUBMIT'}</span>
          </button>
        </form>

        {/* OTHER OPTIONS Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className={`border-t ${borderColor} w-full`} />
          <span
            className={`absolute px-2.5 ${modalBg} text-[10px] font-mono uppercase tracking-widest ${subTextColor}`}
          >
            OTHER OPTIONS
          </span>
        </div>

        {/* Social Icons Row */}
        <div className="flex items-center justify-center gap-3 pt-0.5">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/ashish2k04"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className={`w-9 h-9 rounded-xl border ${borderColor} hover:border-current flex items-center justify-center ${textColor} transition-all duration-200 cursor-pointer active:scale-95`}
          >
            <LinkedinIcon className="w-4 h-4 opacity-80 hover:opacity-100" />
          </a>

          {/* X / Twitter (Non-clickable / disabled per instruction not to invent URLs) */}
          <span
            aria-disabled="true"
            title="X / Twitter (Profile not linked)"
            className={`w-9 h-9 rounded-xl border ${borderColor} flex items-center justify-center ${textColor} opacity-35 cursor-not-allowed select-none`}
          >
            <XTwitterIcon className="w-3.5 h-3.5" />
          </span>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/alienx.js/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className={`w-9 h-9 rounded-xl border ${borderColor} hover:border-current flex items-center justify-center ${textColor} transition-all duration-200 cursor-pointer active:scale-95`}
          >
            <InstagramIcon className="w-4 h-4 opacity-80 hover:opacity-100" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
