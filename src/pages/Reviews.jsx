import React, { useState } from "react";
import reviews from "../data/reviews_baemin.json";
import ReviewStatsChart from "../components/ReviewStatsChart";
import ReviewModal from "../components/ReviewModal";
import "./Reviews.css";

// ✅ 샘플 이미지 리스트
const fallbackImages = [
  "/images/review-sample01.jpg",
  "/images/review-sample02.jpg",
  "/images/review-sample03.jpg"
];

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState(null);

  const withImage = reviews.filter((r) => r.image);
  const withoutImage = reviews.filter((r) => !r.image);

  return (
    <div className="reviews-page">
      <h1 className="reviews-title">SALCY CREW</h1>
      <p className="reviews-subtitle">고객 리뷰 전체보기</p>

      <ReviewStatsChart reviews={reviews} />

      <div className="review-grid with-image">
        {withImage.map((review, idx) => (
          <div
            className="review-card large"
            key={`img-${idx}`}
            onClick={() => setSelectedReview(review)}
          >
            <div className="review-meta">
              <strong>{review.nickname || "익명"}</strong>
              <br />
              <span className={`rating ${review.rating >= 4 ? "green" : "pink"}`}>
                {"⭐".repeat(review.rating || 5)}
              </span>
              &nbsp;|&nbsp; {review.date || ""}
            </div>
            <p className="review-content">
              {review.review?.slice(0, 80) || "내용 없음"}
            </p>
            {review.menu && <div className="menu-tag">{review.menu}</div>}
            <div className="review-image-wrapper">
              <img src={review.image} alt="리뷰 이미지" />
            </div>
          </div>
        ))}
      </div>

      <div className="review-grid without-image">
        {withoutImage.map((review, idx) => {
          const randomFallback = fallbackImages[idx % fallbackImages.length];
          return (
            <div
              className="review-card small"
              key={`noimg-${idx}`}
              onClick={() => setSelectedReview(review)}
            >
              <div className="review-meta">
                <strong>{review.nickname || "익명"}</strong>
                <br />
                <span className={`rating ${review.rating >= 4 ? "green" : "pink"}`}>
                  {"⭐".repeat(review.rating || 5)}
                </span>
                &nbsp;|&nbsp; {review.date || ""}
              </div>
              <p className="review-content">
                {review.review?.slice(0, 80) || "내용 없음"}
              </p>
              {review.menu && <div className="menu-tag">{review.menu}</div>}
              {/* ✅ 샘플 이미지 삽입 */}
              <div className="review-image-wrapper">
                <img src={randomFallback} alt="감성 이미지" />
              </div>
            </div>
          );
        })}
      </div>

      {selectedReview && (
        <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
      )}
    </div>
  );
}
