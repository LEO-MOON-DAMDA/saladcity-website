import React, { useEffect } from "react";
import "../styles/SocialPage.css";
import { ReactComponent as InstaIcon } from "../assets/icons/instagram-icon.svg"; // ✅ SVG 아이콘

export default function SocialPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="insta-section">
      <div className="insta-header">
        <InstaIcon className="insta-icon" />
        <h2 className="insta-title">@saladcityglobal</h2>
      </div>
      <p className="insta-subtext">샐러드시티 고객님들과 함께하는 건강한 순간을 공유합니다</p>
      <div
        className="elfsight-app-b4c3613b-1bba-4927-bb96-94af2cb564c2"
        data-elfsight-app-lazy
      ></div>
    </section>
  );
}
