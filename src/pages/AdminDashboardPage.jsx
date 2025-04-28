// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from "react";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import { useNavigate } from "react-router-dom";
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  const loadStats = async () => {
    try {
      const { data, error } = await supabaseOutpost
        .from("outpost_applications")
        .select("status");

      if (error) {
        console.error("❌ 통계 데이터 불러오기 실패", error.message);
      } else {
        const total = data.length;
        const approved = data.filter((item) => item.status === "승인").length;
        const rejected = data.filter((item) => item.status === "거절").length;
        const pending = data.filter((item) => item.status === "대기").length;
        setStats({ total, approved, rejected, pending });
      }
    } catch (error) {
      console.error("❌ 통계 데이터 처리 오류", error.message);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="admin-dashboard-page">
      <h1>OUTPOST 신청 통계</h1>

      <div className="stats-grid">
        <div className="stat-card total">
          <h2>📋 총 신청 수</h2>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card approved">
          <h2>✅ 승인 완료</h2>
          <p>{stats.approved}</p>
        </div>
        <div className="stat-card rejected">
          <h2>❌ 거절</h2>
          <p>{stats.rejected}</p>
        </div>
        <div className="stat-card pending">
          <h2>🕐 대기</h2>
          <p>{stats.pending}</p>
        </div>
      </div>

      <button className="home-button" onClick={() => navigate("/admin")}>
        ← 관리자 홈으로
      </button>
    </div>
  );
}
