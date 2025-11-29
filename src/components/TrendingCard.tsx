import React from 'react';
interface TrendingCardProps {
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
}
export function TrendingCard({
  title,
  subtitle,
  icon,
  gradient
}: TrendingCardProps) {
  return <div className={`flex-shrink-0 w-44 h-44 rounded-3xl p-6 flex flex-col items-center justify-center text-center ${gradient} shadow-lg`}>
      <div className="text-5xl mb-3">{icon}</div>
      <h3 className="text-white font-bold text-lg leading-tight mb-1">
        {title}
      </h3>
      <p className="text-white/80 text-sm">{subtitle}</p>
    </div>;
}