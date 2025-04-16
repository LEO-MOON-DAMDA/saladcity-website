// save_reviews.js
const fs = require("fs");
const path = require("path");

// ⭐ 여기에 실제 수집기에서 받아온 원시 데이터 넣으세요
const rawReviews = require("./raw_reviews.json"); // 또는 수집기에서 const rawReviews = [...];

const toValidDate = (rawDate) => {
  if (rawDate === "오늘") return new Date().toISOString().split("T")[0];
  if (rawDate === "어제") {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  }
  return rawDate?.trim() || "";
};

const sanitizeReview = (r) => ({
  store: r.store || "정보 없음",
  author: r.nickname?.trim() || "익명",
  rating: Math.min(Math.max(Number(r.rating) || 0, 1), 5),
  content: r.review?.trim() || "내용 없음",
  date: toValidDate(r.date),
  menu: r.menu?.trim() || "정보 없음",
  image: r.image || null,
  reply: r.reply?.trim() || null,
  platform: r.platform || "배달의민족"
});

const cleanedReviews = rawReviews.map(sanitizeReview);

// 저장 경로
const outputPath = path.join(__dirname, "public", "data", "reviews_baemin.json");

// 디렉토리 없으면 생성
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, JSON.stringify(cleanedReviews, null, 2), "utf-8");

console.log(`✅ ${cleanedReviews.length}건의 리뷰가 저장되었습니다.`);
