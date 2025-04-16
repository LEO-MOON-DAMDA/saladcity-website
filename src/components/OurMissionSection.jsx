import React from "react";
import { useNavigate } from "react-router-dom";
import "./OurMissionSection.css";

export default function OurMissionSection() {
  const navigate = useNavigate();

  return (
    <section className="our-mission-section">
      <div className="mission-text">
        <h2>우리는 왜 샐러드를 만들까요?</h2>
        <p>
          샐러드시티는 매일 아침 신선한 재료로 건강한 한 끼를 준비합니다.
          자연과 사람을 생각하는 지속 가능한 방식으로 조리합니다.
        </p>
        <button onClick={() => navigate("/mission")}>브랜드 미션 더 알아보기</button>
      </div>
      <div className="mission-image">
        <img src="/images/mission-hero.jpg" alt="우리의 철학" />
      </div>
    </section>
  );
}

