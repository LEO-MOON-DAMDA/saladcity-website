import React from "react";

export default function ProductCard({ item, onAddToCart }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: "12px", padding: "12px", background: "#fff" }}>
      <img
        src={item.image_main}
        alt={item.name}
        style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }}
      />
      <h3 style={{ fontSize: "16px", margin: "8px 0 4px" }}>{item.name}</h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>{item.description}</p>
      <p style={{ fontWeight: "bold", fontSize: "15px", color: "#2f855a" }}>{item.price.toLocaleString()}원</p>
      <button
        onClick={() => onAddToCart(item)}
        style={{ marginTop: "8px", width: "100%", padding: "10px", backgroundColor: "#2f855a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
      >
        장바구니 담기
      </button>
    </div>
  );
}
