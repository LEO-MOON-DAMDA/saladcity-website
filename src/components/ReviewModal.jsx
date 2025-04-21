import React from "react";
import "./ReviewModal.css";

export default function ReviewModal({ review, onClose }) {
  if (!review) return null;

  const {
    nickname,
    rating,
    date,
    text,
    image,
    reply,
    menu,
    platform,
  } = review;

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div
        className="review-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>×</button>

        <h2>{nickname || "익명"}님의 리뷰</h2>
        <p className="review-meta">⭐ {rating} &nbsp;|&nbsp; {date}</p>
        <p className="review-text">{text || "내용 없음"}</p>

        {menu && <p className="review-menu"><strong>주문 메뉴:</strong> {menu}</p>}
        {platform && <p className="review-platform"><strong>플랫폼:</strong> {platform}</p>}
        {image && <img className="review-image" src={image} alt="리뷰 이미지" />}

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
