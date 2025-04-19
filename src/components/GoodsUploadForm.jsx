import React, { useState } from "react";
import "./GoodsUploadForm.css";

export default function GoodsUploadForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    mainImage: "",
    isSubscription: false,
    stripeProductId: "",
    stripePriceId: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    alert("상품이 등록되었습니다.");
    setFormData({
      name: "",
      description: "",
      price: "",
      mainImage: "",
      isSubscription: false,
      stripeProductId: "",
      stripePriceId: "",
    });
  };

  return (
    <form className="goods-upload-form" onSubmit={handleSubmit}>
      <h2>새 상품 등록</h2>

      <label>
        상품명
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        설명
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        가격 (숫자만 입력, 원 단위)
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        대표 이미지 URL
        <input
          type="text"
          name="mainImage"
          value={formData.mainImage}
          onChange={handleChange}
          placeholder="/images/goods/goods_C01.png"
        />
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          name="isSubscription"
          checked={formData.isSubscription}
          onChange={handleChange}
        />
        정기배송 상품입니다
      </label>

      <label>
        Stripe Product ID
        <input
          type="text"
          name="stripeProductId"
          value={formData.stripeProductId}
          onChange={handleChange}
        />
      </label>

      <label>
        Stripe Price ID
        <input
          type="text"
          name="stripePriceId"
          value={formData.stripePriceId}
          onChange={handleChange}
        />
      </label>

      <button type="submit">상품 등록</button>
    </form>
  );
}
