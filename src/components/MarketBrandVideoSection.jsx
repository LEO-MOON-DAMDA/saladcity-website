// ✅ 파일 경로: /src/components/MarketBrandVideoSection.jsx

import React from "react";
import "../styles/MarketBrandVideoSection.css";

export default function MarketBrandVideoSection() {
  return (
    <section className="brand-video-section">
      <div className="brand-video-inner">
        <h2 className="brand-video-title">SALADCITY 브랜드 이야기</h2>
        <p className="brand-video-sub">
          샐러드시티가 어떻게 시작되었고, 무엇을 지향하는지
          <br />짧은 영상으로 만나보세요.
        </p>
        <div className="brand-video-wrapper">
          <video
            src="/videos/saladcity-story.mp4"
            controls
            poster="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/market/video_poster.webp"
          />
        </div>
      </div>
    </section>
  );
}
