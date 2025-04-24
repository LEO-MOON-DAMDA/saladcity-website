import React, { useEffect } from "react";

export default function SocialPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section
      className="insta-section"
      style={{
        padding: "60px 16px",
        textAlign: "center",
        backgroundColor: "#fdfdf7",
      }}
    >
      <h2
        className="insta-title"
        style={{
          fontSize: "28px",
          marginBottom: "24px",
          color: "#2f5130",
        }}
      >
        @saladcityglobal
      </h2>

      <div
        className="elfsight-app-b4c3613b-1bba-4927-bb96-94af2cb564c2"
        data-elfsight-app-lazy
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      ></div>
    </section>
  );
}
