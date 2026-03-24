import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { Recipe } from '../types';
import { StickChef } from './StickFigure';

interface Props {
  recipes: Recipe[];
  ingredients: string[];
  onReset: () => void;
}

const DIFF_STYLE = {
  簡單: 'border-green-400 text-green-700',
  中等: 'border-gold text-gold',
  複雜: 'border-red-400 text-red-600',
};

const RecipeCard: React.FC<{ recipe: Recipe; index: number }> = ({ recipe, index }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border border-ink/15 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-cream transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-3xl shrink-0">{recipe.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-serif font-bold text-lg text-ink">{recipe.name}</h3>
            <span className={`text-xs border rounded px-2 py-0.5 font-medium ${DIFF_STYLE[recipe.difficulty] ?? DIFF_STYLE['簡單']}`}>
              {recipe.difficulty}
            </span>
            <span className="text-xs text-muted">{recipe.time}</span>
          </div>
          <p className="text-sm text-muted mt-1 truncate">{recipe.description}</p>
        </div>
        <span className="text-muted shrink-0">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-ink/8 bg-cream">
          <p className="text-[11px] font-bold text-muted uppercase tracking-widest pt-4 mb-3">做法</p>
          <ol className="space-y-2.5">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink/80">
                <span className="shrink-0 font-mono font-bold text-muted w-5">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export const RecipeSuggestions: React.FC<Props> = ({ recipes, ingredients, onReset }) => (
  <div className="animate-fade-in pb-24 md:pb-8">
    {/* Header */}
    <div className="flex items-end gap-6 mb-8">
      <div className="flex-1">
        <p className="text-xs uppercase tracking-[0.25em] text-muted mb-2">AI 幫你想到了</p>
        <h2 className="text-3xl font-serif font-black text-ink leading-tight">
          好，可以做 {recipes.length} 道菜
        </h2>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {ingredients.map(i => (
            <span key={i} className="text-xs border border-ink/20 rounded px-2.5 py-1 text-ink/60">
              {i}
            </span>
          ))}
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors mt-3"
        >
          <RotateCcw size={12} /> 重選食材
        </button>
      </div>
      <StickChef className="w-20 h-24 text-ink/20 shrink-0 mb-1" />
    </div>

    {/* Recipe cards */}
    <div className="space-y-3">
      {recipes.map((r, i) => <RecipeCard key={i} recipe={r} index={i} />)}
    </div>
  </div>
);
