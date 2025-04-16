import React from "react";
import "../styles/MissionPage.css";

export default function MissionPage() {
  return (
    <div className="mission-page">
      {/* Hero Section */}
      <section className="mission-hero" style={{ backgroundImage: 'url("/images/1salcymission04.jpg")' }}>
        <div className="mission-overlay" />
        <div className="mission-hero-text">
          <h1>우리는 한 끼를 심습니다</h1>
          <p>We don’t just serve salad. We cultivate a philosophy of eating.</p>
        </div>
      </section>

      {/* Value Section */}
      <section className="mission-values">
        <div className="value-card">
          <img src="/images/1salcymission17.jpg" alt="정직한 재료" />
          <h3>정직한 재료<br /><span>Honest Ingredients</span></h3>
          <p>
            농장의 뿌리부터 당신의 접시까지.
            Every bowl we serve begins with a real story.
          </p>
        </div>
        <div className="value-card">
          <img src="/images/1salcymission19.jpg" alt="지속가능한 선택" />
          <h3>지속가능한 선택<br /><span>Sustainable Living</span></h3>
          <p>
            우리의 샐러드는 환경을 생각합니다.
            Sustainability is not a trend, it’s our principle.
          </p>
        </div>
        <div className="value-card">
          <img src="/images/1salcymission17.jpg" alt="건강한 연결" />
          <h3>건강한 연결<br /><span>Meaningful Connection</span></h3>
          <p>
            음식은 사람을 잇습니다.
            From soil to soul — food brings us together.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mission-cta">
        <h2>우리는 한 끼를 팔지 않습니다</h2>
        <p>We serve values, not just food.</p>
        <button onClick={() => window.location.href='/menu'}>메뉴 보기</button>
      </section>
    </div>
  );
}
