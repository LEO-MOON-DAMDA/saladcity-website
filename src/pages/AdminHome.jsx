// src/pages/AdminHome.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import "./AdminOutpostApplications.css";

export default function AdminHome() {
  const navigate = useNavigate();

  // ✅ v1용 세션 체크
  useEffect(() => {
    const session = supabaseOutpost.auth.session();
    if (!session) {
      navigate("/admin/login");
    }
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
        fontFamily: "Pretendard, sans-serif"
      }}
    >
      {/* ✅ OUTPOST 관리 허브 타이틀 */}
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "50px",
          color: "#3C8050",
        }}
      >
        OUTPOST 관리 시스템
      </h1>

      {/* ✅ 메뉴 버튼 4개 (로그아웃 포함) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <button
          className="download-button"
          style={{
            padding: "16px 28px",
            fontSize: "18px",
            borderRadius: "12px",
            width: "100%",
          }}
          onClick={() => navigate("/admin/outpost-applications")}
        >
          📋 신청 관리
        </button>

        <button
          className="download-button"
          style={{
            padding: "16px 28px",
            fontSize: "18px",
            borderRadius: "12px",
            width: "100%",
          }}
          onClick={() => navigate("/admin/dashboard")}
        >
          📊 OUTPOST 대시보드
        </button>

        <button
          className="download-button"
          style={{
            padding: "16px 28px",
            fontSize: "18px",
            borderRadius: "12px",
            width: "100%",
          }}
          onClick={() => navigate("/admin/stores")}
        >
          🏢 매장 관리
        </button>

        <button
          className="download-button"
          style={{
            padding: "16px 28px",
            fontSize: "18px",
            borderRadius: "12px",
            width: "100%",
            backgroundColor: "#3C8050",
            color: "#fff",
            border: "none",
          }}
          onClick={handleLogout}
        >
          🔓 로그아웃
        </button>
      </div>
    </div>
  );
}
