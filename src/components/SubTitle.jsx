import React, { useEffect, useState } from "react";

export default function SubTitle({ children, style = {} }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const combinedStyle = {
    fontSize: "15px",
    fontWeight: "500",
    color: "#999999",
    marginTop: "0px",
    marginBottom: "4px",
    paddingLeft: isMobile ? "16px" : "12px",
    paddingRight: isMobile ? "16px" : "10px",
    textAlign: isMobile ? "center" : "left",
    ...style,
  };

  return <h3 style={combinedStyle}>{children}</h3>;
}
