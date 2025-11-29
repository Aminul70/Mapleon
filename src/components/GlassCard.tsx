import React from 'react';
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export function GlassCard({
  children,
  className = '',
  onClick
}: GlassCardProps) {
  return <div onClick={onClick} className={`glass-card rounded-3xl p-6 ${onClick ? 'cursor-pointer hover:bg-white/15 transition-all' : ''} ${className}`}>
      {children}
    </div>;
}