import React from 'react';
import { X, Trash2, ChefHat } from 'lucide-react';

interface Props {
  items: string[];
  onRemove: (item: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export const BasketBar: React.FC<Props> = ({ items, onRemove, onClear, onSubmit, loading }) => {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-14 md:bottom-0 left-0 right-0 z-40 pointer-events-none px-4 pb-3">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <div className="bg-ink text-white rounded-2xl px-5 py-4 border border-ink">
          {/* 食材列 */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {items.map(item => (
              <span key={item} className="flex items-center gap-1 text-xs border border-white/20 rounded px-2.5 py-1">
                {item}
                <button onClick={() => onRemove(item)} className="text-white/40 hover:text-white ml-0.5">
                  <X size={10} strokeWidth={3} />
                </button>
              </span>
            ))}
          </div>
          {/* 底部 actions */}
          <div className="flex items-center gap-3">
            <button onClick={onClear} className="text-white/30 hover:text-white/60 transition-colors">
              <Trash2 size={14} />
            </button>
            <span className="text-white/30 text-xs flex-1">選了 {items.length} 樣</span>
            <button
              onClick={onSubmit}
              disabled={loading}
              className="flex items-center gap-2 bg-white text-ink font-bold text-sm px-5 py-2 rounded-xl hover:bg-cream disabled:opacity-50 transition-all"
            >
              <ChefHat size={15} />
              叫 AI 幫我想
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
