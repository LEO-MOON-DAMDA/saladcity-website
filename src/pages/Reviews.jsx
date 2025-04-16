// src/pages/Reviews.jsx
import React, { useEffect, useState } from "react";
import reviews from "../data/reviews_baemin.json";
import "./Reviews.css";

export default function ReviewsPage() {
  const [filter, setFilter] = useState("");
  const [showWithImageOnly, setShowWithImageOnly] = useState(false);

  const filteredReviews = reviews.filter((review) => {
    const matchesText = review.content.toLowerCase().includes(filter.toLowerCase());
    const matchesImage = showWithImageOnly ? !!review.image : true;
    return matchesText && matchesImage;
  });

  const averageRating =
    reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

  return (
    <div className="reviews-page" style={{ padding: "40px 16px", backgroundColor: "#f8fef9", fontFamily: "sans-serif" }}>
      {/* 통계 + 필터 영역 */}
      <div className="reviews-header" style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>고객 리뷰 모음</h1>
        <p style={{ fontSize: "16px", color: "#555" }}>
          총 리뷰 수: <strong>{reviews.length}</strong>개 &nbsp;|&nbsp; 평균 별점: <strong>⭐ {averageRating.toFixed(1)}</strong>
        </p>
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <input
            type="text"
            placeholder="리뷰 키워드 검색"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              width: "260px",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px"
            }}
          />
          <label style={{ fontSize: "14px", color: "#444" }}>
            <input
              type="checkbox"
              checked={showWithImageOnly}
              onChange={() => setShowWithImageOnly(!showWithImageOnly)}
              style={{ marginRight: "6px" }}
            />
            이미지 포함 리뷰만 보기
          </label>
        </div>
      </div>

      {/* 리뷰 리스트 */}
      <div className="reviews-list" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px"
      }}>
        {filteredReviews.map((review, idx) => (
          <div className="review-card" key={idx} style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "200px"
          }}>
            <div className="review-meta" style={{ marginBottom: "12px", fontSize: "14px", color: "#666" }}>
              <span><strong>{review.author || "익명"}</strong></span><br />
              <span>⭐ {review.rating || 5}</span> &nbsp;|&nbsp;
              <span>{review.date || ""}</span>
            </div>
            <p className="review-content" style={{ fontSize: "15px", color: "#333", lineHeight: "1.5", marginBottom: "12px" }}>
              {review.content}
            </p>
            {review.image && (
              <img
                src={review.image}
                alt="리뷰 이미지"
                className="review-image"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  marginTop: "8px"
                }}
              />
            )}
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "40px", color: "#888" }}>
          조건에 맞는 리뷰가 없습니다.
        </p>
      )}
    </div>
  );
}
