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
      const content = review.content || review.review || "";
      const keyword = (filter || "").toLowerCase(); // ✅ filter 안전 처리
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
    <div
      className="reviews-page"
      style={{
        padding: "40px 16px",
        backgroundColor: "#f8fef9",
        fontFamily: "sans-serif",
      }}
    >
      {/* 통계 차트 */}
      <ReviewStatsChart reviews={reviews} />

      {/* 필터 + 헤더 */}
      <div
        className="reviews-header"
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>고객 리뷰 모음</h1>
        <p style={{ fontSize: "16px", color: "#555" }}>
          총 리뷰 수: <strong>{reviews.length}</strong>개 &nbsp;|&nbsp; 평균 별점:{" "}
          <strong>⭐ {averageRating.toFixed(1)}</strong>
        </p>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="리뷰 키워드 검색"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />

          <label style={{ fontSize: "14px", color: "#444" }}>
            <input
              type="checkbox"
              checked={showWithImageOnly}
              onChange={() => setShowWithImageOnly(!showWithImageOnly)}
              style={{ marginRight: "6px" }}
            />
            이미지 포함만
          </label>

          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            style={{
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <option value={0}>⭐ 모든 별점</option>
            <option value={5}>⭐ 5점만</option>
            <option value={4}>⭐ 4점 이상</option>
            <option value={3}>⭐ 3점 이상</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <option value="latest">🕒 최신순</option>
            <option value="highest">⭐ 평점 높은순</option>
          </select>
        </div>
      </div>

      {/* 리뷰 카드 리스트 */}
      <div
        className="reviews-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {filteredReviews.map((review, idx) => (
          <div
            className="review-card"
            key={idx}
            onClick={() => setSelectedReview(review)}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <div
              className="review-meta"
              style={{
                marginBottom: "12px",
                fontSize: "14px",
                color: "#666",
              }}
            >
              <strong>{review.author || review.nickname || "익명"}</strong>
              <br />
              ⭐ {review.rating || 5} &nbsp;|&nbsp;
              {review.date || ""}
            </div>
            <p
              className="review-content"
              style={{
                fontSize: "15px",
                color: "#333",
                lineHeight: "1.5",
                marginBottom: "12px",
              }}
            >
              {review.content || review.review || "내용 없음"}
            </p>
            {review.image && (
              <img
                src={review.image}
                alt="리뷰 이미지"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  marginTop: "8px",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* 결과 없을 때 메시지 */}
      {filteredReviews.length === 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "40px",
            color: "#888",
          }}
        >
          조건에 맞는 리뷰가 없습니다.
        </p>
      )}

      {/* 팝업 */}
      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </div>
  );
}
