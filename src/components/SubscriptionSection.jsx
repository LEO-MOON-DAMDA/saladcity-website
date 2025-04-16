import React from "react";
import "./SubscriptionSection.css";

export default function SubscriptionSection() {
  return (
    <section className="subscription-section">
      <h2>정기식 구독으로 더 간편하게</h2>
      <p className="sub-text">
        매일 신선하게 준비된 샐러드를 원하는 주기에 맞춰 배송받으세요.
      </p>
      <button className="subscribe-button">정기식 시작하기</button>
    </section>
  );
}

