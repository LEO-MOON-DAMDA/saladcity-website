import React from "react";

export default function OrderSummary({ totalCount, totalPrice, onClearCart }) {
  return (
    <div style={{ marginTop: "24px", textAlign: "right" }}>
      <p style={{ fontSize: "16px", fontWeight: "bold" }}>
        총 {totalCount}개 / 총합 {totalPrice.toLocaleString()}원
      </p>
      <button
        onClick={onClearCart}
        style={{
          marginTop: "12px",
          padding: "10px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#e53e3e",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        장바구니 비우기
      </button>
      <button
        style={{
          marginLeft: "12px",
          padding: "10px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#2f855a",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        결제하기
      </button>
    </div>
  );
}
