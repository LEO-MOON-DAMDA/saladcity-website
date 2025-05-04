import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveOutpostApplication } from "../apis/saveApplication";
import "../components/cta-subscribe-button.css";
import "./OutpostGroupFlow_QA.css";


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
    <div style={{    display: "flex",
    width: "100vw",
    overflow: "hidden",
    top: 0,
    left: 0,
    zIndex: -2,}}>
      {/* ✅ 배경 이미지 좌우 분할 */}
      <div
        style={{
                 flex: 1,
      	    position: "absolute",
        	    top: 0,
        	    left: 0,
        	    width: "50%",
   	    height: "80%",
          backgroundImage:
            "url('https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/outpost/outpost003.webp')",
		backgroundSize: "cover",         // 📌 꽉 채움 (잘릴 수 있음)
		backgroundPosition: "center",    // 📌 중앙 정렬
		backgroundRepeat: "no-repeat",
		width: "50%",
		minHeight: "100vh",              // 📌 최소 높이
		maxHeight: "140vh",              // 📌 너무 커지는 거 방지
		padding: "20px",
        }}
      />
      <div
        style={{
  flex: 1,
          position: "absolute",
          top: 0,
          left: "50%",
          width: "50%",
          height: "80%",
          backgroundImage:
            "url('https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/outpost/outpost004.webp')",
      		backgroundSize: "cover",         // 📌 꽉 채움 (잘릴 수 있음)
		  backgroundPosition: "30% center", // ✅ 여기만 변경
		backgroundRepeat: "no-repeat",
		width: "50%",
		minHeight: "100vh",              // 📌 최소 높이
		maxHeight: "140vh",              // 📌 너무 커지는 거 방지
		padding: "20px",
        }}
      />

      {/* ✅ 입력 폼 컨테이너 */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          minHeight: "50vh",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "rgba(255,255,255,0.6)",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "#3C8050" }}>
          단체 OUTPOST 신청 정보를 입력해주세요
        </h1>

        <div style={{ width: "70%", display: "flex", flexDirection: "column", gap: "5px" }}>
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
          <textarea
            name="request"
            value={form.request}
            onChange={handleChange}
            placeholder="📝 요청사항 (선택사항)"
            style={{ ...inputStyle, minHeight: "100px" }}
          />

          <button
            onClick={handleSubmit}
            className="cta-subscribe-button"
            style={{ marginTop: "10px", fontSize: "17px", whiteSpace: "nowrap" }}
          >
            🎁 샐러드시티 특별 혜택 받기
          </button>

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
              }}
            >
              🎉 신청 완료! 샐러드시티 특별 혜택이 준비되었습니다!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "14px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
};
