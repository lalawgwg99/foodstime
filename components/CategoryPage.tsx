import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  selected: string[];
  onToggle: (item: string) => void;
}

const CATEGORIES = [
  {
    label: '蔬菜',
    emoji: '🥦',
    items: ['菠菜', '花椰菜', '番茄', '紅蘿蔔', '白蘿蔔', '高麗菜', '茄子', '苦瓜', '玉米', '豆芽菜', '空心菜', '青椒'],
  },
  {
    label: '水果',
    emoji: '🍎',
    items: ['芒果', '鳳梨', '香蕉', '草莓', '荔枝', '龍眼', '木瓜', '百香果'],
  },
  {
    label: '肉類',
    emoji: '🥩',
    items: ['豬五花', '雞胸肉', '牛腱', '羊小排', '鴨腿', '豬排骨', '雞腿', '牛肋條', '豬絞肉', '雞翅', '培根', '豬里肌'],
  },
  {
    label: '海鮮',
    emoji: '🦐',
    items: ['鮭魚', '蝦子', '螃蟹', '蛤蜊', '透抽', '干貝', '鯛魚', '吻仔魚'],
  },
  {
    label: '豆蛋奶',
    emoji: '🥚',
    items: ['雞蛋', '豆腐', '豆干', '毛豆', '起司', '牛奶', '鮮奶油', '納豆'],
  },
  {
    label: '穀物',
    emoji: '🌾',
    items: ['白米', '糙米', '麵條', '烏龍麵', '義大利麵', '吐司', '米粉', '冬粉'],
  },
  {
    label: '菇類',
    emoji: '🍄',
    items: ['香菇', '金針菇', '杏鮑菇', '舞菇', '木耳', '鴻喜菇'],
  },
  {
    label: '香料調味',
    emoji: '🌿',
    items: ['蒜', '薑', '蔥', '辣椒', '九層塔', '香菜', '洋蔥', '紅蔥頭'],
  },
];

export const CategoryPage: React.FC<Props> = ({ selected, onToggle }) => (
  <div className="animate-fade-in pb-40 md:pb-24">
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted mb-1">選擇食材</p>
      <h2 className="text-2xl font-serif font-bold text-ink">今天冰箱有什麼？</h2>
      <p className="text-sm text-muted mt-1">點選食材，AI 幫你想菜單</p>
    </div>
    <div className="space-y-7">
      {CATEGORIES.map(cat => (
        <div key={cat.label}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{cat.emoji}</span>
            <h3 className="font-bold text-sm text-ink/70 uppercase tracking-wider">{cat.label}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.items.map(item => {
              const isSelected = selected.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => onToggle(item)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    isSelected
                      ? 'bg-gold text-white border-gold shadow-md scale-105'
                      : 'bg-white text-ink/70 border-ink/10 hover:border-gold/50 hover:text-gold shadow-card'
                  }`}
                >
                  {isSelected && <Check size={11} className="inline mr-1 -mt-0.5" />}
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
