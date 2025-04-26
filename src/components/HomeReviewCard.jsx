import React from "react";
import "./HomeReviewCard.css";

export default function HomeReviewCard({ review, idx, isMoreButton }) {
  if (!review && !isMoreButton) return null;

  if (isMoreButton) {
    return (
      <a className="home-review-card review-more-card" href="/reviews">
        <div className="review-more-text">전체 리뷰<br /> 보기 →</div>
      </a>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    return `${parts[0]}.${parts[1]}`;
  };

  const formatStore = (storeStr) => {
    if (!storeStr) return "";
    return storeStr.replace(/^배민[\s·\-_]*/i, "");
  };

  return (
    <a className="home-review-card" href={`/reviews#review-${review.id || idx}`}>
      <div className="home-meta-top">
        <span className="home-nickname">{review.nickname || "익명"}</span>
        {review.store && (
          <span className="home-store"> | {formatStore(review.store)}</span>
        )}
        {review.date && (
          <span className="home-date"> | {formatDate(review.date)}</span>
        )}
      </div>

      <div className="home-rating" style={{ fontSize: "12px", color: "#4CAF50", marginBottom: "6px" }}>
        {Array.from({ length: Math.min(review.rating || 0, 5) }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>

      <p className="home-review-text">
        {review.review
          ? review.review.length > 20
            ? review.review.slice(0, 20) + "..."
            : review.review
          : "내용 없음"}
      </p>

      <div className="home-review-image-wrapper">
        <img src={review.image} alt="리뷰 이미지" />
      </div>
    </a>
  );
}
