import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OutpostGroupSummary.css"; // 전용 CSS

function OutpostGroupSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state || {};

  const {
    address = "주소 정보 없음",
    time = "시간 정보 없음",
    startDate = "시작일 없음",
    endDate = "종료일 없음",
    peopleCount = "-",
    menuType = "샐러드",
    request = "",
  } = form;

  return (
    <div className="group-summary-wrapper">
      <div className="group-summary-inner">
        <h1 className="group-summary-title">🌱 신청이 완료되었어요!</h1>
        <p className="group-summary-subtext">
          샐시는 매일 아침 최고의 컨디션으로 준비해요. <br />
          아래 정보를 확인해 주세요 😊
        </p>

        <div className="group-summary-card">
          <ul className="group-summary-list">
            <li><strong>주소:</strong> {address}</li>
            <li><strong>인원:</strong> {peopleCount}명</li>
            <li><strong>기간:</strong> {startDate} ~ {endDate}</li>
            <li><strong>희망 시간대:</strong> {time}</li>
            <li><strong>식단:</strong> {menuType}</li>
            {request && <li><strong>요청사항:</strong> {request}</li>}
          </ul>
        </div>

        <div className="group-summary-buttons">
          <button className="primary" onClick={() => navigate("/outpost/complete")}>
            샐시 만나러 가기 🚀
          </button>
          <button className="secondary" onClick={() => navigate("/outpost/questionnaire")}>
            처음부터 다시 입력하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default OutpostGroupSummary;
