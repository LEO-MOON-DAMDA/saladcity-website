import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({ children, style = {} }) {
  const combinedStyle = {
    marginTop: "96px",
    marginBottom: "0px", // 본문과 최대한 붙이기
    paddingLeft: style.textAlign === "left" ? "12px" : "0px",
    paddingRight: style.textAlign === "right" ? "12px" : "0px",
    fontSize: "28px", // 더 큼
    fontWeight: "800",
    color: "#2f855a", // 메인 초록색
    ...style,
  };

  return <h2 className="section-title" style={combinedStyle}>{children}</h2>;
}
