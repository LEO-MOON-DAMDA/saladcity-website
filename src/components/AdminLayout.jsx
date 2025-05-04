import { Outlet, NavLink } from "react-router-dom";
import "../styles/AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>아웃포스트 관리</h2>
        <ul>
          <li><NavLink to="/admin/outpost-applications">신청 관리</NavLink></li>
          <li><NavLink to="/admin/leads">리드 관리</NavLink></li>
          <li><NavLink to="/admin/coverage">배송 커버리지</NavLink></li>
          <li><NavLink to="/admin/dashboard">대시보드</NavLink></li>
          <li><NavLink to="/admin/stores">매장 관리</NavLink></li>
        </ul>

        <h2>리뷰 관리</h2>
        <ul>
          <li><NavLink to="/admin/reviews/dashboard">리뷰 대시보드</NavLink></li>
          <li><NavLink to="/admin/reviews/stats">통계 보기</NavLink></li>
          <li><NavLink to="/admin/reviews/missing-responses">미응답 리뷰</NavLink></li>
          <li><NavLink to="/admin/tools">리뷰 실행 도구</NavLink></li>
        </ul>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
