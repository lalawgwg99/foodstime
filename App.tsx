import React, { useState } from 'react';
import { BookOpen, Github, Coffee } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { IngredientDetail } from './components/IngredientDetail';
import { FeaturedIngredients } from './components/FeaturedIngredients';
import { LoadingScreen } from './components/LoadingScreen';
import { fetchIngredientInfo, suggestRelated } from './services/aiService';
import { IngredientInfo } from './types';

export default function App() {
  const [ingredient, setIngredient] = useState<IngredientInfo | null>(null);
  const [related, setRelated] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchingFor, setSearchingFor] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (name: string) => {
    setLoading(true);
    setError(null);
    setIngredient(null);
    setRelated([]);
    setSearchingFor(name);

    try {
      const [info, rel] = await Promise.all([
        fetchIngredientInfo(name),
        suggestRelated(name),
      ]);
      setIngredient(info);
      setRelated(rel);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } catch (e) {
      console.error(e);
      const msg = e instanceof Error ? e.message : String(e);
      setError(`查詢失敗：${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIngredient(null);
    setRelated([]);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-paper font-sans flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-paper/90 backdrop-blur-xl border-b border-ink/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center text-paper text-sm font-bold">F</div>
            <span className="font-serif font-bold text-ink text-lg">FoodsTime</span>
            <span className="hidden md:inline text-xs text-muted tracking-widest uppercase">食材百科</span>
          </button>
          <div className="flex items-center gap-3">
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

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        {!ingredient && !loading && (
          <>
            {/* Hero */}
            <div className="text-center mb-12 animate-slide-up">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-muted mb-5">AI 全球食材百科</p>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-ink leading-tight mb-4">
                每種食材
                <span className="block text-gold italic">都有故事</span>
              </h1>
              <p className="text-base md:text-lg text-ink/50 font-serif italic max-w-lg mx-auto">
                從產地到餐桌，AI 為你揭開全球 10,000+ 種食材的深度百科
              </p>
              <div className="w-16 h-px bg-gold/40 mx-auto mt-8" />
            </div>

            {/* Search */}
            <SearchBar onSearch={handleSearch} isLoading={loading} />

            {/* Error */}
            {error && (
              <p className="text-center text-red-500 text-sm mt-6 bg-red-50 border border-red-100 rounded-xl py-3 px-6 max-w-md mx-auto">
                {error}
              </p>
            )}

            {/* Featured */}
            <FeaturedIngredients onSearch={handleSearch} />
          </>
        )}

        {loading && <LoadingScreen name={searchingFor} />}

        {ingredient && !loading && (
          <>
            {/* Inline search while viewing result */}
            <div className="mb-10">
              <SearchBar onSearch={handleSearch} isLoading={loading} />
            </div>
            <IngredientDetail
              info={ingredient}
              onReset={handleReset}
              related={related}
              onSearch={handleSearch}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-ink/5 bg-paper">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <BookOpen size={14} />
            <span>FoodsTime 食材百科 · AI 驅動 · 資料僅供參考</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted">
            <a href="https://cooklabai.com" className="hover:text-ink transition-colors">cooklabai.com</a>
            <a href="https://buymeacoffee.com/laladoo99" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">支持開發者</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
