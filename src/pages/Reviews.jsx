import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import ReviewModal from "../components/ReviewModal";
import ReviewScrollingBanner from "../components/ReviewScrollingBanner";
import "./Reviews.css";
import "../components/cta-subscribe-button.css";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_MENU_URL,
  process.env.REACT_APP_SUPABASE_MENU_KEY
);

const fallbackImages = [
  "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/review-sample01.webp",
  "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/review-sample02.webp",
  "https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/review-sample03.webp",
];







export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [emotionReviews, setEmotionReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      const pageSize = 1000;
      let all = [];
      let page = 0;
      let done = false;

      while (!done) {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .order("date", { ascending: false })
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (error) {
          console.error("❌ Supabase 오류:", error.message);
          return;
        }

        if (!data || data.length === 0) {
          done = true;
        } else {
          all = [...all, ...data];
          page++;
        }
      }

      const bannedWords = ["사장님 댓글 등록하기", "사장님 댓글 추가하기", "머리카락", "이물질", "최악"];
      const isValidDate = (str) => /^\d{4}-\d{2}-\d{2}$/.test(str);

      const clean = all.filter((r) => {
        const text = r.review?.toLowerCase();
        const score = r.rating || 0;
        const dateValid = isValidDate(r.date);
        const banned = bannedWords.some((w) => text?.includes(w));
        return text && dateValid && !banned && (r.emotion || score >= 4);
      });

      const groupedByDate = clean.reduce((acc, cur) => {
        const date = cur.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(cur);
        return acc;
      }, {});

      const sorted = Object.entries(groupedByDate)
        .sort(([a, b]) => new Date(b) - new Date(a))
        .flatMap(([_, group]) => group.sort(() => Math.random() - 0.5));

      setReviews(sorted);

const { data: emotionData, error: emotionError } = await supabase
        .from("emotion_reviews")
        .select("*")
        .eq("active", true);

      if (emotionError) {
        console.error("❌ 감성 문구 로딩 실패:", emotionError.message);
      } else if (emotionData) {
        const picked = [...emotionData].sort(() => Math.random() - 0.5).slice(0, 3);
        setEmotionReviews(picked);
      }
    };

    loadReviews();
  }, []);

  const getStoreBadgeClass = (store) => {
    if (!store) return "";
    if (store.includes("역삼")) return "badge-yeoksam";
    if (store.includes("강동")) return "badge-gangdong";
    if (store.includes("구디")) return "badge-gudi";
    return "";
  };

  const renderReviewCard = (r, idx) => {
    const hasImage = typeof r.image === "string" && r.image.startsWith("http");
    const fallback = fallbackImages[idx % fallbackImages.length];

    return (
      <div
        className={`review-card ${hasImage ? "large" : "small"}`}
        key={`review-${idx}`}
        onClick={() => setSelectedReview(r)}
      >
        <div className="review-meta">
          <div className="meta-top-row">
            <span className="nickname full large full-show">{r.nickname || "익명"}</span>
            <span className="divider"> | </span>
            <span className="rating mid">
              {Array.from({ length: Math.min(r.rating || 0, 5) }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </span>
          </div>
          <div className="review-badges">
            <span className={`badge store-badge large ${getStoreBadgeClass(r.store)}`}>{r.store}</span>
            <span className="divider"> | </span>
            <span className="badge platform-badge large">{r.platform}</span>
          </div>
          <span className="date large">{r.date || ""}</span>
        </div>
        <p className="review-text multiline">{(r.review || "내용 없음").trim()}</p>
        {r.menu && <div className="menu-tag">{r.menu}</div>}
        <div className="review-image-wrapper">
          <img
            src={hasImage ? r.image : fallback}
            alt="리뷰 이미지"
            loading="lazy"
          />
        </div>
      </div>
    );
  };

  const renderEmotionCard = (r, idx) => (
    <div className="review-card emotion" key={`emotion-${idx}`}>
      <p className="emotion-text">“{r.review}”</p>
      <p className="emotion-sub">{r.english}</p>
      <p className="emotion-author">— {r.author} —</p>
    </div>
  );

  const calculateAverageRating = (reviews) => {
    const rated = reviews.filter((r) => !r.emotion && r.rating);
    if (rated.length === 0) return "-";
    const avg = rated.reduce((sum, r) => sum + r.rating, 0) / rated.length;
    return avg.toFixed(2);
  };

 
  const withImageReviews = reviews.filter(
    (r) => !r.emotion && typeof r.image === "string" && r.image.startsWith("http")
  );
  const withoutImageReviews = reviews.filter(
    (r) => !r.emotion && (!r.image || !r.image.startsWith("http"))
  );

  return (
    <div className="reviews-page">
      <section className="review-hero with-bg">
        <div className="review-hero-overlay">
          <h1 className="hero-headline">샐러드시티 고객님들이 오늘 보내주신 소중한 리뷰예요</h1>
          <p className="hero-subtext">
            총 <strong>{reviews.length}</strong>개의 리뷰가 남겨졌습니다.
            <br />
            평균 별점 <strong>{calculateAverageRating(reviews)}</strong>점
          </p>
        </div>
      </section>

      <div style={{ marginTop: "2px", marginBottom: "28px" }}>
        <ReviewScrollingBanner />
      </div>

      <div className="review-grid emotion-grid">
        {[...emotionReviews].sort(() => Math.random() - 0.5).slice(0, 3).map(renderEmotionCard)}
      </div>

      <div className="review-grid with-image">
        {withImageReviews.slice(0, 8).map(renderReviewCard)}
      </div>

      <div className="review-cta-section">
        <p className="cta-headline">
          매일 찾아오는 즐거움.<br />샐시는 meal이 아닌, 당신의 새로운 라이프스타일이에요.
        </p>
        <p className="cta-subtext">
          Everyday SALCY, your new lifestyle — not just a meal.
        </p>
        <a href="/outpost/start" className="cta-subscribe-button">
          정기배송 시작하기 →
        </a>
      </div>

      <div className="review-grid with-image">
        {withImageReviews.slice(8).map(renderReviewCard)}
        {withoutImageReviews.map(renderReviewCard)}
      </div>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </div>
  );
}
