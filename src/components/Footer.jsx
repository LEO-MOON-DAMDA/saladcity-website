import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 0,
        textAlign: "center",
        padding: "40px 0",
        backgroundColor: "#eaf5ec",
        color: "#444",
        fontSize: "14px",
        borderTop: "1px solid #cfe3d5",
        marginTop: "60px",
        lineHeight: 1.6,
      }}
    >
      <p>#Saladcity_Global</p>
      <p>© 2025 Saladcity. All rights reserved.</p>
      <p>샐러드시티 본사 | (06236) 서울특별시 강남구 테헤란로22길 15</p>
      <p>Tel. 070-4027-7880</p>
    </footer>
  );
}
