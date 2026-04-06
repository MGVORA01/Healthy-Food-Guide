import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/ui/Button';
import { submitContactForm } from '../hooks/useContactForm';
import { useAppSelector } from '../store/hooks';

type ContactFormData = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export default function Contactus() {
  // ✅ Get current logged-in user id — makes storage key unique per user
  const userId = useAppSelector(state => state.auth.currentUser?.id);
  const STORAGE_KEY = `hfg_contact_submitted_${userId}`;

  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    await submitContactForm(data);
    const info = { name: data.name, email: data.email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
    setSubmitted(info);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSubmitted(null);
  };

  // ── THANK YOU SCREEN
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="text-7xl mb-4">📧</div>
          <h2 className="text-3xl font-black font-display text-primary-700 mb-2">
            Message Sent!
          </h2>
          <p className="text-gray-500">
            Thank you <strong>{submitted.name}</strong>! We'll get back to you at{' '}
            <strong>{submitted.email}</strong> within 24 hours.
          </p>
          <Button onClick={handleReset} variant="primary" className="mt-6">
            Send Another
          </Button>
        </div>
      </div>
    );
  }

  // ── CONTACT FORM
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black font-display text-gray-800 mb-2">Contact Us 📬</h1>
          <p className="text-gray-500">Have a question? We'd love to hear from you!</p>
        </div>

        <div className="bg-white rounded-3xl shadow-card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className={`w-full rounded-md border py-2 px-3 focus:outline-none
                    ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-primary-500'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
                  })}
                  className={`w-full rounded-md border py-2 px-3 focus:outline-none
                    ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-primary-500'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject (optional)</label>
              <input
                {...register('subject')}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea
                rows={4}
                {...register('message', {
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' },
                })}
                className={`w-full rounded-md border py-2 px-3 focus:outline-none
                  ${errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-primary-500'}`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : '📤 Send Message'}
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
}