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
        const isValidDate = (str) => /^\d{4}-\d{2}-\d{2}$/.test(str);

        const filtered = data.filter(
          (r) =>
            r.image &&
            typeof r.image === "string" &&
            r.image.startsWith("http") &&
            !r.emotion &&
            isValidDate(r.date)
        );

        const sorted = filtered.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const grouped = sorted.reduce((acc, cur) => {
          const date = cur.date;
          if (!acc[date]) acc[date] = [];
          acc[date].push(cur);
          return acc;
        }, {});

        const shuffled = Object.values(grouped)
          .map(group => group.sort(() => Math.random() - 0.5))
          .flat();

        setReviews(shuffled.slice(0, 8));
      })
      .catch((err) => console.error("홈화면 리뷰 로딩 실패:", err));
  }, []);

  const getStoreBadgeClass = (store) => {
    if (!store) return "";
    if (store.includes("역삼")) return "badge-yeoksam";
    if (store.includes("강동")) return "badge-gangdong";
    if (store.includes("구디")) return "badge-gudi";
    return "";
  };

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
              storeClass={getStoreBadgeClass(r.store)} // ✅ 이 줄도 필요
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
