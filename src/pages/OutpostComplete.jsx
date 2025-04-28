// src/pages/OutpostComplete.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function OutpostComplete() {
  const location = useLocation();
  const navigate = useNavigate();
  const giftSelected = location.state?.giftSelected || false;

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #ffffff, #f9fff9)",
        fontFamily: "Pretendard, sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px", color: "#3C8050", textAlign: "center" }}>
        🎉 신청이 완료되었습니다!
      </h1>

      <p style={{ fontSize: "20px", color: "#555", marginBottom: "40px", textAlign: "center", lineHeight: "1.6" }}>
        샐러드시티 OUTPOST 팀이<br />
        약속된 날짜에 정성껏 배송을 시작합니다.
      </p>

      {giftSelected && (
        <p style={{ marginBottom: "40px", fontSize: "20px", fontWeight: "bold", color: "#FF5722", textAlign: "center" }}>
          🎁 축하합니다! 랜덤박스 추가 증정 대상자입니다!
        </p>
      )}

      <button
        onClick={handleGoHome}
        style={{
          padding: "16px 36px",
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
        🏡 홈으로 돌아가기
      </button>
    </div>
  );
}
