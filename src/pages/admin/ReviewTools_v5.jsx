import React, { useState, useEffect } from "react";
import { ArrowRight, Loader, CheckCircle, AlertTriangle } from "lucide-react";
import ReviewSyncStatus from "./ReviewSyncStatus";

export default function ReviewTools() {
  const [log, setLog] = useState("");
  const [status, setStatus] = useState("idle");
  const [platform, setPlatform] = useState("baemin");
  const [mode, setMode] = useState("daily");
  const [store, setStore] = useState("all");

  async function handle(endpoint, label) {
    setStatus("loading");
    setLog(label + " 실행 중...");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, mode, store })
      });
      const data = await res.json();
      setLog(data.message + "\n" + (data.log || ""));
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setLog("실패: " + err.message);
    }
  }

  return (
    <div className="admin-container" style={{ padding: "40px", fontFamily: "Noto Sans, sans-serif" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "700" }}>리뷰 수집 · 업로드 도구</h2>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
          원하는 범위/매장/플랫폼을 선택해 수집 및 업로드를 실행할 수 있습니다.
        </p>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "16px", fontSize: "14px" }}>
        <label>플랫폼
          <select value={platform} onChange={e => setPlatform(e.target.value)} style={{ marginLeft: "8px" }}>
            <option value="baemin">배민</option>
            <option value="coupang">쿠팡이츠</option>
            <option value="yogiyo">요기요</option>
          </select>
        </label>
        <label>매장
          <select value={store} onChange={e => setStore(e.target.value)} style={{ marginLeft: "8px" }}>
            <option value="all">전체</option>
            <option value="yeoksam">역삼</option>
            <option value="gudi">구디</option>
            <option value="gangdong">강동</option>
          </select>
        </label>
        <label>범위
          <select value={mode} onChange={e => setMode(e.target.value)} style={{ marginLeft: "8px" }}>
            <option value="daily">일간</option>
            <option value="full">전체</option>
          </select>
        </label>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button onClick={() => handle("/api/collect-reviews", "리뷰 수집")} className="admin-button">
          <ArrowRight size={14} style={{ marginRight: "6px" }} /> 수집만 실행
        </button>
        <button onClick={() => handle("/api/upload-reviews", "Supabase 업로드")} className="admin-button">
          <ArrowRight size={14} style={{ marginRight: "6px" }} /> 업로드만 실행
        </button>
        <button onClick={() => handle("/api/collect-and-upload", "전체 실행")} className="admin-button" style={{
          background: "linear-gradient(135deg, #43a047, #66bb6a)",
          color: "#fff"
        }}>
          <ArrowRight size={14} style={{ marginRight: "6px" }} /> 수집 + 업로드 실행
        </button>
      </div>

      <ReviewSyncStatus />

      <pre style={{
        background: "#f9f9f9",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        whiteSpace: "pre-wrap",
        fontSize: "13px",
        color: "#444",
        maxHeight: "400px",
        overflowY: "auto",
        marginTop: "16px"
      }}>
        {status === "loading" && <Loader size={16} style={{ marginRight: "6px" }} className="spin" />}
        {status === "done" && <CheckCircle size={16} color="#43a047" style={{ marginRight: "6px" }} />}
        {status === "error" && <AlertTriangle size={16} color="#d32f2f" style={{ marginRight: "6px" }} />}
        {log}
      </pre>
    </div>
  );
}