import React from "react";
import "./MissionPage.css";

export default function MissionPage() {
  return (
    <div className="mission-page">
      <section className="mission-hero">
        <div className="mission-overlay" />
        <div className="mission-hero-text">
          <h1>우리는 왜 샐러드를 만들까요?</h1>
          <p>당신의 하루를 더 가볍고 건강하게 만들기 위해</p>
        </div>
      </section>

      <section className="mission-values">
        <div className="value-card">
          <img src="/images/mission01.png" alt="신선함" />
          <h3>매일 아침 손질되는 신선함</h3>
          <p>매장에서 매일 아침 준비되는 채소와 재료로 진짜 건강한 한 끼를 만듭니다.</p>
        </div>
        <div className="value-card">
          <img src="/images/mission02.png" alt="지속 가능성" />
          <h3>지속 가능한 식문화</h3>
          <p>지역 농가와의 협업, 친환경 포장재를 사용해 환경과 공존합니다.</p>
        </div>
        <div className="value-card">
          <img src="/images/mission03.png" alt="정직한 조리" />
          <h3>정직한 조리와 레시피</h3>
          <p>첨가물 없이 건강한 조리법으로 고객에게 신뢰를 드립니다.</p>
        </div>
      </section>

      <section className="mission-cta">
        <h2>샐러드시티와 함께 건강한 한 끼를 시작해보세요</h2>
        <button>지금 주문하러 가기</button>
      </section>
    </div>
  );
}

