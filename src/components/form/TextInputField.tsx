import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TextInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  error?: string;
  icon?: LucideIcon;
  required?: boolean;
  type?: 'text' | 'email' | 'tel' | 'url';
}

export function TextInputField({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  error,
  icon: Icon,
  required,
  type = 'text'
}: TextInputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-neutral-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-brand/30 focus:border-primary-brand transition-colors ${error ? 'border-red-500' : ''}`}
        />
      </div>
      {maxLength && (
        <p className="text-xs text-gray-500 mt-1">
          {value.length}/{maxLength} characters
        </p>
      )}
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}