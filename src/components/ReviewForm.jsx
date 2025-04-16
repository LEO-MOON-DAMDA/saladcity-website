import React, { useState } from "react";
import "./ReviewForm.css"; // 선택: 스타일 분리 가능

export default function ReviewForm({ onSubmit }) {
  const [nickname, setNickname] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      nickname: nickname || "익명",
      rating,
      review,
      image: image ? URL.createObjectURL(image) : null,
      date: new Date().toISOString().split("T")[0]
    };

    if (onSubmit) {
      onSubmit(newReview); // 외부 처리용 콜백
    }

    // 초기화
    setNickname("");
    setRating(5);
    setReview("");
    setImage(null);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ marginBottom: "16px" }}>📝 리뷰 작성하기</h2>

      <input
        type="text"
        placeholder="닉네임 (선택)"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={inputStyle}
      />

      <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={inputStyle}>
        <option value={5}>⭐️ 5점</option>
        <option value={4}>⭐️ 4점</option>
        <option value={3}>⭐️ 3점</option>
        <option value={2}>⭐️ 2점</option>
        <option value={1}>⭐️ 1점</option>
      </select>

      <textarea
        placeholder="리뷰 내용을 입력해주세요."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
        style={{ ...inputStyle, height: "100px" }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginBottom: "12px" }}
      />

      <button type="submit" style={buttonStyle}>
        제출하기
      </button>
    </form>
  );
}

const formStyle = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 6px 24px rgba(0,0,0,0.05)",
  maxWidth: "500px",
  margin: "0 auto 60px",
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  marginBottom: "12px",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px"
};
