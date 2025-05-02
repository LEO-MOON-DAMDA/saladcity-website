import React, { useState, useEffect } from "react";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import "./AdminCoveragePage.css";

const AdminCoveragePage = () => {
  const [regions, setRegions] = useState([]);
  const [newRegion, setNewRegion] = useState({
    region: "",
    min_meals: 15,
    days: [],
    times: [],
    active: true,
    memo: "",
    status: "",
  });

  const fetchRegions = async () => {
    const { data, error } = await supabaseOutpost
      .from("delivery_coverage")
      .select("*")
      .order("region", { ascending: true });
    if (!error) setRegions(data);
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "days" || name === "times") {
      setNewRegion((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }));
    } else if (type === "checkbox") {
      setNewRegion((prev) => ({ ...prev, [name]: checked }));
    } else {
      setNewRegion((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAdd = async () => {
    if (!newRegion.region) return;
    const { error } = await supabaseOutpost.from("delivery_coverage").insert([newRegion]);
    if (!error) {
      setNewRegion({
        region: "",
        min_meals: 15,
        days: [],
        times: [],
        active: true,
        memo: "",
        status: "",
      });
      fetchRegions();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabaseOutpost.from("delivery_coverage").delete().eq("id", id);
    if (!error) fetchRegions();
  };

  const handleToggle = async (id, current) => {
    const { error } = await supabaseOutpost
      .from("delivery_coverage")
      .update({ active: !current })
      .eq("id", id);
    if (!error) fetchRegions();
  };

  const handleMemoChange = async (id, value) => {
    const { error } = await supabaseOutpost
      .from("delivery_coverage")
      .update({ memo: value })
      .eq("id", id);
    if (!error) fetchRegions();
  };

  const handleStatusChange = async (id, value) => {
    const { error } = await supabaseOutpost
      .from("delivery_coverage")
      .update({ status: value })
      .eq("id", id);
    if (!error) fetchRegions();
  };

  return (
    <div className="coverage-container">
      <h2>🚚 Outpost 배송 가능 지역 설정</h2>

      <div className="coverage-form">
        <input
          name="region"
          placeholder="지역명 (예: 강남구)"
          value={newRegion.region}
          onChange={handleChange}
        />
        <input
          name="min_meals"
          type="number"
          placeholder="최소 식수"
          value={newRegion.min_meals}
          onChange={handleChange}
          style={{ width: "100px" }}
        />
        <label>
          요일:
          {["월", "화", "수", "목", "금"].map((day) => (
            <label key={day}>
              <input
                type="checkbox"
                name="days"
                value={day}
                checked={newRegion.days.includes(day)}
                onChange={handleChange}
              />
              {day}
            </label>
          ))}
        </label>
        <label style={{ marginLeft: "16px" }}>
          시간대:
          {["아침", "점심", "저녁"].map((time) => (
            <label key={time}>
              <input
                type="checkbox"
                name="times"
                value={time}
                checked={newRegion.times.includes(time)}
                onChange={handleChange}
              />
              {time}
            </label>
          ))}
        </label>
        <input
          name="status"
          placeholder="상태 (예: 운영 중)"
          value={newRegion.status}
          onChange={handleChange}
        />
        <input
          name="memo"
          placeholder="메모"
          value={newRegion.memo}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>➕ 추가</button>
      </div>

      <table className="coverage-table">
        <thead>
          <tr>
            <th>지역</th>
            <th>최소식수</th>
            <th>요일</th>
            <th>시간대</th>
            <th>상태</th>
            <th>메모</th>
            <th>활성</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {regions.map((r) => (
            <tr key={r.id}>
              <td>{r.region}</td>
              <td>{r.min_meals}</td>
              <td>{r.days?.join(", ")}</td>
              <td>{r.times?.join(", ")}</td>
              <td>
                <select
                  value={r.status || ""}
                  onChange={(e) => handleStatusChange(r.id, e.target.value)}
                >
                  <option value="">-</option>
                  <option value="운영 중">운영 중</option>
                  <option value="보류">보류</option>
                  <option value="예정">예정</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={r.memo || ""}
                  onChange={(e) => handleMemoChange(r.id, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleToggle(r.id, r.active)}>
                  {r.active ? "✅" : "❌"}
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(r.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCoveragePage;
