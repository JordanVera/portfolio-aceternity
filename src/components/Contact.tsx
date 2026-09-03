'use client';
import { ElectricHover } from '@/components/ElectricBorder';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  IconCircleCheckFilled,
  IconExclamationCircle,
  IconFile,
  IconPaperclip,
  IconX,
} from '@tabler/icons-react';

const CONTACT_EMAIL = 'verawebdev@protonmail.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const PROJECT_TYPES = [
  'Website',
  'Web app',
  'Native app',
  'API',
  'Brand',
  'Something else',
] as const;

const TIMELINES = [
  'ASAP',
  '1–3 months',
  '3–6 months',
  'Just exploring',
] as const;

const BUDGETS = [
  'Under $1k',
  '$1–5k',
  '$5–10k',
  '$10k+',
  'Not sure yet',
] as const;

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
const ACCEPT_ATTR =
  'image/png,image/jpeg,image/webp,image/gif,image/svg+xml,application/pdf';
const ALLOWED_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
]);
const ALLOWED_EXTENSIONS = /\.(png|jpe?g|webp|gif|svg|pdf)$/i;

const fieldClass =
  'bg-input focus:outline-none focus:ring-2 focus:ring-input-ring px-2 py-2 rounded-md text-sm text-input-fg w-full placeholder:text-foreground-subtle';

type Attachment = {
  id: string;
  file: File;
  previewUrl: string | null;
};

const isAllowedFile = (file: File) =>
  ALLOWED_TYPES.has(file.type) || ALLOWED_EXTENSIONS.test(file.name);

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const revokePreviews = (items: Attachment[]) => {
  items.forEach((item) => {
    if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
  });
};

const mergeAttachments = (prev: Attachment[], incoming: File[]) => {
  const next = [...prev];
  let error = '';

  for (const file of incoming) {
    if (!isAllowedFile(file)) {
      error = `${file.name} is not a supported type. Use PNG, JPG, SVG, WebP, GIF, or PDF.`;
      continue;
    }

    const duplicate = next.some(
      (item) => item.file.name === file.name && item.file.size === file.size,
    );
    if (duplicate) continue;

    if (next.length >= MAX_FILES) {
      error = `You can attach up to ${MAX_FILES} files.`;
      break;
    }

    const total = next.reduce((sum, item) => sum + item.file.size, 0) + file.size;
    if (total > MAX_TOTAL_BYTES) {
      error = 'Attachments must stay under 10MB total.';
      continue;
    }

    next.push({
      id: `${file.name}-${file.size}-${file.lastModified}-${next.length}`,
      file,
      previewUrl: file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : null,
    });
  }

  return { next, error };
};

const defaultFormState = {
  name: { value: '', error: '' },
  email: { value: '', error: '' },
  company: { value: '', error: '' },
  projectType: { value: '', error: '' },
  timeline: { value: '', error: '' },
  budget: { value: '', error: '' },
  message: { value: '', error: '' },
};

type FormField = keyof typeof defaultFormState;
type Status = 'idle' | 'submitting';
type ToastState = {
  type: 'success' | 'error';
  message: string;
} | null;

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const Contact = () => {
  const [formData, setFormData] = useState(defaultFormState);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [attachmentError, setAttachmentError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [toast, setToast] = useState<ToastState>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachmentsRef = useRef(attachments);
  attachmentsRef.current = attachments;

  useEffect(() => {
    return () => revokePreviews(attachmentsRef.current);
  }, []);

  const isComplete =
    formData.name.value.trim().length > 0 &&
    isValidEmail(formData.email.value) &&
    formData.projectType.value.length > 0 &&
    formData.timeline.value.length > 0 &&
    formData.budget.value.length > 0 &&
    formData.message.value.trim().length > 0;

  const updateField = (field: FormField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { value, error: '' },
    }));
  };

  const addFiles = (incoming: FileList | File[]) => {
    const { next, error } = mergeAttachments(attachments, Array.from(incoming));
    setAttachments(next);
    setAttachmentError(error);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const removed = prev.find((item) => item.id === id);
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
    setAttachmentError('');
  };

  const resetAttachments = () => {
    revokePreviews(attachments);
    setAttachments([]);
    setAttachmentError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting' || !isComplete) return;

    setStatus('submitting');

    const name = formData.name.value.trim();
    const projectType = formData.projectType.value;
    const payload = new FormData();
    const honey = (
      e.currentTarget.elements.namedItem('_honey') as HTMLInputElement | null
    )?.value;

    payload.append('name', name);
    payload.append('email', formData.email.value.trim());
    payload.append('company', formData.company.value.trim() || '—');
    payload.append('Project type', projectType);
    payload.append('Timeline', formData.timeline.value);
    payload.append('Budget', formData.budget.value);
    payload.append('Brief', formData.message.value.trim());
    payload.append(
      'Attachments',
      attachments.map((item) => item.file.name).join(', ') || 'None',
    );
    payload.append('_subject', `Hire inquiry from ${name} — ${projectType}`);
    payload.append('_template', 'table');
    payload.append('_captcha', 'false');
    if (honey) payload.append('_honey', honey);

    attachments.forEach((item, index) => {
      payload.append(`attachment ${index + 1}`, item.file, item.file.name);
    });

    try {
      const response = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      const data = await response.json().catch(() => null);

      if (
        !response.ok ||
        data?.success === 'false' ||
        data?.success === false
      ) {
        throw new Error(data?.message || 'Failed to send');
      }

      setToast({
        type: 'success',
        message: "Thanks — I'll reply about this project ASAP.",
      });
      setFormData(defaultFormState);
      resetAttachments();
    } catch {
      setToast({
        type: 'error',
        message: `Something went wrong. Email me at ${CONTACT_EMAIL}.`,
      });
    } finally {
      setStatus('idle');
    }
  };

  return (
    <>
      <form
        id="contactform"
        onSubmit={handleFormSubmit}
        noValidate
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            aria-label="Your name"
            className={fieldClass}
            value={formData.name.value}
            onChange={(e) => updateField('name', e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            aria-label="Your email address"
            className={fieldClass}
            value={formData.email.value}
            onChange={(e) => updateField('email', e.target.value)}
          />
        </div>
        <input
          type="text"
          name="company"
          placeholder="Company or project name (optional)"
          autoComplete="organization"
          aria-label="Company or project name"
          className={`${fieldClass} mt-4`}
          value={formData.company.value}
          onChange={(e) => updateField('company', e.target.value)}
        />
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:gap-5">
          <select
            name="projectType"
            aria-label="Project type"
            className={`${fieldClass} ${
              formData.projectType.value ? '' : 'text-foreground-subtle'
            }`}
            value={formData.projectType.value}
            onChange={(e) => updateField('projectType', e.target.value)}
          >
            <option value="" disabled>
              Project type
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            name="timeline"
            aria-label="Timeline"
            className={`${fieldClass} ${
              formData.timeline.value ? '' : 'text-foreground-subtle'
            }`}
            value={formData.timeline.value}
            onChange={(e) => updateField('timeline', e.target.value)}
          >
            <option value="" disabled>
              Timeline
            </option>
            {TIMELINES.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
          <select
            name="budget"
            aria-label="Budget"
            className={`${fieldClass} ${
              formData.budget.value ? '' : 'text-foreground-subtle'
            }`}
            value={formData.budget.value}
            onChange={(e) => updateField('budget', e.target.value)}
          >
            <option value="" disabled>
              Budget
            </option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>
        <textarea
          name="message"
          placeholder="What are you building? Goals, scope, and anything else I should know."
          aria-label="Project brief"
          rows={8}
          className={`${fieldClass} mt-4`}
          value={formData.message.value}
          onChange={(e) => updateField('message', e.target.value)}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsDragging(false);
            }
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          className={`mt-4 rounded-md border border-dashed bg-input px-3 py-4 transition-colors ${
            isDragging
              ? 'border-accent'
              : 'border-foreground/15 hover:border-foreground/30'
          }`}
        >
          <label className="flex cursor-pointer flex-col items-center gap-1 text-center">
            <IconPaperclip className="h-5 w-5 text-foreground-subtle" />
            <span className="text-sm text-input-fg">
              Attach logos or references
            </span>
            <span className="text-xs text-foreground-subtle">
              Optional. PNG, JPG, SVG, WebP, GIF, or PDF — up to 5 files, 10MB
              total.
            </span>
            <input
              ref={fileInputRef}
              type="file"
              name="attachment"
              multiple
              accept={ACCEPT_ATTR}
              aria-label="Attach logos or references"
              className="sr-only"
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
                e.target.value = '';
              }}
            />
          </label>
        </div>
        {attachmentError ? (
          <p className="mt-2 text-sm text-rose-400">{attachmentError}</p>
        ) : null}
        {attachments.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {attachments.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-md bg-input px-2 py-2"
              >
                {item.previewUrl ? (
                  // blob: URLs from the local file picker
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.previewUrl}
                    alt=""
                    className="h-10 w-10 flex-shrink-0 rounded object-cover"
                  />
                ) : (
                  <IconFile className="h-5 w-5 flex-shrink-0 text-foreground-subtle" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-input-fg">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-foreground-subtle">
                    {formatBytes(item.file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttachment(item.id)}
                  aria-label={`Remove ${item.file.name}`}
                  className="rounded p-1 text-foreground-subtle hover:text-foreground"
                >
                  <IconX className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <ElectricHover
          borderRadius={6}
          className="mt-4 w-full rounded-md"
          disabled={!isComplete || status === 'submitting'}
        >
          <button
            className="w-full px-2 py-2 bg-accent-button hover:bg-accent-strong rounded-md font-bold text-cta-fg disabled:opacity-40 disabled:hover:bg-accent-button disabled:cursor-not-allowed transition-colors"
            type="submit"
            disabled={!isComplete || status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Send inquiry'}
          </button>
        </ElectricHover>
      </form>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
};

const Toast = ({
  toast,
  onDismiss,
}: {
  toast: ToastState;
  onDismiss: () => void;
}) => {
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  const isSuccess = toast?.type === 'success';

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-[200] flex max-w-sm items-start gap-3 rounded-lg border border-muted bg-surface-elevated px-4 py-3 text-sm text-foreground shadow-xl shadow-background/40"
        >
          {isSuccess ? (
            <IconCircleCheckFilled className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
          ) : (
            <IconExclamationCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-400" />
          )}
          <p className="pr-4">{toast.message}</p>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss notification"
            className="absolute right-2 top-2 rounded p-0.5 text-foreground-subtle hover:text-foreground"
          >
            <IconX className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
