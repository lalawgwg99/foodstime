import React from 'react';

// 共用手繪濾鏡 — 讓所有線條帶輕微顫抖感
const FILTER_ID = 'hand-drawn';

const Defs = () => (
  <defs>
    <filter id={FILTER_ID} x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="3" seed="5" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.8" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
);

const f = `url(#${FILTER_ID})`;
// strokeWidth 稍微不均勻，讓人感覺用筆壓力不一
const LINE = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const THICK = { ...LINE, strokeWidth: 2.8 };

// 手繪橢圓（用 path 而非 circle，讓形狀稍微歪）
const WobbleHead = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => (
  <path
    d={`M ${cx - r + 1} ${cy}
        C ${cx - r} ${cy - r * 0.6},  ${cx - r * 0.55} ${cy - r - 1},  ${cx} ${cy - r}
        C ${cx + r * 0.6} ${cy - r},   ${cx + r + 1} ${cy - r * 0.55}, ${cx + r} ${cy + 1}
        C ${cx + r} ${cy + r * 0.6},   ${cx + r * 0.5} ${cy + r + 2},  ${cx} ${cy + r}
        C ${cx - r * 0.6} ${cy + r + 1}, ${cx - r - 1} ${cy + r * 0.5}, ${cx - r + 1} ${cy}
        Z`}
    {...LINE}
  />
);

// 手繪直線（帶微微彎曲，模擬手的顫抖）
const WLine = ({ x1, y1, x2, y2, bend = 0 }: { x1: number; y1: number; x2: number; y2: number; bend?: number }) => {
  const mx = (x1 + x2) / 2 + bend;
  const my = (y1 + y2) / 2 + bend * 0.5;
  return <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} {...LINE} />;
};

/* ── 發呆站著 ── */
export const StickIdle: React.FC<{ className?: string }> = ({ className = 'w-32 h-40' }) => (
  <svg viewBox="0 0 100 145" className={className} filter={f}>
    <Defs />
    <WobbleHead cx={50} cy={22} r={17} />
    {/* 眼睛 — 小圓弧代替圓點，更手繪 */}
    <path d="M 41 20 Q 43 17 45 20" {...LINE} strokeWidth={1.8} />
    <path d="M 55 20 Q 57 17 59 20" {...LINE} strokeWidth={1.8} />
    {/* 微笑 */}
    <path d="M 44 28 Q 50 34 56 28" {...LINE} />
    {/* 身體 */}
    <WLine x1={50} y1={39} x2={51} y2={95} bend={1} />
    {/* 左手 */}
    <WLine x1={50} y1={60} x2={23} y2={76} bend={-2} />
    {/* 右手 */}
    <WLine x1={50} y1={60} x2={77} y2={73} bend={2} />
    {/* 左腳 */}
    <WLine x1={51} y1={95} x2={35} y2={138} bend={-1} />
    {/* 右腳 */}
    <WLine x1={51} y1={95} x2={67} y2={136} bend={2} />
  </svg>
);

/* ── 抓頭思考 ── */
export const StickThinking: React.FC<{ className?: string }> = ({ className = 'w-32 h-40' }) => (
  <svg viewBox="0 0 120 150" className={className} filter={f}>
    <Defs />
    {/* 頭 — 稍微歪 */}
    <path
      d="M 36 26 C 35 14, 49 7, 60 9 C 73 10, 80 20, 78 32 C 77 42, 65 48, 55 46 C 43 44, 36 38, 36 26 Z"
      {...LINE}
    />
    {/* 一邊眼睛閉著（思考） */}
    <path d="M 45 25 L 50 23" {...LINE} strokeWidth={2} />
    <path d="M 63 24 Q 65 21 68 24" {...LINE} strokeWidth={1.8} />
    {/* 眉毛皺起來 */}
    <path d="M 43 20 Q 47 17 51 19" {...LINE} strokeWidth={1.5} />
    {/* 嘴巴歪著 */}
    <path d="M 48 38 Q 55 36 60 39" {...LINE} />
    {/* 身體 */}
    <WLine x1={57} y1={46} x2={56} y2={98} bend={-2} />
    {/* 右手抬起摸頭 */}
    <path d="M 57 65 Q 75 55 78 40" {...THICK} />
    {/* 左手放低 */}
    <WLine x1={56} y1={65} x2={28} y2={80} bend={3} />
    {/* 腳 */}
    <WLine x1={56} y1={98} x2={40} y2={140} bend={-2} />
    <WLine x1={56} y1={98} x2={72} y2={138} bend={2} />
    {/* 問號 — 歪歪的 */}
    <path d="M 92 18 Q 98 8 93 15 Q 90 20 93 25" {...LINE} strokeWidth={2.5} />
    <circle cx={93} cy={30} r={2} fill="currentColor" stroke="none" />
    <path d="M 103 30 Q 110 18 104 26 Q 101 31 104 36" {...LINE} strokeWidth={2} />
    <circle cx={104} cy={41} r={1.8} fill="currentColor" stroke="none" />
  </svg>
);

/* ── 廚師舉手 ── */
export const StickChef: React.FC<{ className?: string }> = ({ className = 'w-32 h-44' }) => (
  <svg viewBox="0 0 110 160" className={className} filter={f}>
    <Defs />
    {/* 廚師帽 — 歪的 */}
    <path d="M 30 24 Q 28 10, 42 8 Q 50 5, 56 10 Q 66 6, 70 14 Q 76 24, 68 28 L 34 30 Z" {...THICK} />
    <path d="M 30 26 Q 50 22, 70 26" {...LINE} />
    {/* 頭 */}
    <path
      d="M 34 44 C 32 32, 42 24, 52 24 C 64 24, 72 34, 70 46 C 68 56, 58 62, 50 60 C 40 58, 35 54, 34 44 Z"
      {...LINE}
    />
    {/* 大笑 */}
    <path d="M 42 48 Q 51 57 60 48" {...THICK} />
    <path d="M 42 48 L 43 52 Q 51 57 59 53 L 60 48" {...LINE} strokeWidth={1.5} />
    {/* 眼睛 彎弧（開心眼） */}
    <path d="M 41 40 Q 44 36 47 40" {...LINE} />
    <path d="M 55 40 Q 58 36 61 40" {...LINE} />
    {/* 身體 */}
    <WLine x1={51} y1={60} x2={52} y2={108} bend={1} />
    {/* 兩手歡呼舉起 */}
    <path d="M 52 75 Q 30 65 18 42" {...THICK} />
    <path d="M 52 75 Q 76 65 88 44" {...THICK} />
    {/* 腳 */}
    <WLine x1={52} y1={108} x2={36} y2={150} bend={-2} />
    <WLine x1={52} y1={108} x2={68} y2={148} bend={3} />
    {/* 閃光 */}
    <path d="M 14 38 L 10 32 M 10 38 L 14 32 M 12 30 L 12 26" {...LINE} strokeWidth={1.5} />
    <path d="M 90 38 L 86 32 M 86 38 L 90 32 M 88 30 L 88 26" {...LINE} strokeWidth={1.5} />
  </svg>
);

/* ── 攤手無奈 ── */
export const StickShrug: React.FC<{ className?: string }> = ({ className = 'w-32 h-40' }) => (
  <svg viewBox="0 0 120 145" className={className} filter={f}>
    <Defs />
    <WobbleHead cx={60} cy={24} r={17} />
    {/* 無奈眼睛 — 一個正常一個半閉 */}
    <path d="M 51 21 Q 54 18 57 21" {...LINE} strokeWidth={1.8} />
    <path d="M 63 22 L 68 20" {...LINE} strokeWidth={2} />
    {/* 嘴巴歪著不爽 */}
    <path d="M 54 32 Q 58 29 65 32" {...LINE} />
    {/* 身體 */}
    <WLine x1={60} y1={41} x2={61} y2={96} bend={2} />
    {/* 兩肩聳起，手攤開 */}
    <path d="M 60 58 Q 38 50 22 60" {...THICK} />
    <path d="M 22 60 L 14 55" {...LINE} />
    <path d="M 60 58 Q 84 50 98 60" {...THICK} />
    <path d="M 98 60 L 106 55" {...LINE} />
    {/* 腳 */}
    <WLine x1={61} y1={96} x2={44} y2={137} bend={-1} />
    <WLine x1={61} y1={96} x2={78} y2={135} bend={2} />
    {/* 頭上揮汗 */}
    <path d="M 76 14 Q 79 10 78 16" {...LINE} strokeWidth={1.5} />
    <path d="M 82 10 Q 85 5 84 11" {...LINE} strokeWidth={1.5} />
  </svg>
);
