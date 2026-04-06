// src/Hooks/useContactForm.ts
import { toast } from 'react-hot-toast';

export async function submitContactForm(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const res = await fetch('http://localhost:3001/Contact-us', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit');
  toast.success("Message sent! We'll reply soon 📧");
  return await res.json();
}