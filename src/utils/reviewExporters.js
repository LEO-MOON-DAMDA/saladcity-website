import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";

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
