import React from "react";
import "./ReviewModal.css";

export default function ReviewModal({ review, onClose }) {
  if (!review) return null;

  const {
    nickname,
    rating,
    date,
    review: content,
    image,
    reply,
    menu,
    platform,
    store,
  } = review;

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div
        className="review-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>×</button>

        <h2>{nickname || "익명"}님의 리뷰</h2>

        <p className="review-meta">
          {/* ✅ 별(⭐) 여러개로 출력 */}
          {Array.from({ length: Math.min(rating || 0, 5) }).map((_, idx) => (
            <span key={idx}>⭐</span>
          ))}
          &nbsp;({rating}점) | {date} | {platform} · {store}
        </p>

        {image && (
          <img className="review-image" src={image} alt="리뷰 이미지" />
        )}

        <p className="review-text">{content || "내용 없음"}</p>

        {menu && <p className="review-menu"><strong>주문 메뉴:</strong> {menu}</p>}

        {reply && (
          <div className="review-reply">
            <strong>🙋 사장님 답변:</strong><br />
            {reply}
          </div>
        )}
      </div>
    </div>
  );
}
