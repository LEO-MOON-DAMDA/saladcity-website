import React from "react";
import "./ScrollingBanner.css";

export default function ScrollingBanner() {
  const slogans = [
    "Howdy, y’all  -  Welcome to the SAFEST CITY on EARTH",
    "I wasn’t born in SaladCity, BUT I’ll DIE HERE",
    "BORN & RAISED. ORGANICALLY GROWN",
    "Where SALADS become LEGENDS",
    "Everything’s fresher IN SALADCITY – EVEN OUR CREW!",
    "Where do you live, WE live IN SALADCITY!",
    "Don’t mess with FRESH",
    "Big Bowls Bigger Hearts, SALADCITY STYLE",
    "As Bold as Our GREENS"
  ];

  // 슬로건을 하나의 문자열로 연결 + 점과 간격 포함
  const fullText = slogans.join("   ·   ");
  const repeated = Array(30).fill(fullText).join("      "); // 문장 덩어리 간 간격

  return (
    <div className="scrolling-banner-wrapper">
      <div className="scrolling-banner-line" />
      <div className="scrolling-banner-track">
        <p className="scrolling-text">{repeated}</p>
      </div>
      <div className="scrolling-banner-line" />
    </div>
  );
}
