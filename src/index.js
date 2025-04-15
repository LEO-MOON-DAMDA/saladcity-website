import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";              // 기본 리셋 및 스타일
import "./styles/typography.css"; // ✅ Inter 폰트 + 텍스트 시스템
import App from "./App";          // 전체 라우팅 포함한 App 컴포넌트

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
