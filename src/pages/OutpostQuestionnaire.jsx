import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/cta-subscribe-button.css";
import "../components/BrandButton.css";
import "./OutpostQuestionnaire.css";

export default function OutpostQuestionnaire() {
  const navigate = useNavigate();

  const handleSelect = (peopleType) => {
    if (peopleType === "group") {
      navigate("/outpost/group-flow");
    } else if (peopleType === "single") {
      navigate("/outpost/single");
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

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", maxWidth: "400px" }}>
        
        {/* 🏢 단체 버튼 (형광연두) */}
        <button
          onClick={() => handleSelect("group")}
          className="cta-subscribe-button"
          style={{ width: "100%", fontSize: "17px", whiteSpace: "nowrap" }}
        >
          🏢 함께하는 OUTPOST 만들기 (15인 이상)
        </button>

        {/* 🌿 개인 버튼 (표준 초록) */}
        <button
          onClick={() => handleSelect("single")}
          className="brand-button"
          style={{ width: "100%", fontSize: "17px", whiteSpace: "nowrap" }}
        >
          🌿 나만의 OUTPOST 시작하기 (1인)
        </button>

      </div>
    </div>
  );
}
