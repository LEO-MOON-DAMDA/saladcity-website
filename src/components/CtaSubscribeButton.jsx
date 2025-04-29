import React from "react";
import "./cta-subscribe-button.css";

export default function CtaSubscribeButton({ onClick, children }) {
  return (
    <button className="cta-subscribe-button" onClick={onClick}>
      {children}
    </button>
  );
}
