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
const FORMSUBMIT_URL = `FORMSUBMIT_URL/${CONTACT_EMAIL}`;

const defaultFormState = {
  name: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  message: {
    value: '',
    error: '',
  },
};

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
    formData.message.value.trim().length > 0;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting' || !isComplete) return;

    setStatus('submitting');

    try {
      const response = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.value.trim(),
          email: formData.email.value.trim(),
          message: formData.message.value.trim(),
          _subject: `Portfolio contact from ${formData.name.value.trim()}`,
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
        message: "Thanks — I'll get back to you ASAP.",
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
            placeholder="Your Name"
            autoComplete="name"
            className="bg-input focus:outline-none focus:ring-2 focus:ring-input-ring px-2 py-2 rounded-md text-sm text-input-fg w-full placeholder:text-foreground-subtle"
            value={formData.name.value}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: {
                  value: e.target.value,
                  error: '',
                },
              });
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            className="bg-input focus:outline-none focus:ring-2 focus:ring-input-ring px-2 py-2 rounded-md text-sm text-input-fg w-full placeholder:text-foreground-subtle"
            value={formData.email.value}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: {
                  value: e.target.value,
                  error: '',
                },
              });
            }}
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows={10}
            className="bg-input focus:outline-none focus:ring-2 focus:ring-input-ring px-2 mt-4 py-2 rounded-md text-sm text-input-fg w-full placeholder:text-foreground-subtle"
            value={formData.message.value}
            onChange={(e) => {
              setFormData({
                ...formData,
                message: {
                  value: e.target.value,
                  error: '',
                },
              });
            }}
          />
        </div>

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
            {status === 'submitting' ? 'Sending...' : 'Submit'}
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
