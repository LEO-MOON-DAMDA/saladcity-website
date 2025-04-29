import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/BrandButton.css";
import "./OutpostSummary.css";

export default function OutpostSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state;

  if (!form) {
    navigate("/outpost");
    return null;
  }

  return (
    <div className="outpost-summary-container">
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#3C8050", textAlign: "center" }}>
        단체 OUTPOST 신청이 완료되었습니다!
      </h1>

      <p style={{ fontSize: "18px", color: "#555", marginBottom: "40px", textAlign: "center", lineHeight: "1.6" }}>
        신청해주셔서 감사합니다. <br />
        샐러드시티 크루가 신청 내용을 검토한 후 <br />
        빠르게 준비하여 연락드리겠습니다!
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

      {/* ✅ 더마켓으로 이동하는 부드러운 완료 버튼 */}
      <div style={{ marginTop: "0px", textAlign: "center" }}>
        <button
          onClick={() => navigate("/market")}
          className="brand-button"
          style={{
            width: "100%",
            maxWidth: "320px",
            fontSize: "17px",
            whiteSpace: "nowrap",
            marginTop: "0px",
          }}
        >
          🎁 샐시마켓 둘러보기
        </button>
      </div>
    </div>
  );
}
