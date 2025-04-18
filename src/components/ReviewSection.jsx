import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import SubTitle from "./SubTitle";
import BrandButton from "./BrandButton";
import ReviewModal from "./ReviewModal"; // ✅ 모달 추가
import "./ReviewSection.css";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null); // ✅ 모달 상태

  useEffect(() => {
    fetch("/data/reviews_baemin.json")
      .then((res) => res.json())
      .then((data) => setReviews(data || []));
  }, []);

  const withImage = reviews.filter((r) => r.image);
  const withoutImage = reviews.filter((r) => !r.image);

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
              onClick={() => setSelectedReview(r)} // ✅ 클릭 시 모달 열기
            >
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

      <div className="review-slider-wrapper without-image-wrapper">
        <div className="review-slider without-image">
          {withoutImage.map((r, idx) => (
            <div
              className="review-card small"
              key={`noimg-${idx}`}
              onClick={() => setSelectedReview(r)} // ✅ 모달 열기
            >
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
            </div>
          ))}
        </div>
      </div>

      <div className="review-button-wrap">
        <BrandButton href="/reviews">전체 리뷰 보기 →</BrandButton>
      </div>

      {/* ✅ 모달 렌더링 */}
      {selectedReview && (
        <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
      )}
    </section>
  );
}
