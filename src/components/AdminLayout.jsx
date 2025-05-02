// src/components/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import "../styles/AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>관리자</h2>
        <nav>
          <ul>
            <li><NavLink to="/admin" end>홈</NavLink></li>
            <li><NavLink to="/admin/outpost-applications">Outpost 신청</NavLink></li>
            <li><NavLink to="/admin/stores">매장 관리</NavLink></li>
            <li><NavLink to="/admin/dashboard">통계 대시보드</NavLink></li>
            <li><NavLink to="/admin/add-goods">굿즈 등록</NavLink></li>
            <li><NavLink to="/admin/market-goods">굿즈 관리</NavLink></li>
            <li><NavLink to="/admin/tools">리뷰 수집도구</NavLink></li>
            <li><NavLink to="/admin/reviews/dashboard">리뷰 대시보드</NavLink></li>
            <li><NavLink to="/admin/reviews/stats">리뷰 통계</NavLink></li>
            <li><NavLink to="/admin/reviews/missing-responses">미응답 리뷰</NavLink></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
