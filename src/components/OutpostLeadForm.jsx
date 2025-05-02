import React, { useState } from "react";
import { supabaseOutpost } from "../utils/supabaseOutpostClient";
import { sendEmail } from "../utils/sendEmail";

const OutpostLeadForm = () => {
  const [form, setForm] = useState({
    region: "",
    meals: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.region || !form.meals || !form.email) return;

    const { error } = await supabaseOutpost.from("outpost_leads").insert([form]);

    if (!error) {
      await sendEmail({
        to: form.email,
        region: form.region,
        meals: form.meals,
      });
      setSubmitted(true);
    }
  };

  if (submitted)
    return (
      <p style={{ fontSize: "16px", color: "#3C8050", marginTop: "20px" }}>
        신청이 완료되었습니다! 샐시가 곧 연락드릴게요 💌
      </p>
    );

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "480px", marginTop: "20px" }}>
      <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
        어떤 지역에서 샐시를 만나고 싶으신가요?
      </label>
      <input
        name="region"
        type="text"
        placeholder="예: 강남구 테헤란로 123"
        value={form.region}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
        하루 식사 수량은 몇 개 예상하시나요?
      </label>
      <input
        name="meals"
        type="number"
        placeholder="예: 30"
        value={form.meals}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
        이메일 주소를 알려주세요
      </label>
      <input
        name="email"
        type="email"
        placeholder="예: saladlover@email.com"
        value={form.email}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#3C8050",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        확인하고 싶어요 ✅
      </button>
    </form>
  );
};

export default OutpostLeadForm;
