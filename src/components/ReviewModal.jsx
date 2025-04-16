import React from "react";

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
    <div
      className="review-modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="review-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "16px",
          maxWidth: "600px",
          width: "100%",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "20px",
            fontSize: "24px",
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "#888",
          }}
        >
          ×
        </button>

        {/* 리뷰 본문 */}
        <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>
          {nickname || "익명"}님의 리뷰
        </h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}>
          ⭐ {rating} &nbsp;|&nbsp; {date}
        </p>
        <p style={{ fontSize: "16px", color: "#333", marginTop: "16px", lineHeight: 1.6 }}>
          {text || "내용 없음"}
        </p>

        {menu && (
          <p style={{ fontSize: "14px", marginTop: "12px", color: "#555" }}>
            <strong>주문 메뉴:</strong> {menu}
          </p>
        )}

        {platform && (
          <p style={{ fontSize: "14px", color: "#888" }}>
            <strong>플랫폼:</strong> {platform}
          </p>
        )}

        {image && (
          <img
            src={image}
            alt="리뷰 이미지"
            style={{
              width: "100%",
              marginTop: "20px",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        )}

        {/* 사장님 댓글 */}
        {reply && (
          <div
            style={{
              marginTop: "28px",
              background: "#f1fdf3",
              padding: "16px",
              borderRadius: "12px",
              color: "#222",
              fontSize: "15px",
              lineHeight: 1.6,
              borderLeft: "4px solid #4CAF50",
            }}
          >
            <strong>🙋 사장님 답변:</strong>
            <br />
            {reply}
          </div>
        )}
      </div>
    </div>
  );
}
