import React from 'react';
import { Home, Grid3X3, Search, Heart } from 'lucide-react';

export type View = 'home' | 'category' | 'search' | 'favorites';

interface Props {
  active: View;
  onChange: (v: View) => void;
}

const ITEMS: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: '首頁', icon: <Home size={20} /> },
  { id: 'category', label: '分類', icon: <Grid3X3 size={20} /> },
  { id: 'search', label: '搜尋', icon: <Search size={20} /> },
  { id: 'favorites', label: '收藏', icon: <Heart size={20} /> },
];

export const BottomNav: React.FC<Props> = ({ active, onChange }) => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-paper/95 backdrop-blur-xl border-t border-ink/8 safe-area-bottom">
    <div className="flex">
      {ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`flex-1 flex flex-col items-center gap-0.5 py-3 transition-colors ${
            active === item.id ? 'text-gold' : 'text-muted'
          }`}
        >
          {item.icon}
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  </nav>
);
