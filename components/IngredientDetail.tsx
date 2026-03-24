import React, { useEffect, useState } from 'react';
import { RefreshCw, Heart } from 'lucide-react';
import { IngredientInfo } from '../types';
import { TabDetail } from './TabDetail';
import { useFavorites } from './FavoritesPage';

interface Props {
  info: IngredientInfo;
  onReset: () => void;
  related: string[];
  onSearch: (name: string) => void;
}

export const IngredientDetail: React.FC<Props> = ({ info, onReset, related, onSearch }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [faved, setFaved] = useState(false);

  useEffect(() => {
    setFaved(isFavorite(info.name));
  }, [info.name]);

  const handleFavorite = () => {
    toggleFavorite({ name: info.name, emoji: info.emoji, timestamp: Date.now() });
    setFaved(f => !f);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in pb-24 md:pb-0">
      {/* Hero Header */}
      <div className="text-center mb-8">
        <div className="text-7xl md:text-8xl mb-4">{info.emoji}</div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted mb-2">{info.englishName}</p>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-ink mb-3">{info.name}</h1>
        <p className="text-lg text-ink/50 font-serif italic">{info.tagline}</p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
          >
            <RefreshCw size={14} />
            查詢其他食材
          </button>
          <button
            onClick={handleFavorite}
            className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
              faved ? 'text-rose-500' : 'text-muted hover:text-rose-400'
            }`}
          >
            <Heart size={14} fill={faved ? 'currentColor' : 'none'} />
            {faved ? '已收藏' : '收藏'}
          </button>
        </div>
      </div>

      {/* Tabbed Detail */}
      <TabDetail info={info} />

      {/* Related Ingredients */}
      {related.length > 0 && (
        <div className="mt-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">相關食材推薦</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {related.map(r => (
              <button
                key={r}
                onClick={() => onSearch(r)}
                className="px-5 py-2.5 bg-white border border-ink/10 rounded-full text-sm font-medium text-ink hover:border-gold hover:text-gold shadow-card transition-all"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
