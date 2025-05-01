import React, { useEffect, useState, useMemo, useRef } from "react";
import ReviewStatsChart from "../../components/ReviewStatsChart";
import ReviewModal from "../../components/ReviewModal";
import {
  highlight,
  injectEmoji,
  detectTags,
  exportCSV,
  exportEmotionJSON,
  exportQRToPDF,
  generateQR,
  filterReviews,
  filterByStore,
  sortReviews
} from "../../utils/reviewUtils";

import "../Reviews.css";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
   process.env.REACT_APP_SUPABASE_MENU_URL,
   process.env.REACT_APP_SUPABASE_MENU_KEY
);

export default function DashboardReviews() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [filter, setFilter] = useState("all");
  const [storeFilter, setStoreFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("rating");
  const [adminMode, setAdminMode] = useState(() => localStorage.getItem("adminMode") === "true");
  const [hideNoRating, setHideNoRating] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  const [reply, setReply] = useState("");
  const [responder, setResponder] = useState("관리자");
  const [emotionListOpen, setEmotionListOpen] = useState(false);
  const [emotionSearchTerm, setEmotionSearchTerm] = useState("");
  const [emotionLimit, setEmotionLimit] = useState(20);
  const [emotionExpanded, setEmotionExpanded] = useState(true);
  const [qrUrl, setQrUrl] = useState("");
  const [qrOpen, setQrOpen] = useState(false);
  const [emotionIndex, setEmotionIndex] = useState(0);
  const [emotionSort, setEmotionSort] = useState(() => localStorage.getItem("emotionSort") || "recent");
  const [fixedEmotions, setFixedEmotions] = useState(() => {
    const saved = localStorage.getItem("fixedEmotions");
    return saved ? JSON.parse(saved) : [];
  });
  const [conversionLog, setConversionLog] = useState(() => {
    const saved = localStorage.getItem("conversionLog");
    return saved ? JSON.parse(saved) : [];
  });

  const previousEmotion = useRef(0);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          console.error("❌ Supabase 리뷰 불러오기 실패", error);
          return;
        }
        setReviews(data);
        const curr = data.filter(r => r.emotion).length;
        if (previousEmotion.current && curr !== previousEmotion.current) {
          alert(`감성 문구 수 변경됨: ${previousEmotion.current} → ${curr}`);
        }
        previousEmotion.current = curr;
      });
  }, []);

  const filtered = useMemo(() => {
    const bannedWords = ["사장님 댓글 등록하기", "사장님 댓글 추가하기", "머리카락", "이물질", "최악"];
    return filterReviews(reviews, filter, bannedWords);
  }, [reviews, filter]);

  const storeFiltered = useMemo(() => {
    return filterByStore(filtered, storeFilter, hideNoRating);
  }, [filtered, storeFilter, hideNoRating]);

  const sorted = useMemo(() => {
    return sortReviews(storeFiltered, sortBy, sortOrder);
  }, [storeFiltered, sortBy, sortOrder]);

  const emotionOnlyList = useMemo(() => reviews.filter(r => r.emotion), [reviews]);

  const filteredEmotionList = useMemo(() =>
    emotionOnlyList.filter(e => e.review.toLowerCase().includes(emotionSearchTerm.toLowerCase())),
    [emotionOnlyList, emotionSearchTerm]
  );

  const visibleEmotionList = useMemo(() =>
    filteredEmotionList.slice(0, emotionLimit),
    [filteredEmotionList, emotionLimit]
  );

  const total = reviews.length;
  const emotionCount = reviews.filter(r => r.emotion).length;
  const realCount = total - emotionCount;
  const avgRating = reviews.filter(r => r.rating).reduce((a, b) => a + (b.rating || 0), 0) / realCount || 0;
  const byStore = {};
  reviews.forEach(r => {
    if (!byStore[r.store]) byStore[r.store] = 0;
    byStore[r.store]++;
  });

  return (
    <div className="reviews-page">
      <div style={{
        position: "sticky", top: 0,
        left: 0, right: 0,
        background: "#ffffffee",
        backdropFilter: "blur(8px)",
        zIndex: 999,
        padding: "12px 20px",
        borderBottom: "1px solid #ccc",
        fontWeight: "600",
        fontSize: "15px"
      }}>
        총 리뷰 수: {reviews.length}건 {adminMode && <span style={{ color: "#d32f2f", marginLeft: "12px" }}>[관리자모드]</span>}
      </div>

      <div style={{ height: "50px" }}></div>

      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <button onClick={() => setAdminMode(!adminMode)}>
          {adminMode ? "관리자 모드 종료" : "관리자 모드 진입"}
        </button>
      </div>

      <section className="review-hero">
        <h1 className="hero-headline" style={{ color: "#2d2d2d" }}>
          [내부 전용] 리뷰 분석 대시보드
        </h1>
        <p className="hero-subtext" style={{ color: "#555" }}>
          총 리뷰 수: <strong>{sorted.length}</strong>건 · 평균 별점: <strong>★ {avgRating.toFixed(1)}</strong> · 감성 비율: <strong>{Math.round((emotionCount / total) * 100)}%</strong>
        </p>
        <div style={{ fontSize: "13px", color: "#888", marginTop: "8px" }}>
          {Object.entries(byStore).map(([k, v]) => (
            <span key={k} style={{ marginRight: "12px" }}>{k}: {v}건</span>
          ))}
        </div>
      </section>

      <div className="review-list">
        {sorted.map((r, i) => (
          <div
            key={i}
            className="review-card fade animate"
            onClick={() => setSelectedReview(r)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "16px",
              background: r.emotion
                ? "#f4fff6"
                : r.image
                ? "#f9f9ff"
                : "#fff",
            }}
          >
            <div style={{ fontSize: "13px", fontWeight: "600" }}>{r.nickname} · ★{r.rating || "-"}</div>
            <div style={{ fontSize: "14px", margin: "6px 0" }}>
              <span dangerouslySetInnerHTML={{ __html: highlight(r.review || "") }} />
            </div>
            <div style={{ fontSize: "12px", color: "#888" }}>{r.menu} · {r.date}</div>
          </div>
        ))}
      </div>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}

      <div style={{ textAlign: "center", margin: "24px 0" }}>
        <button onClick={() => {
          const headers = ["nickname", "rating", "review", "menu", "date"];
          const rows = sorted.map(r => ({
            nickname: r.nickname,
            rating: r.rating,
            review: r.review,
            menu: r.menu,
            date: r.date,
          }));
          exportCSV(rows, headers, "리뷰_전체.csv");
        }}>
          CSV 다운로드
        </button>

        <button onClick={() => exportEmotionJSON(reviews)} style={{ marginLeft: "12px" }}>
          감성 JSON 저장
        </button>

        <button onClick={exportQRToPDF} style={{ marginLeft: "12px" }}>
          QR PDF 저장
        </button>

        <button onClick={() => generateQR(reviews, setQrUrl, setQrOpen)} style={{ marginLeft: "12px" }}>
          QR 코드 생성
        </button>
      </div>
    </div>
  );
}
