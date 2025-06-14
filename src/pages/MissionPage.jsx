import React from "react";
import "./MissionPage.css";

export default function MissionPage() {
  return (
    <div className="mission-page">
      <section
        className="mission-hero"
        style={{
          backgroundImage: 'url("https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/1salcymission04.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center 30%"
        }}
      >
        <div className="mission-overlay" />
        <div className="mission-hero-text">
          <h1>우리는 한 끼를 심습니다</h1>
          <p>We don’t just serve salad. We cultivate a philosophy of eating.</p>
        </div>
      </section>

      <section className="mission-zigzag-section">
        <div className="mission-zigzag-item">
          <div className="mission-zigzag-image">
            <img
              src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/1salcymission19.webp"
              alt="정직한 재료"
            />
          </div>
          <div className="mission-zigzag-text">
            <h3>정직한 재료</h3>
            <p>
              농장의 뿌리부터 당신의 접시까지.
              <span className="en">Every bowl we serve begins with a real story.</span>
            </p>
          </div>
        </div>

        <div className="mission-zigzag-item">
          <div className="mission-zigzag-image">
            <img
              src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/1salcymission20.webp"
              alt="지속가능한 선택"
            />
          </div>
          <div className="mission-zigzag-text">
            <h3>지속가능한 선택</h3>
            <p>
              우리의 샐러드는 환경을 생각합니다.
              <span className="en">Sustainability is not a trend, it’s our principle.</span>
            </p>
          </div>
        </div>

        <div className="mission-zigzag-item">
          <div className="mission-zigzag-image">
            <img
              src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/1salcymission17.webp"
              alt="건강한 연결"
            />
          </div>
          <div className="mission-zigzag-text">
            <h3>건강한 연결</h3>
            <p>
              음식은 사람을 잇습니다.
              <span className="en">From soil to soul — food brings us together.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="mission-cta">
        <h2>우리는 샐러드를 팔지 않습니다</h2>
        <p>We don't sell salads, we serve values.</p>
        <button className="mission-button" onClick={() => window.location.href = "/menu"}>
          메뉴 보기 →
        </button>
      </section>
    </div>
  );
}
