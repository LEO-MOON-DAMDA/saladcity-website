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
    fetch("/data/review_with_emotion_v2.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data || []);
        console.log("총 리뷰 수:", data.length);
      })
      .catch((err) => {
        console.error("리뷰 JSON 로딩 오류:", err);
      });
  }, []);

  const renderEmotionCard = (r, idx) => (
    <div className="review-card emotion" key={`emotion-${idx}`}>
      <p className="emotion-text">“{r.review}”</p>
      <p className="emotion-sub">{r.english}</p>
      <p className="emotion-author">— {r.author} —</p>
    </div>
  );

  const renderReviewCard = (r, idx) => {
    const hasImage = typeof r.image === "string" && r.image.startsWith("http");
    const fallback = fallbackImages[idx % fallbackImages.length];

    return (
      <div
        className={`review-card ${hasImage ? "large" : "small"}`}
        key={`review-${idx}`}
        onClick={() => setSelectedReview(r)}
      >
        <div className="review-meta">
          <span className="nickname">{r.nickname || "익명"}</span>
          <div className="review-badges">
            <span className="badge store">{r.store}</span>
            <span className="badge platform">{r.platform}</span>
          </div>
          <span className={`rating ${r.rating >= 4 ? "green" : "pink"}`}>
            {"⭐".repeat(r.rating || 5)}
          </span>
          &nbsp;|&nbsp; {r.date || ""}
        </div>
        <p className="review-content">
          {r.review?.slice(0, 80) || "내용 없음"}
        </p>
        {r.menu && <div className="menu-tag">{r.menu}</div>}
        {hasImage && (
          <div className="review-image-wrapper">
            <img src={r.image} alt="리뷰 이미지" />
          </div>
        )}
        {!hasImage && (
          <div className="review-image-wrapper">
            <img src={fallback} alt="감성 이미지" />
          </div>
        )}
      </div>
    );
  };

  const renderMidCTA = () => (
    <div className="review-cta review-card emotion" key="mid-cta">
      <p className="emotion-text">“이제 당신도 매주 샐러드시티와 함께하세요.”</p>
      <a href="/subscription" className="cta-button">정기배송 시작하기 →</a>
    </div>
  );

  return (
    <div className="reviews-page">
      <section className="review-hero">
        <h1 className="hero-headline">끝나지 않는 샐시크루들의 생생한 이야기</h1>
        <p className="hero-subtext">
          샐러드시티의 진짜 고객들이 남긴 리뷰를 소개합니다.
        </p>
      </section>

      <ReviewStatsChart reviews={reviews} />

      <div className="review-grid with-image">
        {reviews.map((r, idx) => {
          // 중간 CTA 위치 삽입 (6번째 후에)
          if (idx === 6) return [renderMidCTA(), r.emotion ? renderEmotionCard(r, idx) : renderReviewCard(r, idx)];
          return r.emotion ? renderEmotionCard(r, idx) : renderReviewCard(r, idx);
        })}
      </div>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}

      {/* 하단 CTA */}
      <section className="review-cta-section">
        <h2 className="cta-headline">이제, 당신도 매주 샐러드시티와 함께해보세요.</h2>
        <a href="/subscription" className="cta-button">정기배송 시작하기 →</a>
      </section>
    </div>
  );
}
