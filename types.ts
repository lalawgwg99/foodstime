export interface IngredientInfo {
  name: string;
  englishName: string;
  emoji: string;
  tagline: string;
  origin: {
    story: string;
    regions: string[];
    history: string;
  };
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    highlights: string[];
    healthBenefits: string[];
  };
  cooking: {
    methods: string[];
    tips: string;
    famousDishes: string[];
  };
  pairing: {
    ingredients: string[];
    flavors: string[];
    avoid: string[];
  };
  market: {
    peakSeason: string[];
    priceRange: string;
    buyingTips: string;
    storageMethod: string;
  };
  trivia: string;
}

export interface SearchHistory {
  name: string;
  emoji: string;
  timestamp: number;
}
