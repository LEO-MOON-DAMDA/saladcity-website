import React from "react";
import TossPaymentButton from "../components/TossPaymentButton";
import "../styles/Checkout.css";

export default function Checkout() {
  return (
    <div className="checkout-page">
      <h1 className="checkout-title">SALADCITY 굿즈 결제</h1>
      <p className="checkout-desc">
        아래 버튼을 클릭하면 Toss 결제창이 열립니다.
        <br />
        현재는 테스트 결제 환경입니다.
      </p>
      <div className="checkout-box">
        <TossPaymentButton
          amount={15000}
          orderName="SALCY 시그니처 캡"
          customerName="샐러드시티 고객"
        />
      </div>
    </div>
  );
}
