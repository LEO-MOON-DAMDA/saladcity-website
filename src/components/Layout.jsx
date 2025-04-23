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
          backgroundColor: isHome ? "transparent" : "#f6fdf8",
          position: "relative",
          overflow: "visible",
          minHeight: "100vh",
          zIndex: 0 // ✅ 안전한 기본값
          // ❌ pointerEvents 제거
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
