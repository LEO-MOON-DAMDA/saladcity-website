// src/components/ReviewStatsChart.jsx
import React, { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, CartesianGrid
} from "recharts";

const COLORS = ["#4CAF50", "#A5D6A7"];

export default function ReviewStatsChart({ reviews }) {
  // ⭐ 별점 분포
  const ratingData = useMemo(() => {
    const ratingCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      const rating = r.rating || 5;
      ratingCount[rating] = (ratingCount[rating] || 0) + 1;
    });
    return Object.entries(ratingCount)
      .map(([star, count]) => ({ star, count }))
      .sort((a, b) => b.star - a.star);
  }, [reviews]);

  // 🖼 이미지 포함 비율
  const imageData = useMemo(() => {
    const withImage = reviews.filter(r => !!r.image).length;
    const withoutImage = reviews.length - withImage;
    return [
      { name: "이미지 있음", value: withImage },
      { name: "이미지 없음", value: withoutImage },
    ];
  }, [reviews]);

  // 📅 날짜별 리뷰 수
  const dateChartData = useMemo(() => {
    const map = {};
    reviews.forEach((r) => {
      const date = (r.date || "").split("T")[0]; // 날짜만 추출
      if (date) {
        map[date] = (map[date] || 0) + 1;
      }
    });
    return Object.entries(map)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, count]) => ({ date, count }));
  }, [reviews]);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "24px", fontSize: "24px" }}>
        리뷰 통계
      </h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "40px"
      }}>
        {/* ⭐ 별점 분포 바차트 */}
        <div style={{ width: "360px", height: "300px" }}>
          <h3 style={{ textAlign: "center" }}>별점 분포</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingData}>
              <XAxis dataKey="star" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🖼 이미지 포함 비율 파이차트 */}
        <div style={{ width: "300px", height: "300px" }}>
          <h3 style={{ textAlign: "center" }}>이미지 포함 비율</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={imageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {imageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 📅 날짜별 리뷰 추세 선형 차트 */}
        <div style={{ width: "480px", height: "300px" }}>
          <h3 style={{ textAlign: "center" }}>날짜별 리뷰 추세</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dateChartData}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="count" stroke="#4CAF50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
