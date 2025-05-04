import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/cta-subscribe-button.css";
import "../components/BrandButton.css";
import "./OutpostQuestionnaire_QA.css";

import OutpostCoverageMap from "../components/OutpostCoverageMap";
import OutpostLeadForm from "../components/OutpostLeadForm";

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
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* 상단 감성영역 */}
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundImage:
              "url('https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/outpost/outpost003.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        />
        <div
          style={{
            flex: 1,
            backgroundImage:
              "url('https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/outpost/outpost004.webp')",
            backgroundSize: "cover",
            backgroundPosition: "30% center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            backgroundColor: "rgba(255,255,255,0.85)",
            padding: "40px 30px",
            borderRadius: "20px",
            boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#3C8050",
              marginBottom: "20px",
            }}
          >
            당신의 샐러드시티 OUTPOST를<br />
            어떻게 시작하고 싶으신가요?
          </h1>

          <p style={{ fontSize: "18px", color: "#555", marginBottom: "36px" }}>
            혼자만의 건강한 시작? <br />
            함께하는 특별한 경험?
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              onClick={() => handleSelect("group")}
              className="cta-subscribe-button"
              style={{ fontSize: "17px" }}
            >
              🏢 함께하는 OUTPOST 만들기 (15인 이상)
            </button>
            <button
              onClick={() => handleSelect("single")}
              className="brand-button"
              style={{ fontSize: "17px" }}
            >
              🌿 나만의 OUTPOST 시작하기 (1인)
            </button>
          </div>

          {/* 스크롤 유도 표시 */}
          <div style={{ marginTop: "40px" }}>
            <span style={{ fontSize: "14px", color: "#888" }}>
              ↓ 아래에서 우리 지역 확인하기
            </span>
          </div>
        </div>
      </div>

      {/* 하단 리드 수집 감성 연결 */}
      <div
        style={{
          backgroundColor: "#f4f9f4",
          padding: "80px 20px 120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            color: "#3C8050",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          우리 공간, 샐시가 방문 가능한가요?
        </h2>

        <div style={{ width: "100%", maxWidth: "960px", marginBottom: "40px" }}>
          <OutpostCoverageMap />
        </div>

        <div style={{ width: "100%", maxWidth: "480px" }}>
          <OutpostLeadForm />
        </div>
      </div>
    </div>
  );
}
