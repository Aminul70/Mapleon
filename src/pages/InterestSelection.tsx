import React, { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Dumbbell, Scissors, Coffee, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { categories } from '../utils/mockData';
const iconMap: Record<string, ComponentType<{
  size?: number;
  className?: string;
}>> = {
  UtensilsCrossed,
  Dumbbell,
  Scissors,
  Coffee,
  Sparkles
};
export function InterestSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(['restaurant', 'cafe']);
  const toggleCategory = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };
  return <div className="min-h-screen bg-gradient-to-br from-mapleon-teal via-mapleon-gray to-mapleon-teal-tint flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-mapleon-slate mb-3">
            What interests you?
          </h2>
          <p className="text-mapleon-slate/70">
            Select categories to personalize your feed
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {categories.map(category => {
          const isSelected = selected.includes(category.id);
          const IconComponent = iconMap[category.icon];
          return <button key={category.id} onClick={() => toggleCategory(category.id)} className={`p-6 rounded-3xl transition-all ${isSelected ? 'bg-white shadow-glow scale-105' : 'bg-white/50 hover:bg-white/70'}`}>
                <div className="flex items-center justify-center mb-3">
                  {IconComponent && <IconComponent size={40} className="text-mapleon-slate" style={{
                color: category.color
              }} />}
                </div>
                <div className="font-semibold text-mapleon-slate">
                  {category.name}
                </div>
              </button>;
        })}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2, 3, 4].map(i => <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === 1 ? 'w-8 bg-mapleon-pink' : 'w-2 bg-gray-300'}`} />)}
        </div>

        <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/home')}>
          Continue
        </Button>
      </div>
    </div>;
}