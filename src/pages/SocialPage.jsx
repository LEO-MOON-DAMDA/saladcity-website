// ✅ SocialPage.jsx - 실제 인스타그램 피드 자동 표시 (iframe)

import React from "react";

export default function SocialPage() {
  return (
    <section className="insta-section" style={{ padding: "60px 16px", textAlign: "center", backgroundColor: "#fdfdf7" }}>
      <h2 className="insta-title" style={{ fontSize: "28px", marginBottom: "24px", color: "#2f5130" }}>
        @saladcitykorea
      </h2>
      <iframe
        src="https://widgets.sociablekit.com/instagram-feed/iframe/25548501"
        width="100%"
        height="800"
        style={{
          border: "none",
          overflow: "hidden",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
          maxWidth: "1000px",
          margin: "0 auto",
          display: "block"
        }}
        allowFullScreen
        loading="lazy"
        title="Instagram Feed"
      ></iframe>
    </section>
  );
}
