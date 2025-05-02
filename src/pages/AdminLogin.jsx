import React, { useState } from "react";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const { data, error } = await supabaseOutpost.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("❌ 로그인 실패:", error.message);
      setErrorMsg("로그인 실패: " + error.message);
    } else {
      alert("✅ 로그인 성공");
      setTimeout(() => {
        navigate("/admin");
      }, 200);
    }

    setIsLoading(false);
  };

  return (
    <div className="adminlogin-container" style={{ justifyContent: "flex-start" }}>
      <h1>관리자 로그인</h1>
      <form onSubmit={handleLogin} className="adminlogin-form">
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
        {errorMsg && (
          <p style={{ color: "#e74c3c", fontSize: "14px", marginTop: "8px" }}>{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
