
import React, { useEffect, useState } from "react";
import "./ReviewSection.css";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/data/reviews_baemin.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const total = reviews.length;
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const replyCount = reviews.filter((r) => r.reply).length;
  const replyRate = total > 0 ? Math.round((replyCount / total) * 100) : 0;

  return (
    <section style={{ padding: "60px 20px", background: "#f6fdf8" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "24px" }}>📊 샐러드시티 전체 리뷰</h2>

      <div style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        marginBottom: "32px",
        flexWrap: "wrap"
      }}>
        <div className="stat-box">총 리뷰 수: <strong>{total}</strong></div>
        <div className="stat-box">평균 별점: <strong>⭐ {avgRating}</strong></div>
        <div className="stat-box">응답률: <strong>{replyRate}%</strong></div>
      </div>

      <div className="review-list">
        {reviews.map((r, idx) => (
          <div className="review-card" key={idx}>
            <div className="review-header">
              <span className="nickname">{r.nickname}</span>
              <span className="rating">{"⭐".repeat(r.rating)}</span>
              <span className="date">{r.date}</span>
            </div>
            <p className="review-text">"{r.review}"</p>
            {r.menu && <div className="menu-tag">🧾 {r.menu}</div>}
            {r.image && (
              <div className="review-image">
                <img src={r.image} alt="리뷰 이미지" />
              </div>
            )}
            {r.reply && (
              <div className="review-reply">
                <strong>사장님:</strong> {r.reply}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
