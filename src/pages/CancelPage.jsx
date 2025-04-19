import React from "react";
import { useNavigate } from "react-router-dom";
import "./CancelPage.css";

export default function CancelPage() {
  const navigate = useNavigate();

  return (
    <div className="cancel-page">
      <div className="cancel-box">
        <h1>결제가 취소되었습니다 😥</h1>
        <p>혹시 마음이 바뀌셨나요?</p>
        <p>샐러드시티의 감성은 언제든지 준비되어 있어요.</p>

        <button className="retry-button" onClick={() => navigate("/the-market")}>
          마켓으로 돌아가기
        </button>
      </div>
    </div>
  );
}
