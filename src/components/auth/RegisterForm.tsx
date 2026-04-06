// ============================================================
// src/components/auth/RegisterForm.jsx
// Register form — name, email, password, age group
// Uses AuthContext.register() to save to db.json
// ============================================================

import { useState, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ageGroups } from '../../data/foodData';

interface FieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  placeholder?: string;
}

// Field is defined OUTSIDE the component so it never gets recreated on each render
// This is the fix for the "focus lost after one letter" bug
function Field({ label, value, onChange, type = 'text', error, placeholder }: FieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-500'}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [name,        setName]        = useState<string>('');
  const [email,       setEmail]       = useState<string>('');
  const [password,    setPassword]    = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [selectedAge, setSelectedAge] = useState('21+');
  const [errors,      setErrors]      = useState<Record<string,string>>({});
  const [loading,     setLoading]     = useState(false);

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!name.trim())     e.name     = 'Name is required';
    if (!email.trim())    e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password)        e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    if (password !== confirmPass) e.confirmPass = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setLoading(true);
    const success = await register(name, email, password, selectedAge);
    setLoading(false);

    if (success) navigate('/login');
  };

  return (
    <div className="bg-white rounded-3xl shadow-card p-8 w-full max-w-md mx-auto">

      <div className="text-center mb-6">
        <div className="text-5xl mb-2">📝</div>
        <h2 className="text-3xl font-black font-display text-gray-800">Create Account</h2>
        <p className="text-gray-400 text-sm mt-1">Join HFG and start your health journey!</p>
      </div>

      <Field label="Full Name"       value={name}        onChange={(e: ChangeEvent<HTMLInputElement>) => { setName(e.target.value);        setErrors(p => ({ ...p, name: '' })); }}        placeholder="Your name"           error={errors.name} />
      <Field label="Email Address"   value={email}       onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value);       setErrors(p => ({ ...p, email: '' })); }}       placeholder="you@email.com" type="email" error={errors.email} />

      {/* Age selector */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Your Age Group</label>
        <select
          value={selectedAge}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedAge(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none bg-white"
        >
          {ageGroups.map((ag: string) => <option key={ag} value={ag}>{ag} years</option>)}
        </select>
      </div>

      <Field label="Password"        value={password}    onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value);    setErrors(p => ({ ...p, password: '' })); }}    placeholder="Min 6 characters" type="password" error={errors.password} />
      <Field label="Confirm Password" value={confirmPass} onChange={(e: ChangeEvent<HTMLInputElement>) => { setConfirmPass(e.target.value); setErrors(p => ({ ...p, confirmPass: '' })); }} placeholder="Repeat password"  type="password" error={errors.confirmPass} />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 text-lg mt-2"
      >
        {loading ? 'Creating account...' : ' Create Account'}
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-600 font-bold hover:underline">Login here</Link>
      </p>
    </div>
  );
}
