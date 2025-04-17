import React, { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import SubTitle from "./SubTitle";
import BrandButton from "./BrandButton";
import "./ReviewSection.css";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch("/data/reviews_baemin.json")
      .then((res) => res.json())
      .then((data) => setReviews(data || []));
  }, []);

  useEffect(() => {
    if (reviews.length > 2) {
      startAutoScroll();
    }
    return () => clearInterval(intervalRef.current);
  }, [reviews]);

  const scrollNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const startAutoScroll = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      scrollNext();
    }, 4000);
  };

  return (
    <section className="review-section">
      <SectionTitle style={{ textAlign: "left" }}>
        SALCY CREW
      </SectionTitle>
      <SubTitle style={{ textAlign: "left" }}>최근 리뷰</SubTitle>

      <div className="review-slider" ref={sliderRef}>
        {reviews.map((r, idx) => (
          <div className="review-card" key={idx}>
            <div className="review-top">
              <span className="nickname">{r.nickname || "익명"}</span>
              <span
                className={`rating ${r.rating >= 4 ? "green" : "pink"}`}
              >
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

      <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-start", paddingLeft: "12px" }}>
        <BrandButton href="/reviews">전체 리뷰 보기 →</BrandButton>
      </div>
    </section>
  );
}
