import { IngredientInfo } from '../types';

const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';
const CACHE_KEY_PREFIX = 'foodstime_cache_';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 天

// 多模型 fallback 清單（依序嘗試，跳過 429）
const MODELS = [
  'stepfun/step-3.5-flash:free',
  'sourceful/riverflow-v2-pro',
  'arcee-ai/trinity-large-preview:free',
  'minimax/minimax-m2.5:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemma-3-27b-it:free',
  'mistralai/mistral-small-3.1-24b-instruct:free',
];

const getHeaders = () => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('請設定 VITE_OPENROUTER_API_KEY');
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://cooklabai.com',
    'X-Title': 'FoodsTime Ingredient Encyclopedia',
  };
};

const stripThinking = (text: string) =>
  text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

// localStorage 快取
const readCache = (key: string): IngredientInfo | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(CACHE_KEY_PREFIX + key); return null; }
    return data as IngredientInfo;
  } catch { return null; }
};
const writeCache = (key: string, data: IngredientInfo) => {
  try { localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify({ data, ts: Date.now() })); } catch {}
};

// 依序嘗試多個模型，429 或超時自動跳下一個（每個模型最多等 15 秒）
const chatWithFallback = async (
  systemPrompt: string,
  userPrompt: string,
  maxTokens = 1400
): Promise<string> => {
  let lastError = '';
  for (const model of MODELS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
        signal: controller.signal,
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.5,
          max_tokens: maxTokens,
          response_format: { type: 'json_object' },
        }),
      });
      clearTimeout(timer);
      const data = await res.json();
      if (res.status === 429 || data?.error?.code === 429) { lastError = `${model} 限流`; continue; }
      if (!res.ok || data?.error) { lastError = data?.error?.message || `${model} 錯誤`; continue; }
      const content = data.choices?.[0]?.message?.content;
      if (content) return stripThinking(content);
    } catch {
      clearTimeout(timer);
      lastError = `${model} 超時`;
      continue;
    }
  }
  throw new Error(`所有模型均不可用：${lastError}`);
};

export const fetchIngredientInfo = async (name: string): Promise<IngredientInfo> => {
  const cacheKey = name.trim().toLowerCase();
  const cached = readCache(cacheKey);
  if (cached) return cached;

  const prompt = `你是食材百科專家。請對「${name}」回傳以下 JSON，不得有多餘文字：
{"name":"正式中文名","englishName":"英文名","emoji":"單一emoji","tagline":"一句話介紹20字內",
"origin":{"story":"產地故事100字","regions":["產地1","產地2","產地3"],"history":"歷史淵源80字"},
"nutrition":{"calories":數字,"protein":數字,"carbs":數字,"fat":數字,"fiber":數字,
"highlights":["亮點1","亮點2","亮點3"],"healthBenefits":["功效1","功效2","功效3","功效4"]},
"cooking":{"methods":["方式1","方式2","方式3","方式4"],"tips":"烹調秘訣60字","famousDishes":["料理1","料理2","料理3","料理4","料理5"]},
"pairing":{"ingredients":["食材1","食材2","食材3","食材4"],"flavors":["風味1","風味2","風味3"],"avoid":["避免1","避免2"]},
"market":{"peakSeason":["月份1","月份2"],"priceRange":"台灣價格區間","buyingTips":"選購要點30字","storageMethod":"保存方式30字"},
"trivia":"冷知識50字"}
語言：台灣繁體中文。數值純數字不含單位。`;

  const raw = await chatWithFallback(
    '你是食材百科AI，只回傳JSON，不得有任何額外文字。',
    prompt,
    1400
  );
  const result = JSON.parse(raw) as IngredientInfo;
  writeCache(cacheKey, result);
  return result;
};

export const suggestRelated = async (name: string): Promise<string[]> => {
  try {
    const raw = await chatWithFallback(
      '只回傳JSON。',
      `推薦5種與「${name}」相關的食材（台灣繁體中文）：{"suggestions":["食材1","食材2","食材3","食材4","食材5"]}`,
      120
    );
    return JSON.parse(raw).suggestions || [];
  } catch { return []; }
};

export const suggestRecipes = async (ingredients: string[]): Promise<import('../types').Recipe[]> => {
  const list = ingredients.join('、');
  const raw = await chatWithFallback(
    '你是頂級主廚AI，只回傳JSON，不得有任何額外文字。',
    `我有這些食材：${list}
請推薦3-5道可以做的菜（台灣繁體中文）：
{"recipes":[{"name":"菜名","emoji":"emoji","time":"烹調時間如15分鐘","difficulty":"簡單","description":"一句美味描述","steps":["步驟1","步驟2","步驟3","步驟4"]}]}
difficulty 只能填：簡單、中等、複雜`,
    700
  );
  return JSON.parse(raw).recipes || [];
};
