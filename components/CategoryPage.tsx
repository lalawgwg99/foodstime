import React from 'react';
import { Check } from 'lucide-react';
import { StickShrug } from './StickFigure';

interface Props {
  selected: string[];
  onToggle: (item: string) => void;
}

const CATEGORIES = [
  { label: '蔬菜', emoji: '🥦', items: ['菠菜', '花椰菜', '番茄', '紅蘿蔔', '白蘿蔔', '高麗菜', '茄子', '苦瓜', '玉米', '豆芽菜', '空心菜', '青椒'] },
  { label: '水果', emoji: '🍎', items: ['芒果', '鳳梨', '香蕉', '草莓', '荔枝', '龍眼', '木瓜', '百香果'] },
  { label: '肉類', emoji: '🥩', items: ['豬五花', '雞胸肉', '牛腱', '羊小排', '鴨腿', '豬排骨', '雞腿', '牛肋條', '豬絞肉', '雞翅', '培根', '豬里肌'] },
  { label: '海鮮', emoji: '🦐', items: ['鮭魚', '蝦子', '螃蟹', '蛤蜊', '透抽', '干貝', '鯛魚', '吻仔魚'] },
  { label: '豆蛋奶', emoji: '🥚', items: ['雞蛋', '豆腐', '豆干', '毛豆', '起司', '牛奶', '鮮奶油', '納豆'] },
  { label: '穀物麵食', emoji: '🌾', items: ['白米', '糙米', '麵條', '烏龍麵', '義大利麵', '吐司', '米粉', '冬粉'] },
  { label: '菇類', emoji: '🍄', items: ['香菇', '金針菇', '杏鮑菇', '舞菇', '木耳', '鴻喜菇'] },
  { label: '香料調味', emoji: '🌿', items: ['蒜', '薑', '蔥', '辣椒', '九層塔', '香菜', '洋蔥', '紅蔥頭'] },
];

export const CategoryPage: React.FC<Props> = ({ selected, onToggle }) => (
  <div className="animate-fade-in pb-44">
    {/* Header */}
    <div className="flex items-end gap-6 mb-10">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted mb-2">Step 1</p>
        <h1 className="text-3xl font-serif font-black text-ink leading-tight">
          冰箱裡有什麼？
        </h1>
        <p className="text-sm text-muted mt-2">
          點選食材，AI 幫你想今天吃什麼
        </p>
      </div>
      <StickShrug className="w-20 h-24 text-ink/20 shrink-0 mb-1" />
    </div>

    {/* Categories */}
    <div className="space-y-8">
      {CATEGORIES.map(cat => (
        <div key={cat.label}>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-ink/8">
            <span>{cat.emoji}</span>
            <span className="text-sm font-bold text-ink/50 uppercase tracking-wider">{cat.label}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.items.map(item => {
              const isSelected = selected.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => onToggle(item)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-sm rounded border transition-all ${
                    isSelected
                      ? 'bg-ink text-white border-ink font-semibold'
                      : 'bg-white text-ink border-ink/20 hover:border-ink'
                  }`}
                >
                  {isSelected && <Check size={12} strokeWidth={3} />}
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
);
