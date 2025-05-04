import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import "./AdminOutpostApplications.css";

export default function AdminHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabaseOutpost.auth.getSession();
      if (!session) {
        navigate("/admin/login");
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabaseOutpost.auth.signOut();
    if (error) {
      console.error("❌ 로그아웃 실패:", error.message);
      alert("로그아웃 실패: " + error.message);
    } else {
      alert("✅ 로그아웃 성공");
      window.location.href = "/admin/login";
    }
  };

  return (
    <div
      className="admin-outpost-applications"
      style={{
        paddingTop: "80px",
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #ffffff, #f9fff9)",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "50px",
          color: "#3C8050",
        }}
      >
        샐러드시티 통합 관리자 시스템
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "40px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* OUTPOST 관리 */}
        <div>
          <h2 style={{ color: "#3C8050", fontSize: "20px", marginBottom: "16px" }}>📦 아웃포스트 관리</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button className="download-button" onClick={() => navigate("/admin/outpost-applications")}>아웃포스트 신청 관리</button>
            <button className="download-button" onClick={() => navigate("/admin/leads")}>리드 관리</button>
	<button className="download-button" onClick={() => navigate("/admin/coverage")}>배송 커버리지 설정</button>
	<button className="download-button" onClick={() => navigate("/admin/dashboard")}>아웃포스트 대시보드</button>
            <button className="download-button" onClick={() => navigate("/admin/stores")}>매장 관리</button>
                   
          </div>
        </div>

        {/* 리뷰 관리 */}
        <div>
          <h2 style={{ color: "#3C8050", fontSize: "20px", marginBottom: "16px" }}>📝 리뷰 관리</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button className="download-button" onClick={() => navigate("/admin/reviews/dashboard")}>리뷰 대시보드</button>
            <button className="download-button" onClick={() => navigate("/admin/reviews/stats")}>리뷰 통계 보기</button>
            <button className="download-button" onClick={() => navigate("/admin/reviews/missing-responses")}>응답 누락 리뷰</button>
            <button className="download-button" onClick={() => navigate("/admin/tools")}>리뷰 실행 도구</button>
          </div>
        </div>
      </div>

      <button
        className="download-button"
        onClick={handleLogout}
        style={{ marginTop: "60px", backgroundColor: "#3C8050", color: "#fff", border: "none" }}
      >
        🔒 로그아웃
      </button>
    </div>
  );
}
