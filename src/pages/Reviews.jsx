// src/pages/Reviews.jsx
import React, { useEffect, useState } from "react";
import reviews from "../data/reviews_baemin.json";
import "./Reviews.css"; // 선택: 스타일 따로 분리 가능

export default function ReviewsPage() {
  const [filter, setFilter] = useState("");
  const filteredReviews = reviews.filter((review) =>
    review.content.toLowerCase().includes(filter.toLowerCase())
  );

  const averageRating =
    reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h1>전체 리뷰</h1>
        <p>총 리뷰 수: {reviews.length}개 · 평균 별점: ⭐ {averageRating.toFixed(1)}</p>
        <input
          type="text"
          placeholder="리뷰 검색"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="review-search-input"
        />
      </div>

      <div className="reviews-list">
        {filteredReviews.map((review, idx) => (
          <div className="review-card" key={idx}>
            <div className="review-meta">
              <span className="review-author">{review.author || "익명"}</span>
              <span className="review-rating">⭐ {review.rating || 5}</span>
              <span className="review-date">{review.date || ""}</span>
            </div>
            <p className="review-content">{review.content}</p>
            {review.image && (
              <img src={review.image} alt="리뷰 이미지" className="review-image" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
