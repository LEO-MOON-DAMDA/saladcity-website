import React from "react";
import BrandButton from "./BrandButton";
import "./SubscriptionSection.css";

export default function SubscriptionSection() {
  return (
    <section className="subscription-section">
      <p className="sub-text">
        매일 신선하게 준비된 샐러드를 원하는 주기에 맞춰 배송받으세요.
      </p>
      <div style={{ marginTop: '24px' }}>
        <BrandButton onClick={() => alert("정기식 시작! 🚀")}>정기식 시작하기</BrandButton>
      </div>
    </section>
  );
}
