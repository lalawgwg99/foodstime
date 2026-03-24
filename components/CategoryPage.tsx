import React from 'react';

interface Props {
  onSearch: (name: string) => void;
}

const CATEGORIES = [
  {
    label: '蔬菜',
    emoji: '🥦',
    items: ['菠菜', '花椰菜', '番茄', '紅蘿蔔', '白蘿蔔', '高麗菜', '茄子', '苦瓜'],
  },
  {
    label: '水果',
    emoji: '🍎',
    items: ['芒果', '鳳梨', '香蕉', '草莓', '荔枝', '龍眼', '木瓜', '百香果'],
  },
  {
    label: '肉類',
    emoji: '🥩',
    items: ['豬五花', '雞胸肉', '牛腱', '羊小排', '鴨腿', '豬排骨', '雞腿', '牛肋條'],
  },
  {
    label: '海鮮',
    emoji: '🦐',
    items: ['鮭魚', '蝦子', '螃蟹', '蛤蜊', '透抽', '干貝', '鯛魚', '龍蝦'],
  },
  {
    label: '穀物',
    emoji: '🌾',
    items: ['白米', '糙米', '燕麥', '小麥', '黑麥', '藜麥', '蕎麥', '玉米'],
  },
  {
    label: '豆類',
    emoji: '🫘',
    items: ['黑豆', '毛豆', '紅豆', '黃豆', '鷹嘴豆', '扁豆', '花生', '蠶豆'],
  },
  {
    label: '菇類',
    emoji: '🍄',
    items: ['香菇', '金針菇', '杏鮑菇', '舞菇', '松露', '猴頭菇', '竹笙', '珊瑚菇'],
  },
  {
    label: '香料',
    emoji: '🌿',
    items: ['九層塔', '薑', '蒜', '辣椒', '迷迭香', '百里香', '薑黃', '肉桂'],
  },
];

export const CategoryPage: React.FC<Props> = ({ onSearch }) => (
  <div className="animate-fade-in pb-20 md:pb-0">
    <div className="mb-8">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted mb-2">瀏覽分類</p>
      <h2 className="text-3xl font-serif font-bold text-ink">食材分類</h2>
    </div>
    <div className="space-y-8">
      {CATEGORIES.map(cat => (
        <div key={cat.label}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{cat.emoji}</span>
            <h3 className="font-serif font-bold text-lg text-ink">{cat.label}</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {cat.items.map(item => (
              <button
                key={item}
                onClick={() => onSearch(item)}
                className="bg-white rounded-xl py-3 px-2 text-sm text-ink/70 font-medium shadow-card hover:shadow-md hover:text-gold hover:border-gold border border-transparent transition-all text-center"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
