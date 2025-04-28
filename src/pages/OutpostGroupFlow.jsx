import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveOutpostApplication } from "../apis/saveApplication";

export default function OutpostGroupFlow() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    address: "",
    time: "",
    startDate: "",
    endDate: "",
    peopleCount: "",
    menuType: "",
    request: "",
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.address || !form.time || !form.startDate || !form.endDate || !form.peopleCount || !form.menuType) {
      alert("😄 정보가 빠지면, 토핑이나 숟가락도 빠질 수 있어요 ㅠ");
      return;
    }
    try {
      await saveOutpostApplication({
        type: "group",
        address: form.address,
        time: form.time,
        start_date: form.startDate,
        end_date: form.endDate,
        people_count: parseInt(form.peopleCount, 10),
        menu_type: form.menuType,
        request: form.request,
        status: "pending",
      });
      setSubmissionSuccess(true);
      setTimeout(() => navigate("/outpost/summary", { state: form }), 2000);
    } catch (error) {
      alert("😥 정보가 빠지면, 토핑이나 숟가락도 빠질 수 있어요 ㅠ");
    }
  };

  return (
    <div
      className="outpost-group-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #ffffff, #f9fff9)",
        fontFamily: "Pretendard, sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px", color: "#3C8050" }}>
        단체 OUTPOST 신청 정보를 입력해주세요
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
        <input name="peopleCount" value={form.peopleCount} onChange={handleChange} placeholder="👥 예상 인원수 (예: 20명)" style={inputStyle} />
        <select name="menuType" value={form.menuType} onChange={handleChange} style={inputStyle}>
          <option value="">🥗 메뉴 타입 선택</option>
          <option value="Vegan">Vegan</option>
          <option value="Flexitarian">Flexitarian</option>
          <option value="기타요청">기타 요청</option>
        </select>
        <textarea name="request" value={form.request} onChange={handleChange} placeholder="📝 요청사항 (선택사항)" style={{ ...inputStyle, minHeight: "100px" }} />
        <button onClick={handleSubmit} style={buttonStyle}>
          🎁 샐러드시티 특별 혜택 받기
        </button>

        {/* ✅ 성공 메시지 추가 */}
        {submissionSuccess && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "#eaffea",
              border: "1px solid #b2d8b2",
              borderRadius: "12px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#3C8050",
              textAlign: "center",
              transition: "opacity 0.5s ease",
            }}
          >
            🎉 신청 완료! 샐러드시티 특별 혜택이 준비되었습니다!
          </div>
        )}
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

const buttonStyle = {
  marginTop: "30px",
  padding: "18px",
  fontSize: "20px",
  fontWeight: "bold",
  backgroundColor: "#3C8050",
  color: "#fff",
  border: "none",
  borderRadius: "24px",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
};
