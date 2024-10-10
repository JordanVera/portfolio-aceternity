'use client';
import React, { useState } from 'react';

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
export const Contact = () => {
  const [formData, setFormData] = useState(defaultFormState);
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('form submit success');
    setSubmitted(true);
  };

  if (submitted === true) {
    // toast.success('I will get in touch with you asap', {
    //   position: 'top-right',
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: theme ? 'dark' : 'light',
    // });

    setSubmitted(!submitted);
  }

  return (
    <form
      id="contactform"
      action="https://formsubmit.io/send/aa9775fa-0232-4d8f-b33d-9a87264142df"
      method="POST"
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <input
          type="text"
          placeholder="Your Name"
          className="bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-600 px-2 py-2 rounded-md text-sm text-neutral-100 w-full"
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
          placeholder="Your email address"
          className="bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-600 px-2 py-2 rounded-md text-sm text-neutral-100 w-full"
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
          placeholder="Your Message"
          rows={10}
          className="bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-600 px-2 mt-4 py-2 rounded-md text-sm text-neutral-100 w-full"
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

      <input name="_formsubmit_id" type="text" style={{ display: 'none' }} />
      <button
        className="w-full px-2 py-2 mt-4 bg-neutral-800 rounded-md font-bold text-neutral-500"
        type="submit"
        disabled={submitted}
      >
        {submitted ? 'Submitting...' : 'Submit'}
      </button>
      {/* {submitMessage && (
        <p className="mt-4 text-center text-sm">{submitMessage}</p>
      )} */}
    </form>
  );
};
