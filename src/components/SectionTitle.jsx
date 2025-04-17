import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({ children, style = {} }) {
  const combinedStyle = {
    marginTop: "96px",         // 상단 섹션과 충분히 띄움
    marginBottom: "4px",       // 본 섹션과 거의 붙임
    paddingLeft: style.textAlign === "left" ? "12px" : "0px",
    paddingRight: style.textAlign === "right" ? "12px" : "0px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#2f855a",
    ...style,
  };

  return <h2 className="section-title" style={combinedStyle}>{children}</h2>;
}
