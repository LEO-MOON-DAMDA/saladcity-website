import React from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessPage.css";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-box">
        <h1>감사합니다! 🎉</h1>
        <p>정상적으로 결제가 완료되었습니다.</p>
        <p>곧 당신의 일상에 샐러드시티의 감성이 도착할 거예요 🥗</p>

        <button className="home-button" onClick={() => navigate("/")}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
