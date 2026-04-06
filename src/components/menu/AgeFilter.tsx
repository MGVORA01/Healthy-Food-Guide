// src/components/menu/AgeFilter.tsx
import { ageGroups, ageInfo } from '../../data/foodData';

interface AgeFilterProps {
  selected: string;
  onChange: (age: string) => void;
}

export default function AgeFilter({ selected, onChange }: AgeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {ageGroups.map(ag => {
        const info = ageInfo[ag];
        const isSelected = selected === ag;
        return (
          <button
            type="button"
            key={ag}
            onClick={() => onChange(ag)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-3xl font-semibold text-sm transition-all duration-200 border-2
              ${isSelected
                ? 'bg-primary-600 text-white border-primary-600 shadow-glow scale-105'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400 hover:text-primary-600'}`}
          >
            <span className="text-lg">{info.icon}</span>
            <span>{ag} yrs</span>
          </button>
        );
      })}
    </div>
  );
}
