import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveOutpostApplication } from "../apis/saveApplication";
import "./OutpostSingleFlow.css";
import "../components/BrandButton.css";

export default function OutpostSingleFlow() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    address: "",
    time: "",
    startDate: "",
    endDate: "",
    menuType: "",
    request: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleNext = async () => {
    if (!form.address || !form.time || !form.startDate || !form.endDate || !form.menuType) {
      alert("😄 정보가 빠지면, 토핑이나 숟가락도 빠질 수 있어요 ㅠ");
      return;
    }
    try {
      await saveOutpostApplication({
        type: "single",
        address: form.address,
        time: form.time,
        start_date: form.startDate,
        end_date: form.endDate,
        people_count: 1,
        menu_type: form.menuType,
        request: form.request,
        status: "pending",
      });
      navigate("/outpost/payment", { state: form });
    } catch (error) {
      alert("😥 정보가 빠지면, 토핑이나 숟가락도 빠질 수 있어요 ㅠ");
    }
  };

  return (
    <div
      className="outpost-single-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        background: "linear-gradient(to bottom, #ffffff, #f9fff9)",
        fontFamily: "Pretendard, sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px", color: "#3C8050" }}>
        나만의 OUTPOST를 위한 정보를 입력해주세요
      </h1>

      <div style={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <input name="address" value={form.address} onChange={handleChange} placeholder="📍 배송받을 주소" style={inputStyle} />
        <select name="time" value={form.time} onChange={handleChange} style={inputStyle}>
          <option value="">🍽️ 식사 시간 선택</option>
          <option value="아침">아침</option>
          <option value="점심">점심</option>
          <option value="저녁">저녁</option>
        </select>
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} style={inputStyle} />
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} style={inputStyle} />
        <select name="menuType" value={form.menuType} onChange={handleChange} style={inputStyle}>
          <option value="">🥗 메뉴 타입 선택</option>
          <option value="Vegan">Vegan</option>
          <option value="Flexitarian">Flexitarian</option>
        </select>
        <textarea name="request" value={form.request} onChange={handleChange} placeholder="📝 요청사항 (선택사항)" style={{ ...inputStyle, minHeight: "100px" }} />
        
        <button
          onClick={handleNext}
          className="brand-button"
          style={{
            marginTop: "30px",
            fontSize: "17px",
            whiteSpace: "nowrap",
          }}
        >
          🚀 다음 단계로
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "14px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};
