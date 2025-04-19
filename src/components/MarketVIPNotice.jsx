import React from "react";
import "./MarketVIPNotice.css";

export default function MarketVIPNotice() {
  return (
    <section className="vip-notice">
      <div className="vip-background">
        <img
          src="/images/market/vip_bg.jpg"
          alt="SALCY VIP"
          className="vip-image"
        />
        <div className="vip-overlay" />
        <div className="vip-content">
          <h2>VIP ONLY</h2>
          <p>
            샐러드시티 정기 구독자와 SALCY CREW만을 위한  
            <br />
            리미티드 에디션 굿즈입니다.
          </p>
          <a href="/subscription" className="vip-button">
            정기구독 가입하고 굿즈 받기 →
          </a>
        </div>
      </div>
    </section>
  );
}
