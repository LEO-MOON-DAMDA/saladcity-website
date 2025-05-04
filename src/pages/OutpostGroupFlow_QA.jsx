<<<<<<< HEAD
// ✅ OutpostGroupFlow.jsx (with friendly UX for 요일/시간/기간/전화번호)
import React, { useState, useMemo, useEffect } from "react";
import { supabaseMenu } from "../utils/supabaseMenuClient";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import "./OutpostGroupFlow.css";
import { useNavigate } from "react-router-dom";
import { saveOutpostLead } from "../apis/saveLead";
import "../components/cta-subscribe-button.css";
import "./OutpostGroupFlow_QA.css";


const supabaseUrl = process.env.REACT_APP_SUPABASE_MENU_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_MENU_KEY;


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


function getNextMonday(baseDate = new Date()) {
  const day = baseDate.getDay();
  const daysUntilNextMonday = day <= 4 ? ((8 - day) % 7 || 7) : ((15 - day) % 7 || 7); // 목요일까지는 차주, 금요일 이후는 차차주
  const start = new Date(baseDate);
  start.setDate(start.getDate() + daysUntilNextMonday);
  return start;
}

function formatDateRange(startDate, weeks) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + (weeks * 7) - 1);
  const format = (d) => d.toISOString().slice(0, 10);
  return `${format(startDate)} ~ ${format(endDate)}`;
}


export default function OutpostGroupFlow() {
   const navigate = useNavigate(); // ✅ 추가
    const [weekday, setWeekday] = useState("");
  const [nextMonday, setNextMonday] = useState(getNextMonday(new Date()));

  useEffect(() => {
    if (!weekday) return;
    const today = new Date();
    const clientWeekday = today.getDay();
    const isLateWeek = clientWeekday >= 5; // 금(5), 토(6), 일(0)
    const base = isLateWeek ? new Date(today.setDate(today.getDate() + 7)) : today;
    setNextMonday(getNextMonday(base));
  }, [weekday]);
  const [regionCity, setRegionCity] = useState("");
  const [regionGu, setRegionGu] = useState("");
  const [meals, setMeals] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
    let formatted = raw;
    if (raw.startsWith("010")) {
      if (raw.length <= 3) formatted = raw;
      else if (raw.length <= 7) formatted = raw.slice(0, 3) + "-" + raw.slice(3);
      else formatted = raw.slice(0, 3) + "-" + raw.slice(3, 7) + "-" + raw.slice(7);
    }
    setPhone(formatted);
  };
  const [duration, setDuration] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [manualWeekday, setManualWeekday] = useState(false);
  const [manualDuration, setManualDuration] = useState(false);
  const [result, setResult] = useState("");
  const [canProceed, setCanProceed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

const handleCheck = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  const trimmedMeals = parseInt(meals, 10);

  // 유효성 검사
  if (!regionCity || !regionGu || !email || isNaN(trimmedMeals) || trimmedMeals < 1) {
    setResult("❌ 모든 항목을 정확히 입력해주세요.");
    setSubmitting(false);
    return;
  }

  const allRegions = Object.entries(cities).flatMap(([city, gus]) => gus.map(gu => ({ city, gu })));
  const isKnownRegion = allRegions.some(r => r.city === regionCity && r.gu === regionGu);

  // ✅ leads 저장 - 안정적인 방식으로 교체
  try {
   await saveOutpostLead({
  type: "group",
  region_city: regionCity,
  region_gu: regionGu,
  meals: trimmedMeals,
  email,
  status: "pending",
  created_at: new Date().toISOString()
});
  } catch (error) {
    console.error("❌ 저장 실패:", error);
    setResult("😥 저장에 실패했어요. 다시 시도해주세요!");
    setSubmitting(false);
    return;
  }


  // ✅ 조건 판단
  if (trimmedMeals >= 30 && isKnownRegion) {
    setResult(`✅ 지금 샐시가 바로 준비할 수 있어요!
당신의 공간으로 건강한 식사가 향합니다 🙌`);
    setCanProceed(true);
    setSubmitting(false);
    return;
  }

  try {
    const { data: coverageArray, error } = await supabaseOutpost
      .from("delivery_coverage")
      .select("*")
      .eq("region_city", regionCity)
      .eq("region_gu", regionGu)
      .limit(1);

    if (error) throw error;

    const coverage = coverageArray?.[0];

    if (!coverage) {
      setResult("❌ 아직 이 지역은 샐시가 준비 중이에요. 조만간 찾아갈게요!");
      setCanProceed(false);
      setSubmitting(false);
      return;
    }

    if (!coverage.active || coverage.status !== "운영 중") {
      setResult("❌ 이 지역은 현재 운영 중이 아니에요. 준비가 되는 대로 다시 찾아올게요!");
      setCanProceed(false);
      setSubmitting(false);
      return;
    }

    if (trimmedMeals < coverage.min_meals) {
      setResult(`${coverage.region_gu} 지역은 ${coverage.min_meals}인 이상 OUTPOST 신청하시면, 우리 만날 수 있어요!
샐시는 가능한 조건에서만 최상의 컨디션으로 요리를 준비합니다.
우린 꼭 만나야 해요. 남겨주신 연락처로, 샐시가 연구해서 만날 방법을 가지고 연락드릴게요 🙏`);
      setCanProceed(false);
      setSubmitting(false);
      return;
    }

    if (trimmedMeals === 1) {
      setResult(`${coverage.region_gu} 지역은 ${coverage.min_meals}인 이상 OUTPOST 신청하시면, 우리 만날 수 있어요!
샐시가 가끔 1인 샐시도 열어요. 건강한 하이엔드 루틴, 함께 열어보아요!`);
      setCanProceed(false);
      setSubmitting(false);
      return;
    }

    setResult(`✅ 지금 샐시가 바로 준비할 수 있어요!
당신의 공간으로 건강한 식사가 향합니다 🙌`);
    setCanProceed(true);
    setSubmitting(false);
  } 

    catch (err) {
    console.error("Supabase Error:", err);
    setResult("😥 예상치 못한 문제가 발생했어요. 잠시 후 다시 시도해주세요!");
    setCanProceed(false);
    setSubmitting(false);
  }
};




const handleFinalSubmit = async (e) => {
  e.preventDefault();

  if (!weekday || !duration || !timeslot || !phone) {
    alert("모든 항목을 입력해주세요!");
    return;
  }

  const today = new Date().toISOString().slice(0, 10);

  try {
    const { data: existing, error: selectError } = await supabaseMenu
      .from("outpost_leads")
      .select("id")
      .eq("email", email)
      .gte("created_at", `${today}T00:00:00`)
      .lt("created_at", `${today}T23:59:59`);

    if (selectError) throw selectError;

    if (existing && existing.length > 0) {
      const leadId = existing[0].id;

      const { error: updateError } = await supabaseMenu
        .from("outpost_leads")
        .update({
          weekday,
          duration,
          timeslot,
          phone
        })
        .eq("id", leadId);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabaseMenu
        .from("outpost_leads")
        .insert([{
          region_city: regionCity,
          region_gu: regionGu,
          meals: parseInt(meals),
          email,
          weekday,
          duration,
          timeslot,
          phone,
          created_at: new Date().toISOString()
        }]);

      if (insertError) throw insertError;
    }

    navigate("/outpost/group-summary", {
      state: {
        address: `${regionCity} ${regionGu}`,
        time: timeslot,
        startDate: today,
        endDate: "", // 필요하면 계산해서 넣어
        peopleCount: parseInt(meals),
        menuType: "샐시표 샐러드",
        request: ""
      }
    });
  } catch (err) {
    console.error("❌ 처리 실패:", err);
    alert("저장 중 문제가 발생했어요. 다시 시도해주세요!");
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
          단체 OUTPOST 신청
        </h1>

        <form className="outpost-group-form" onSubmit={handleCheck} style={{ marginTop: '40px', maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <select
            value={regionCity}
            onChange={(e) => {
              setRegionCity(e.target.value);
              setRegionGu("");
            }}
            required
          >
            <option value="">시/도 선택</option>
            {Object.keys(cities).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          {regionCity && (
            <select
              value={regionGu}
              onChange={(e) => setRegionGu(e.target.value)}
              required
            >
              <option value="">구/군 선택</option>
              {cities[regionCity].map((gu) => (
                <option key={gu} value={gu}>{gu}</option>
              ))}
            </select>
          )}
        <input type="number" placeholder="하루 식수 (숫자만)" value={meals} onChange={(e) => setMeals(e.target.value)} required />
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit" className="cta-subscribe-button" style={{ backgroundColor: "#a8f028", color: "#000", width: "100%" }} disabled={submitting}>
          {submitting ? "확인 중..." : "서비스 가능 여부 확인"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "24px", whiteSpace: "pre-line", textAlign: "center", fontWeight: 500 }}>
          {result}
        </div>
      )}

    {/* 2차 입력 폼 */}
      {canProceed && (
  <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center" }}>
        <form className="outpost-group-form" onSubmit={handleFinalSubmit} style={{ marginTop: '40px', maxWidth: '400px', width: '100%', margin: '0 auto' }}>

       <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>이제 본격 준비를 시작합니다 🥗</h3>

          <label style={{ textAlign: 'left', width: '100%' }}>
            희망 요일 <span style={{ fontSize: '0.75rem', color: '#666' }}>(샐시는 주 5회 추천! 😋)</span>
            {manualDuration && !manualWeekday && (
              <span style={{ color: '#cc4c00', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginTop: '4px' }}>
                선택한 기간에 따라 자동으로 요일이 설정되었습니다
              </span>
              
            )}
            <select value={weekday} onChange={(e) => {
              const selected = e.target.value;
              setWeekday(selected);
              setManualWeekday(true);
              if (selected === "월-금") setDuration("2주");
              else if (selected === "월-목") setDuration("3주");
              else if (selected === "월-수-금") setDuration("4주");
            }} required style={{ width: '100%' }}>
              <option value="">요일 선택</option>
              <option value="월-금">주5일 (월~금)</option>
              <option value="월-목">주4일 (월~목)</option>
              <option value="월-수-금">주3일 (월수금)</option>
            </select>
          </label>

          <label style={{ textAlign: 'left', width: '100%' }}>
  희망 기간 <span style={{ fontSize: '0.75rem', color: '#666' }}>(건강 루틴 시작은 2주!)</span>
  {manualWeekday && !manualDuration && (
    <span style={{ color: '#cc4c00', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginTop: '4px' }}>
      선택한 요일에 따라 기간이 자동으로 설정되었습니다
    </span>
  )}

  {weekday && (
    <select
      value={duration}
      onChange={(e) => {
        const selected = e.target.value;
        setDuration(selected);
        setManualDuration(true);
      }}
      required
      style={{ width: '100%' }}
    >
        <option value="">기간 선택</option>
      {weekday === "월-수-금" && [4,5,6,7,8].map((w) => (
        <option key={w} value={`${w}주`}>
          {w}주(주3일) - {formatDateRange(nextMonday, w)} <span style={{ fontSize: '0.75rem', color: '#666' }}> (총{w * 3}회)</span>  
        </option>
      ))}
      {weekday === "월-목" && [3,4,5,6,7,8].map((w) => (
        <option key={w} value={`${w}주`}>
          {w}주(주4일) - {formatDateRange(nextMonday, w)} <span style={{ fontSize: '0.75rem', color: '#666' }}>(총{w * 4}회)</span>
        </option>
      ))}
      {weekday === "월-금" && [2, 3, 4, 5, 6, 7, 8].map((w) => (
              <option key={`w5-${w}`} value={`${w}주`}>
                {w}주(주5일) - {formatDateRange(nextMonday, w)} <span style={{ fontSize: '0.75rem', color: '#666' }}>(총{w * 5}회)</span>
              </option>
            ))}
    </select>
  )}
</label>

          <label style={{ textAlign: 'left', width: '100%' }}>
            희망 시간대 <span style={{ fontSize: '0.75rem', color: '#666' }}>(샐시 도착시간 기준이예욥!)</span>
            <select value={timeslot} onChange={(e) => setTimeslot(e.target.value)} required style={{ width: '100%' }}>
              <option value="">시간 선택</option>
              <option value="아침">아침 (7~8시)</option>
              <option value="점심">점심 (11~12시)</option>
              <option value="저녁">저녁 (18~19시)</option>
            </select>
          </label>

          <label style={{ textAlign: 'left', width: '100%' }}>
             전화번호 <span style={{ fontSize: '0.75rem', color: '#666' }}>(추가 연락용)</span>
            <input type="tel" placeholder="010-xxxx-xxxx" value={phone} onFocus={(e) => { if (!phone.startsWith('010')) setPhone('010-'); }} onChange={handlePhoneChange}
              required
              style={{ width: '100%' }}
            />
          </label>

         
          <button type="submit" style={{ backgroundColor: '#3C8050' }}>입력 완료하고 다음으로</button>
        </form>
       </div>
      )}
    </div>
</div>
</div>

  );
}
 
=======
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
>>>>>>> 9cf97b99 (Fix: QA 파일 및 App 라우트 정리, 배포 안정화)
