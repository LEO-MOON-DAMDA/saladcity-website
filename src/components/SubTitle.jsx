import React from "react";

export default function SubTitle({ children, style = {} }) {
  const combinedStyle = {
    fontSize: "15px",
    fontWeight: "500",
    color: "#999999",
    marginTop: "0px",
    marginBottom: "4px",
    paddingLeft: style.textAlign === "left" ? "12px" : "0px",
    paddingRight: style.textAlign === "right" ? "12px" : "0px",
    ...style,
  };

  return <h3 style={combinedStyle}>{children}</h3>;
}
