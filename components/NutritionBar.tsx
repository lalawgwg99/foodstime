import React from 'react';

interface Props {
  label: string;
  value: number;
  unit: string;
  max: number;
  color: string;
}

export const NutritionBar: React.FC<Props> = ({ label, value, unit, max, color }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm">
        <span className="text-ink/60 font-sans">{label}</span>
        <span className="font-bold text-ink">{value}{unit}</span>
      </div>
      <div className="h-1.5 bg-ink/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};
