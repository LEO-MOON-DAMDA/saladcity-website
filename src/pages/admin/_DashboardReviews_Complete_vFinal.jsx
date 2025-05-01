import React, { useEffect, useState, useMemo, useRef } from "react";
import ReviewStatsChart from "../../components/ReviewStatsChart";
import ReviewModal from "../../components/ReviewModal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";
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

  const extractKeywords = (text) => {
    const keywords = ["정기배송", "포장", "소스", "드레싱"];
    return keywords.filter(word => text?.includes(word));
  };

  const highlight = (text) => {
    if (!text) return "";
    const keywords = extractKeywords(text);
    let result = text;
    keywords.forEach(word => {
      result = result.replaceAll(word, `<mark style='background:#fff3cd'>${word}</mark>`);
    });
    return result.replaceAll("\n", "<br>");
  };

  const injectEmoji = (text) => {
    return text
      .replace(/감사/g, "🙏")
      .replace(/좋아요/g, "❤️")
      .replace(/사랑/g, "💚")
      .replace(/추천/g, "🌟");
  };

  const detectTags = (text) => {
    const tags = [];
    if (/응원|파이팅|힘내|잘하고/.test(text)) tags.push("응원");
    if (/좋아요|사랑|행복|기쁨/.test(text)) tags.push("기쁨");
    if (/감사|칭찬|추천|만족/.test(text)) tags.push("칭찬");
    return tags;
  };


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
    return reviews.filter((r) => {
      const text = r.review?.toLowerCase();
      const bannedWords = ["사장님 댓글 등록하기", "사장님 댓글 추가하기", "머리카락", "이물질", "최악"];
      const containsBannedWord = bannedWords.some((word) => text?.includes(word));
      if (!text || containsBannedWord) return false;
      if (filter === "emotion") return r.emotion === true;
      if (filter === "real") return r.emotion !== true;
      return true;
    });
  }, [reviews, filter]);

  const storeOptions = useMemo(() => {
    const stores = new Set(reviews.map(r => r.store));
    return ["all", ...Array.from(stores)];
  }, [reviews]);

  const storeFiltered = useMemo(() => {
    return filtered.filter(r => {
      if (hideNoRating && !r.rating) return false;
      if (storeFilter === "all") return true;
      return r.store === storeFilter;
    });
  }, [filtered, storeFilter]);

  const sorted = useMemo(() => {
    return [...storeFiltered].sort((a, b) => {
      if (sortBy === "rating") {
        const ra = a.rating || 0;
        const rb = b.rating || 0;
        return sortOrder === "asc" ? ra - rb : rb - ra;
      } else {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
    });
  }, [storeFiltered, sortOrder]);

  const emotionOnlyList = useMemo(() => reviews.filter(r => r.emotion), [reviews]);

  const filteredEmotionList = useMemo(() =>
    emotionOnlyList.filter(e => e.review.toLowerCase().includes(emotionSearchTerm.toLowerCase())),
    [emotionOnlyList, emotionSearchTerm]
  );

  const visibleEmotionList = useMemo(() =>
    filteredEmotionList.slice(0, emotionLimit),
    [filteredEmotionList, emotionLimit]
  );

  function exportCSV(rows, headers, filename) {
    const csv = [headers.join(","), ...rows.map(r => headers.map(h => `"${(r[h] || "")}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportEmotionJSON() {
    const emotionList = reviews.filter(r => r.emotion);
    const payload = emotionList.map(e => ({
      author: e.author,
      review: e.review,
      english: e.english,
      date: e.date
    }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "감성문구.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportQRToPDF() {
    const target = document.getElementById("qr-capture");
    html2canvas(target).then(canvas => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(img, "PNG", 15, 40, 180, 180);
      const today = new Date().toISOString().split("T")[0];
      pdf.save(`감성문구_QR_${today}.pdf`);
    });
  }

  async function generateQR() {
    const emotionList = reviews.filter(r => r.emotion);
    const payload = emotionList.map(e => ({
      author: e.author,
      review: e.review,
      english: e.english,
      date: e.date
    }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const qr = await QRCode.toDataURL(url);
    setQrUrl(qr);
    setQrOpen(true);
  }

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

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button onClick={() => setShowEnglish(!showEnglish)}>
          {showEnglish ? "영어 감성문구 숨기기" : "영어 감성문구 보기"}
        </button>
      </div>

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

        <button onClick={exportEmotionJSON} style={{ marginLeft: "12px" }}>
          감성 JSON 저장
        </button>

        <button onClick={exportQRToPDF} style={{ marginLeft: "12px" }}>
          QR PDF 저장
        </button>

        <button onClick={generateQR} style={{ marginLeft: "12px" }}>
          QR 코드 생성
        </button>
      </div>

      {qrOpen && (
        <div id="qr-capture" style={{
          textAlign: "center",
          padding: "32px",
          background: "#fff",
          borderRadius: "12px"
        }}>
          <img src={qrUrl} alt="QR Code" style={{ width: "200px", height: "200px" }} />
        </div>
      )}

      {emotionListOpen && (
        <div style={{
          padding: "32px",
          background: "#fff",
          zIndex: 9999,
          overflowY: "auto"
        }}>
          <h2>감성 문구 전체보기</h2>

          <input
            value={emotionSearchTerm}
            onChange={e => setEmotionSearchTerm(e.target.value)}
            placeholder="감성 검색"
            style={{ marginBottom: "24px", padding: "8px", width: "100%", maxWidth: "400px" }}
          />

          {visibleEmotionList.map((e, i) => (
            <div key={i} style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "16px",
              background: "#f4fff6"
            }}>
              <div style={{ fontSize: "16px", marginBottom: "8px" }} dangerouslySetInnerHTML={{ __html: injectEmoji(e.review) }} />
              <div style={{ fontSize: "13px", color: "#666" }}>{e.english}</div>
              <div style={{ fontSize: "12px", color: "#aaa", marginTop: "4px" }}>– {e.author}</div>
              <button onClick={() => navigator.clipboard.writeText(`"${e.review}"\n${e.english}\n– ${e.author}`)} style={{ marginTop: "8px" }}>복사</button>
            </div>
          ))}

          <button onClick={() => setEmotionListOpen(false)} style={{ marginTop: "24px" }}>닫기</button>
        </div>
      )}

      <div style={{ textAlign: "center", margin: "24px 0" }}>
        <h3>변환 내역</h3>
        <table style={{ margin: "auto", fontSize: "13px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>원문</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>변환문</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>시간</th>
            </tr>
          </thead>
          <tbody>
            {conversionLog.map((log, i) => (
              <tr key={i}>
                <td style={{ borderBottom: "1px solid #eee", padding: "4px 8px" }}>{log.original}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "4px 8px" }}>{log.converted}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "4px 8px" }}>{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "12px" }}>
          <button onClick={() => { setConversionLog([]); localStorage.removeItem("conversionLog"); }}>초기화</button>
          <button onClick={() => {
            const headers = "원문,변환문,시간\n";
            const rows = conversionLog.map(r => `"${r.original}","${r.converted}","${r.time}"`).join("\n");
            const blob = new Blob([headers + rows], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "변환기록.csv";
            a.click();
            URL.revokeObjectURL(url);
          }} style={{ marginLeft: "12px" }}>CSV 저장</button>
        </div>
      </div>
    </div>
  );
}
