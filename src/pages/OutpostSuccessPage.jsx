// src/pages/OutpostSuccessPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function OutpostSuccessPage() {
  return (
    <div style={{ padding: "80px 20px", textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
        신청이 완료되었습니다!
      </h1>
      <p style={{ fontSize: "20px", color: "#555", marginBottom: "40px" }}>
        샐러드시티 팀이 곧 연락드리겠습니다.<br />
        함께할 준비를 시작해요!
      </p>
      <Link to="/" style={{ display: "inline-block", padding: "14px 28px", backgroundColor: "#3C8050", color: "#fff", fontSize: "18px", fontWeight: "bold", borderRadius: "8px", textDecoration: "none" }}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
