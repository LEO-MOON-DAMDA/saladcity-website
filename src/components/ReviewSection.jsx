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
      .then((data) => {
        setReviews(data || []);
        console.log("불러온 미리보기 리뷰 수:", data.length);
        console.log("예시 리뷰:", data[0]);
      })
      .catch((err) => {
        console.error("리뷰 preview JSON 로딩 오류:", err);
      });
  }, []);

  const withImage = reviews.filter((r) => r.image);
  const withoutImage = reviews.filter((r) => !r.image);

  const renderBadges = (r) => (
    <div className="badge-container">
      {r.platform && <span className="badge badge-platform">{r.platform}</span>}
      {r.store && <span className="badge badge-store">{r.store}</span>}
    </div>
  );

  return (
    <section className="review-section">
      <SectionTitle style={{ textAlign: "center", marginTop: "48px" }}>
        SALCY CREW
      </SectionTitle>
      <SubTitle style={{ textAlign: "center" }}>최근 리뷰</SubTitle>

<div className="review-slider-wrapper">
  <div className="review-slider">
    {withImage.map((r, idx) => (
      <div
        className="review-card large"
        key={`img-${idx}`}
        onClick={() => setSelectedReview(r)}
      >
        <div className="review-meta">
          <div className="review-badges">
            <span className="badge store">{r.store}</span>
            <span style={{ color: "#4CAF50" }}></span>⭐</span>
            <span className="badge platform platform-baemin">{r.platform}</span>
          </div>
          <div className="rating-date-row">
            <span className="rating">
              {Array.from({ length: Math.min(r.rating || 0, 5) }).map((_, i) => (
                <span key={i} style={{ color: "#4CAF50" }}>⭐</span>
              ))}
            </span>
            &nbsp;|&nbsp;
            <span className="date">{r.date || ""}</span>
          </div>
        </div>
        <p className="review-content">
          {r.review?.slice(0, 40) || "내용 없음"}
        </p>
        {r.menu && <div className="menu-tag">{r.menu}</div>}
        {renderBadges(r)}
        <div className="review-image">
          <img src={r.image} alt="리뷰 이미지" />
        </div>
      </div>
    ))}
  </div>
</div>


      <div className="review-slider-wrapper without-image-wrapper">
        <div className="review-slider without-image">
          {withoutImage.map((r, idx) => {
            const fallback = fallbackImages[idx % fallbackImages.length];
            return (
              <div
                className="review-card small"
                key={`noimg-${idx}`}
                onClick={() => setSelectedReview(r)}
              >
                <div className="review-meta">
                  <div className="review-badges">
                    <span className="badge store">{r.store}</span>
                    <span className="badge platform">{r.platform}</span>
                  </div>
                  <span className="rating">
                    {Array.from({ length: Math.min(r.rating || 0, 5) }).map((_, i) => (
                      <span key={i} style={{ color: "#4CAF50" }}>⭐</span>
                    ))}
                  </span>

                  &nbsp;|&nbsp; {r.date || ""}
                </div>
                <p className="review-content">
                  {r.review?.slice(0, 40) || "내용 없음"}
                </p>
                {r.menu && <div className="menu-tag">{r.menu}</div>}
                {renderBadges(r)}
                <div className="review-image">
                  <img src={fallback} alt="감성 이미지" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="review-button-wrap">
        <BrandButton href="/reviews">전체 리뷰 보기 →</BrandButton>
      </div>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </section>
  );
}
