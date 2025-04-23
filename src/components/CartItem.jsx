import React from "react";

export default function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <li style={{ borderBottom: "1px solid #eee", padding: "16px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <strong>{item.name}</strong>
          <p style={{ margin: "6px 0", color: "#666", fontSize: "14px" }}>{item.description}</p>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
            style={{ width: "60px", marginRight: "12px", padding: "4px" }}
          />
          x {item.price.toLocaleString()}원
        </div>
        <div>
          <button
            onClick={() => onRemove(item.id)}
            style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer" }}
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
}
