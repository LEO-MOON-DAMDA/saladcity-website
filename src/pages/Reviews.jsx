import React, { useState } from "react";
import reviews from "../data/reviews_baemin.json";
import ReviewStatsChart from "../components/ReviewStatsChart";
import ReviewModal from "../components/ReviewModal";
import "./Reviews.css";

const fallbackTexts = [
  "하트 5개 드립니다. Heartful 5 stars.",
  "별점 5개 드립니다. Rated 5 out of 5.",
  "5점 만점에 5점이에요. Perfect 5/5.",
  "별별별별별! Stars all the way!",
  "완벽했어요! Absolutely perfect!",
  "감동적인 한 끼였습니다. Truly heartwarming.",
  "신선하고 맛있어요! Fresh and tasty!",
  "매일 먹고 싶어요! I want this every day!",
  "건강한 맛의 정석. The gold standard of healthy food.",
  "추천합니다! Highly recommended!"
];

const fallbackImages = [
  "/images/review-sample01.jpg",
  "/images/review-sample02.jpg",
  "/images/review-sample03.jpg"
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState("");
  const [showWithImageOnly, setShowWithImageOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("latest");
  const [selectedReview, setSelectedReview] = useState(null);

  const filteredReviews = reviews
    .filter((r) => {
      const content = r.content || r.review || r.text || "";
      const keyword = (filter || "").toLowerCase();
      const matchesText = content.toLowerCase().includes(keyword);
      const matchesImage = showWithImageOnly ? !!r.image : true;
      const matchesRating = (r.rating || 0) >= minRating;
      return matchesText && matchesImage && matchesRating;
    })
    .sort((a, b) => {
      if (sortOption === "latest") {
        return new Date(b.date || "") - new Date(a.date || "");
      }
      if (sortOption === "highest") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  const averageRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

  return (
    <div className="reviews-page">
      <h1 className="reviews-title">SALCY CREW</h1>
      <p className="reviews-subtitle">고객 리뷰 전체보기</p>

      <ReviewStatsChart reviews={reviews} />

      <div className="reviews-header">
        <p>
          총 리뷰 수: <strong>{reviews.length}</strong>개 &nbsp;|&nbsp; 평균 별점:{" "}
          <strong>⭐ {averageRating.toFixed(1)}</strong>
        </p>

        <div className="filter-controls">
          <input
            type="text"
            placeholder="리뷰 키워드 검색"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />

          <label>
            <input
              type="checkbox"
              checked={showWithImageOnly}
              onChange={() => setShowWithImageOnly(!showWithImageOnly)}
            />
            이미지 포함만
          </label>

          <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
            <option value={0}>⭐ 모든 별점</option>
            <option value={5}>⭐ 5점만</option>
            <option value={4}>⭐ 4점 이상</option>
            <option value={3}>⭐ 3점 이상</option>
          </select>

          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="latest">🕒 최신순</option>
            <option value="highest">⭐ 평점 높은순</option>
          </select>
        </div>
      </div>

      <div className="reviews-list">
        {filteredReviews.map((review, idx) => {
          const hasText = review.review?.trim();
          const content = hasText
            ? review.review
            : fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)];

          const imageSrc = review.image || fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

          return (
            <div className="review-card" key={idx} onClick={() => setSelectedReview(review)}>
              <div className="review-meta">
                <strong>{review.nickname || "익명"}</strong>
                <br />
                <span className={`rating ${review.rating >= 4 ? "green" : "pink"}`}>
                  {Array(Math.min(review.rating || 5, 5)).fill(review.rating >= 4 ? "💚" : "💗").join("")}
                </span>
                &nbsp;|&nbsp; {review.date || ""}
              </div>

              <p className="review-content">{content}</p>

              {imageSrc && (
                <div className="review-image-wrapper">
                  <img src={imageSrc} alt="리뷰 이미지" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredReviews.length === 0 && (
        <p className="no-results">조건에 맞는 리뷰가 없습니다.</p>
      )}

      <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
    </div>
  );
}
