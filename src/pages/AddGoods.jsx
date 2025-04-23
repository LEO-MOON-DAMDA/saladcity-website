import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AddGoods() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_main: "",
    image_sub: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("market_goods").insert([{
      name: form.name,
      description: form.description,
      price: parseInt(form.price),
      stock: parseInt(form.stock),
      image_main: form.image_main,
      image_sub: form.image_sub || null,
    }]);

    if (error) {
      console.error("❌ Insert failed:", error.message);
      setStatus("❌ 저장 실패: " + error.message);
    } else {
      setStatus("✅ 저장 완료!");
      setForm({ name: "", description: "", price: "", stock: "", image_main: "", image_sub: "" });
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>굿즈 등록하기</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input type="text" name="name" placeholder="상품명" value={form.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="설명" value={form.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="가격 (숫자만)" value={form.price} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="재고 수량" value={form.stock} onChange={handleChange} required />
        <input type="text" name="image_main" placeholder="메인 이미지 URL" value={form.image_main} onChange={handleChange} required />
        <input type="text" name="image_sub" placeholder="서브 이미지 URL (선택)" value={form.image_sub} onChange={handleChange} />
        <button type="submit" style={{ padding: 12, backgroundColor: "#2f855a", color: "#fff", borderRadius: 8, fontWeight: 600 }}>
          굿즈 등록 →
        </button>
        {status && <p style={{ textAlign: "center", marginTop: 12 }}>{status}</p>}
      </form>
    </div>
  );
}
