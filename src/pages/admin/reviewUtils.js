import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";

// 필터링
export function filterReviews(reviews, filter, bannedWords = []) {
  return reviews.filter(r => {
    const text = r.review?.toLowerCase();
    const containsBanned = bannedWords.some(w => text?.includes(w));
    if (!text || containsBanned) return false;
    if (filter === "emotion") return r.emotion === true;
    if (filter === "real") return r.emotion !== true;
    return true;
  });
}

export function filterByStore(reviews, storeFilter, hideNoRating = false) {
  return reviews.filter(r => {
    if (hideNoRating && !r.rating) return false;
    if (storeFilter === "all") return true;
    return r.store === storeFilter;
  });
}

// 정렬
export function sortReviews(reviews, sortBy = "rating", sortOrder = "desc") {
  return [...reviews].sort((a, b) => {
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
}

// 감성 분석
export function highlight(text) {
  if (!text) return "";
  const keywords = ["정기배송", "포장", "소스", "드레싱"];
  let result = text;
  keywords.forEach(word => {
    result = result.replaceAll(word, `<mark style='background:#fff3cd'>${word}</mark>`);
  });
  return result.replaceAll("\n", "<br>");
}

export function injectEmoji(text) {
  return text
    .replace(/감사/g, "🙏")
    .replace(/좋아요/g, "❤️")
    .replace(/사랑/g, "💚")
    .replace(/추천/g, "🌟");
}

export function detectTags(text) {
  const tags = [];
  if (/응원|파이팅|힘내|잘하고/.test(text)) tags.push("응원");
  if (/좋아요|사랑|행복|기쁨/.test(text)) tags.push("기쁨");
  if (/감사|칭찬|추천|만족/.test(text)) tags.push("칭찬");
  return tags;
}

// Export 기능
export function exportCSV(rows, headers, filename) {
  const csv = [headers.join(","), ...rows.map(r => headers.map(h => \`"\${r[h] || ""}"\`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportEmotionJSON(reviews) {
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

export async function generateQR(reviews, setQrUrl, setQrOpen) {
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

export function exportQRToPDF() {
  const target = document.getElementById("qr-capture");
  html2canvas(target).then(canvas => {
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(img, "PNG", 15, 40, 180, 180);
    const today = new Date().toISOString().split("T")[0];
    pdf.save(\`감성문구_QR_\${today}.pdf\`);
  });
}
