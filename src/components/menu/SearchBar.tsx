// src/components/menu/SearchBar.tsx
import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <div className={`relative flex items-center bg-white border-2 rounded-2xl transition-all duration-200 ${focused ? 'border-primary-500 shadow-glow' : 'border-gray-200'}`}>
      <i className="ri-search-line text-gray-400 text-xl ml-4" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search healthy foods..."
        className="flex-1 px-3 py-3 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none font-medium"
      />
      {value && (
        <button type="button" onClick={() => onChange('')} className="mr-3 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 text-sm transition-colors">×</button>
      )}
    </div>
  );
}
