'use client';
import { ElectricHover } from '@/components/ElectricBorder';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  IconCircleCheckFilled,
  IconExclamationCircle,
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

const fieldClass =
  'bg-input focus:outline-none focus:ring-2 focus:ring-input-ring px-2 py-2 rounded-md text-sm text-input-fg w-full placeholder:text-foreground-subtle';

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
  const [status, setStatus] = useState<Status>('idle');
  const [toast, setToast] = useState<ToastState>(null);

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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting' || !isComplete) return;

    setStatus('submitting');

    const name = formData.name.value.trim();
    const projectType = formData.projectType.value;

    try {
      const response = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email: formData.email.value.trim(),
          company: formData.company.value.trim() || '—',
          'Project type': projectType,
          Timeline: formData.timeline.value,
          Budget: formData.budget.value,
          Brief: formData.message.value.trim(),
          _subject: `Hire inquiry from ${name} — ${projectType}`,
          _template: 'table',
          _captcha: 'false',
        }),
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
      <form id="contactform" onSubmit={handleFormSubmit} noValidate>
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
