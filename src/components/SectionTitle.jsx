import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({ children, style = {} }) {
  const combinedStyle = {
    marginTop: "96px",
    marginBottom: "4px",
    paddingLeft: style.textAlign === "left" ? "12px" : "0px",
    paddingRight: style.textAlign === "right" ? "12px" : "0px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#2f855a",
    ...style,
  };

  return <h2 className="section-title" style={combinedStyle}>{children}</h2>;
}
