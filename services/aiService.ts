import { IngredientInfo } from '../types';

const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';
const MODEL = 'openrouter/free'; // 智能路由，自動選可用免費模型

const getHeaders = () => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('請設定 VITE_OPENROUTER_API_KEY');
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://cooklabai.com',
    'X-Title': 'FoodsTime 食材百科',
  };
};

const stripThinking = (text: string) =>
  text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

export const fetchIngredientInfo = async (name: string): Promise<IngredientInfo> => {
  const prompt = `你是一位精通全球食材的頂級主廚兼營養學家，請對「${name}」進行深度百科介紹。

請嚴格回傳以下 JSON 格式，不得有任何多餘文字：
{
  "name": "食材的正式中文名稱",
  "englishName": "英文名稱",
  "emoji": "最適合的單一 emoji",
  "tagline": "一句話介紹（20字以內，有詩意）",
  "origin": {
    "story": "產地故事，描述這種食材的發源地與文化背景（100-150字）",
    "regions": ["主要產地1", "主要產地2", "主要產地3"],
    "history": "歷史淵源，這種食材如何影響人類飲食文化（80-100字）"
  },
  "nutrition": {
    "calories": 每100g熱量數字,
    "protein": 每100g蛋白質克數數字,
    "carbs": 每100g碳水克數數字,
    "fat": 每100g脂肪克數數字,
    "fiber": 每100g膳食纖維克數數字,
    "highlights": ["突出的營養素1", "突出的營養素2", "突出的營養素3"],
    "healthBenefits": ["健康功效1", "健康功效2", "健康功效3", "健康功效4"]
  },
  "cooking": {
    "methods": ["烹調方式1", "烹調方式2", "烹調方式3", "烹調方式4"],
    "tips": "專業烹調秘訣，讓這種食材發揮最佳風味（60-80字）",
    "famousDishes": ["代表料理1", "代表料理2", "代表料理3", "代表料理4", "代表料理5"]
  },
  "pairing": {
    "ingredients": ["最佳搭配食材1", "最佳搭配食材2", "最佳搭配食材3", "最佳搭配食材4"],
    "flavors": ["搭配風味1", "搭配風味2", "搭配風味3"],
    "avoid": ["避免搭配1", "避免搭配2"]
  },
  "market": {
    "peakSeason": ["盛產月份1", "盛產月份2"],
    "priceRange": "台灣市場大約價格區間（如：每台斤 60-120 元）",
    "buyingTips": "選購要點（30-50字）",
    "storageMethod": "保存方式（30-50字）"
  },
  "trivia": "有趣冷知識或文化小故事（50-80字）"
}

語言：全部使用台灣繁體中文。數值使用數字（不含單位）。`;

  const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: '你是全球食材百科的 AI 專家，精通台灣在地與全球各地食材知識。請只回傳 JSON，不得有任何額外文字。' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI 查詢失敗: ${res.status} ${err}`);
  }

  const data = await res.json();
  const raw = stripThinking(data.choices?.[0]?.message?.content || '{}');
  return JSON.parse(raw) as IngredientInfo;
};

export const suggestRelated = async (name: string): Promise<string[]> => {
  const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: '請只回傳 JSON，格式為 {"suggestions": ["食材1","食材2","食材3","食材4","食材5"]}' },
        { role: 'user', content: `請推薦 5 種與「${name}」相關或常搭配的食材名稱（台灣繁體中文）。` },
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) return [];
  const data = await res.json();
  const raw = stripThinking(data.choices?.[0]?.message?.content || '{}');
  const parsed = JSON.parse(raw);
  return parsed.suggestions || [];
};
