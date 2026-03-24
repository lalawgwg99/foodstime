import React from 'react';
import { MapPin, Leaf, Flame, ChefHat, ShoppingBag, Sparkles, RefreshCw } from 'lucide-react';
import { IngredientInfo } from '../types';
import { NutritionBar } from './NutritionBar';

interface Props {
  info: IngredientInfo;
  onReset: () => void;
  related: string[];
  onSearch: (name: string) => void;
}

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-card">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-gold">{icon}</span>
      <h3 className="font-serif font-bold text-lg text-ink">{title}</h3>
    </div>
    {children}
  </div>
);

const Tag: React.FC<{ label: string; variant?: 'default' | 'gold' | 'red' }> = ({ label, variant = 'default' }) => {
  const cls = {
    default: 'bg-ink/5 text-ink/70',
    gold: 'bg-gold/10 text-accent border border-gold/20',
    red: 'bg-red-50 text-red-600 border border-red-100',
  }[variant];
  return <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${cls}`}>{label}</span>;
};

export const IngredientDetail: React.FC<Props> = ({ info, onReset, related, onSearch }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Hero Header */}
      <div className="text-center mb-10">
        <div className="text-7xl md:text-8xl mb-4">{info.emoji}</div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted mb-2">{info.englishName}</p>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-ink mb-3">{info.name}</h1>
        <p className="text-lg text-ink/50 font-serif italic">{info.tagline}</p>
        <button
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
        >
          <RefreshCw size={14} />
          查詢其他食材
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 產地故事 */}
        <Section icon={<MapPin size={18} />} title="產地故事">
          <p className="text-ink/70 text-sm leading-relaxed mb-3">{info.origin.story}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {info.origin.regions.map(r => <Tag key={r} label={`📍 ${r}`} variant="gold" />)}
          </div>
          <p className="text-ink/50 text-xs leading-relaxed italic border-t border-ink/5 pt-3">{info.origin.history}</p>
        </Section>

        {/* 營養成分 */}
        <Section icon={<Leaf size={18} />} title="每 100g 營養成分">
          <div className="space-y-3 mb-4">
            <NutritionBar label="熱量" value={info.nutrition.calories} unit=" kcal" max={500} color="#C5A059" />
            <NutritionBar label="蛋白質" value={info.nutrition.protein} unit="g" max={50} color="#8B4513" />
            <NutritionBar label="碳水化合物" value={info.nutrition.carbs} unit="g" max={100} color="#A0522D" />
            <NutritionBar label="脂肪" value={info.nutrition.fat} unit="g" max={50} color="#9E9E9E" />
            <NutritionBar label="膳食纖維" value={info.nutrition.fiber} unit="g" max={20} color="#6B8E5A" />
          </div>
          <div className="border-t border-ink/5 pt-3">
            <p className="text-xs text-muted mb-2">健康亮點</p>
            <div className="flex flex-wrap gap-1.5">
              {info.nutrition.highlights.map(h => <Tag key={h} label={h} variant="gold" />)}
            </div>
          </div>
        </Section>

        {/* 烹調方式 */}
        <Section icon={<Flame size={18} />} title="最佳烹調方式">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {info.cooking.methods.map(m => <Tag key={m} label={m} />)}
          </div>
          <p className="text-ink/60 text-sm leading-relaxed bg-cream rounded-xl p-3 mb-4">
            💡 {info.cooking.tips}
          </p>
          <p className="text-xs text-muted mb-2">代表料理</p>
          <div className="grid grid-cols-2 gap-2">
            {info.cooking.famousDishes.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-ink/70">
                <span className="text-gold">▸</span>{d}
              </div>
            ))}
          </div>
        </Section>

        {/* 食材搭配 */}
        <Section icon={<ChefHat size={18} />} title="食材搭配建議">
          <p className="text-xs text-muted mb-2">絕佳搭配</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {info.pairing.ingredients.map(p => <Tag key={p} label={p} variant="gold" />)}
          </div>
          <p className="text-xs text-muted mb-2">風味方向</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {info.pairing.flavors.map(f => <Tag key={f} label={f} />)}
          </div>
          {info.pairing.avoid.length > 0 && (
            <>
              <p className="text-xs text-muted mb-2">避免搭配</p>
              <div className="flex flex-wrap gap-1.5">
                {info.pairing.avoid.map(a => <Tag key={a} label={a} variant="red" />)}
              </div>
            </>
          )}
        </Section>

        {/* 市場行情 */}
        <Section icon={<ShoppingBag size={18} />} title="選購與保存">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted mb-1">台灣盛產季節</p>
              <div className="flex flex-wrap gap-1.5">
                {info.market.peakSeason.map(s => <Tag key={s} label={s} variant="gold" />)}
              </div>
            </div>
            <div className="flex items-center justify-between bg-cream rounded-xl px-4 py-3">
              <span className="text-sm text-ink/60">市場價格參考</span>
              <span className="font-bold text-accent text-sm">{info.market.priceRange}</span>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">選購要點</p>
              <p className="text-sm text-ink/70">{info.market.buyingTips}</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">保存方式</p>
              <p className="text-sm text-ink/70">{info.market.storageMethod}</p>
            </div>
          </div>
        </Section>

        {/* 冷知識 */}
        <Section icon={<Sparkles size={18} />} title="食材冷知識">
          <p className="text-ink/70 text-sm leading-relaxed">{info.trivia}</p>
          <div className="mt-4 border-t border-ink/5 pt-4">
            <p className="text-xs text-muted mb-2">健康功效</p>
            <ul className="space-y-1">
              {info.nutrition.healthBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                  <span className="text-gold mt-0.5">✓</span>{b}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </div>

      {/* Related Ingredients */}
      {related.length > 0 && (
        <div className="mt-8 text-center">
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
