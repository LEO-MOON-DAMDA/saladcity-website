import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import SubTitle from "./SubTitle";
import HomeReviewCard from "./HomeReviewCard";
import ReviewModal from "./ReviewModal";
import "./ReviewSection.css";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetch("/data/review_with_emotion_random.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (r) =>
            r.image &&
            typeof r.image === "string" &&
            r.image.startsWith("http") &&
            !r.emotion
        );
        const sorted = filtered.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setReviews(sorted.slice(0, 8));
      })
      .catch((err) => console.error("홈화면 리뷰 로딩 실패:", err));
  }, []);

  return (
    <section className="review-section">
      <SectionTitle style={{ marginTop: "80px", textAlign: "center" }}>
        SALCY CREW's Interview
      </SectionTitle>
      <SubTitle style={{ textAlign: "center", marginBottom: "20px" }}>
        고객님들이 실제 남겨주신 리뷰예요
      </SubTitle>

      <div className="review-slider-wrapper">
        <div className="review-slider">
          {reviews.map((r, idx) => (
            <HomeReviewCard
              key={idx}
              review={r}
              idx={idx}
              onClick={() => setSelectedReview(r)}
            />
          ))}
          <HomeReviewCard isMoreButton={true} />
        </div>
      </div>

      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </section>
  );
}
