import React from "react";
import "./ReviewScrollingBanner.css";

export default function ReviewScrollingBanner() {
  const slogans = [
    "오늘도 샐러드시티와 건강한 하루 시작 🌱",
    "리뷰는 사랑입니다 💚 여러분의 응원에 힘나요",
    "매일 정성스럽게 준비하는 채소와 드레싱 🥗",
    "고객님의 한마디가 저희에겐 큰 힘이 됩니다 🙏",
    "샐러드시티는 샐러드를 넘어 라이프스타일이에요 ✨",
    "늘 신선하고, 늘 진심으로 🍃",
    "샐러드 한 그릇에 담긴 고마운 마음 💌"
  ];

  const fullText = slogans.join("   ·   ");
  const repeated = Array(20).fill(fullText).join("      ");

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
