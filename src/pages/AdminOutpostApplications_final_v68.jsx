import React, { useEffect, useState } from "react";
import { fetchOutpostApplications, updateOutpostApplicationStatus } from "../apis/outpostApplications";
import { utils, writeFile } from "xlsx";
import "./AdminOutpostApplications.css";

export default function AdminOutpostApplications() {
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("전체");
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const loadApplications = async () => {
    try {
      const data = await fetchOutpostApplications();
      setApplications(data);
    } catch (error) {
      console.error("❌ 신청 리스트 불러오기 실패", error.message);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchKeyword(searchInput);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchInput]);

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = filterStatus === "전체" || app.status === filterStatus;
    const matchesKeyword = app.storeAddress?.includes(searchKeyword) || app.memo?.includes(searchKeyword);
    return matchesStatus && matchesKeyword;
  });

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateOutpostApplicationStatus(id, newStatus);
      alert(`✅ ${newStatus} 처리 완료`);
      loadApplications();
    } catch (error) {
      console.error("❌ 상태 업데이트 실패", error.message);
      alert("❌ 상태 업데이트 실패");
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = utils.json_to_sheet(
      filteredApplications.map((app) => ({
        신청일: app.created_at?.slice(0, 10),
        구분: app.type || "단체",
        주소: app.storeAddress,
        식사시간: app.mealTime || "-",
        기간: app.period || "-",
        인원: app.peopleCount || "명",
        상태: app.status,
        요청사항: app.memo || "-",
      }))
    );
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "OutpostApplications");

    const today = new Date().toISOString().slice(0, 10);
    writeFile(workbook, `outpost_applications_${today}.xlsx`);
  };

  return (
    <div className="admin-outpost-applications">
      <h1>OUTPOST 신청 관리</h1>

      <div className="filter-bar">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="전체">전체</option>
          <option value="승인">승인</option>
          <option value="거절">거절</option>
          <option value="대기">대기</option>
        </select>

        <div className="search-box">
          <input
            type="text"
            placeholder="주소 또는 요청사항 검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button className="clear-button" onClick={() => setSearchInput("")}>
              ✕
            </button>
          )}
        </div>

        <button className="download-button" onClick={handleDownloadExcel}>
          📥 엑셀 다운로드
        </button>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="no-results">검색 결과가 없습니다.</div>
      ) : (
        <table className="application-table">
          <thead>
            <tr>
              <th>선택</th>
              <th>신청일</th>
              <th>구분</th>
              <th>주소</th>
              <th>식사시간</th>
              <th>기간</th>
              <th>인원</th>
              <th>상태</th>
              <th>요청사항</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id}>
                <td><input type="checkbox" /></td>
                <td>{app.created_at?.slice(0, 10)}</td>
                <td>{app.type || "단체"}</td>
                <td>{app.storeAddress}</td>
                <td>{app.mealTime || "-"}</td>
                <td>{app.period || "-"}</td>
                <td>{app.peopleCount || "명"}</td>
                <td>{app.status}</td>
                <td>{app.memo || "-"}</td>
                <td>
                  {app.status === "대기" && (
                    <>
                      <button onClick={() => handleUpdateStatus(app.id, "승인")}>승인</button>
                      <button onClick={() => handleUpdateStatus(app.id, "거절")} style={{ marginLeft: "8px" }}>
                        거절
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
