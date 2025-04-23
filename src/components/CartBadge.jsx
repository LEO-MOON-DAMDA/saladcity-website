import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartBadge() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      onClick={() => navigate("/cart")}
      style={{ position: "relative", cursor: "pointer", marginLeft: "16px" }}
    >
      🛒
      {totalCount > 0 && (
        <span style={{
          position: "absolute",
          top: "-6px",
          right: "-8px",
          backgroundColor: "#e53e3e",
          color: "#fff",
          borderRadius: "50%",
          padding: "2px 6px",
          fontSize: "11px",
          fontWeight: "bold"
        }}>
          {totalCount}
        </span>
      )}
    </div>
  );
}
