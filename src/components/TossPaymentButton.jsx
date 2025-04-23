import React, { useEffect } from "react";

const TossPaymentButton = ({ amount, orderName, customerName }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.tosspayments.com/v1/payment";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!window.TossPayments) {
      alert("TossPayments SDK 로딩 실패");
      return;
    }

    const tossPayments = window.TossPayments(import.meta.env.VITE_TOSS_CLIENT_KEY);

    tossPayments.requestPayment("카드", {
      amount,
      orderId: "order_" + new Date().getTime(),
      orderName,
      customerName,
      successUrl: `${window.location.origin}/success`,
      failUrl: `${window.location.origin}/fail`,
    });
  };

  return (
    <button className="toss-button" onClick={handlePayment}>
      토스페이먼츠 결제하기
    </button>
  );
};

export default TossPaymentButton;
