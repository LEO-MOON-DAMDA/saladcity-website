// src/components/LoadingSpinner.jsx
import React from "react";
import "./LoadingSpinner.css"; // ✅ 스타일 분리

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <img
        src="/images/logo/saladcity-logo.png" // ✅ 로딩용 로고 경로 (너가 쓰는 로고로 수정 가능)
        alt="Loading..."
        className="spinner-logo"
      />
      <p>샐러드시티가 준비 중입니다...</p>
    </div>
  );
}
