import React, { useEffect, useState } from "react";

export default function ReviewSyncStatus() {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    fetch("/data")
      .then(() => {
        const today = new Date().toISOString().split("T")[0];
        const file = `/public/data/reviews_${today}.json`;
        fetch(file)
          .then((res) => res.json())
          .then((data) => {
            const count = data.length;
            const emotion = data.filter(r => r.emotion).length;
            setSummary(`✅ ${today} 수집됨 | 총 ${count}건 | 감성 ${emotion}건`);
          })
          .catch(() => setSummary("⚠️ 오늘자 리뷰 파일 없음"));
      });
  }, []);

  return (
    <div style={{ marginTop: "24px", fontSize: "14px", color: "#555" }}>
      {summary}
    </div>
  );
}