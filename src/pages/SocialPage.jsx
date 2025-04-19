import React from "react";

export default function SocialPage() {
  return (
    <div
      style={{
        padding: "60px 16px",
        textAlign: "center",
        backgroundColor: "#fdfdf7",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          marginBottom: "24px",
          color: "#2f5130",
        }}
      >
        INSTAGRAM
      </h1>
      <a
        href="https://www.instagram.com/saladcitykorea"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          fontSize: "20px",
          color: "#2f5130",
          textDecoration: "none",
          border: "2px solid #2f5130",
          padding: "12px 24px",
          borderRadius: "12px",
          fontWeight: "600",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "#2f5130")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        👉 @saladcitykorea 인스타그램 바로가기
      </a>
    </div>
  );
}
