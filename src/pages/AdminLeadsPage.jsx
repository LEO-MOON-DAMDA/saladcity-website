import React, { useEffect, useState } from "react";
import { supabaseMenu } from "../utils/supabaseMenuClient";
import "./AdminLeadsPage.css";

const AdminLeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLeads = async () => {
    const { data, error } = await supabaseMenu
      .from("outpost_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, value) => {
    await supabaseMenu
      .from("outpost_leads")
      .update({ status: value })
      .eq("id", id);
    fetchLeads();
  };

  const handleMemoChange = async (id, value) => {
    await supabaseMenu
      .from("outpost_leads")
      .update({ memo: value })
      .eq("id", id);
    fetchLeads();
  };

  const handleResponseToggle = async (id, current) => {
    await supabaseMenu
      .from("outpost_leads")
      .update({ responded: !current })
      .eq("id", id);
    fetchLeads();
  };

  const filteredLeads = leads.filter((lead) => {
    const regionText = `${lead.region_city || ""} ${lead.region_gu || ""} ${lead.region_dong || ""}`;
    return regionText.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="admin-leads-container">
      <h2>📋 OUTPOST 리드 리스트</h2>

      <input
        type="text"
        placeholder="지역으로 검색 (예: 강남)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="admin-leads-search"
      />

      <table className="admin-leads-table"  style={{ width: "100%", tableLayout: "auto", borderCollapse: "collapse" }}>
        <thead>
  <tr>
    <th>지역</th>
    <th>식수</th>
    <th>요일</th>
    <th>기간</th>
    <th>시간대</th>
    <th>이메일</th>
    <th>전화번호</th>
    <th>작성일</th>
    <th>상황</th>
    <th>응답</th>
    <th>메모</th>
  </tr>
</thead>
        <tbody>
  {filteredLeads.map((lead) => (
    <tr key={lead.id}>
      <td>{`${lead.region_city || ""} ${lead.region_gu || ""} ${lead.region_dong || ""}`.trim()}</td>
      <td>{lead.meals}</td>
      <td>{lead.weekday}</td>
      <td>{lead.duration}</td>
      <td>{lead.timeslot}</td>
      <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
  {lead.email}
</td>

      <td>{lead.phone}</td>
      <td>{new Date(lead.created_at).toLocaleString("ko-KR")}</td>
      <td>
        <select
          value={lead.status || ""}
          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
        >
          <option value="">-</option>
          <option value="보률">보률</option>
          <option value="진행 중">진행 중</option>
          <option value="완료">완료</option>
        </select>
      </td>
      <td>
        <input
          type="checkbox"
          checked={lead.responded || false}
          onChange={() => handleResponseToggle(lead.id, lead.responded)}
        />
      </td>
      <td>
        <input
          type="text"
          value={lead.memo || ""}
          onChange={(e) => handleMemoChange(lead.id, e.target.value)}
          style={{ width: "100%" }}
        />
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default AdminLeadsPage;
