import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, BarChart2, RefreshCw } from 'lucide-react';
import { Recipe } from '../types';

interface Props {
  recipes: Recipe[];
  ingredients: string[];
  onReset: () => void;
}

const DIFF_COLOR = {
  簡單: 'text-green-600 bg-green-50 border-green-100',
  中等: 'text-amber-600 bg-amber-50 border-amber-100',
  複雜: 'text-red-600 bg-red-50 border-red-100',
};

const RecipeCard: React.FC<{ recipe: Recipe; index: number }> = ({ recipe, index }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <button
        className="w-full flex items-center gap-4 p-5 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-4xl shrink-0">{recipe.emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-bold text-lg text-ink leading-tight">{recipe.name}</h3>
          <p className="text-sm text-ink/50 mt-0.5 truncate">{recipe.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-muted">
              <Clock size={11} />{recipe.time}
            </span>
            <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${DIFF_COLOR[recipe.difficulty] || DIFF_COLOR['簡單']}`}>
              <BarChart2 size={10} />{recipe.difficulty}
            </span>
          </div>
        </div>
        <span className="text-muted shrink-0">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-ink/5">
          <p className="text-xs font-bold text-muted uppercase tracking-wider mt-4 mb-3">做法步驟</p>
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink/70">
                <span className="shrink-0 w-6 h-6 rounded-full bg-gold/10 text-gold font-bold text-xs flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
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
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted mb-2">AI 食譜建議</p>
      <h2 className="text-2xl font-serif font-bold text-ink mb-3">
        用 <span className="text-gold">{ingredients.length} 種食材</span> 可以做
      </h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {ingredients.map(i => (
          <span key={i} className="px-3 py-1 bg-gold/10 text-accent border border-gold/20 rounded-full text-xs font-medium">
            {i}
          </span>
        ))}
      </div>
      <button
        onClick={onReset}
        className="flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
      >
        <RefreshCw size={13} /> 重新選食材
      </button>
    </div>

    <div className="space-y-4">
      {recipes.map((r, i) => (
        <RecipeCard key={i} recipe={r} index={i} />
      ))}
    </div>
  </div>
);
