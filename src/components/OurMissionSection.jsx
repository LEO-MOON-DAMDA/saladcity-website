import React from "react";
import SectionTitle from "./SectionTitle";
import BrandButton from "./BrandButton";
import "./OurMissionSection.css";

export default function OurMissionSection() {
  return (
    <section className="our-mission-section">
      {/* 텍스트 */}
      <div className="mission-text">
        <SectionTitle style={{ textAlign: "left" }}>
          우리는 왜 샐러드를 만들까요?
        </SectionTitle>

        <p>
          매일 아침 수확한 재료로 정직한 한 끼를 준비합니다.
          <br />
          우리는 자연과 사람을 생각하며 샐러드를 만듭니다.
          <br />
          <span className="mission-sub">
            We grow more than greens — we grow goodness.
          </span>
        </p>
      </div>

      {/* 사진 */}
      <div className="mission-image">
        <img src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/1salcymission04.webp" alt="우리의 철학" />
      </div>

      {/* 버튼 (바깥으로 분리) */}
      <div className="mission-button-area" style={{ marginTop: "24px", textAlign: "left", width: "100%" }}>
        <BrandButton href="/mission">
          브랜드 철학 더 보기 →
        </BrandButton>
      </div>
    </section>
  );
}
