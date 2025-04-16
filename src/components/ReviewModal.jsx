// src/components/ReviewModal.jsx
import React from "react";

export default function ReviewModal({ review, onClose }) {
  if (!review) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "24px",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "transparent",
            border: "none",
            fontSize: "22px",
            cursor: "pointer",
            color: "#999"
          }}
        >
          &times;
        </button>

        <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>
          {review.author || "익명"} 님의 리뷰
        </h2>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "12px" }}>
          ⭐ {review.rating} · {review.date}
        </p>
        <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
          {review.content}
        </p>
        {review.image && (
          <img
            src={review.image}
            alt="리뷰 이미지"
            style={{
              width: "100%",
              borderRadius: "12px",
              marginTop: "16px"
            }}
          />
        )}
      </div>
    </div>
  );
}
