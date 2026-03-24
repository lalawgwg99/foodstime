import React, { useEffect, useState } from 'react';
import { Heart, Clock, Trash2 } from 'lucide-react';
import { SearchHistory } from '../types';

interface Props {
  onSearch: (name: string) => void;
}

const HISTORY_KEY = 'foodstime_history';
const FAVORITES_KEY = 'foodstime_favorites';

export const useFavorites = () => {
  const getHistory = (): SearchHistory[] => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
  };
  const getFavorites = (): SearchHistory[] => {
    try { return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]'); } catch { return []; }
  };
  const addHistory = (item: SearchHistory) => {
    const prev = getHistory().filter(h => h.name !== item.name);
    localStorage.setItem(HISTORY_KEY, JSON.stringify([item, ...prev].slice(0, 20)));
  };
  const toggleFavorite = (item: SearchHistory) => {
    const prev = getFavorites();
    const exists = prev.some(f => f.name === item.name);
    if (exists) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(prev.filter(f => f.name !== item.name)));
    } else {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([item, ...prev]));
    }
  };
  const isFavorite = (name: string) => getFavorites().some(f => f.name === name);
  return { getHistory, getFavorites, addHistory, toggleFavorite, isFavorite };
};

export const FavoritesPage: React.FC<Props> = ({ onSearch }) => {
  const { getHistory, getFavorites } = useFavorites();
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [favorites, setFavorites] = useState<SearchHistory[]>([]);

  useEffect(() => {
    setHistory(getHistory());
    setFavorites(getFavorites());
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('foodstime_history');
    setHistory([]);
  };

  const removeFavorite = (name: string) => {
    const prev = getFavorites().filter(f => f.name !== name);
    localStorage.setItem('foodstime_favorites', JSON.stringify(prev));
    setFavorites(prev);
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="animate-fade-in pb-20 md:pb-0 space-y-8">
      {/* Favorites */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Heart size={16} className="text-gold" />
          <h2 className="font-serif font-bold text-lg text-ink">我的收藏</h2>
          <span className="ml-auto text-xs text-muted">{favorites.length} 項</span>
        </div>
        {favorites.length === 0 ? (
          <div className="text-center py-12 text-muted text-sm">
            <Heart size={32} className="mx-auto mb-3 opacity-20" />
            尚無收藏，查詢食材後點擊愛心即可收藏
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favorites.map(f => (
              <div key={f.name} className="bg-white rounded-xl p-4 shadow-card flex items-center gap-3">
                <span className="text-2xl">{f.emoji}</span>
                <button
                  onClick={() => onSearch(f.name)}
                  className="flex-1 text-left font-medium text-ink text-sm hover:text-gold transition-colors"
                >
                  {f.name}
                </button>
                <button onClick={() => removeFavorite(f.name)} className="text-muted hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-muted" />
          <h2 className="font-serif font-bold text-lg text-ink">查詢紀錄</h2>
          {history.length > 0 && (
            <button onClick={clearHistory} className="ml-auto text-xs text-muted hover:text-red-400 transition-colors flex items-center gap-1">
              <Trash2 size={12} /> 清除
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <div className="text-center py-8 text-muted text-sm">
            <Clock size={32} className="mx-auto mb-3 opacity-20" />
            尚無查詢紀錄
          </div>
        ) : (
          <div className="space-y-2">
            {history.map(h => (
              <button
                key={`${h.name}-${h.timestamp}`}
                onClick={() => onSearch(h.name)}
                className="w-full flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-card hover:shadow-md transition-all text-left"
              >
                <span className="text-xl">{h.emoji}</span>
                <span className="flex-1 font-medium text-ink text-sm">{h.name}</span>
                <span className="text-xs text-muted">{formatTime(h.timestamp)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
