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
 <div
  style={{
    display: "flex",
    width: "100vw",
    overflow: "hidden",
    top: 0,
    left: 0,
    zIndex: -2,
  }}
>
      {/* ✅ 두 이미지 배경 - 좌우 분할 */}
      <div
        style={{
                flex: 1,
      	    position: "absolute",
        	    top: 0,
        	    left: 0,
        	    width: "50%",
   	    height: "80%",
          backgroundImage:
            "url('https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/outpost/outpost003.webp')",
		backgroundSize: "cover",         // 📌 꽉 채움 (잘릴 수 있음)
		backgroundPosition: "center",    // 📌 중앙 정렬
		backgroundRepeat: "no-repeat",
		width: "50%",
		minHeight: "100vh",              // 📌 최소 높이
		maxHeight: "140vh",              // 📌 너무 커지는 거 방지
		padding: "20px",
 	       }}
  	    />
      <div
        style={{
      flex: 1,
          position: "absolute",
          top: 0,
          left: "50%",
          width: "50%",
          height: "80%",
          backgroundImage:
            "url('https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/outpost/outpost004.webp')",
      		backgroundSize: "cover",         // 📌 꽉 채움 (잘릴 수 있음)
		  backgroundPosition: "30% center", // ✅ 여기만 변경
		backgroundRepeat: "no-repeat",
		width: "50%",
		minHeight: "100vh",              // 📌 최소 높이
		maxHeight: "140vh",              // 📌 너무 커지는 거 방지
		padding: "20px",
        }}
      />

      {/* ✅ 선택창 콘텐츠 */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          minHeight: "50vh",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          paddingBottom: "40px", // ✅ 밑 공간 더 추가
          backgroundColor: "rgba(255,255,255,0.6)",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#3C8050", marginBottom: "20px" }}>
          당신의 샐러드시티 OUTPOST를<br />어떻게 시작하고 싶으신가요?
        </h1>

        <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
          혼자만의 건강한 시작? <br /> 함께하는 특별한 경험?
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "400px", width: "100%" }}>
          <button
            onClick={() => handleSelect("group")}
            className="cta-subscribe-button"
            style={{ width: "100%", fontSize: "17px", whiteSpace: "nowrap" }}
          >
            🏢 함께하는 OUTPOST 만들기 (15인 이상)
          </button>
          <button
            onClick={() => handleSelect("single")}
            className="brand-button"
            style={{ width: "100%", fontSize: "17px", whiteSpace: "nowrap" }}
          >
            🌿 나만의 OUTPOST 시작하기 (1인)
          </button>
        </div>
      </div>
    </div>
  );
}
