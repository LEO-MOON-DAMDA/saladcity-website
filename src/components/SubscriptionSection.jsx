import React from "react";
import BrandButton from "./BrandButton";
import "./SubscriptionSection.css";

export default function SubscriptionSection() {
  return (
    <section className="subscription-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
      {/* 좌측 이미지 영역 (예정) */}
      <div style={{ flex: 1 }}>
        {/* <img src="/images/subscription-image.jpg" alt="정기식 이미지" style={{ width: '100%', borderRadius: '16px' }} /> */}
      </div>

      {/* 우측 텍스트/버튼 영역 */}
      <div style={{ flex: 1, textAlign: 'right' }}>
        <p className="sub-text" style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '24px' }}>
          매일 신선하게 준비된 샐러드를<br />
          원하는 주기에 맞춰 배송받으세요.
          <br /><br />
          원하는 요일, 원하는 시간, 원하는 스타일<br />
          당신만을 위한 샐러드가 문 앞에 도착합니다.
        </p>
        <BrandButton onClick={() => alert("정기식 시작! 🚀")}>
          정기식 시작하기
        </BrandButton>
      </div>
    </section>
  );
}
