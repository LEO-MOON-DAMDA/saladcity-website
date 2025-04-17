import React from "react";
import "./ScrollingBanner.css";

export default function ScrollingBanner() {
  const slogans = [
    "I live in Saladcity.",
    "I wasn’t born in Saladcity, but I’ll die here.",
    "Born & raised. Organically grown.",
    "Where salads become legends.",
    "Everything’s fresher in Saladcity – even our crew.",
    "Howdy, y’all – Welcome to the safest city on Earth.",
    "Don’t mess with fresh.",
    "Big bowls, bigger hearts – Saladcity style.",
    "As bold as our greens."
  ];

  const fullText = slogans.join(" · ") + " · "; // 마지막에도 점 찍고 반복 자연스럽게

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
