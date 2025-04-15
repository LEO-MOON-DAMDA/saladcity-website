import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; // ✅ 전체 앱 라우팅을 포함한 App 컴포넌트

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
