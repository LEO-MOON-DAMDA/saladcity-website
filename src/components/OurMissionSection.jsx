import React from "react";
import "./OurMissionSection.css";

export default function OurMissionSection() {
  return (
    <section className="our-mission-section">
      <div className="mission-text">
        <p>
          매일 아침 수확한 재료로 정직한 한 끼를 준비합니다.
          <br />
          우리는 자연과 사람을 생각하며 샐러드를 만듭니다.
          <br />
          <span className="mission-sub">We grow more than greens — we grow goodness.</span>
        </p>
        {/* ✅ 버튼 제거됨 */}
      </div>
      <div className="mission-image">
        <img src="/images/1salcymission04.jpg" alt="우리의 철학" />
      </div>
    </section>
  );
}
