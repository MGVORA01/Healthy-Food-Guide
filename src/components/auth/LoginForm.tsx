// ============================================================
// src/components/auth/LoginForm.jsx
// Login form — email + password
// Uses AuthContext.login() to check db.json
// ============================================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LoginForm() {
  const { login }   = useAuth();
  const navigate    = useNavigate();

  const [email,    setEmail]    = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors,   setErrors]   = useState<Record<string, string>>({});
  const [loading,  setLoading]  = useState<boolean>(false);

  // Simple client-side validation
  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!email.trim())    e.email    = 'Email is required';
    if (!password.trim()) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) navigate('/');
  };

  return (
    <div className="bg-white rounded-3xl shadow-card p-8 w-full max-w-md mx-auto">

      <div className="text-center mb-6">
        <div className="text-5xl mb-2">🔐</div>
        <h2 className="text-3xl font-black font-display text-gray-800">Welcome Back!</h2>
        <p className="text-gray-400 text-sm mt-1">Login to your HFG account</p>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
          placeholder="you@email.com"
          className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors
            ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-500'}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
          placeholder="Enter your password"
          className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors
            ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-500'}`}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl
          transition-colors disabled:opacity-50 text-lg"
      >
        {loading ? 'Logging in...' : ' Login'}
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-600 font-bold hover:underline">
          Register here
        </Link>
      </p>

     
    </div>
  );
}
