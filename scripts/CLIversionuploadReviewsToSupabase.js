// Supabase 업로드기 – CommonJS 방식 + JSON 유효성 필터 포함
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_MENU_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_MENU_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const dataDir = path.join(__dirname, "../public/data/reviews");
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

// 중복 제거 + 유효성 검사
const seen = new Set();
const filtered = reviews.filter(r => {
  const key = r.nickname + r.date;
  const valid =
    typeof r.nickname === "string" &&
    typeof r.date === "string" &&
    typeof r.review === "string" &&
    typeof r.rating === "number" &&
    r.review !== "" &&
    r.date !== "감성 메시지";

  if (!valid || seen.has(key)) return false;
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
    .from("reviews")
    .insert(filtered);

  if (error) {
    console.error("❌ Supabase 업로드 실패:", error);
    process.exit(1);
  }

  const storeText = Object.entries(storeCount)
    .map(([k, v]) => `${k}: ${v}건`)
    .join(", ");

  console.log(`✅ ${today} 업로드 완료 | 총 ${filtered.length}건 | 감성 ${emotionCount}건 | ${storeText}`);
})();
