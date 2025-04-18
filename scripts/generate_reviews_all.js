// /scripts/generate_reviews_all.js
const fs = require("fs");
const path = require("path");

const sources = [
  path.resolve(__dirname, "../public/data/reviews_baemin.json"),
  path.resolve(__dirname, "../public/data/reviews_coupang.json"),
  path.resolve(__dirname, "../public/data/reviews_yogiyo.json"),
];

const outputPath = path.resolve(__dirname, "../public/data/reviews_all.json");

let all = [];

sources.forEach((src) => {
  if (fs.existsSync(src)) {
    try {
      const data = JSON.parse(fs.readFileSync(src, "utf8"));
      if (Array.isArray(data)) {
        all = all.concat(data);
      }
    } catch (err) {
      console.error(`❌ JSON 파싱 오류: ${src}`);
    }
  } else {
    console.warn(`⚠️ 파일 없음: ${src}`);
  }
});

fs.writeFileSync(outputPath, JSON.stringify(all, null, 2));
console.log(`✅ 통합 완료: 총 ${all.length}개 리뷰 → reviews_all.json`);
