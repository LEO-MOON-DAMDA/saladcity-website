import React from "react";
import "./MarketPhilosophy.css";

export default function MarketPhilosophy() {
  return (
    <section className="market-philosophy">
      <div className="philosophy-inner">
        <div className="philosophy-text">
          <h2>우리는 왜 굿즈를 만들까요?</h2>
          <p>
            SALCY는 음식 브랜드 그 이상을 꿈꿉니다.  
            우리의 정체성은 ‘한 끼’가 아니라 ‘하루 전체’를 감싸는 감각에서 시작됩니다.
            <br /><br />
            농장에서 시작된 이야기,  
            매장에서의 에너지,  
            그리고 우리의 철학이 담긴 도구들.
            <br /><br />
            우리는 이 모든 것을 굿즈라는 언어로 표현합니다.
            그리고 그건 단순한 판매가 아닌,  
            당신과 우리가 공유하는 ‘감성’입니다.
          </p>
        </div>
        <div className="philosophy-image">
          <img src="/images/market/philosophy.jpg" alt="Philosophy Visual" />
        </div>
      </div>
    </section>
  );
}
