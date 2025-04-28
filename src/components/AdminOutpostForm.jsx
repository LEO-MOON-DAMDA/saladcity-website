import React, { useState } from "react";
import { addOutpostApplication } from "../apis/outpostApplications";

export default function AdminOutpostForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    storeName: "",
    address: "",
    memo: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await addOutpostApplication({
        name: formData.name,
        phone: formData.phone,
        storeName: formData.storeName,
        address: formData.address,
        memo: formData.memo,
      });
      setFormData({
        name: "",
        phone: "",
        storeName: "",
        address: "",
        memo: "",
      });
      setSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      alert("❌ 저장 실패: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="outpost-form">
      <input
        type="text"
        name="name"
        placeholder="신청자 이름"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="연락처 (숫자만)"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="storeName"
        placeholder="샐시를 만날 곳 (예: 집, 회사(회사명), 학원, 헬스장, 병원 등)" // ✅ 수정
        value={formData.storeName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="샐시가 찾아갈 정확한 주소" // ✅ 수정
        value={formData.address}
        onChange={handleChange}
        required
      />
      <textarea
        name="memo"
        placeholder="추가 요청사항 (선택)"
        value={formData.memo}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "저장 중..." : "신청 저장"}
      </button>
      {success && <p className="success-message">✅ 저장 완료!</p>}
    </form>
  );
}
