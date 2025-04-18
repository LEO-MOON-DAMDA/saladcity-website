import React, { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, CartesianGrid
} from "recharts";

const COLORS = ["#4CAF50", "#C8E6C9"]; // 연한 초록 톤

export default function ReviewStatsChart({ reviews }) {
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

  const imageData = useMemo(() => {
    const withImage = reviews.filter(r => !!r.image).length;
    const withoutImage = reviews.length - withImage;
    return [
      { name: "이미지 있음", value: withImage },
      { name: "이미지 없음", value: withoutImage },
    ];
  }, [reviews]);

  const dateChartData = useMemo(() => {
    const map = {};
    reviews.forEach((r) => {
      const date = (r.date || "").split("T")[0];
      if (date) {
        map[date] = (map[date] || 0) + 1;
      }
    });
    return Object.entries(map)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, count]) => ({ date, count }));
  }, [reviews]);

  const replyCount = reviews.filter(r => !!r.reply).length;
  const replyRate = reviews.length > 0
    ? Math.round((replyCount / reviews.length) * 100)
    : 0;

  return (
    <div style={{ marginBottom: "48px" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "26px",
        color: "#2f5130",
        marginBottom: "32px",
        fontWeight: "600"
      }}>
        리뷰 통계
      </h2>

      {/* 카드 영역 */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "24px",
        marginBottom: "40px",
        flexWrap: "wrap"
      }}>
        <div style={cardStyle}>
          <p style={cardTitle}>사장님 응답률</p>
          <p style={cardValue}>{replyRate}%</p>
        </div>
        <div style={cardStyle}>
          <p style={cardTitle}>전체 리뷰 수</p>
          <p style={cardValue}>{reviews.length}건</p>
        </div>
        <div style={cardStyle}>
          <p style={cardTitle}>응답된 리뷰</p>
          <p style={cardValue}>{replyCount}건</p>
        </div>
      </div>

      {/* 차트 영역 */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "40px"
      }}>
        {/* 별점 차트 */}
        <div style={{ width: "360px", height: "300px" }}>
          <h3 style={chartTitle}>별점 분포</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingData}>
              <XAxis dataKey="star" stroke="#666" />
              <YAxis allowDecimals={false} stroke="#888" />
              <Tooltip />
              <Bar dataKey="count" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 이미지 포함 파이차트 */}
        <div style={{ width: "300px", height: "300px" }}>
          <h3 style={chartTitle}>이미지 포함 비율</h3>
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

        {/* 날짜별 리뷰 추세 */}
        <div style={{ width: "480px", height: "300px" }}>
          <h3 style={chartTitle}>날짜별 리뷰 추세</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dateChartData}>
              <XAxis dataKey="date" stroke="#666" />
              <YAxis allowDecimals={false} stroke="#888" />
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

const cardStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "20px 24px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
  textAlign: "center",
  minWidth: "160px"
};

const cardTitle = {
  fontSize: "14px",
  color: "#888",
  marginBottom: "6px",
  fontWeight: "500"
};

const cardValue = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#2f5130"
};

const chartTitle = {
  textAlign: "center",
  fontSize: "16px",
  marginBottom: "12px",
  fontWeight: "500",
  color: "#444"
};
