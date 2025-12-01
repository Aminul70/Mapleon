import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'white' | 'dark' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon,
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'font-semibold transition-all duration-250 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-primary-gradient text-white shadow-md hover:shadow-lg hover:scale-102',
    secondary: 'bg-neutral-100 text-neutral-900 border border-neutral-300 hover:bg-neutral-200',
    ghost: 'bg-transparent text-primary-brand hover:bg-primary-subtle',
    white: 'bg-white text-neutral-900 shadow-sm hover:shadow-md',
    dark: 'bg-neutral-800 text-white hover:bg-neutral-900',
    icon: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 !p-2.5',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm h-9 rounded-lg',
    md: 'px-6 py-3 text-base h-12 rounded-xl',
    lg: 'px-8 py-4 text-lg h-14 rounded-xl',
  };

  const iconOnlySizes = {
    sm: 'w-9 h-9 rounded-lg',
    md: 'w-10 h-10 rounded-full',
    lg: 'w-12 h-12 rounded-full',
  };

  const appliedSize = variant === 'icon' ? iconOnlySizes[size] : sizes[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${appliedSize} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}