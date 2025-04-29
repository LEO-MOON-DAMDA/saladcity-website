import React from "react";
import { Link } from "react-router-dom";
import "./MarketVIPNotice.css";

export default function MarketVIPNotice() {
  return (
    <section className="vip-notice">
      <div className="vip-background" />
      <div className="vip-content">
        <h2>VIP ONLY</h2>
        <p>
          샐러드시티 정기 구독자와 SALCY CREW만을 위한
          <br />
          리미티드 에디션 굿즈입니다.
        </p>
        <Link to="/outpost/start" className="vip-button">
          아웃포스트 신청하러 가기 →
        </Link>
      </div>
    </section>
  );
}
