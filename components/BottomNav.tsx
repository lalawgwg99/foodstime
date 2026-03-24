import React from 'react';
import { Grid3X3, Heart } from 'lucide-react';

export type View = 'home' | 'category' | 'search' | 'favorites';

interface Props {
  active: View;
  onChange: (v: View) => void;
}

const ITEMS: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'category', label: '選食材', icon: <Grid3X3 size={18} /> },
  { id: 'favorites', label: '收藏', icon: <Heart size={18} /> },
];

export const BottomNav: React.FC<Props> = ({ active, onChange }) => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-ink/10">
    <div className="flex">
      {ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors text-xs font-medium ${
            active === item.id ? 'text-ink' : 'text-muted'
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  </nav>
);
