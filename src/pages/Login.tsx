// ============================================================
// src/pages/Login.jsx
// Login page — renders LoginForm component
// If already logged in → redirects to home
// ============================================================

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Already logged in → go home
  //  `navigate` removed from deps to prevent infinite loop
  //  `replace: true` prevents going back to Login via browser Back button
  useEffect(() => {
    if (isLoggedIn && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-100 flex items-center justify-center px-4 py-12">
      
      {/* Decorative background emojis */}
      <div className="absolute top-10 left-10 text-8xl opacity-50 select-none">🥗</div>
      <div className="absolute bottom-10 right-10 text-8xl opacity-50 select-none">🥦</div>

      {/* Login Form Card */}
      <div className="w-full max-w-md relative z-10">
        <LoginForm />
      </div>

    </div>
  );
}
