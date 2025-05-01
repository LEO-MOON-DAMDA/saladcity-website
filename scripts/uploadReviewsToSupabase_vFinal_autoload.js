import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_MENU_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_MENU_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const dataDir = path.join(__dirname, "public/data/reviews");
const files = fs.readdirSync(dataDir)
  .filter(f => f.startsWith("reviews_") && f.endsWith(".json"))
  .sort()
  .reverse();

if (files.length === 0) {
  console.error("❌ 업로드할 JSON 파일이 없습니다.");
  process.exit(1);
}

const latestFile = path.join(dataDir, files[0]);
const raw = fs.readFileSync(latestFile, "utf-8");
const reviews = JSON.parse(raw);

// 중복 제거
const seen = new Set();
const filtered = reviews.filter(r => {
  const key = r.nickname + r.date;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

// 통계
const today = new Date().toISOString().split("T")[0];
const storeCount = {};
filtered.forEach(r => {
  if (!storeCount[r.store]) storeCount[r.store] = 0;
  storeCount[r.store]++;
});
const emotionCount = filtered.filter(r => r.emotion === true).length;

(async () => {
  const { data, error } = await supabase
    .from('reviews')
    .upsert(filtered, { onConflict: ['nickname', 'date'] });

  if (error) {
    console.error('❌ Supabase 업로드 실패:', error.message);
    process.exit(1);
  }

  const count = data?.length || 0;
  const storeText = Object.entries(storeCount)
    .map(([k, v]) => `${k}: ${v}건`)
    .join(', ');

  console.log(`✅ ${today} 업로드 완료 | 총 ${count}건 | 감성 ${emotionCount}건 | ${storeText}`);
})();