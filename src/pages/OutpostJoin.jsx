import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OutpostJoin.css";
import { saveOutpostCrew } from "../apis/saveOutpostCrew";  // ✅ Supabase 저장 함수 연결

export default function OutpostJoin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nickname: "",
    phone: "",
    email: "",
    region: "",
    interest: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveOutpostCrew(form);  // ✅ Supabase로 가입 정보 저장
      alert("🎉 가입 신청이 완료되었습니다! 샐러드시티 크루가 곧 연락드릴게요.");
      navigate("/");
    } catch (error) {
      console.error("가입 실패:", error.message);
      alert("😥 가입에 실패했습니다. 다시 시도해주세요!");
    }
  };

  return (
    <div className="outpost-join-container">
      <h1>샐러드시티 크루에 가입하세요!</h1>
      <p>건강한 삶을 함께할 특별한 커뮤니티로 초대합니다.</p>

      <form onSubmit={handleSubmit} className="outpost-join-form">
        <input name="nickname" value={form.nickname} onChange={handleChange} placeholder="닉네임" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="연락처" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="이메일" required />
        <input name="region" value={form.region} onChange={handleChange} placeholder="지역 (예: 강남구)" required />
        <select name="interest" value={form.interest} onChange={handleChange} required>
          <option value="">관심 분야 선택</option>
          <option value="다이어트">다이어트</option>
          <option value="건강관리">건강관리</option>
          <option value="운동/헬스">운동/헬스</option>
          <option value="기타">기타</option>
        </select>
        <textarea name="note" value={form.note} onChange={handleChange} placeholder="자유메모 (선택사항)" />

        <button type="submit">🌿 가입 신청하기</button>
      </form>
    </div>
  );
}
