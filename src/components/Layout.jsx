import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"; // ✅ 추가

export default function Layout() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f6fdf8' }}>
      <Header /> {/* ✅ 공통 헤더 포함 */}

      {/* ✅ 페이지 내용 위치 */}
      <div style={{ paddingTop: '80px' }}>
        <Outlet />
      </div>
    </div>
  );
}
