import React from 'react';
import { Search, X } from 'lucide-react';

interface InputProps {
  type?: 'text' | 'search' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  icon?: 'search' | 'none';
  clearable?: boolean;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function Input({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  icon = 'none',
  clearable = false,
  error,
  disabled = false,
  fullWidth = false,
  className = ''
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    onChange?.('');
  };

  const baseStyles = 'h-12 bg-neutral-50 border rounded-xl px-4 text-body-md transition-all duration-200';
  const focusStyles = 'focus:outline-none focus:border-primary-brand focus:ring-2 focus:ring-primary-brand/20';
  const errorStyles = error ? 'border-semantic-error' : 'border-neutral-300';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const widthStyles = fullWidth ? 'w-full' : '';
  const paddingStyles = icon !== 'none' ? 'pl-11' : 'px-4';
  const paddingRightStyles = clearable && value ? 'pr-11' : 'pr-4';

  return (
    <div className={`relative ${widthStyles} ${className}`}>
      {/* Icon */}
      {icon === 'search' && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
          <Search size={20} />
        </div>
      )}

      {/* Input */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`${baseStyles} ${focusStyles} ${errorStyles} ${disabledStyles} ${paddingStyles} ${paddingRightStyles}`}
      />

      {/* Clear button */}
      {clearable && value && !disabled && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
          type="button"
        >
          <X size={20} />
        </button>
      )}

      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-semantic-error">{error}</p>
      )}
    </div>
  );
}
