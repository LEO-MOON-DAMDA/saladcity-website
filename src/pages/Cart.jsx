import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

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
    <div className="cart-page">
      <h2 className="cart-title">장바구니</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">장바구니가 비어있습니다.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-info">
                  <div className="cart-name">{item.name}</div>
                  <div className="cart-desc">{item.description}</div>
                  <div className="cart-controls">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                    <span className="cart-price">x {item.price.toLocaleString()}원</span>
                  </div>
                </div>
                <button className="cart-remove" onClick={() => removeFromCart(item.id)}>
                  삭제
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>
              총 <strong>{total.count}</strong>개 / 총합 <strong>{total.price.toLocaleString()}</strong>원
            </p>
            <div className="cart-actions">
              <button className="cart-clear" onClick={clearCart}>
                장바구니 비우기
              </button>
              <button className="cart-pay">결제하기</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
