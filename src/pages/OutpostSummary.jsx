import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OutpostSummary.css";

export default function OutpostSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state;

  const [isProcessing, setIsProcessing] = useState(false);

  if (!form) {
    navigate("/outpost");
    return null;
  }

  const handleSampleRequest = () => {
    setIsProcessing(true);
    console.log("샘플 신청 데이터:", form);
    setTimeout(() => {
      alert("🎁 샘플 신청이 완료되었습니다. 샐러드시티 크루가 곧 연락드릴게요!");
      navigate("/");
    }, 1500); // 1.5초 후 자연스럽게 이동
  };

  return (
    <div className="outpost-summary-container">
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#3C8050", textAlign: "center" }}>
        단체 OUTPOST 신청이 완료되었습니다!
      </h1>
      <p style={{ fontSize: "18px", color: "#555", marginBottom: "40px", textAlign: "center", lineHeight: "1.6" }}>
        신청해주셔서 감사합니다. <br />
        샐러드시티 크루가 빠르게 신청 내용을 확인하고 <br />
        담당자가 연락드릴 예정입니다!
      </p>

      <div className="outpost-summary-box">
        <p><strong>📍 배송지:</strong> {form.address}</p>
        <p><strong>🍽️ 식사 시간:</strong> {form.time}</p>
        <p><strong>📅 시작일:</strong> {form.startDate}</p>
        <p><strong>📅 종료일:</strong> {form.endDate}</p>
        {form.peopleCount && <p><strong>👥 인원수:</strong> {form.peopleCount}명</p>}
        <p><strong>🥗 메뉴 타입:</strong> {form.menuType}</p>
        {form.request && <p><strong>📝 요청사항:</strong> {form.request}</p>}
      </div>

      <div className="outpost-summary-buttons">
        <button
          onClick={handleSampleRequest}
          disabled={isProcessing}
          style={{
            padding: "16px",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: isProcessing ? "#ccc" : "#A3C09D",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: isProcessing ? "not-allowed" : "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            transition: "background-color 0.3s, transform 0.3s",
            transform: isProcessing ? "scale(0.98)" : "none",
          }}
        >
          {isProcessing ? "고객님, 잠시만 기다려주세요..." : "🎁 샘플 먼저 체험해보기"}
        </button>
      </div>
    </div>
  );
}
