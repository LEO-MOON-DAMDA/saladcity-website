// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css"; // ✅ 스타일 파일도 준비할거야

export default function NotFoundPage() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
}
