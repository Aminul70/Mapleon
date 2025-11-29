import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}
export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = ''
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 active:scale-95';
  const variants = {
    primary: 'bg-mapleon-gradient text-white shadow-glow hover:shadow-glow-strong',
    secondary: 'bg-white text-mapleon-slate shadow-md hover:shadow-lg',
    ghost: 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30',
    white: 'bg-white text-mapleon-slate hover:bg-gray-50',
    dark: 'bg-gray-700/80 backdrop-blur-sm text-white hover:bg-gray-700'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  return <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}>
      {children}
    </button>;
}