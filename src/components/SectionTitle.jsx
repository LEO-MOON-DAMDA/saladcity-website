import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({ children, style = {} }) {
  return <h2 className="section-title" style={style}>{children}</h2>;
}
