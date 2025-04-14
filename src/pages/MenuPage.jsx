// src/pages/MenuPage.jsx
import React from "react";

export default function MenuPage() {
  return (
    <div style={{ padding: "60px 24px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "28px", color: "#275f3a", textAlign: "center", marginBottom: "40px" }}>
        샐러드시티 전체 메뉴
      </h1>
      <p style={{ textAlign: "center", color: "#777" }}>
        카테고리별로 구성된 프리미엄 샐러드시티 메뉴를 확인하세요.
      </p>
      {/* 이후 여기에 각 카테고리별 메뉴 리스트 삽입될 예정 */}
    </div>
  );
}

