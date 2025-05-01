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
