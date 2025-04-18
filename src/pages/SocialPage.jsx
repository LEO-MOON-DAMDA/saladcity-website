import React from "react";

export default function SocialPage() {
  return (
    <div style={{ padding: "60px 16px", textAlign: "center", backgroundColor: "#fdfdf7" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "24px", color: "#2f5130" }}>
        INSTAGRAM
      </h1>
      <iframe
        src="https://widgets.sociablekit.com/instagram-feed/iframe/25547853"
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
    </div>
  );
}
