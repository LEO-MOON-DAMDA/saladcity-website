import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({ children, style = {} }) {
  const combinedStyle = {
    marginTop: "32px",
    marginBottom: "16px",
    paddingLeft: style.textAlign === "left" ? "12px" : "0px",
    paddingRight: style.textAlign === "right" ? "12px" : "0px",
    ...style,
  };

  return <h2 className="section-title" style={combinedStyle}>{children}</h2>;
}
