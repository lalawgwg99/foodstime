import React from 'react';
import { Sparkles, X, Trash2 } from 'lucide-react';

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
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 px-4 pb-3 md:pb-4 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <div className="bg-ink rounded-2xl shadow-2xl px-4 pt-3 pb-3">
          {/* Selected pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {items.map(item => (
              <span
                key={item}
                className="flex items-center gap-1 bg-white/10 text-white text-xs px-2.5 py-1 rounded-full"
              >
                {item}
                <button onClick={() => onRemove(item)} className="text-white/50 hover:text-white transition-colors ml-0.5">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={onClear} className="text-white/40 hover:text-white/70 transition-colors p-1">
              <Trash2 size={15} />
            </button>
            <span className="text-white/30 text-xs flex-1">{items.length} 種食材</span>
            <button
              onClick={onSubmit}
              disabled={loading}
              className="flex items-center gap-2 bg-gold hover:bg-amber-500 disabled:opacity-60 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              <Sparkles size={15} />
              {loading ? 'AI 思考中…' : 'AI 幫我料理'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
