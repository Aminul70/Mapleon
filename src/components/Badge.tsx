import React from 'react';
import { Crown, Star, Tag } from 'lucide-react';

interface BadgeProps {
  type?: 'business' | 'category' | 'status' | 'new';
  children?: React.ReactNode;
  icon?: 'crown' | 'star' | 'tag' | 'none';
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  type = 'category',
  children,
  icon = 'none',
  variant = 'default',
  size = 'md',
  className = ''
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap';
  
  const typeStyles = {
    business: 'bg-business-gradient text-white',
    category: 'bg-neutral-100 text-neutral-700',
    status: 'bg-neutral-100 text-neutral-700',
    new: 'bg-primary-brand text-white',
  };

  const variantStyles = {
    default: '',
    success: 'bg-semantic-success/10 text-semantic-success',
    warning: 'bg-semantic-warning/10 text-semantic-warning',
    error: 'bg-semantic-error/10 text-semantic-error',
    info: 'bg-semantic-info/10 text-semantic-info',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs h-5',
    md: 'px-3 py-1 text-xs h-6',
    lg: 'px-4 py-1.5 text-sm h-7',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const renderIcon = () => {
    if (icon === 'none') return null;
    
    const iconSize = iconSizes[size];
    const iconMap = {
      crown: <Crown size={iconSize} />,
      star: <Star size={iconSize} />,
      tag: <Tag size={iconSize} />,
    };
    
    return iconMap[icon] || null;
  };

  const appliedStyles = variant !== 'default' ? variantStyles[variant] : typeStyles[type];

  return (
    <span
      className={`${baseStyles} ${appliedStyles} ${sizeStyles[size]} ${className}`}
    >
      {renderIcon()}
      {children}
    </span>
  );
}
