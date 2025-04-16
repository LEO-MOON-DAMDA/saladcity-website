import React from "react";
import "./SubscribePage.css";

export default function SubscribePage() {
  return (
    <div className="subscribe-page">
      {/* Hero Section */}
      <section className="subscribe-hero">
        <h1>매일 신선한 샐러드를 정기 배송받으세요</h1>
        <p>개인과 기업 모두를 위한 맞춤형 정기식 구독</p>
      </section>

      {/* Benefit Section */}
      <section className="subscribe-benefits">
        <h2>왜 샐러드시티 정기식을 선택해야 할까요?</h2>
        <ul>
          <li>✅ 매일 아침 준비되는 프리미엄 샐러드</li>
          <li>✅ 고객별 맞춤 메뉴 구성</li>
          <li>✅ OUTPOST를 통한 사무실 단체 배송</li>
        </ul>
      </section>

      {/* Subscription Type Section */}
      <section className="subscribe-types">
        <div className="sub-card">
          <h3>개인 고객용 구독</h3>
          <p>내 집 앞으로 매일 다른 샐러드가 배송됩니다.</p>
        </div>
        <div className="sub-card">
          <h3>OUTPOST 구독</h3>
          <p>사무실로 단체 배송, 매장 픽업도 OK!</p>
        </div>
      </section>

      {/* 구독 주기 선택 샘플 */}
      <section className="subscribe-schedule">
        <h2>구독 주기를 선택하세요</h2>
        <div className="schedule-buttons">
          <button>매일</button>
          <button>주 3회</button>
          <button>주 1회</button>
        </div>
      </section>

      {/* CTA */}
      <section className="subscribe-cta">
        <h2>당신만의 샐러드 루틴을 시작해보세요</h2>
        <button>구독 신청하기</button>
      </section>
    </div>
  );
}
