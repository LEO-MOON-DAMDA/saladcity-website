import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/typography.css";
import App from "./App";
import { CartProvider } from "./context/CartContext"; // ✅ 장바구니 Context 추가

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
