// src/pages/OutpostPayment.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import "./OutpostPayment.css";

export default function OutpostPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state;

  const [couponCode, setCouponCode] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [giftSelected, setGiftSelected] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  if (!form) {
    navigate("/outpost");
    return null;
  }

  const handleSelectBenefit = () => {
    setShowOptions(true);
  };

  const handleGetCoupon = async () => {
    const { data, error } = await supabaseOutpost
      .from("outpost_coupons")
      .select("*")
      .eq("is_active", true);

    if (error || !data.length) {
      alert("발급 가능한 쿠폰이 없습니다.");
      return;
    }

    const randomCoupon = data[Math.floor(Math.random() * data.length)];
    setCouponCode(randomCoupon.code);
    setDiscountAmount(randomCoupon.discount);
    setShowOptions(false);
    alert(`🎉 축하합니다! 쿠폰 ${randomCoupon.code} 발급!\n할인 금액: ${randomCoupon.discount.toLocaleString()}원`);
  };

  const handleSelectGift = () => {
    setGiftSelected(true);
    setShowOptions(false);
    alert("🎁 랜덤박스가 결제 완료 후 지급됩니다!");
  };

  const handleCompletePayment = () => {
    navigate("/outpost/complete", { state: { giftSelected } });
  };

  const discountedPrice = 120000 - discountAmount;

  return (
    <div className="outpost-payment-container">
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px", color: "#3C8050", textAlign: "center" }}>
        결제를 진행해주세요
      </h1>

      <div className="outpost-payment-box">
        <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
          🥗 샐러드시티 OUTPOST 1인 정기배송
        </p>
        <p><strong>📍 배송지:</strong> {form.address}</p>
        <p><strong>📅 기간:</strong> {form.startDate} ~ {form.endDate}</p>
        <p><strong>💳 가격:</strong> {discountedPrice.toLocaleString()}원 {discountAmount > 0 && <span style={{ color: "#FF5722" }}>(할인 적용됨)</span>}</p>
        <p style={{ fontSize: "14px", color: "#777" }}>
          ※ 결제 후 배송 시작 2일 전까지 취소 가능합니다
        </p>
      </div>

      <button onClick={handleSelectBenefit} style={{
        backgroundColor: "#FFA500",
        color: "#fff",
        padding: "14px 28px",
        borderRadius: "12px",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none",
        marginBottom: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        🎁 혜택 선택하기
      </button>

      {showOptions && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
          <button onClick={handleGetCoupon} style={{
            backgroundColor: "#3C8050",
            color: "#fff",
            padding: "14px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none"
          }}>
            💸 할인쿠폰 받기
          </button>
          <button onClick={handleSelectGift} style={{
            backgroundColor: "#A3C09D",
            color: "#fff",
            padding: "14px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none"
          }}>
            🎁 랜덤박스 받기
          </button>
        </div>
      )}

      <button onClick={handleCompletePayment} className="outpost-payment-button">
        💳 결제 완료하고 시작하기
      </button>

      {giftSelected && (
        <p style={{ marginTop: "20px", fontSize: "16px", color: "#FF5722", fontWeight: "bold" }}>
          🎁 결제 완료 후 랜덤박스가 지급됩니다!
        </p>
      )}
    </div>
  );
}
