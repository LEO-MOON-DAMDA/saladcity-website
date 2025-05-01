import React from "react";
import { useNavigate } from "react-router-dom";
import "./OutpostStart.css";
import "../components/cta-subscribe-button.css"; // ✅ 형광연두 버튼 스타일 불러오기
import "../components/BrandButton.css";          // ✅ 표준 버튼 스타일도 불러오기


export default function OutpostStart() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate("/outpost/questionnaire"); // ✅ OUTPOST 신청 플로우로 이동
  };

  const handleJoin = () => {
    navigate("/outpost/join"); // ✅ 샐시크루 가입 플로우로 이동
  };

  return (
<div
  style={{
                flex: 1,
      	    position: "absolute",
        	    top: 0,
        	    left: 0,
        	    width: "50%",
   	    height: "80%",
    backgroundImage: "url('https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/outpost/outpost005.webp')",
		backgroundSize: "cover",         // 📌 꽉 채움 (잘릴 수 있음)
		backgroundPosition: "center",    // 📌 중앙 정렬
		backgroundRepeat: "no-repeat",
		width: "100%",
		minHeight: "100vh",              // 📌 최소 높이
		maxHeight: "140vh",              // 📌 너무 커지는 거 방지
		padding: "20px",
  }}
>
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
          padding: "0px",
          paddingBottom: "40px", // ✅ 밑 공간 더 추가
          backgroundColor: "rgba(255,255,255,0.85)",
        }}
>
<h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#3C8050", marginBottom: "20px" }}>
        프리미엄 샐러드 커뮤니티에<br />참여할 준비가 되셨나요?
      </h1>

      <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px"  }}>
        매일 아침, 신선함을 담아<br />
        당신만의 OUTPOST로 전해드립니다.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "400px", width: "100%" }}>
        <button
  onClick={handleApply}
  className="cta-subscribe-button"
  style={{
    width: "100%",
    fontSize: "17px",     // ✅ 폰트 사이즈 16px로 줄임
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }}
>
  🚀 샐러드시티 OUTPOST 신청하기
</button>



        <button
  onClick={handleJoin}
  className="brand-button"
  style={{ width: "100%" }}
>
  🌿 샐러드시티 크루 가입하기
</button>
</div>


      

      </div>
    </div>
  );
}
