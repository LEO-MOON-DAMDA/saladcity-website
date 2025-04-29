// SubscriptionSection.jsx
import React from "react";
import SectionTitle from "./SectionTitle";
import CtaSubscribeButton from "./CtaSubscribeButton";
import "./SubscriptionSection.css";
import "./cta-subscribe-button.css";

export default function SubscriptionSection() {
  return (
    <section className="subscription-section">
      <div className="subscription-inner">
      
        {/* 이미지 */}
        <div className="subscription-image">
          <img
            src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/cater01.webp"
            alt="정기식 이미지"
            className="subscription-thumbnail"
          />
        </div>

        {/* 텍스트 */}
        <div className="subscription-text">
          <SectionTitle style={{ textAlign: "right" }}>
            정기식 구독으로<br />더 간편하게
          </SectionTitle>

          <p className="subscription-description">
            매일 신선하게 준비된 샐러드를<br />
            원하는 주기에 맞춰 배송받으세요.<br /><br />
            원하는 요일, 원하는 시간, 원하는 스타일<br />
            당신만을 위한 샐러드가 문 앞에 도착합니다.<br /><br />
            <span className="subscription-sub">
              Delivering wellness, one bowl at a time.
            </span>
          </p>
        </div>

        {/* CTA 버튼 */}
        <div className="subscription-button-area" style={{ marginTop: "24px", textAlign: "right", width: "100%" }}>
          <CtaSubscribeButton onClick={() => window.location.href = "/outpost/start"}>
            정기식 시작하기 →
          </CtaSubscribeButton>
        </div>

      </div>
    </section>
  );
}
