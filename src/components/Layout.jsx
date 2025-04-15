import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
   <div
  style={{
    paddingTop: isHome ? '0px' : '80px',
    backgroundColor: isHome ? 'transparent' : '#f6fdf8'  // ✅ 여기만 수정
  }}
>
  <Outlet />
</div>

  );
}
