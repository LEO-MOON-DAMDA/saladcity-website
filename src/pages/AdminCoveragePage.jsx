import React, { useState, useEffect } from "react";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import "./AdminCoveragePage.css";

const AdminCoveragePage = () => {
  const [regions, setRegions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRegion, setNewRegion] = useState(null);

  const fetchRegions = async () => {
    const cityOrder = {
      "서울특별시": 0,
      "성남시": 1,
      "과천시": 2,
      "하남시": 3
    };

    const { data, error } = await supabaseOutpost.from("delivery_coverage").select("*");
    if (!error) {
      const sorted = [...data].sort((a, b) => {
        const statusRank = (s) => (s === "운영 중" ? 0 : 1);
        const r1 = statusRank(a.status);
        const r2 = statusRank(b.status);
        if (r1 !== r2) return r1 - r2;

        if ((a.min_meals || 9999) !== (b.min_meals || 9999)) {
          return (a.min_meals || 9999) - (b.min_meals || 9999);
        }

        return (cityOrder[a.region_city] ?? 99) - (cityOrder[b.region_city] ?? 99);
      });
      setRegions(sorted);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const handleFieldUpdate = async (id, field, value) => {
    const { error } = await supabaseOutpost.from("delivery_coverage").update({ [field]: value }).eq("id", id);
    if (!error) fetchRegions();
  };

  const handleToggleArrayField = async (id, field, value, currentArray) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    await handleFieldUpdate(id, field, newArray);
  };

  const handleDelete = async (id) => {
    const { error } = await supabaseOutpost.from("delivery_coverage").delete().eq("id", id);
    if (!error) fetchRegions();
  };

  const handleAdd = async () => {
    if (!newRegion?.region_gu) return;
    const { error } = await supabaseOutpost.from("delivery_coverage").insert([newRegion]);
    if (!error) {
      setNewRegion(null);
      fetchRegions();
    }
  };

  const getBadge = (memo) => {
    if (memo?.includes("즉시 결제")) return <span className="badge badge-green">결제 유도 대상</span>;
    if (memo?.includes("30식 이상")) return <span className="badge badge-yellow">조건부 가능</span>;
    return <span className="badge badge-gray">리드 전용</span>;
  };

  const renderRow = (r) => {
    const isEditing = editingId === r.id;
    return (
      <tr key={r.id} className="nowrap">
        {isEditing ? (
          <>
            <td>{r.region_city || '-'}</td>
            <td>{r.region_gu || '-'}</td>
            <td>{r.region_dong || '-'}</td>
            <td><input type="number" value={r.min_meals} onChange={(e) => handleFieldUpdate(r.id, "min_meals", parseInt(e.target.value))} /></td>
            <td>
              {"월화수목금".split("").map((day) => (
                <label key={day} style={{ marginRight: 6 }}>
                  <input type="checkbox" checked={r.days?.includes(day)} onChange={() => handleToggleArrayField(r.id, "days", day, r.days || [])} />{day}
                </label>
              ))}
            </td>
            <td>
              {"아침점심저녁".match(/.{2}/g).map((time) => (
                <label key={time} style={{ marginRight: 6 }}>
                  <input type="checkbox" checked={r.times?.includes(time)} onChange={() => handleToggleArrayField(r.id, "times", time, r.times || [])} />{time}
                </label>
              ))}
            </td>
            <td>
              <select value={r.status || ""} onChange={(e) => handleFieldUpdate(r.id, "status", e.target.value)}>
                <option value="">-</option>
                <option value="운영 중">운영 중</option>
                <option value="보류">보류</option>
                <option value="예정">예정</option>
              </select>
            </td>
            <td><input value={r.memo || ""} onChange={(e) => handleFieldUpdate(r.id, "memo", e.target.value)} /></td>
            <td>{getBadge(r.memo)}</td>
            <td><button onClick={() => handleFieldUpdate(r.id, "active", !r.active)}>{r.active ? "✅" : "❌"}</button></td>
            <td><button onClick={() => setEditingId(null)}>저장</button></td>
          </>
        ) : (
          <>
            <td>{r.region_city || '-'}</td>
            <td>{r.region_gu || '-'}</td>
            <td>{r.region_dong || '-'}</td>
            <td>{r.min_meals}</td>
            <td>{(r.days || []).join(", ")}</td>
            <td>{(r.times || []).join(", ")}</td>
            <td>{r.status}</td>
            <td>{r.memo}</td>
            <td>{getBadge(r.memo)}</td>
            <td>{r.active ? "✅" : "❌"}</td>
            <td><button onClick={() => setEditingId(r.id)}>수정</button></td>
          </>
        )}
      </tr>
    );
  };

  return (
    <div className="coverage-container" style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <h2>🚚 Outpost 배송 가능 지역 설정</h2>

      <button onClick={() => setNewRegion({
        region_city: "",
        region_gu: "",
        region_dong: "",
        min_meals: 15,
        days: [],
        times: [],
        active: true,
        memo: "",
        status: "",
      })}>
        ➕ 추가
      </button>

      {newRegion && (
        <table className="coverage-table">
          <tbody>
            <tr>
              <td><input name="region_city" value={newRegion.region_city} onChange={(e) => setNewRegion({ ...newRegion, region_city: e.target.value })} /></td>
              <td><input name="region_gu" value={newRegion.region_gu} onChange={(e) => setNewRegion({ ...newRegion, region_gu: e.target.value })} /></td>
              <td><input name="region_dong" value={newRegion.region_dong} onChange={(e) => setNewRegion({ ...newRegion, region_dong: e.target.value })} /></td>
              <td><input type="number" name="min_meals" value={newRegion.min_meals} onChange={(e) => setNewRegion({ ...newRegion, min_meals: parseInt(e.target.value) })} /></td>
              <td>{"월화수목금".split("").map((day) => (
                <label key={day}><input type="checkbox" checked={newRegion.days.includes(day)} onChange={() => setNewRegion({ ...newRegion, days: newRegion.days.includes(day) ? newRegion.days.filter(d => d !== day) : [...newRegion.days, day] })} />{day}</label>
              ))}</td>
              <td>{"아침점심저녁".match(/.{2}/g).map((time) => (
                <label key={time}><input type="checkbox" checked={newRegion.times.includes(time)} onChange={() => setNewRegion({ ...newRegion, times: newRegion.times.includes(time) ? newRegion.times.filter(t => t !== time) : [...newRegion.times, time] })} />{time}</label>
              ))}</td>
              <td><input name="status" value={newRegion.status} onChange={(e) => setNewRegion({ ...newRegion, status: e.target.value })} /></td>
              <td><input name="memo" value={newRegion.memo} onChange={(e) => setNewRegion({ ...newRegion, memo: e.target.value })} /></td>
              <td colSpan={2}><button onClick={handleAdd}>등록</button></td>
            </tr>
          </tbody>
        </table>
      )}

      <table className="coverage-table nowrap">
        <thead>
          <tr>
            <th>시</th>
            <th>구</th>
            <th>동</th>
            <th>최소식수</th>
            <th>요일</th>
            <th>시간대</th>
            <th>상태</th>
            <th>메모</th>
            <th>적용구분</th>
            <th>활성</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {editingId === null ? (
            regions.map(renderRow)
          ) : (
            regions.filter((r) => r.id === editingId).map(renderRow)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCoveragePage;
