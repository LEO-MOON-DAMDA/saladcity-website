// src/pages/AdminOutpostApplications.jsx
import React, { useEffect, useState } from "react";
import { fetchOutpostApplications, updateOutpostApplicationStatus } from "../apis/outpostApplications";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import { utils, writeFile } from "xlsx";
import "./AdminOutpostApplications.css";

export default function AdminOutpostApplications() {
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("전체");
  const [searchInput, setSearchInput] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const loadApplications = async () => {
    try {
      const data = await fetchOutpostApplications();
      setApplications(data);
      setSelectedIds([]);
    } catch (error) {
      console.error("❌ 신청 리스트 불러오기 실패", error.message);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = filterStatus === "전체" || app.status === filterStatus;
    const matchesKeyword =
      app.address?.includes(searchInput) ||
      app.memo?.includes(searchInput);
    const matchesStartDate = !filterStartDate || new Date(app.created_at) >= new Date(filterStartDate);
    const matchesEndDate = !filterEndDate || new Date(app.created_at) <= new Date(filterEndDate);
    return matchesStatus && matchesKeyword && matchesStartDate && matchesEndDate;
  });

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredApplications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApplications.map((app) => app.id));
    }
  };

  const handleBatchUpdate = async (newStatus) => {
    if (selectedIds.length === 0) {
      alert("❗ 먼저 항목을 선택하세요.");
      return;
    }
    setIsProcessing(true);
    try {
      for (const id of selectedIds) {
        await updateOutpostApplicationStatus(id, newStatus);
      }
      alert(`✅ 선택한 ${selectedIds.length}개를 '${newStatus}' 처리 완료했습니다.`);
      loadApplications();
    } catch (error) {
      console.error("❌ 일괄 상태 업데이트 실패", error.message);
      alert("❌ 일부 상태 업데이트 실패");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = utils.json_to_sheet(
      filteredApplications.map((app) => ({
        신청일: app.created_at?.slice(0, 10),
        구분: app.type || "단체",
        주소: app.address,
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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = async () => {
    const { error } = await supabaseOutpost.auth.signOut();
    if (error) {
      console.error("❌ 로그아웃 실패:", error.message);
      alert("로그아웃 실패");
    } else {
      alert("✅ 로그아웃 성공");
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className={`admin-outpost-applications ${theme}`}>
      <h1>OUTPOST 신청 관리</h1>

      <div className="filter-bar">
        <div className="filter-controls">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            disabled={isProcessing}
            className="filter-select"
          >
            <option value="전체">전체</option>
            <option value="승인">승인</option>
            <option value="거절">거절</option>
            <option value="대기">대기</option>
          </select>

          <input
            type="text"
            placeholder="주소 또는 요청사항 검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={isProcessing}
            className="filter-input"
          />

          <input
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            disabled={isProcessing}
            className="filter-date"
          />

          <input
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            disabled={isProcessing}
            className="filter-date"
          />

          <button className="download-button" onClick={handleDownloadExcel} disabled={isProcessing}>
            📥 엑셀 다운로드
          </button>

          <button className="download-button" onClick={toggleTheme} disabled={isProcessing}>
            {theme === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
          </button>

          <button className="reject-button" onClick={handleLogout} disabled={isProcessing}>
            로그아웃
          </button>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="no-results">검색 결과가 없습니다.</div>
      ) : (
        <table className="application-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredApplications.length && filteredApplications.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
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
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(app.id)}
                    onChange={() => toggleSelect(app.id)}
                    disabled={isProcessing}
                  />
                </td>
                <td>{app.created_at?.slice(0, 10)}</td>
                <td>{app.type || "단체"}</td>
                <td>{app.address}</td>
                <td>{app.mealTime || "-"}</td>
                <td>{app.period || "-"}</td>
                <td>{app.peopleCount || "명"}</td>
                <td>{app.status}</td>
                <td>{app.memo || "-"}</td>
                <td>
                  {app.status === "대기" && (
                    <>
                      <button onClick={() => handleBatchUpdate("승인")} disabled={isProcessing}>
                        승인
                      </button>
                      <button
                        onClick={() => handleBatchUpdate("거절")}
                        style={{ marginLeft: "8px" }}
                        disabled={isProcessing}
                      >
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
