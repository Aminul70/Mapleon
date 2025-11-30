import React from 'react';
import { X } from 'lucide-react';

interface MultiSelectFieldProps {
  label: string;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  options: string[];
  maxSelections?: number;
}

export function MultiSelectField({
  label,
  selectedValues,
  onChange,
  options,
  maxSelections
}: MultiSelectFieldProps) {
  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      if (maxSelections && selectedValues.length >= maxSelections) {
        alert(`You can select up to ${maxSelections} items`);
        return;
      }
      onChange([...selectedValues, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selectedValues.filter(v => v !== value));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {maxSelections && (
          <span className="text-xs text-gray-500 ml-2">
            ({selectedValues.length}/{maxSelections})
          </span>
        )}
      </label>
      
      {/* Selected Items */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedValues.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-brand/10 text-primary-brand text-sm rounded-full"
            >
              {value}
              <button
                type="button"
                onClick={() => handleRemove(value)}
                className="hover:bg-primary-brand/20 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Available Options */}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleToggle(option)}
              className={`px-3 py-2 text-sm rounded-xl border-2 transition-colors ${
                isSelected
                  ? 'border-primary-brand bg-primary-brand text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary-brand hover:bg-primary-brand/5'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}