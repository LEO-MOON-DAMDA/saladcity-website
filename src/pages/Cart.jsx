import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce(
    (acc, item) => {
      acc.count += item.quantity;
      acc.price += item.price * item.quantity;
      return acc;
    },
    { count: 0, price: 0 }
  );

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 16px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "24px" }}>장바구니</h2>

      {cart.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{ borderBottom: "1px solid #eee", padding: "16px 0" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ flex: 1 }}>
                    <strong>{item.name}</strong>
                    <p style={{ margin: "6px 0", color: "#666", fontSize: "14px" }}>{item.description}</p>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      style={{ width: "60px", marginRight: "12px", padding: "4px" }}
                    />
                    x {item.price.toLocaleString()}원
                  </div>
                  <div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer" }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "24px", textAlign: "right" }}>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>
              총 {total.count}개 / 총합 {total.price.toLocaleString()}원
            </p>
            <button
              onClick={clearCart}
              style={{ marginTop: "12px", padding: "10px 16px", borderRadius: "6px", border: "none", backgroundColor: "#e53e3e", color: "#fff", cursor: "pointer" }}
            >
              장바구니 비우기
            </button>
            <button
              style={{ marginLeft: "12px", padding: "10px 16px", borderRadius: "6px", border: "none", backgroundColor: "#2f855a", color: "#fff", cursor: "pointer" }}
            >
              결제하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
