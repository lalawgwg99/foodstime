import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (name: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = [
  '虱目魚', '甲仙芋頭', '池上米', '旗山香蕉', '大閘蟹',
  '松露', '藜麥', '味噌', '帕瑪森起司', '番紅花',
  '豆腐', '蒜頭', '薑黃', '牛蒡', '山藥',
];

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (v?: string) => {
    const term = (v ?? value).trim();
    if (term) { onSearch(term); setValue(''); }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Search Input */}
      <div className="relative group">
        <div className="flex items-center gap-3 bg-white border-2 border-ink/10 rounded-2xl px-5 py-4 shadow-card focus-within:border-gold transition-all duration-300">
          <Search size={20} className="text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="輸入任何食材名稱..."
            className="flex-1 bg-transparent text-ink text-lg placeholder-muted/60 focus:outline-none font-serif"
            disabled={isLoading}
          />
          {value && (
            <button onClick={() => setValue('')} className="text-muted hover:text-ink transition-colors">
              <X size={18} />
            </button>
          )}
          <button
            onClick={() => handleSubmit()}
            disabled={!value.trim() || isLoading}
            className="shrink-0 px-5 py-2 bg-ink text-paper text-sm font-bold rounded-xl hover:bg-ink/80 disabled:opacity-40 transition-all"
          >
            {isLoading ? '查詢中...' : '查詢'}
          </button>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => handleSubmit(s)}
            disabled={isLoading}
            className="px-3 py-1.5 bg-white border border-ink/8 rounded-full text-xs text-ink/60 hover:border-gold hover:text-gold transition-all font-sans disabled:opacity-40"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};
