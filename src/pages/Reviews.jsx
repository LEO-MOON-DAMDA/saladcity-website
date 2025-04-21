import React, { useState, useEffect } from "react";
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
    fetch("/data/review_with_emotion_random.json")
      .then((res) => res.json())
      .then((data) => {
        const clean = data.filter((r) => {
          const text = r.review?.toLowerCase();
          const score = r.rating || 0;
          const bannedWords = ["사장님 댓글 등록하기", "사장님 댓글 추가하기", "머리카락", "이물질", "최악"];
          const containsBannedWord = bannedWords.some((word) => text?.includes(word));
          return text && !containsBannedWord && (r.emotion || score >= 4);
        });
        setReviews(clean || []);
        console.log("총 리뷰 수:", clean.length);
      })
      .catch((err) => {
        console.error("리뷰 JSON 로딩 오류:", err);
      });
  }, []);

  const calculateAverageRating = (reviews) => {
    const rated = reviews.filter((r) => !r.emotion && r.rating);
    if (rated.length === 0) return "-";
    const avg = rated.reduce((sum, r) => sum + r.rating, 0) / rated.length;
    return avg.toFixed(1);
  };

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
        <div className="review-image-wrapper">
          <img src={hasImage ? r.image : fallback} alt="리뷰 이미지" />
        </div>
      </div>
    );
  };

  const renderMidCTA = () => (
    <div className="review-cta review-card emotion" key="mid-cta">
      <p className="emotion-text">“이제 당신도 매주 샐러드시티와 함께하세요.”</p>
      <a href="/subscription" className="cta-button">정기배송 시작하기 →</a>
    </div>
  );

  const emotionReviews = reviews.filter((r) => r.emotion);
  const withImageReviews = reviews.filter(
    (r) =>
      !r.emotion &&
      typeof r.image === "string" &&
      r.image.startsWith("http")
  );
  const withoutImageReviews = reviews.filter(
    (r) => !r.emotion && (!r.image || !r.image.startsWith("http"))
  );

  return (
    <div className="reviews-page">
      {/* ✅ 배경 이미지 + 감성 헤드라인 + 평균 별점 문장 */}
      <section className="review-hero with-bg">
        <div className="review-hero-overlay">
          <h1 className="hero-headline">샐러드시티 고객님들이 오늘 보내주신 소중한 리뷰예요</h1>
          <p className="hero-subtext">
            총 <strong>{reviews.length}</strong>개의 리뷰가 남겨졌습니다.
            <br />
            평균 별점은 <strong>{calculateAverageRating(reviews)}</strong>점이에요. 정말 고마운 후기들이에요.
          </p>
        </div>
      </section>

      {/* ✅ 리뷰 카드 렌더링 */}
      <div className="review-grid with-image">
        {[ 
          ...emotionReviews.map(renderEmotionCard),
          ...withImageReviews.slice(0, 6).map(renderReviewCard),
          renderMidCTA(),
          ...withImageReviews.slice(6).map(renderReviewCard),
          ...withoutImageReviews.map(renderReviewCard)
        ]}
      </div>

      {/* ✅ 모달 */}
      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}

      {/* ✅ 하단 CTA */}
      <section className="review-cta-section">
        <h2 className="cta-headline">이제, 당신도 매주 샐러드시티와 함께해보세요.</h2>
        <a href="/subscription" className="cta-button">정기배송 시작하기 →</a>
      </section>
    </div>
  );
}
