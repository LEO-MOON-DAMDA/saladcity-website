import React, { useEffect, useState } from "react";
import reviews from "../data/reviews_baemin.json";
import ReviewModal from "../components/ReviewModal";
import ReviewStatsChart from "../components/ReviewStatsChart";
import "./Reviews.css";

const fallbackComments = [
  "하트 5개드립니다. / 5 hearts for this.",
  "별점 5개드립니다. / 5 shining stars.",
  "5점만점에 5점이예요. / A perfect 5 out of 5!",
  "별별별별별 / Sparkles all around!",
  "완벽한 샐러드예요. / The salad was perfect!",
  "정기배송해야겠어요. / I might subscribe!",
  "맛과 건강 모두 잡았어요. / Taste meets wellness.",
  "재료가 살아있어요. / So fresh, so good.",
  "기분이 좋아졌어요. / This made my day!",
  "매일 먹고 싶어요. / I could eat this every day."
];

const fallbackImages = [
  "/images/review-sample01.jpg",
  "/images/review-sample02.jpg",
  "/images/review-sample03.jpg",
  "/images/review-sample04.jpg"
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState("");
  const [showWithImageOnly, setShowWithImageOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("latest");
  const [selectedReview, setSelectedReview] = useState(null);

  const filteredReviews = reviews
    .filter((review) => {
      const content = review.content || review.review || review.text || "";
      const keyword = (filter || "").toLowerCase();
      const matchesText = content.toLowerCase().includes(keyword);
      const matchesImage = showWithImageOnly ? !!review.image : true;
      const matchesRating = (review.rating || 0) >= minRating;
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

  const averageRating =
    reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

  return (
    <div className="reviews-page">
      <ReviewStatsChart reviews={reviews} />

      <div className="reviews-header">
        <h1>고객 리뷰 모음</h1>
        <p>
          총 리뷰 수: <strong>{reviews.length}</strong>개 &nbsp;|&nbsp; 평균 별점: {" "}
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

          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
          >
            <option value={0}>⭐ 모든 별점</option>
            <option value={5}>⭐ 5점만</option>
            <option value={4}>⭐ 4점 이상</option>
            <option value={3}>⭐ 3점 이상</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="latest">🕒 최신순</option>
            <option value="highest">⭐ 평점 높은순</option>
          </select>
        </div>
      </div>

      <div className="reviews-list">
        {filteredReviews.map((review, idx) => {
          const hasText = !!(review.text || review.review);
          const fallback = fallbackComments[Math.floor(Math.random() * fallbackComments.length)];
          const content = hasText ? (review.text || review.review) : fallback;
          const hasImage = !!review.image;
          const fallbackImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

          return (
            <div
              className="review-card"
              key={idx}
              onClick={() => setSelectedReview(review)}
            >
              <div className="review-meta">
                <strong>{review.nickname || "익명"}</strong>
                <div className={`rating-icons ${review.rating >= 4 ? "green" : "pink"}`}>
                  {Array.from({ length: Math.min(review.rating || 0, 5) }).map((_, i) => (
                    <span key={i}>{review.rating >= 4 ? "💚" : "💗"}</span>
                  ))}
                </div>
                <span className="date">{review.date || ""}</span>
              </div>

              <p className="review-content">
                {content}
              </p>

              {(review.image || fallbackImage) && (
                <div className="review-image-wrapper">
                  <img src={review.image || fallbackImage} alt="리뷰 이미지" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredReviews.length === 0 && (
        <p className="no-results">조건에 맞는 리뷰가 없습니다.</p>
      )}

      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </div>
  );
}
