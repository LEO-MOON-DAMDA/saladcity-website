import React, { useState, useEffect } from "react";
import ReviewStatsChart from "../components/ReviewStatsChart";
import ReviewModal from "../components/ReviewModal";
import "./Reviews.css";

const fallbackImages = [
  "/images/review-sample01.jpg",
  "/images/review-sample02.jpg",
  "/images/review-sample03.jpg"
];

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetch("/data/success_review_dadamdav4_5.json")
      .then((res) => res.json())
      .then((data) => {
        const withImage = data.filter(
          (r) => typeof r.image === "string" && r.image.startsWith("http")
        );
        const withoutImage = data.filter(
          (r) => !r.image || !r.image.startsWith("http")
        );
        const merged = [...withImage, ...withoutImage];
        setReviews(merged);

        console.log("전체 리뷰 수:", data.length);
        console.log("이미지 있는 리뷰 수:", withImage.length);
        console.log("예시 리뷰:", merged[0]);
      })
      .catch((err) => {
        console.error("리뷰 JSON 로딩 오류:", err);
      });
  }, []);

  return (
    <div className="reviews-page">
      <h1 className="reviews-title">SALCY CREW</h1>
      <p className="reviews-subtitle">고객 리뷰 전체보기</p>

      <ReviewStatsChart reviews={reviews} />

      <div className="review-grid with-image">
        {reviews
          .filter((r) => typeof r.image === "string" && r.image.startsWith("http"))
          .map((review, idx) => (
            <div
              className="review-card large"
              key={`img-${idx}`}
              onClick={() => setSelectedReview(review)}
            >
              <div className="review-meta">
                <div className="review-badges">
                  <span className="badge store">{review.store}</span>
                  <span className="badge platform">{review.platform}</span>
                </div>
                <span
                  className={`rating ${review.rating >= 4 ? "green" : "pink"}`}
                >
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
        {reviews
          .filter((r) => !r.image || !r.image.startsWith("http"))
          .map((review, idx) => {
            const fallback = fallbackImages[idx % fallbackImages.length];
            return (
              <div
                className="review-card small"
                key={`noimg-${idx}`}
                onClick={() => setSelectedReview(review)}
              >
                <div className="review-meta">
                  <div className="review-badges">
                    <span className="badge store">{review.store}</span>
                    <span className="badge platform">{review.platform}</span>
                  </div>
                  <span
                    className={`rating ${review.rating >= 4 ? "green" : "pink"}`}
                  >
                    {"⭐".repeat(review.rating || 5)}
                  </span>
                  &nbsp;|&nbsp; {review.date || ""}
                </div>
                <p className="review-content">
                  {review.review?.slice(0, 80) || "내용 없음"}
                </p>
                {review.menu && <div className="menu-tag">{review.menu}</div>}
                <div className="review-image-wrapper">
                  <img src={fallback} alt="감성 이미지" />
                </div>
              </div>
            );
          })}
      </div>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </div>
  );
}
