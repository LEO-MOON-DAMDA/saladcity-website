import React from "react";
import "./BrandButton.css";

export default function BrandButton({ children, onClick, href }) {
  if (href) {
    return (
      <a href={href} className="brand-button">
        {children}
      </a>
    );
  }

  return (
    <button className="brand-button" onClick={onClick}>
      {children}
    </button>
  );
}
