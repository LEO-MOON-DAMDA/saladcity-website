import React from "react";
import "./CateringPage.css";

export default function CateringPage() {
  return (
    <div className="catering-page">
      {/* Hero Section */}
      <section className="catering-hero">
        <div className="hero-content">
          <h1>샐러드시티 단체식 케이터링</h1>
          <p>기업, 행사, 모임을 위한 건강하고 전문적인 식사 솔루션</p>
        </div>
      </section>

      {/* 특징 Section */}
      <section className="catering-features">
        <div className="feature">
          <h3>신선함 그대로</h3>
          <p>매일 아침 준비된 재료로 대량 조리에도 품질 그대로 유지</p>
        </div>
        <div className="feature">
          <h3>맞춤형 구성</h3>
          <p>기업 행사, 채식/헬스/알러지 등 다양한 니즈에 대응</p>
        </div>
        <div className="feature">
          <h3>정확한 배송</h3>
          <p>서울 전지역 및 수도권 당일 배송 지원</p>
        </div>
      </section>

      {/* 메뉴 예시 Section */}
      <section className="catering-menus">
        <h2>케이터링 예시 메뉴</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <img src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/publichttps://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/menu01.webp" alt="샐러드 플래터" />
            <h4>샐러드 플래터</h4>
            <p>10인 이상 단체용 / 프리미엄 토핑 포함</p>
          </div>
          <div className="menu-card">
            <img src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/publichttps://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/menu02.webp" alt="베이글 박스" />
            <h4>베이글 박스</h4>
            <p>베이글 + 샐러드 + 음료 조합</p>
          </div>
          <div className="menu-card">
            <img src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/publichttps://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/menu03.webp" alt="샐시 파스타 플레이트" />
            <h4>파스타 플레이트</h4>
            <p>다양한 파스타 옵션 제공 / 웜푸드 선택 가능</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="catering-cta">
        <h2>지금 케이터링 문의하기</h2>
        <p>빠른 견적 및 상담은 카카오톡 또는 이메일로 가능합니다</p>
        <div className="cta-buttons">
          <a href="mailto:contact@saladcity.co.kr">이메일 문의</a>
          <a href="https://pf.kakao.com/_saladcity" target="_blank" rel="noreferrer">카카오톡 상담</a>
        </div>
      </section>
    </div>
  );
}
