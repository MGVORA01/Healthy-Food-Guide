// ============================================================
// src/pages/Register.jsx
// Register page — renders RegisterForm component
// If already logged in → redirects to home
// ============================================================

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  const { isLoggedIn } = useAuth();
  const navigate       = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-100 flex items-center justify-center px-4 py-12">
      <div className="absolute top-10 left-10 text-8xl opacity-30 select-none">🌱</div>
      <div className="absolute bottom-10 right-10 text-8xl opacity-30 select-none">🍎</div>
      <div className="w-full max-w-md relative z-10">
        <RegisterForm />
      </div>
    </div>
  );
}
