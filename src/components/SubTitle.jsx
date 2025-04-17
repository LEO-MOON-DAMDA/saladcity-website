import React from "react";

export default function SubTitle({ children, style = {} }) {
  const combinedStyle = {
    fontSize: "16px",
    fontWeight: "500",
    color: "#666",
    marginTop: "12px",
    marginBottom: "4px",
    paddingLeft: style.textAlign === "left" ? "12px" : "0px",
    paddingRight: style.textAlign === "right" ? "12px" : "0px",
    ...style,
  };

  return <h3 style={combinedStyle}>{children}</h3>;
}
