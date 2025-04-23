// ✅ 파일 경로: /src/components/MarketReviewHighlightSection.jsx

import React from "react";
import "../styles/MarketReviewHighlightSection.css";

const reviews = [
  {
    id: 1,
    name: "sugarpepper",
    comment: "받자마자 포장을 뜯었는데 향기까지 감성적이네요 🍋",
  },
  {
    id: 2,
    name: "콩이맘",
    comment: "생각보다 더 고급스러워요. 사진보다 실물이 더 이쁨. 강추!",
  },
  {
    id: 3,
    name: "sundaybrunch",
    comment: "이건 그냥 예술입니다. 굿즈 아닌 감성 오브제예요 💚",
  },
];

export default function MarketReviewHighlightSection() {
  return (
    <section className="review-highlight-section">
      <div className="review-highlight-inner">
        <h2 className="review-highlight-title">고객님들의 감성 리뷰</h2>
        <div className="review-highlight-cards">
          {reviews.map((r) => (
            <div key={r.id} className="review-card">
              <p className="review-comment">“{r.comment}”</p>
              <p className="review-name">- {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
