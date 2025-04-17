import React from "react";
import "./BrandButton.css";

export default function BrandButton({ children, onClick, href }) {
  // 링크일 경우
  if (href) {
    return (
      <a href={href} className="brand-button">
        {children}
      </a>
    );
  }

  // 버튼일 경우
  return (
    <button className="brand-button" onClick={onClick}>
      {children}
    </button>
  );
}
