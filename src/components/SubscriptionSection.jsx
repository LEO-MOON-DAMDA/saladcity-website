import React from "react";
import SectionTitle from "./SectionTitle";
import BrandButton from "./BrandButton";
import "./SubscriptionSection.css";

export default function SubscriptionSection() {
  return (
    <section className="subscription-section">
      <div className="subscription-image">
        <img
          src="/images/1salcymission04.jpg"
          alt="정기식 이미지"
          style={{ width: "100%", borderRadius: "16px" }}
        />
      </div>

      <div className="subscription-text" style={{ textAlign: "right" }}>
        <SectionTitle style={{ textAlign: "right" }}>
          정기식 구독으로 더 간편하게
        </SectionTitle>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#222",
            marginBottom: "0",
          }}
        >
          매일 신선하게 준비된 샐러드를<br />
          원하는 주기에 맞춰 배송받으세요.
          <br />
          <br />
          원하는 요일, 원하는 시간, 원하는 스타일<br />
          당신만을 위한 샐러드가 문 앞에 도착합니다.
          <br />
          <br />
          <span
            className="subscription-sub"
            style={{ fontSize: "15px", color: "#666", fontStyle: "italic" }}
          >
            Delivering wellness, one bowl at a time.
          </span>
        </p>

        <div style={{ marginTop: "24px" }}>
          <BrandButton onClick={() => alert("정기식 시작! 🚀")}>
            정기식 시작하기
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
