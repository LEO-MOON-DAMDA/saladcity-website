import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f6fdf8' }}>
      {/* ✅ 헤더는 Header.jsx에서 관리하므로 제거 */}
      
      {/* ✅ 페이지 내용 위치 */}
      <div style={{ paddingTop: '80px' }}>
        <Outlet />
      </div>
    </div>
  );
}
