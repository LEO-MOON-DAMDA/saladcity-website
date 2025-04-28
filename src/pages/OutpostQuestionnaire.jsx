// src/pages/OutpostQuestionnaire.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./OutpostQuestionnaire.css"; // 기존 CSS 활용

export default function OutpostQuestionnaire() {
  const navigate = useNavigate();

  const handleSelect = (peopleType) => {
    if (peopleType === "single") {
      navigate("/outpost/single-flow");
    } else if (peopleType === "group") {
      navigate("/outpost/group-flow");
    }
  };

  return (
    <div className="outpost-questionnaire-container" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to bottom, #ffffff, #f9fff9)",
      fontFamily: "Pretendard, sans-serif",
      padding: "20px",
    }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px", color: "#3C8050", textAlign: "center" }}>
        당신의 샐러드시티 OUTPOST를<br />어떻게 시작하고 싶으신가요?
      </h1>

      <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px", textAlign: "center" }}>
        혼자만의 건강한 시작? <br /> 함께하는 특별한 경험?
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "400px" }}>
        <button
          onClick={() => handleSelect("single")}
          style={{
            padding: "16px",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "#3C8050",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          🌿 나만의 OUTPOST 시작하기 (1인)
        </button>

        <button
          onClick={() => handleSelect("group")}
          style={{
            padding: "16px",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "#A3C09D",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          🏢 함께하는 OUTPOST 만들기 (15인 이상 단체)
        </button>
      </div>
    </div>
  );
}
