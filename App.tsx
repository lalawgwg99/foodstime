import React, { useState } from 'react';
import { BookOpen, Coffee, ChefHat } from 'lucide-react';
import { CategoryPage } from './components/CategoryPage';
import { BasketBar } from './components/BasketBar';
import { RecipeSuggestions } from './components/RecipeSuggestions';
import { FavoritesPage } from './components/FavoritesPage';
import { BottomNav, View } from './components/BottomNav';
import { suggestRecipes } from './services/aiService';
import { Recipe } from './types';

export default function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [usedIngredients, setUsedIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('category');

  const toggle = (item: string) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const result = await suggestRecipes(selected);
      setRecipes(result);
      setUsedIngredients([...selected]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setError(e instanceof Error ? e.message : '查詢失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRecipes(null);
    setUsedIngredients([]);
    setSelected([]);
    setError(null);
    setView('category');
  };

  const handleNavChange = (v: View) => {
    setView(v);
    if (v === 'category') setRecipes(null);
  };

  return (
    <div className="min-h-screen bg-paper font-sans flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-paper/90 backdrop-blur-xl border-b border-ink/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center text-paper text-sm font-bold">F</div>
            <span className="font-serif font-bold text-ink text-lg">FoodsTime</span>
            <span className="hidden md:inline text-xs text-muted tracking-widest uppercase">食材料理</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1">
              {(['category', 'favorites'] as View[]).map(v => (
                <button
                  key={v}
                  onClick={() => handleNavChange(v)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    view === v ? 'text-gold bg-gold/8' : 'text-muted hover:text-ink'
                  }`}
                >
                  {v === 'category' ? '選食材' : '收藏'}
                </button>
              ))}
            </div>
            <a
              href="https://buymeacoffee.com/laladoo99"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#FFDD00] text-black rounded-full text-xs font-black hover:scale-105 transition-transform"
            >
              <Coffee size={12} /> 請我喝咖啡
            </a>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" title="AI 服務運作中" />
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto px-6 py-8 w-full">
        {/* Error */}
        {error && (
          <p className="text-center text-red-500 text-sm mb-6 bg-red-50 border border-red-100 rounded-xl py-3 px-6">
            {error}
          </p>
        )}

        {/* Recipe Results */}
        {recipes && !loading && (
          <RecipeSuggestions
            recipes={recipes}
            ingredients={usedIngredients}
            onReset={handleReset}
          />
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-24 animate-fade-in">
            <ChefHat size={48} className="mx-auto text-gold mb-4 animate-bounce" />
            <p className="font-serif text-xl text-ink mb-2">AI 主廚正在思考…</p>
            <p className="text-sm text-muted">
              根據 {selected.length} 種食材為你設計菜單
            </p>
          </div>
        )}

        {/* Category / Ingredient Picker */}
        {!recipes && !loading && view === 'category' && (
          <CategoryPage selected={selected} onToggle={toggle} />
        )}

        {/* Favorites */}
        {!recipes && !loading && view === 'favorites' && (
          <FavoritesPage onSearch={() => {}} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-ink/5 bg-paper mb-16 md:mb-0">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-muted">
            <BookOpen size={14} />
            <span>FoodsTime · AI 料理助手 · 資料僅供參考</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted">
            <a href="https://cooklabai.com" className="hover:text-ink transition-colors">cooklabai.com</a>
            <a href="https://buymeacoffee.com/laladoo99" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">支持開發者</a>
          </div>
        </div>
      </footer>

      {/* Basket bar — above bottom nav */}
      {!recipes && !loading && (
        <BasketBar
          items={selected}
          onRemove={item => setSelected(prev => prev.filter(i => i !== item))}
          onClear={() => setSelected([])}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}

      {/* Mobile Bottom Nav */}
      <BottomNav active={view} onChange={handleNavChange} />
    </div>
  );
}
