import React, { useEffect } from "react";
import "../styles/SocialPage.css"; // ✅ CSS 연결됨

export default function SocialPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="insta-section">
      <h2 className="insta-title">@saladcityglobal</h2>

      <div
        className="elfsight-app-b4c3613b-1bba-4927-bb96-94af2cb564c2"
        data-elfsight-app-lazy
      ></div>
    </section>
  );
}
