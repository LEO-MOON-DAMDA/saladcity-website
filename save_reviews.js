// save_reviews.js

const fs = require("fs");
const path = require("path");

// ✅ 샘플 리뷰 데이터 자동 생성 (API 대체용)
const generateSampleReviews = () => {
  const sample = [];
  const menus = ["그릭치킨 샐러드", "로스트 비프 샐러드", "트러플 머쉬룸"];
  const images = [
    "/images/review-sample01.jpg",
    "/images/review-sample02.jpg",
    "/images/review-sample03.jpg"
  ];

  for (let i = 0; i < 5; i++) {
    sample.push({
      nickname: `고객${i + 1}`,
      rating: Math.floor(Math.random() * 3) + 3, // 3~5점
      review: `리뷰 내용입니다. ${i + 1}`,
      date: new Date().toISOString().split("T")[0],
      menu: menus[i % menus.length],
      image: Math.random() > 0.5 ? images[i % images.length] : null,
      platform: "배달의민족"
    });
  }

  return sample;
};

// ✅ 파일 저장 위치
const outputPath = path.join(__dirname, "public/data/reviews_baemin.json");

// ✅ 저장 실행
fs.writeFileSync(outputPath, JSON.stringify(generateSampleReviews(), null, 2), "utf-8");
console.log("[✅ 리뷰 자동 생성 완료]:", outputPath);
