// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("🟢 로그인 시도:", email);

    const { data, error } = await supabaseOutpost.auth.signInWithPassword({
      email,
      password,
    });

    console.log("🟡 로그인 응답:", { data, error });

    if (error) {
      console.error("❌ 로그인 실패:", error.message);
      alert("로그인 실패: " + error.message);
    } else {
      alert("✅ 로그인 성공");

      // ✅ navigate 전에 session 확인 및 살짝 대기
      setTimeout(() => {
        navigate("/admin");
      }, 200);
    }
  };

  return (
    <div className="adminlogin-container">
      <h1>관리자 로그인</h1>
      <form onSubmit={handleLogin} className="adminlogin-form">
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
