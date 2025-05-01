import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import ReviewStatsChart from "../../components/ReviewStatsChart";
import { supabaseMenu as supabase } from "../../utils/supabaseMenuClient";
import "../Reviews.css";
const COLORS = ["#4CAF50", "#C8E6C9"]; // 연한 초록톤
export default function ReviewStatsPage() {
  const [data, setData] = useState([]);
  const [emotionRatio, setEmotionRatio] = useState(0);

  useEffect(() => {
    (async () => {
      let all = [];
      let from = 0;
      const chunkSize = 1000;

      while (true) {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .range(from, from + chunkSize - 1);

        if (error) {
          console.error("❌ Supabase fetch error:", error.message);
          break;
        }

        if (!data || data.length === 0) break;

        all = all.concat(data);

        if (data.length < chunkSize) break;

        from += chunkSize;
      }

      setData(all);
      const emotion = all.filter(r => r.emotion).length;
      setEmotionRatio(Math.round((emotion / all.length) * 100));
    })();
  }, []);

  const storeData = [...new Set(data.map(d => (d.store || "기타").trim()))].map(store => ({
    store,
    count: data.filter(d => (d.store || "").trim() === store).length
  }));

  return (
    <div className="reviews-page">
      <section className="review-hero">
        <h1 className="hero-headline">[내부 전용] 리뷰 통계 시각화</h1>
        <p className="hero-subtext">
          총 리뷰 수: <strong>{data.length}</strong>건 · 감성 리뷰 비율: <strong>{emotionRatio}%</strong>
        </p>
      </section>

      <ReviewStatsChart reviews={data} />

      {/* 하단 카드형 차트 2개 */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "40px",
        marginTop: "80px",
        marginBottom: "80px"
      }}>
        {/* 감성 문구 비율 */}
        <div style={cardStyle}>
          <h3 style={chartTitle}>감성 문구 비율</h3>
          <div style={{ width: "400px", height: "240px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "감성", value: emotionRatio },
                    { name: "실제", value: 100 - emotionRatio }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  <Cell fill="#C8E6C9" />
                  <Cell fill="#4CAF50" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 매장별 리뷰 수 */}
        <div style={cardStyle}>
          <h3 style={chartTitle}>매장별 리뷰 수</h3>
          <div style={{ width: "400px", height: "240px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={storeData}>
                <XAxis dataKey="store" angle={-15} textAnchor="end" stroke="#666" />
                <YAxis allowDecimals={false} />
                <Bar dataKey="count" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
  minWidth: "280px"
};

const chartTitle = {
  textAlign: "center",
  fontSize: "16px",
  marginBottom: "12px",
  fontWeight: "500",
  color: "#444"
};
