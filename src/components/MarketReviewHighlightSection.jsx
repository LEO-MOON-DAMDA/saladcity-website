import React from "react";

export default function MarketReviewHighlightSection() {
  return (
    <section style={{ padding: "60px 20px", backgroundColor: "#f8fcf9" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "#2f5130" }}>
          샐시 고객들이 남긴 생생한 후기 💬
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {[
            {
              nickname: "saladylover",
              text: "너무 신선하고 양도 많아요! 계속 시킬 듯...",
            },
            {
              nickname: "건강중독자",
              text: "진짜 야채가 살아있어요... 드레싱까지 완벽!",
            },
            {
              nickname: "greenqueen",
              text: "배달도 빠르고 정기배송 최고예요!",
            },
          ].map((review, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
            >
              <p style={{ fontSize: "14px", fontStyle: "italic", color: "#555" }}>
                "{review.text}"
              </p>
              <p style={{ fontSize: "13px", fontWeight: "bold", color: "#999", marginTop: "10px" }}>
                - {review.nickname}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
