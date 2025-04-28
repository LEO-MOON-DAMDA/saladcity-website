import React from "react";
import { useNavigate } from "react-router-dom";
import "./OutpostStart.css";

export default function OutpostStart() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate("/outpost/questionnaire"); // ✅ OUTPOST 신청 플로우로 이동
  };

  const handleJoin = () => {
    navigate("/outpost/join"); // ✅ 샐시크루 가입 플로우로 이동
  };

  return (
    <div className="outpost-start-container">
      <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px", color: "#3C8050", textAlign: "center" }}>
        프리미엄 샐러드 커뮤니티에<br />참여할 준비가 되셨나요?
      </h1>

      <p style={{ fontSize: "18px", color: "#555", marginBottom: "40px", textAlign: "center", lineHeight: "1.6" }}>
        매일 아침, 신선함을 담아<br />
        당신만의 OUTPOST로 전해드립니다.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", maxWidth: "320px" }}>
        <button
          onClick={handleApply}
          className="outpost-start-button-apply"
        >
          🚀 샐러드시티 OUTPOST 신청하기
        </button>

        <button
          onClick={handleJoin}
          className="outpost-start-button-join"
        >
          🌿 샐러드시티 크루 가입하기
        </button>
      </div>
    </div>
  );
}
