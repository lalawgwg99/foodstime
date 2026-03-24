import React from 'react';

interface Props {
  onSearch: (name: string) => void;
}

const FEATURED = [
  { name: '虱目魚', emoji: '🐟', desc: '台灣南部的驕傲，全身都是寶' },
  { name: '甲仙芋頭', emoji: '🟣', desc: '細膩綿密，芋香四溢的台灣名物' },
  { name: '松露', emoji: '🍄', desc: '廚界的黑鑽石，頂級料理靈魂' },
  { name: '番紅花', emoji: '🌸', desc: '世界最貴香料，一絲即染金黃' },
  { name: '味噌', emoji: '🫙', desc: '發酵之魂，日本料理的底蘊' },
  { name: '酪梨', emoji: '🥑', desc: '健康脂肪的完美來源，林木之奶油' },
  { name: '牛蒡', emoji: '🌿', desc: '食藥同源，台日料理的養生聖品' },
  { name: '帕瑪森起司', emoji: '🧀', desc: '義大利之王，陳年 24 個月的結晶' },
];

export const FeaturedIngredients: React.FC<Props> = ({ onSearch }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 animate-fade-in">
      <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-muted mb-8">精選食材</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {FEATURED.map(item => (
          <button
            key={item.name}
            onClick={() => onSearch(item.name)}
            className="group bg-white rounded-2xl p-5 shadow-card hover:shadow-float hover:-translate-y-1 transition-all duration-300 text-left border border-transparent hover:border-gold/20"
          >
            <div className="text-3xl mb-3">{item.emoji}</div>
            <div className="font-serif font-bold text-ink mb-1 group-hover:text-gold transition-colors">{item.name}</div>
            <div className="text-xs text-muted leading-relaxed">{item.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
