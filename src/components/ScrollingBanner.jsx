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

  const fullText = slogans.join("      ·      ") + "      ·      "; // 마지막에도 점 찍고 반복 자연스럽게

  return (
    <div className="scrolling-banner-wrapper">
      <div className="scrolling-banner-line" />
      <div className="scrolling-banner-track">
        <p className="scrolling-text">{fullText.repeat(10)}</p>
      </div>
      <div className="scrolling-banner-line" />
    </div>
  );
}
