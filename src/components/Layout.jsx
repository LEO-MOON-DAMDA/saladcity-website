// src/components/Layout.jsx
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
          backgroundColor: isHome ? 'transparent' : '#f6fdf8',
          position: 'relative',      // ✅ 카드 hover 등 z-index 기준
          overflow: 'visible',       // ✅ hover 카드 상단 짤림 방지
          minHeight: '100vh',        // ✅ 푸터 포함 전체 높이 확보
          pointerEvents: 'auto'      // ✅ 클릭 이벤트 차단 해제
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
