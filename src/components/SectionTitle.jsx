import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({ children, style = {} }) {
  const combinedStyle = {
    marginTop: "36px",
    marginBottom: "16px",
    paddingLeft: style.textAlign === "left" ? "12px" : "0px",
    paddingRight: style.textAlign === "right" ? "12px" : "0px",
    fontSize: "32px", // 브랜드 표준 크기 확정
    fontWeight: "600",
    lineHeight: "1.4",
    color: "#2f855a",
    textAlign: style.textAlign || "center", // 기본 중앙정렬
    ...style,
  };

  return (
    <h2 className="section-title" style={combinedStyle}>
      {children}
    </h2>
  );
}
