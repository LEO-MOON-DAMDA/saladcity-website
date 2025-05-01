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
