import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({ children, style = {} }) {
  const combinedStyle = {
    marginTop: "96px",
    marginBottom: "0px",
    paddingLeft: style.textAlign === "left" ? "12px" : "0px",
    paddingRight: style.textAlign === "right" ? "12px" : "0px",
    fontSize: "32px",           // 크기 ↑
    fontWeight: "500",          // 얇게
    color: "#2f855a",
    ...style,
  };

  return <h2 className="section-title" style={combinedStyle}>{children}</h2>;
}
