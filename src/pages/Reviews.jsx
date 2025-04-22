import React, { useState, useEffect } from "react";
import ReviewModal from "../components/ReviewModal";
import ReviewScrollingBanner from "../components/ReviewScrollingBanner";
import "./Reviews.css";

const fallbackImages = [
  "/images/review-sample01.jpg",
  "/images/review-sample02.jpg",
  "/images/review-sample03.jpg",
];

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetch("/data/review_with_emotion_random.json")
      .then((res) => res.json())
      .then((data) => {
        const clean = data.filter((r) => {
          const text = r.review?.toLowerCase();
          const score = r.rating || 0;
          const bannedWords = [
            "사장님 댓글 등록하기",
            "사장님 댓글 추가하기",
            "머리카락",
            "이물질",
            "최악",
          ];
          const containsBannedWord = bannedWords.some((word) =>
            text?.includes(word)
          );
          return text && !containsBannedWord && (r.emotion || score >= 4);
        });
        setReviews(clean || []);
      })
      .catch((err) => console.error("리뷰 JSON 로딩 오류:", err));
  }, []);

  const getPlatformClass = (platform) => {
    if (platform.includes("배달")) return "baemin";
    if (platform.includes("쿠팡")) return "coupang";
    if (platform.includes("요기")) return "yogiyo";
    return "etc";
  };

  const renderReviewCard = (r, idx) => {
    const hasImage = typeof r.image === "string" && r.image.startsWith("http");
    const fallback = fallbackImages[idx % fallbackImages.length];
    const platformClass = getPlatformClass(r.platform || "");

    return (
      <div
        className={`review-card ${hasImage ? "large" : "small"}`}
        key={`review-${idx}`}
        onClick={() => setSelectedReview(r)}
      >
<div className="review-meta">
  <div className="meta-row">
    <span className="nickname">{r.nickname || "익명"}</span>
    <span className="divider"> | </span>
    <span className="rating green">
      {Array.from({ length: Math.min(r.rating || 0, 5) }).map((_, i) => (
        <span key={i}>⭐</span>
      ))}
    </span>
  </div>

  <div className="meta-row">
    <span className="badge store">{r.store}</span>
    <span className="divider"> | </span>
    <span className={`badge platform badge-platform platform-${getPlatformClass(r.platform || "")}`}>
      {r.platform}
    </span>
  </div>

  <div className="date">{r.date || ""}</div>
</div>

        <p className="review-text">{r.review || "내용 없음"}</p>
        {r.menu && <div className="menu-tag">{r.menu}</div>}
        <div className="review-image-wrapper">
          <img src={hasImage ? r.image : fallback} alt="리뷰 이미지" />
        </div>
      </div>
    );
  };

  const renderEmotionCard = (r, idx) => (
    <div className="review-card emotion" key={`emotion-${idx}`}>
      <p className="emotion-text">“{r.review}”</p>
      <p className="emotion-sub">{r.english}</p>
      <p className="emotion-author">— {r.author} —</p>
    </div>
  );

  const calculateAverageRating = (reviews) => {
    const rated = reviews.filter((r) => !r.emotion && r.rating);
    if (rated.length === 0) return "-";
    const avg = rated.reduce((sum, r) => sum + r.rating, 0) / rated.length;
    return avg.toFixed(2);
  };

  const emotionReviews = reviews.filter((r) => r.emotion);
  const withImageReviews = reviews.filter(
    (r) => !r.emotion && typeof r.image === "string" && r.image.startsWith("http")
  );
  const withoutImageReviews = reviews.filter(
    (r) => !r.emotion && (!r.image || !r.image.startsWith("http"))
  );

  return (
    <div className="reviews-page">
      <section className="review-hero with-bg">
        <div className="review-hero-overlay">
          <h1 className="hero-headline">
            샐러드시티 고객님들이 오늘 보내주신 소중한 리뷰예요
          </h1>
          <p className="hero-subtext">
            총 <strong>{reviews.length}</strong>개의 리뷰가 남겨졌습니다.
            <br />
            평균 별점 <strong>{calculateAverageRating(reviews)}</strong>점
          </p>
        </div>
      </section>

      <div style={{ marginTop: "2px", marginBottom: "28px" }}>
        <ReviewScrollingBanner />
      </div>

      <div className="review-grid emotion-grid">
        {[...emotionReviews.slice(0, 8)]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(renderEmotionCard)}
      </div>


      <div className="review-grid with-image">
        {withImageReviews.slice(0, 8).map(renderReviewCard)}
      </div>

      <div className="review-cta-section">
        <p className="cta-headline">
          매일 찾아오는 즐거움.<br />샐시는 meal이 아닌, 당신의 새로운 라이프스타일이에요.
        </p>
        <p className="cta-subtext">
          Everyday SALCY, your new lifestyle — not just a meal.
        </p>
        <a href="/subscription" className="cta-button">
          정기배송 시작하기 →
        </a>
      </div>

      <div className="review-grid with-image">
        {withImageReviews.slice(8).map(renderReviewCard)}
        {withoutImageReviews.map(renderReviewCard)}
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
