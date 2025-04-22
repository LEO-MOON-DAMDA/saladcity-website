import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import SubTitle from "./SubTitle";
import BrandButton from "./BrandButton";
import ReviewModal from "./ReviewModal";
import "./ReviewSection.css";

const fallbackImages = [
  "/images/review-sample01.jpg",
  "/images/review-sample02.jpg",
  "/images/review-sample03.jpg"
];

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetch("/data/review_preview.json")
      .then((res) => res.json())
      .then((data) => setReviews(data || []))
      .catch((err) => console.error("리뷰 preview JSON 로딩 오류:", err));
  }, []);

  const withImage = reviews.filter((r) => r.image);

  return (
    <section className="review-section">
      <SectionTitle style={{ textAlign: "center", marginTop: "48px" }}>
        SALCY CREW's Interview
      </SectionTitle>
      <SubTitle style={{ textAlign: "center" }}>최근 리뷰</SubTitle>

      <div className="review-slider-wrapper">
        <div className="review-slider">
          {withImage.map((r, idx) => (
            <a
              key={`img-${idx}`}
              className="review-card large"
              href={`/reviews#review-${r.id || idx}`}
            >
              <div className="review-meta">
                <div className="meta-row">
                  <span className="nickname">{r.nickname || "익명"}</span>
                  <span className="divider"> | </span>
                  <span className="rating green">
                    {Array.from({ length: Math.min(r.rating || 0, 5) }).map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </span>
                </div>
                <div className="meta-row">
                  <span className="badge store">{r.store}</span>
                </div>
                <div className="date">{r.date || ""}</div>
              </div>
              <p className="review-text">{r.review || "내용 없음"}</p>
              <div className="review-image-wrapper">
                <img src={r.image} alt="리뷰 이미지" />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="review-button-wrap">
        <BrandButton href="/reviews">전체 리뷰 보기 →</BrandButton>
      </div>
    </section>
  );
}
