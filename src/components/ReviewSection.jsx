import React, { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import SubTitle from "./SubTitle";
import BrandButton from "./BrandButton";
import "./ReviewSection.css";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch("/data/reviews_baemin.json")
      .then((res) => res.json())
      .then((data) => setReviews(data || []));
  }, []);

  return (
    <section className="review-section">
      <SectionTitle style={{ textAlign: "center", marginTop: "48px" }}>
        SALCY CREW
      </SectionTitle>
      <SubTitle style={{ textAlign: "center" }}>최근 리뷰</SubTitle>

      <div className="review-slider-wrapper">
        <div className="review-slider" ref={sliderRef}>
          {reviews.map((r, idx) => (
            <div className="review-card" key={idx}>
              <div className="review-top">
                <span className="nickname">{r.nickname || "익명"}</span>
                <span className={`rating ${r.rating >= 4 ? "green" : "pink"}`}>
                  {"⭐".repeat(Math.min(r.rating || 0, 5))}
                </span>
                <span className="date">{r.date || ""}</span>
              </div>
              <p className="review-text">
                "{r.review?.slice(0, 40) || "내용 없음"}"
              </p>
              {r.menu && <div className="menu-tag">{r.menu}</div>}
              {r.image && (
                <div className="review-image">
                  <img src={r.image} alt="리뷰 이미지" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="review-button-wrap">
        <BrandButton href="/reviews">전체 리뷰 보기 →</BrandButton>
      </div>
    </section>
  );
}
