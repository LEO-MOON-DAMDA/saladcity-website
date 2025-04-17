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

  const fullText = slogans.join("  ·  "); // 점 3칸 간격만 유지
  const repeated = Array(20).fill(fullText).join("     "); // 반복 시에도 간격 넣기

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
