import React from "react";

export default function ReviewStatsWidget({ stats }) {
  if (!stats) return null;

  const { total, avgRating, emotionCount, byStore } = stats;

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
      maxWidth: "480px",
      margin: "0 auto"
    }}>
      <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>리뷰 요약</h3>
      <p>총 리뷰 수: <strong>{total}</strong></p>
      <p>평균 평점: <strong>{avgRating}</strong></p>
      <p>감성 문구 수: <strong>{emotionCount}</strong></p>
      <div style={{ marginTop: "12px" }}>
       {Object.entries(byStore || {}).map(([store, count]) => (
          <div key={store} style={{ fontSize: "13px", color: "#555" }}>
            {store}: {count}건
          </div>
        ))}
      </div>
    </div>
  );
}