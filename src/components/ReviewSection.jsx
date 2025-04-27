import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import SubTitle from "./SubTitle";
import BrandButton from "./BrandButton";
import HomeReviewCard from "./HomeReviewCard";
import ReviewModal from "./ReviewModal"; // ✅ 추가
import "./ReviewSection.css";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null); // ✅ 추가

  useEffect(() => {
    fetch("/data/review_preview.json")
      .then((res) => res.json())
      .then((data) => setReviews(data || []))
      .catch((err) => console.error("리뷰 preview JSON 로딩 오류:", err));
  }, []);

  const withImage = reviews.filter((r) => r.image);

  return (
    <section className="review-section">
      <SectionTitle style={{ marginTop: "80px", textAlign: "center", lineHeight: "1.0" }}>
        SALCY CREW's Interview
      </SectionTitle>
      <SubTitle style={{
        padding: "0 16px",
        marginBottom: "-20px",
        fontSize: "16px",
        color: "#444",
        textAlign: "left",
        width: "100%",
        display: "block"
      }}>
        최근 리뷰
      </SubTitle>

      <div className="review-slider-wrapper">
        <div className="review-slider">
          {withImage.slice(0, 17).map((r, idx) => (
            <HomeReviewCard
              key={idx}
              review={r}
              idx={idx}
              onClick={() => setSelectedReview(r)} // ✅ 클릭시 모달 열기
            />
          ))}
          {/* 전체 리뷰 보기 버튼 */}
          <HomeReviewCard isMoreButton={true} />
        </div>
      </div>

      {/* ✅ 모달 추가 */}
      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </section>
  );
}
