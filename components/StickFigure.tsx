import React from 'react';

const BASE = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

// 站著發呆
export const StickIdle: React.FC<{ className?: string }> = ({ className = 'w-32 h-40' }) => (
  <svg viewBox="0 0 100 140" className={className} {...BASE}>
    <circle cx="50" cy="22" r="18" />
    <circle cx="43" cy="19" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="57" cy="19" r="2.5" fill="currentColor" stroke="none" />
    <path d="M43 29 Q50 34 57 29" />
    <line x1="50" y1="40" x2="50" y2="92" />
    <line x1="50" y1="58" x2="22" y2="72" />
    <line x1="50" y1="58" x2="78" y2="72" />
    <line x1="50" y1="92" x2="34" y2="132" />
    <line x1="50" y1="92" x2="66" y2="132" />
  </svg>
);

// 抓頭思考中（AI 處理時）
export const StickThinking: React.FC<{ className?: string }> = ({ className = 'w-32 h-40' }) => (
  <svg viewBox="0 0 120 145" className={className} {...BASE}>
    <circle cx="55" cy="24" r="18" />
    <circle cx="48" cy="21" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="62" cy="21" r="2.5" fill="currentColor" stroke="none" />
    <path d="M48 31 Q55 28 62 31" />
    <line x1="55" y1="42" x2="55" y2="94" />
    {/* 右手舉起摸頭 */}
    <line x1="55" y1="60" x2="80" y2="50" />
    <line x1="80" y1="50" x2="72" y2="32" />
    {/* 左手下垂 */}
    <line x1="55" y1="60" x2="28" y2="74" />
    <line x1="55" y1="94" x2="38" y2="135" />
    <line x1="55" y1="94" x2="72" y2="135" />
    {/* 問號 */}
    <text x="82" y="22" fontSize="18" stroke="none" fill="currentColor" fontFamily="sans-serif">?</text>
    <text x="100" y="38" fontSize="12" stroke="none" fill="currentColor" fontFamily="sans-serif">?</text>
  </svg>
);

// 廚師帽 + 舉手開心
export const StickChef: React.FC<{ className?: string }> = ({ className = 'w-32 h-44' }) => (
  <svg viewBox="0 0 100 155" className={className} {...BASE}>
    {/* 廚師帽 */}
    <ellipse cx="50" cy="10" rx="20" ry="7" />
    <rect x="32" y="6" width="36" height="14" rx="2" />
    {/* 頭 */}
    <circle cx="50" cy="32" r="18" />
    <circle cx="43" cy="29" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="57" cy="29" r="2.5" fill="currentColor" stroke="none" />
    <path d="M43 38 Q50 44 57 38" />
    {/* 身體 */}
    <line x1="50" y1="50" x2="50" y2="102" />
    {/* 兩手舉起 */}
    <line x1="50" y1="66" x2="20" y2="48" />
    <line x1="50" y1="66" x2="80" y2="48" />
    {/* 腳 */}
    <line x1="50" y1="102" x2="33" y2="142" />
    <line x1="50" y1="102" x2="67" y2="142" />
    {/* 星星 */}
    <text x="82" y="46" fontSize="14" stroke="none" fill="currentColor">★</text>
    <text x="2" y="48" fontSize="14" stroke="none" fill="currentColor">★</text>
  </svg>
);

// 攤手（沒選食材）
export const StickShrug: React.FC<{ className?: string }> = ({ className = 'w-32 h-40' }) => (
  <svg viewBox="0 0 120 140" className={className} {...BASE}>
    <circle cx="60" cy="24" r="18" />
    <circle cx="53" cy="21" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="67" cy="21" r="2.5" fill="currentColor" stroke="none" />
    {/* 無奈表情 */}
    <path d="M53 32 Q60 29 67 32" />
    <line x1="60" y1="42" x2="60" y2="94" />
    {/* 兩手攤開斜上 */}
    <line x1="60" y1="62" x2="28" y2="50" />
    <line x1="28" y1="50" x2="18" y2="58" />
    <line x1="60" y1="62" x2="92" y2="50" />
    <line x1="92" y1="50" x2="102" y2="58" />
    <line x1="60" y1="94" x2="42" y2="134" />
    <line x1="60" y1="94" x2="78" y2="134" />
  </svg>
);
