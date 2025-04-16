
import React, { useEffect, useState } from "react";
import "./ReviewSection.css";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/data/reviews_baemin.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className="review-section">
      <h2 className="section-title">💬 고객 리뷰</h2>
      <div className="review-slider">
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

