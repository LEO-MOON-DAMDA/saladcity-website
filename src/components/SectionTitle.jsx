import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({ children, style = {} }) {
  const combinedStyle = {
    marginTop: "96px",
    marginBottom: "16px", // 본문과 간격 확장
    paddingLeft: style.textAlign === "left" ? "12px" : "0px",
    paddingRight: style.textAlign === "right" ? "12px" : "0px",
    fontSize: "36px", // 기존보다 조금 더 큼
    fontWeight: "500",
    color: "#2f855a",
    ...style,
  };

  return <h2 className="section-title" style={combinedStyle}>{children}</h2>;
}
