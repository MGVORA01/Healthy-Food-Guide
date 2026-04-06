import { ReactNode, MouseEventHandler } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'orange';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ children, onClick, variant = 'primary', size = 'md', className = '', disabled = false, type = 'button' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none';
  const sizes: Record<ButtonSize, string> = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-base', lg: 'px-7 py-3.5 text-lg' };
  const variants: Record<ButtonVariant, string> = {
    primary:   'bg-primary-600 text-white hover:bg-primary-700 active:scale-95 shadow-md hover:shadow-glow',
    secondary: 'bg-white text-primary-700 border-2 border-primary-500 hover:bg-primary-50 active:scale-95',
    danger:    'bg-red-500 text-white hover:bg-red-600 active:scale-95',
    ghost:     'text-primary-700 hover:bg-primary-50 active:scale-95',
    orange:    'bg-accent-orange text-white hover:bg-orange-600 active:scale-95 shadow-md',
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      {children}
    </button>
  );
}
