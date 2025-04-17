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
    "Don’t mess with FRESH ",
    "Big Bowls Bigger Hearts, SALADCITY STYLE",
    "As Bold as Our GREENS"
  ];

  const gap = "                    ·                    "; // 점과 문장 간 간격만 넓힘
  const repeatGap = "                                        "; // 전체 반복 시 간격도 추가
  const fullText = slogans.join(gap);
  const repeated = Array(20).fill(fullText).join(repeatGap);


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
