import React, { useEffect, useState } from "react";
import reviews from "../data/reviews_baemin.json";
import ReviewModal from "../components/ReviewModal";
import ReviewStatsChart from "../components/ReviewStatsChart";
import "./Reviews.css";

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
      {/* 통계 차트 */}
      <ReviewStatsChart reviews={reviews} />

      {/* 필터 및 헤더 */}
      <div className="reviews-header">
        <h1>고객 리뷰 모음</h1>
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

      {/* 리뷰 카드 리스트 */}
      <div className="reviews-list">
        {filteredReviews.map((review, idx) => (
          <div
            className="review-card"
            key={idx}
            onClick={() => setSelectedReview(review)}
          >
            <div className="review-meta">
              <strong>{review.nickname || "익명"}</strong>
              <br />
              <span className="rating">⭐ {Math.min(review.rating || 5, 5)}</span>
              &nbsp;|&nbsp; {review.date || ""}
            </div>

            <p className={`review-content ${review.text || review.review ? "" : "empty"}`}>
              {review.text || review.review || "내용 없음"}
            </p>

            {review.image && (
              <img
                src={review.image}
                alt="리뷰 이미지"
              />
            )}

            {!review.reply && (
              <p className="review-reply-pending">사장님 댓글 등록하기</p>
            )}
          </div>
        ))}
      </div>

      {/* 조건에 맞는 리뷰 없을 때 */}
      {filteredReviews.length === 0 && (
        <p className="no-results">조건에 맞는 리뷰가 없습니다.</p>
      )}

      {/* 모달 */}
      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </div>
  );
}
