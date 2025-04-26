import React from "react";
import "./BrandButton.css";

export default function BrandButton({ children, onClick, href, className = "" }) {
  if (href) {
    return (
      <a href={href} className={`brand-button ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button className={`brand-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
