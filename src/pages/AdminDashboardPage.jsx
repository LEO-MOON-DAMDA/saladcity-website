import React, { useState, useEffect } from "react";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import { useNavigate } from "react-router-dom";
import "./AdminDashboardPage.css";
import "./AdminCoveragePage.css";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    leads: 0,
    coverage: 0,
    stores: 0,
  });

  const loadStats = async () => {
    try {
      const [{ data: apps = [] }, { data: leads = [] }, { data: coverage = [] }, { data: stores = [] }] =
        await Promise.all([
          supabaseOutpost.from("outpost_applications").select("status"),
          supabaseOutpost.from("outpost_leads").select("*"),
          supabaseOutpost.from("delivery_coverage").select("*"),
          supabaseOutpost.from("outpost_stores").select("*"),
        ]);

      const total = apps.length;
      const approved = apps.filter((item) => item.status === "승인").length;
      const rejected = apps.filter((item) => item.status === "거절").length;
      const pending = apps.filter((item) => item.status === "대기").length;

      setStats({
        total,
        approved,
        rejected,
        pending,
        leads: leads.length,
        coverage: coverage.length,
        stores: stores.length,
      });
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
        <div className="stat-card">
          <h2>📨 리드 수</h2>
          <p>{stats.leads}</p>
        </div>
        <div className="stat-card">
          <h2>📍 커버리지 지역</h2>
          <p>{stats.coverage}</p>
        </div>
        <div className="stat-card">
          <h2>🏬 등록 매장 수</h2>
          <p>{stats.stores}</p>
        </div>
      </div>

      <button className="home-button" onClick={() => navigate("/admin")}>
        ← 관리자 홈으로
      </button>
    </div>
  );
}
