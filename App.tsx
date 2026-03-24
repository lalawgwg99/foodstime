import React, { useState } from 'react';
import { CategoryPage } from './components/CategoryPage';
import { BasketBar } from './components/BasketBar';
import { RecipeSuggestions } from './components/RecipeSuggestions';
import { FavoritesPage } from './components/FavoritesPage';
import { BottomNav, View } from './components/BottomNav';
import { StickThinking, StickChef } from './components/StickFigure';
import { suggestRecipes } from './services/aiService';
import { Recipe } from './types';

export default function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [usedIngredients, setUsedIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('category');

  const toggle = (item: string) =>
    setSelected(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);

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
      setError(e instanceof Error ? e.message : '出了點問題，請稍後再試');
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
    <div className="min-h-screen bg-paper font-sans text-ink flex flex-col">
      {/* Nav — 極簡線條 */}
      <nav className="sticky top-0 z-40 bg-white border-b border-ink/10">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2">
            <span className="font-serif font-black text-xl tracking-tight">FoodsTime</span>
            <span className="text-xs text-muted border border-muted/30 rounded px-1.5 py-0.5 hidden md:inline">冰箱救星</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-0.5">
              {(['category', 'favorites'] as View[]).map(v => (
                <button
                  key={v}
                  onClick={() => handleNavChange(v)}
                  className={`px-3 py-1.5 text-sm transition-colors rounded ${
                    view === v ? 'font-bold text-ink' : 'text-muted hover:text-ink'
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
              className="text-xs border border-ink/20 rounded px-3 py-1.5 hover:bg-ink hover:text-white transition-all hidden md:block"
            >
              ☕ 請我喝咖啡
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto px-6 py-10 w-full">

        {/* AI 思考中 */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="animate-wobble text-ink">
              <StickThinking className="w-28 h-36" />
            </div>
            <p className="text-2xl font-serif font-bold mt-6 mb-2">主廚在抓頭中…</p>
            <p className="text-sm text-muted">
              盯著你選的 {selected.length} 種食材，努力想辦法
            </p>
          </div>
        )}

        {/* 食譜結果 */}
        {!loading && recipes && (
          <RecipeSuggestions
            recipes={recipes}
            ingredients={usedIngredients}
            onReset={handleReset}
          />
        )}

        {/* 選食材 */}
        {!loading && !recipes && view === 'category' && (
          <CategoryPage selected={selected} onToggle={toggle} />
        )}

        {/* 收藏 */}
        {!loading && !recipes && view === 'favorites' && (
          <FavoritesPage onSearch={() => {}} />
        )}

        {/* 錯誤 */}
        {error && !loading && (
          <p className="mt-6 text-center text-sm border border-red-200 text-red-500 rounded-lg py-3 px-4">
            {error}
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-ink/8 py-6 mb-16 md:mb-0">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between text-xs text-muted">
          <span>FoodsTime · 資料由 AI 生成，僅供參考</span>
          <a href="https://cooklabai.com" className="hover:text-ink transition-colors">cooklabai.com</a>
        </div>
      </footer>

      {/* 食材籃 */}
      {!recipes && !loading && (
        <BasketBar
          items={selected}
          onRemove={item => setSelected(prev => prev.filter(i => i !== item))}
          onClear={() => setSelected([])}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}

      <BottomNav active={view} onChange={handleNavChange} />
    </div>
  );
}
