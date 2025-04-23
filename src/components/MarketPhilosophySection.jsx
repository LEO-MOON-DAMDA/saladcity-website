// ✅ 파일 경로: /src/components/MarketPhilosophySection.jsx

import React from "react";
import "../styles/MarketPhilosophySection.css";

export default function MarketPhilosophySection() {
  return (
    <section className="philosophy-section">
      <div className="philosophy-inner">
        <h2 className="philosophy-title">우리는 왜 굿즈를 만들까요?</h2>
        <p className="philosophy-text">
          우리는 단지 상품을 판매하는 것이 아니라,
          <br />삶의 작은 순간을 특별하게 만드는 감정을 전달합니다.
        </p>
        <p className="philosophy-quote">
          “굿즈는 우리의 철학과 감각을 담는 그릇입니다.”
        </p>
      </div>
    </section>
  );
}
