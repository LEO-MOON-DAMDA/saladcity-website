import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseOutpost } from "../utils/supabaseOutpostClient"; // 상단에 추가
import "../components/cta-subscribe-button.css";
import "../components/BrandButton.css";
import "./OutpostQuestionnaire.css";

const cities = {
  "서울특별시": [
    "강남구", "서초구", "송파구", "관악구", "성동구", "용산구", "양천구", "강동구", "영등포구",
    "강북구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구",
    "마포구", "서대문구", "성북구", "은평구", "종로구", "중구", "중랑구"
  ],
  "성남시": ["분당구", "수정구", "중원구"],
  "과천시": ["갈현동", "별양동", "부림동", "중앙동", "문원동"],
  "하남시": ["위례동", "신장동", "덕풍동", "풍산동", "망월동", "감일동", "초이동", "춘궁동"]
};

export default function OutpostQuestionnaire() {
  const navigate = useNavigate();
  const [regionCity, setRegionCity] = useState("");
  const [regionGu, setRegionGu] = useState("");
  const [regionDong, setRegionDong] = useState("");
  const [meals, setMeals] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const fullRegion = `${regionCity} ${regionGu} ${regionDong}`.trim();
    const trimmedMeals = parseInt(meals);

    // ✅ 1차 조건: 30인 이상이면 드롭다운 지역 여부만으로 통과
    if (trimmedMeals >= 30) {
      const allRegions = Object.entries(cities).flatMap(([city, gus]) => gus.map(gu => ({ city, gu })));
      const isKnownRegion = allRegions.some(r => r.city === regionCity && r.gu === regionGu);

      if (isKnownRegion) {
        setResult(`✅ 지금 이 조건이라면 샐시가 바로 준비할 수 있어요!
당신의 공간으로 건강한 식사가 향합니다 🙌`);
        setSubmitting(false);
        return;
      }
    }

const { data: coverageArray } = await supabaseOutpost
  .from("delivery_coverage")
  .select("*")
  .eq("region_city", regionCity)
  .eq("region_gu", regionGu)
  .limit(1);

    console.log("[DEBUG] regionCity:", regionCity);
console.log("[DEBUG] regionGu:", regionGu);
console.log("[DEBUG] coverageArray:", coverageArray);
const coverage = coverageArray?.[0];


    if (!coverage) {
      setResult(`❌ 아직 이 지역은 샐시가 준비 중이에요. 조만간 찾아갈게요!`);
      setSubmitting(false);
      return;
    }

    if (!coverage.active || coverage.status !== "운영 중") {
      setResult(`❌ 이 지역은 현재 운영 중이 아니에요. 준비가 되는 대로 다시 찾아올게요!`);
      setSubmitting(false);
      return;
    }

    if (trimmedMeals < coverage.min_meals) {
      setResult(`📦 ${coverage.region_gu} 지역은 최소 ${coverage.min_meals}식 이상부터 가능해요!
샐시는 가능한 조건에서만 최상의 컨디션으로 요리를 준비합니다. 우린 꼭 만나야 한다고 생각해요. 남겨주신 연락처로, 샐시가 연구해서 만날 방법을 가지고 연락드릴게요 🙏`);
      setSubmitting(false);
      return;
    }

    if (trimmedMeals === 1) {
      setResult(`😊 계신 지역은 15인 이상 OUTPOST 신청하시면, 우리 만날 수 있어요!
샐시가 가끔 1인 샐시도 열어요. 건강한 하이엔드 루틴, 함께 열어보아요!`);
    } else {
      setResult(`✅ “Connected 🎉
여긴 샐시가 도착 가능한 지역이에요.
새로운 루틴, 오늘부터 샐시랑 함께해요 💚” 🙌`);
    }

    setSubmitting(false);
  };

  const handleSelect = (peopleType) => {
    if (peopleType === "group") {
      navigate("/outpost/group-flow");
    } else if (peopleType === "single") {
      navigate("/outpost/single");
    }
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundImage:
              "url('https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/outpost/outpost003.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        />
        <div
          style={{
            flex: 1,
            backgroundImage:
              "url('https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/outpost/outpost004.webp')",
            backgroundSize: "cover",
            backgroundPosition: "30% center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: "48px 36px",
            borderRadius: "24px",
            boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "26px", fontWeight: "bold", color: "#3C8050", marginBottom: "24px", lineHeight: "1.4" }}>
            지금 시작하면 <span style={{ color: "#FF5722" }}><br />랜덤박스 증정</span><br />
            당신의 OUTPOST를 열어보세요
          </h1>
          <p style={{ fontSize: "18px", color: "#555", marginBottom: "40px" }}>
            함께하는 팀 정기배송을 신청하거나,<br />
            혼자만의 건강한 루틴을 시작하세요.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <button onClick={() => handleSelect("group")} className="cta-subscribe-button">
              🏢 팀 배송 신청하기 
            </button>
            <button onClick={() => handleSelect("single")} className="brand-button">
              🌿 나만의 루틴 시작하기 (1인)
            </button>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#f4f9f4", padding: "80px 20px 120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ fontSize: "24px", color: "#3C8050", textAlign: "center", marginBottom: "32px" }}>
          우리 공간, 샐시가 방문 가능한가요?
        </h2>

        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "420px" }}>
          <select value={regionCity} onChange={(e) => { setRegionCity(e.target.value); setRegionGu(""); }} required style={{ width: "100%", padding: "12px", marginBottom: "14px" }}>
            <option value="">시/도 선택</option>
            {Object.keys(cities).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          {regionCity && (
            <select value={regionGu} onChange={(e) => setRegionGu(e.target.value)} required style={{ width: "100%", padding: "12px", marginBottom: "14px" }}>
              <option value="">구/군 선택</option>
              {cities[regionCity].map((gu) => (
                <option key={gu} value={gu}>{gu}</option>
              ))}
            </select>
          )}

          {(regionCity === "기타") && (
            <input
              type="text"
              placeholder="동 입력 (선택)"
              value={regionDong}
              onChange={(e) => setRegionDong(e.target.value)}
              style={{ width: "100%", padding: "12px", marginBottom: "14px" }}
            />
          )}

          <input type="number" placeholder="하루 예상 식수량 (숫자만 입력)" value={meals} onChange={(e) => setMeals(e.target.value)} style={{ width: "100%", padding: "12px", marginBottom: "14px" }} required />
          <input type="email" placeholder="이메일 주소 (필수)" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "12px", marginBottom: "14px" }} required />
          <button type="submit" className="cta-subscribe-button" style={{ width: "100%" }} disabled={submitting}>
            {submitting ? "확인 중..." : "서비스 가능 여부 확인하기"}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: "24px", fontSize: "16px", color: "#3C8050", whiteSpace: "pre-line" }}>
            {result}
            <div style={{ marginTop: "12px", color: "#555", fontSize: "14px" }}>
              입력하신 지역: <strong>{`${regionCity} ${regionGu} ${regionDong}`}</strong><br />
              하루 식수 예상: <strong>{meals}식</strong><br />
              이메일: <strong>{email}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
