import React, { useState } from 'react';
import { MapPin, Leaf, Flame, ShoppingBag, ChevronRight } from 'lucide-react';
import { IngredientInfo } from '../types';
import { NutritionBar } from './NutritionBar';

interface Props {
  info: IngredientInfo;
}

const TABS = [
  { id: 'origin', label: '產地', icon: <MapPin size={14} /> },
  { id: 'nutrition', label: '營養', icon: <Leaf size={14} /> },
  { id: 'cooking', label: '烹調', icon: <Flame size={14} /> },
  { id: 'market', label: '市場', icon: <ShoppingBag size={14} /> },
];

const Tag: React.FC<{ label: string; variant?: 'default' | 'gold' | 'red' }> = ({ label, variant = 'default' }) => {
  const cls = {
    default: 'bg-ink/5 text-ink/70',
    gold: 'bg-gold/10 text-accent border border-gold/20',
    red: 'bg-red-50 text-red-600 border border-red-100',
  }[variant];
  return <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${cls}`}>{label}</span>;
};

export const TabDetail: React.FC<Props> = ({ info }) => {
  const [active, setActive] = useState('origin');

  return (
    <div className="mt-6">
      {/* Tab Nav */}
      <div className="flex border-b border-ink/8">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-all -mb-px ${
              active === tab.id
                ? 'border-gold text-gold'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-6 animate-fade-in" key={active}>

        {/* 產地 */}
        {active === 'origin' && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {info.origin.regions.map(r => <Tag key={r} label={`📍 ${r}`} variant="gold" />)}
            </div>
            <p className="text-ink/70 text-sm leading-relaxed">{info.origin.story}</p>
            <div className="bg-cream rounded-xl p-4 border-l-2 border-gold/40">
              <p className="text-xs text-muted mb-1 font-bold uppercase tracking-wider">歷史淵源</p>
              <p className="text-sm text-ink/60 leading-relaxed italic">{info.origin.history}</p>
            </div>
          </div>
        )}

        {/* 營養 */}
        {active === 'nutrition' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '熱量', value: info.nutrition.calories, unit: 'kcal', color: '#C5A059' },
                { label: '蛋白質', value: info.nutrition.protein, unit: 'g', color: '#8B4513' },
                { label: '碳水', value: info.nutrition.carbs, unit: 'g', color: '#A0522D' },
                { label: '脂肪', value: info.nutrition.fat, unit: 'g', color: '#9E9E9E' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl p-4 shadow-card text-center">
                  <div className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
                  <div className="text-xs text-muted">{item.unit} / 100g</div>
                  <div className="text-xs text-ink/60 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <NutritionBar label="膳食纖維" value={info.nutrition.fiber} unit="g" max={20} color="#6B8E5A" />
            </div>
            <div>
              <p className="text-xs text-muted mb-2 font-bold">營養亮點</p>
              <div className="flex flex-wrap gap-2">{info.nutrition.highlights.map(h => <Tag key={h} label={h} variant="gold" />)}</div>
            </div>
            <div>
              <p className="text-xs text-muted mb-2 font-bold">健康功效</p>
              <ul className="space-y-2">
                {info.nutrition.healthBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                    <span className="text-gold mt-0.5 shrink-0">✓</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 烹調 */}
        {active === 'cooking' && (
          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted mb-2 font-bold">適合烹調方式</p>
              <div className="flex flex-wrap gap-2">{info.cooking.methods.map(m => <Tag key={m} label={m} />)}</div>
            </div>
            <div className="bg-cream rounded-xl p-4">
              <p className="text-xs text-muted mb-1 font-bold">主廚秘訣</p>
              <p className="text-sm text-ink/70 leading-relaxed">💡 {info.cooking.tips}</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-2 font-bold">代表料理</p>
              <div className="grid grid-cols-2 gap-2">
                {info.cooking.famousDishes.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-ink/70 bg-white rounded-lg px-3 py-2 shadow-card">
                    <ChevronRight size={12} className="text-gold shrink-0" />{d}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted mb-2 font-bold">絕佳搭配食材</p>
              <div className="flex flex-wrap gap-2">{info.pairing.ingredients.map(p => <Tag key={p} label={p} variant="gold" />)}</div>
            </div>
            <div>
              <p className="text-xs text-muted mb-2 font-bold">風味方向</p>
              <div className="flex flex-wrap gap-2">{info.pairing.flavors.map(f => <Tag key={f} label={f} />)}</div>
            </div>
            {info.pairing.avoid.length > 0 && (
              <div>
                <p className="text-xs text-muted mb-2 font-bold">避免搭配</p>
                <div className="flex flex-wrap gap-2">{info.pairing.avoid.map(a => <Tag key={a} label={a} variant="red" />)}</div>
              </div>
            )}
          </div>
        )}

        {/* 市場 */}
        {active === 'market' && (
          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted mb-2 font-bold">台灣盛產季節</p>
              <div className="flex flex-wrap gap-2">{info.market.peakSeason.map(s => <Tag key={s} label={s} variant="gold" />)}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-card flex items-center justify-between">
              <span className="text-sm text-ink/60">市場價格參考</span>
              <span className="font-bold text-accent">{info.market.priceRange}</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted mb-1 font-bold">選購要點</p>
                <p className="text-sm text-ink/70 leading-relaxed">{info.market.buyingTips}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1 font-bold">保存方式</p>
                <p className="text-sm text-ink/70 leading-relaxed">{info.market.storageMethod}</p>
              </div>
            </div>
            <div className="bg-cream rounded-xl p-4 border-l-2 border-gold/40">
              <p className="text-xs text-muted mb-1 font-bold">✨ 冷知識</p>
              <p className="text-sm text-ink/70 leading-relaxed">{info.trivia}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
