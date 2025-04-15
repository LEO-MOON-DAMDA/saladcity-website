import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f6fdf8' }}>
      <Header />

      {/* ✅ 홈화면에서는 padding 제거 */}
      <div style={{ paddingTop: isHome ? '0px' : '80px' }}>
        <Outlet />
      </div>
    </div>
  );
}
