// src/pages/DashboardReviews.jsx
import React, { useState, useEffect } from "react";
import ReviewStatsChart from "../components/ReviewStatsChart";
import ReviewModal from "../components/ReviewModal";
import "./Reviews.css"; // 기존 스타일 재사용

export default function DashboardReviews() {
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
        setReviews(clean);
      });
  }, []);

  return (
    <div className="reviews-page">
      <section className="review-hero">
        <h1 className="hero-headline">[내부 전용] 리뷰 분석 대시보드</h1>
        <p className="hero-subtext">총 리뷰 수: <strong>{reviews.length}</strong>건</p>
      </section>

      {/* ✅ 리뷰 통계 시각화 차트 */}
      <ReviewStatsChart reviews={reviews} />

      {/* ✅ 리뷰 모달도 유지 */}
      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </div>
  );
}
