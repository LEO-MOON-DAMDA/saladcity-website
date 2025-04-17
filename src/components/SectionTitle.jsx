import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({ children, style = {} }) {
  const combinedStyle = {
    marginTop: "64px",
    marginBottom: "4px", // 섹션과 붙이기 위한 최소 여백
    paddingLeft: style.textAlign === "left" ? "12px" : "0px",
    paddingRight: style.textAlign === "right" ? "12px" : "0px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#222",
    ...style,
  };

  return <h2 className="section-title" style={combinedStyle}>{children}</h2>;
}
