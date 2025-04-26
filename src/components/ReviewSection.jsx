import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import SubTitle from "./SubTitle";
import BrandButton from "./BrandButton";
import HomeReviewCard from "./HomeReviewCard"; // ✅ 유지
import "./ReviewSection.css";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/data/review_preview.json")
      .then((res) => res.json())
      .then((data) => setReviews(data || []))
      .catch((err) => console.error("리뷰 preview JSON 로딩 오류:", err));
  }, []);

  const withImage = reviews.filter((r) => r.image);

  return (
    <section className="review-section">
      <SectionTitle style={{ textAlign: "center", lineHeight: "1.0" }}>
        SALCY CREW's Interview
      </SectionTitle>
      <SubTitle style={{ marginTop: "16px", marginBottom: "-14px", }}>
  	최근 리뷰
       </SubTitle>


      <div className="review-slider-wrapper">
        <div className="review-slider">
          {withImage.slice(0, 17).map((r, idx) => (
            <HomeReviewCard key={idx} review={r} idx={idx} />
          ))}
          {/* ✅ 마지막에 전체 리뷰 버튼 카드 추가 */}
          <HomeReviewCard isMoreButton={true} />
        </div>
      </div>

      {/* ✅ 기존 버튼 div 완전히 삭제 */}
    </section>
  );
}
