import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Header /> {/* ✅ 모든 페이지에 Header 렌더링 */}
      <div
        style={{
          paddingTop: isHome ? '0px' : '80px',
          backgroundColor: isHome ? 'transparent' : '#f6fdf8'
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
