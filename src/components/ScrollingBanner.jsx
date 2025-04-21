import React from "react";
import "./ScrollingBanner.css";

const messages = [
  "오늘도 샐러드시티와 건강한 한 끼 🌿",
  "SALCY 정기배송으로 매일 신선하게 🥗",
  "후기 감사드려요! 💚 고객님의 리뷰가 큰 힘이 됩니다",
  "매장에서 직접 만드는 수제 드레싱도 맛보세요 🥣",
];

export default function ScrollingBanner() {
  return (
    <div className="scrolling-banner">
      <div className="scrolling-text">
        {messages.map((msg, idx) => (
          <span key={idx} className="banner-message">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
