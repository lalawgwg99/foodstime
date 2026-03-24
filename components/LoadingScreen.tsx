import React, { useEffect, useState } from 'react';

const MESSAGES = [
  '正在查詢全球食材資料庫...',
  '解析產地與歷史淵源...',
  '計算精確營養成分...',
  '整理烹調秘訣與搭配建議...',
];

export const LoadingScreen: React.FC<{ name: string }> = ({ name }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % MESSAGES.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 border-4 border-gold/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-3xl">🔍</div>
      </div>
      <h2 className="font-serif text-2xl font-bold text-ink mb-2">
        正在研究「{name}」
      </h2>
      <p className="text-sm text-muted animate-fade-in" key={idx}>{MESSAGES[idx]}</p>
    </div>
  );
};
