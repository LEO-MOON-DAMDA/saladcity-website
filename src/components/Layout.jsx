// src/components/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: isHome ? "0px" : "80px",
          backgroundColor: "#f6fdf8",
          minHeight: "100vh",
          position: "relative",
          zIndex: 0,               // 안전하게 낮은 z-index
          overflow: "visible"      // hover/클릭 문제 방지
          // pointerEvents 제거됨
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
