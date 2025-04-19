import React, { useRef } from "react";
import "./MarketProductSlider.css";

const products = [
  {
    id: "goods01",
    name: "SALCY SIGNATURE CAP",
    image: "/images/goods/goods_C01.png",
    label: "LIMITED",
    description: "매장에서만 쓰이는 감성 유니폼",
    price: "₩49,000",
  },
  {
    id: "goods02",
    name: "ORGANIC ECHO BAG",
    image: "/images/goods/goods_B01.png",
    label: "GIFT ONLY",
    description: "유기농 농장에서 직접 배송되는 감성백",
    price: "문의",
  },
  {
    id: "goods03",
    name: "SALCY WINTER EDITION",
    image: "/images/goods/goods_C11.png",
    label: "SALCY CREW",
    description: "우리 팀에게만 주어진 따뜻한 모자",
    price: "₩58,000",
  },
];

export default function MarketProductSlider() {
  const scrollRef = useRef();

  return (
    <section className="market-slider-section">
      <h2 className="market-slider-title">SALCY GOODS</h2>
      <div className="market-slider" ref={scrollRef}>
        {products.map((product) => (
          <div key={product.id} className="market-slide-card">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} />
              {product.label && <span className="product-label">{product.label}</span>}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
