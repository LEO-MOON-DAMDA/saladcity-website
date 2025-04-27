// src/pages/OutpostPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 페이지 이동용
import * as emailjs from "@emailjs/browser";    // ✅ emailjs 제대로 import

export default function OutpostPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nickname: "",
    phone: "",
    email: "",
    region: "",
    meals: "",
    duration: "",
    menu: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ 1. 관리자 메일 보내기
    emailjs.send(
      "service_y5h72of",
      "template_e5vtkqa",
      {
        nickname: formData.nickname,
        phone: formData.phone,
        email: formData.email,
        region: formData.region,
        meals: formData.meals,
        duration: formData.duration,
        menu: formData.menu,
      },
      "GyfcvN5vYWs405wMh"
    )
    .then(() => {
      // ✅ 2. 관리자 메일 성공하면 → 고객에게 메일 보내기
      return emailjs.send(
        "service_y5h72of",
        "template_5qc7v0t",
        {
          to_email: formData.email,
        },
        "GyfcvN5vYWs405wMh"
      );
    })
    .then(() => {
      // ✅ 3. 둘 다 성공했으면 폼 초기화하고 성공화면으로 이동
      setFormData({ nickname: "", phone: "", email: "", region: "", meals: "", duration: "", menu: "" });
      navigate("/outpost/success");
    })
    .catch((error) => {
      console.error("EmailJS 에러:", error);
      alert("신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    });
  };

  return (
    <div style={{ padding: "60px 20px", maxWidth: "960px", margin: "0 auto", fontFamily: "Pretendard, sans-serif" }}>
      
      {/* ✅ 브랜드 메시지 */}
      <section style={{ textAlign: "center", marginBottom: "80px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
          OUTPOST: 우리의 뿌리에서, 당신의 식탁으로
        </h1>
        <p style={{ fontSize: "20px", lineHeight: "1.8", color: "#555" }}>
          샐러드시티는 최고의 상태로, 최고의 샐러드를 전해드리고자 합니다.<br />
          모두가 잠든 새벽, 한 분 한 분을 위해 정성을 다해 준비합니다.<br /><br />
          아쉽게도, 품질을 보장할 수 없는 환경에서는<br />
          샐시 음식을 권고하지 않습니다.<br /><br />
          조건이 충족된다면, 가까운 곳에 키친을 개설하거나<br />
          더 많은 수량을 준비해 여러분과 함께할 준비를 하겠습니다.
        </p>
      </section>

      {/* ✅ 신청 폼 */}
      <section style={{ backgroundColor: "#f9f9f9", padding: "40px 20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {[{ label: "닉네임", name: "nickname", type: "text" },
            { label: "연락처", name: "phone", type: "tel" },
            { label: "이메일", name: "email", type: "email" },
            { label: "지역 (예: 강남구)", name: "region", type: "text" },
            { label: "식수 (하루 식수)", name: "meals", type: "number" }
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label style={{ fontSize: "18px", fontWeight: "bold" }}>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", fontSize: "16px", marginTop: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
              />
            </div>
          ))}

          {/* 기간 선택 */}
          <div>
            <label style={{ fontSize: "18px", fontWeight: "bold" }}>기간 (주 단위)</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", fontSize: "16px", marginTop: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
            >
              <option value="">선택하세요</option>
              <option value="1주">1주 (트라이얼)</option>
              <option value="2주">2주</option>
              <option value="4주">4주</option>
            </select>
          </div>

          {/* 원하는 메뉴 */}
          <div>
            <label style={{ fontSize: "18px", fontWeight: "bold" }}>원하는 메뉴 (자유 기재)</label>
            <input
              type="text"
              name="menu"
              value={formData.menu}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", fontSize: "16px", marginTop: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
          </div>

          {/* 신청 버튼 */}
          <button type="submit" style={{ padding: "14px", backgroundColor: "#3C8050", color: "#fff", fontSize: "18px", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            신청하기
          </button>
        </form>
      </section>

      {/* ✅ 문의 정보 */}
      <section style={{ marginTop: "60px", textAlign: "center" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>문의 및 상담</h2>
        <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
          ☎️ 전화번호: <a href="tel:070-4027-7880" style={{ color: "#3C8050", textDecoration: "none" }}>070-4027-7880</a><br />
          ✉️ 이메일: <a href="mailto:bcmoon@dosikitchen.com" style={{ color: "#3C8050", textDecoration: "none" }}>bcmoon@dosikitchen.com</a>
        </p>
      </section>

      {/* ✅ OUTPOST 오픈 안내 */}
      <section style={{ marginTop: "80px", textAlign: "center" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
          OUTPOST는 곧 정식 오픈합니다!
        </h2>
        <p style={{ fontSize: "18px" }}>
          샐시 커뮤니티에서 건강과 즐거움을 함께 누려요!
        </p>
      </section>
    </div>
  );
}
