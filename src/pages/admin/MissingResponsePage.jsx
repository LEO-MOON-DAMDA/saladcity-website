import React, { useEffect, useState } from "react";
import { supabaseMenu as supabase } from "../../utils/supabaseMenuClient";

export default function MissingResponsePage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("reviews").select("*");
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const filtered = data.filter(r =>
        !r.response &&
        r.date &&
        new Date(r.date) <= threeDaysAgo &&
        !r.emotion
      );

      setReviews(filtered);
    })();
  }, []);

  return (
    <div className="admin-container" style={{ padding: "40px" }}>
      <h2 className="admin-title">응답 누락 리뷰</h2>
      <p style={{ marginBottom: "12px", color: "#666" }}>
        3일 이상 경과한 응답 미작성 리뷰입니다. 총 {reviews.length}건
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {reviews.map((r, i) => (
          <li key={i} style={{
            padding: "12px",
            borderBottom: "1px solid #eee",
            fontSize: "14px"
          }}>
            <strong>{r.nickname}</strong> · {r.store} · {r.date}<br />
            <span>{r.review.slice(0, 100)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}