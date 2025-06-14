import React from "react";
import "../styles/SocialPage.css"; // ✅ CSS 연결됨
import instagramIcon from "../assets/icons/instagram-icon.svg"; // ✅ SVG 경로

export default function SocialPage() {
  return (
    <section className="insta-section">
      <div className="insta-header">
        <img src={instagramIcon} alt="Instagram Icon" className="insta-icon" />
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
